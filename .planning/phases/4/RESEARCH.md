# Phase 4: Lead Generation & CRO - Research

**Researched:** 2026-02-14
**Domain:** HubSpot integration, CRO, UTM tracking, booking embeds (Next.js App Router)
**Confidence:** HIGH

## Summary

Phase 4 wires the existing contact form to HubSpot CRM, installs HubSpot page-view tracking with SPA-aware route change detection, captures and persists UTM parameters across navigation, embeds a consultation booking widget, and applies CRO principles to all key pages. The codebase already has the UI scaffolding: a working `ContactForm` component with fields (name, email, phone, project type, message), `ServiceCta` and `HomepageCta` components, 5 service pages, homepage sections, and a contact page with trust signals and client logos.

The HubSpot Forms API v3 is the correct endpoint for custom form submissions from a Server Action. The `@hubspot/api-client` npm package (already installed at v13.4.0) does NOT support form submissions -- it covers CRM object CRUD (contacts, companies, deals). Form submissions go via direct HTTP POST to `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}` (unauthenticated) or the `/secure/submit/` variant (authenticated with private app token). The authenticated endpoint is preferred when submitting from a Server Action because it allows passing fields not defined on the form and has higher rate limits. HubSpot email automation workflows must be configured in the HubSpot dashboard -- they cannot be created programmatically without Operations Hub Professional. For booking, Calendly with `react-calendly` (v4.4.0) is recommended over HubSpot Meetings due to simpler embedding, better customisation, and no HubSpot Sales Hub seat requirement.

**Primary recommendation:** Use the HubSpot Forms API v3 secure endpoint from a Next.js Server Action, pass the `hubspotutk` cookie for contact deduplication, install the HubSpot tracking script via Next.js `<Script>` component with `afterInteractive` strategy, and store UTM parameters in a cookie/sessionStorage for cross-page persistence.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router, Server Actions, Script component | Already installed; provides Server Actions for secure API calls and Script component for third-party tracking |
| react-hook-form | 7.71.1 | Form state management and validation | Already installed; replaces manual useState in contact form |
| zod | 4.3.6 | Schema validation (shared client/server) | Already installed; single validation schema used in both form and Server Action |
| @hookform/resolvers | 5.2.2 | Connects zod schemas to react-hook-form | Already installed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-calendly | 4.4.0 | Calendly inline/popup booking widget | Embed booking on contact page and service pages |
| @hubspot/api-client | 13.4.0 | HubSpot CRM contact operations (NOT form submissions) | Only if needing to read/update CRM contacts directly; NOT used for form submit |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-calendly | HubSpot Meetings embed | HubSpot Meetings requires Sales Hub seat per user, has cross-origin iframe issues in React, less customisable styling |
| HubSpot Forms API (direct fetch) | @hubspot/api-client | The SDK doesn't support form submissions at all -- only CRM CRUD. Direct fetch to `api.hsforms.com` is the only option |
| Server Action | API Route (`app/api/`) | Server Action is simpler, co-located with form, no separate route file needed; API route only needed if external services POST to you |

**Installation:**
```bash
npm install react-calendly
```

**Environment Variables Required:**
```env
HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_FORM_GUID=your_form_guid
HUBSPOT_ACCESS_TOKEN=your_private_app_token
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-booking-link
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  actions/
    contact.ts                 # Server Action: validate + submit to HubSpot Forms API
  components/
    forms/
      contact-form.tsx         # Refactored: react-hook-form + zod, calls Server Action
    hubspot/
      hubspot-tracker.tsx      # Client component: Script + usePathname route tracking
      utm-provider.tsx         # Client component: capture/persist UTM params
    booking/
      calendly-inline.tsx      # Client component: react-calendly InlineWidget wrapper
      calendly-popup.tsx       # Client component: react-calendly PopupButton wrapper
    sections/
      service-cta.tsx          # Enhanced: add Calendly PopupButton option
      homepage-cta.tsx         # Enhanced: strengthen CTA copy
  lib/
    hubspot.ts                 # HubSpot API helpers: submitForm(), types
    utm.ts                     # UTM capture/persist/retrieve utilities
```

### Pattern 1: Server Action Form Submission
**What:** Client form collects data with react-hook-form + zod validation, then calls a Server Action which reads the `hubspotutk` cookie via `cookies()`, adds UTM data and page context, and POSTs to HubSpot Forms API v3.
**When to use:** All form submissions on the site.
**Example:**
```typescript
// src/actions/contact.ts
'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  // UTM fields passed from client
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  pageUri: z.string().optional(),
  pageName: z.string().optional(),
})

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { success: false, error: 'Invalid form data' }
  }

  const cookieStore = await cookies()
  const hutk = cookieStore.get('hubspotutk')?.value

  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formGuid = process.env.HUBSPOT_FORM_GUID
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN

  const body = {
    fields: [
      { objectTypeId: '0-1', name: 'firstname', value: parsed.data.name },
      { objectTypeId: '0-1', name: 'email', value: parsed.data.email },
      { objectTypeId: '0-1', name: 'phone', value: parsed.data.phone ?? '' },
      { objectTypeId: '0-1', name: 'service_interest', value: parsed.data.projectType ?? '' },
      { objectTypeId: '0-1', name: 'message', value: parsed.data.message },
    ],
    context: {
      hutk: hutk ?? undefined,
      pageUri: parsed.data.pageUri ?? '',
      pageName: parsed.data.pageName ?? '',
    },
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    console.error('HubSpot submission failed:', await response.text())
    return { success: false, error: 'Submission failed. Please try again.' }
  }

  return { success: true }
}
```

### Pattern 2: HubSpot Tracking with SPA Route Change Detection
**What:** Load HubSpot tracking script once in layout, then use `usePathname()` + `useEffect()` to call `_hsq.push(['setPath', path])` and `_hsq.push(['trackPageView'])` on every client-side navigation.
**When to use:** Always -- must be in root layout.
**Example:**
```typescript
// src/components/hubspot/hubspot-tracker.tsx
'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    _hsq?: Array<[string, ...unknown[]]>
  }
}

export function HubSpotTracker() {
  const pathname = usePathname()
  const isFirstLoad = useRef(true)

  useEffect(() => {
    // Skip first load -- HubSpot script handles initial page view
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    // Track subsequent client-side navigations
    const _hsq = (window._hsq = window._hsq || [])
    _hsq.push(['setPath', pathname])
    _hsq.push(['trackPageView'])
  }, [pathname])

  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID

  return (
    <Script
      id="hs-script-loader"
      src={`//js.hs-scripts.com/${portalId}.js`}
      strategy="afterInteractive"
    />
  )
}
```

### Pattern 3: UTM Parameter Capture and Persistence
**What:** On first page load, read UTM params from `useSearchParams()`, store in sessionStorage (persists across client-side navigations within the session). When submitting a form, read from sessionStorage and include in the submission.
**When to use:** Every page load, transparent to user.
**Example:**
```typescript
// src/lib/utm.ts
export const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

export type UTMParams = Partial<Record<(typeof UTM_PARAMS)[number], string>>

export function captureUTMParams(searchParams: URLSearchParams): void {
  const hasUTM = UTM_PARAMS.some((key) => searchParams.has(key))
  if (!hasUTM) return

  // Only overwrite if new UTM params arrive (first-touch attribution)
  const existing = getStoredUTMParams()
  if (existing && Object.keys(existing).length > 0) return

  const params: UTMParams = {}
  for (const key of UTM_PARAMS) {
    const value = searchParams.get(key)
    if (value) params[key] = value
  }

  if (typeof window !== 'undefined') {
    sessionStorage.setItem('utm_params', JSON.stringify(params))
  }
}

export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null
  const stored = sessionStorage.getItem('utm_params')
  return stored ? JSON.parse(stored) : null
}
```

```typescript
// src/components/hubspot/utm-provider.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { captureUTMParams } from '@/lib/utm'

function UTMCaptureInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    captureUTMParams(searchParams)
  }, [searchParams])

  return null
}

export function UTMProvider() {
  return (
    <Suspense fallback={null}>
      <UTMCaptureInner />
    </Suspense>
  )
}
```

### Pattern 4: Calendly Inline Widget (Next.js Dynamic Import)
**What:** Wrap `react-calendly` InlineWidget in a dynamic import with `ssr: false` because Calendly requires the browser DOM.
**When to use:** Contact page and service page CTAs.
**Example:**
```typescript
// src/components/booking/calendly-inline.tsx
'use client'

import { InlineWidget } from 'react-calendly'

interface CalendlyInlineProps {
  url: string
  styles?: React.CSSProperties
}

export function CalendlyInline({ url, styles }: CalendlyInlineProps) {
  return (
    <InlineWidget
      url={url}
      styles={styles ?? { height: '630px', minWidth: '320px' }}
    />
  )
}
```

### Anti-Patterns to Avoid
- **Client-side HubSpot API calls:** Never POST to HubSpot Forms API from the browser. Use Server Actions to keep credentials secure and avoid CORS issues.
- **Submitting without hutk:** The `hubspotutk` cookie is critical for HubSpot to link the form submission to the anonymous visitor's browsing history. Always read it from `cookies()` in the Server Action.
- **Using `@hubspot/api-client` for form submissions:** The SDK does not support form submissions. It covers CRM CRUD only. Use direct `fetch()` to `api.hsforms.com`.
- **Multiple trackPageView on initial load:** The HubSpot tracking script automatically fires `trackPageView` on load. Do NOT push another `trackPageView` during initial render or you will double-count the first page view.
- **Losing UTM params on navigation:** URL search params disappear when the user navigates to another page. Store UTMs in sessionStorage on first capture.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Manual useState/regex validation | react-hook-form + zod (already installed) | Error handling, focus management, accessibility, performance (uncontrolled inputs) |
| Booking/scheduling widget | Custom calendar/time slot picker | react-calendly InlineWidget | Calendar integration, timezone handling, availability sync, email notifications |
| CRM contact creation | Custom API wrapper around @hubspot/api-client | HubSpot Forms API v3 submission | Forms API handles contact create-or-update automatically, fires workflows, records analytics |
| UTM persistence | Custom URL rewriting or middleware | sessionStorage capture on first load | Simple, standard pattern; no URL pollution on internal navigation |
| Third-party script loading | Manual DOM script injection | Next.js `<Script>` component | Handles strategy (afterInteractive), deduplication, and proper lifecycle in App Router |

**Key insight:** The HubSpot Forms API does more than just store data -- it triggers workflows, records submission analytics, handles contact deduplication via hutk, and creates timeline entries. Posting directly to the CRM Contacts API would bypass all of this. Always use the Forms API for website form submissions.

## Common Pitfalls

### Pitfall 1: Forgetting the hubspotutk Cookie
**What goes wrong:** Form submissions create new contacts instead of matching existing anonymous visitors. HubSpot cannot link the submission to previous page views, breaking attribution and analytics.
**Why it happens:** The `hubspotutk` cookie is set by the HubSpot tracking script (a first-party cookie). Developers forget to read and forward it.
**How to avoid:** In the Server Action, use `(await cookies()).get('hubspotutk')?.value` and pass it in the `context.hutk` field. Ensure the HubSpot tracking script loads before the form can be submitted (it uses `afterInteractive` strategy).
**Warning signs:** HubSpot shows "direct traffic" for all form submissions; new contacts created instead of merging with existing anonymous profiles.

### Pitfall 2: Double-Counting Initial Page View
**What goes wrong:** The first page a user lands on gets 2 page views recorded in HubSpot analytics.
**Why it happens:** The HubSpot script automatically tracks a page view on load. If your `useEffect` also fires `trackPageView` on initial render, you get a double count.
**How to avoid:** Use a `useRef(true)` flag (isFirstLoad) and skip the first `useEffect` call. Only push `setPath`/`trackPageView` on subsequent pathname changes.
**Warning signs:** Landing page analytics show exactly 2x the expected views; bounce rate appears artificially low.

### Pitfall 3: Form Fields Not Matching HubSpot Form Definition
**What goes wrong:** HubSpot returns 400 errors or silently drops fields that don't match the form definition in HubSpot.
**Why it happens:** The form must be created in HubSpot first with matching field internal names. Custom properties (like `service_interest`) must be created in HubSpot CRM before they can be used in form submissions.
**How to avoid:** Create the form and any custom contact properties in HubSpot dashboard first. Use the authenticated `/secure/submit` endpoint which is more lenient about extra fields. Verify field names match HubSpot internal names (e.g., `firstname` not `first_name`, `phone` not `phone_number`).
**Warning signs:** 400 responses from HubSpot; fields appearing empty in CRM despite being sent.

### Pitfall 4: UTM Parameters Lost on Internal Navigation
**What goes wrong:** User arrives via Google Ads with UTM params in URL, clicks a link to another page, UTMs disappear from URL, form submission has no attribution.
**Why it happens:** Next.js client-side navigation creates a new URL without the query parameters from the landing page.
**How to avoid:** Capture UTMs to sessionStorage on first page load. Read from sessionStorage when submitting forms. Use first-touch attribution (don't overwrite if UTMs already captured).
**Warning signs:** Form submissions in HubSpot show no UTM source/medium despite traffic coming from paid ads.

### Pitfall 5: useSearchParams Without Suspense Boundary
**What goes wrong:** Build fails or entire page de-opts from static generation.
**Why it happens:** Next.js App Router requires `useSearchParams()` to be wrapped in a `<Suspense>` boundary to allow the rest of the page to be statically rendered.
**How to avoid:** Always wrap the UTM capture component in `<Suspense fallback={null}>`.
**Warning signs:** Build warnings about "missing Suspense boundary with useSearchParams"; pages that should be static become dynamic.

### Pitfall 6: Calendly Widget Hydration Error in Next.js
**What goes wrong:** SSR attempts to render Calendly widget which requires browser DOM, causing hydration mismatch errors.
**Why it happens:** react-calendly components access `window` and `document` during render.
**How to avoid:** Either use `next/dynamic` with `{ ssr: false }` to import the component, or mark the component as `'use client'` and ensure it only renders in the browser.
**Warning signs:** Hydration mismatch warnings in console; Calendly widget not appearing on first render.

## Code Examples

### Server Action with Form Submission to HubSpot
```typescript
// Source: HubSpot Forms API v3 docs
// https://developers.hubspot.com/docs/api-reference/legacy/forms-v3-legacy/post-submissions-v3-integration-secure-submit-portalId-formGuid

// Request body structure for HubSpot Forms API v3:
const requestBody = {
  submittedAt: Date.now().toString(), // millisecond timestamp
  fields: [
    { objectTypeId: '0-1', name: 'email', value: 'user@example.com' },
    { objectTypeId: '0-1', name: 'firstname', value: 'John' },
    { objectTypeId: '0-1', name: 'phone', value: '0412345678' },
    { objectTypeId: '0-1', name: 'message', value: 'Project enquiry...' },
    // objectTypeId '0-1' = Contact properties
    // objectTypeId '0-2' = Company properties
  ],
  context: {
    hutk: 'hubspotutk_cookie_value', // Critical for visitor tracking
    pageUri: 'https://upscalepm.com.au/contact',
    pageName: 'Contact | UpScalePM',
    ipAddress: '1.2.3.4', // Optional, for geo-location
  },
  legalConsentOptions: {
    consent: {
      consentToProcess: true,
      text: 'I agree to the processing of my data.',
    },
  },
}

// POST to:
// Authenticated: https://api.hsforms.com/submissions/v3/integration/secure/submit/{portalId}/{formGuid}
// Unauthenticated: https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
```

### HubSpot Tracking Script in Root Layout
```typescript
// Source: Next.js Script component docs + HubSpot tracking code docs
// https://nextjs.org/docs/app/api-reference/components/script
// https://developers.hubspot.com/docs/api-reference/legacy/tracking-code-v1/track-page-view

// In src/app/layout.tsx:
import { HubSpotTracker } from '@/components/hubspot/hubspot-tracker'
import { UTMProvider } from '@/components/hubspot/utm-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <HubSpotTracker />
        <UTMProvider />
      </body>
    </html>
  )
}
```

### Refactored Contact Form with react-hook-form
```typescript
// Pattern: react-hook-form + zod + Server Action
// Source: react-hook-form docs, Next.js Server Actions docs

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useActionState } from 'react'
import { submitContactForm, type ContactFormState } from '@/actions/contact'
import { getStoredUTMParams } from '@/lib/utm'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  // Prepare form data with UTM params and submit via Server Action
  async function onSubmit(data: FormValues) {
    const utmParams = getStoredUTMParams()
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.set(key, value)
    })
    if (utmParams) {
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value) formData.set(key.replace('utm_', 'utm'), value)
      })
    }
    formData.set('pageUri', window.location.href)
    formData.set('pageName', document.title)

    await submitContactForm({ success: false }, formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields using register() */}
    </form>
  )
}
```

### HubSpot Meetings Embed (Alternative to Calendly)
```typescript
// If using HubSpot Meetings instead of Calendly:
// Source: HubSpot knowledge base
// https://knowledge.hubspot.com/meetings-tool/embed-the-meeting-widget-on-a-page

'use client'

import Script from 'next/script'

interface HubSpotMeetingsProps {
  meetingUrl: string // e.g., "https://meetings.hubspot.com/your-link"
}

export function HubSpotMeetings({ meetingUrl }: HubSpotMeetingsProps) {
  return (
    <>
      <Script
        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        strategy="lazyOnload"
      />
      <div
        className="meetings-iframe-container"
        data-src={`${meetingUrl}?embed=true`}
      />
    </>
  )
}
```

## CRO Implementation Guide

### Contact Page CRO (CRO-01) -- Google Ads Landing Page
The existing contact page already has good bones (trust signals, client logos, response time commitment). Enhancements:

**Above the fold:**
- Replace generic "Get in Touch" heading with benefit-driven: "Protect Your Next Project" or "Get Expert Project Guidance"
- Add a one-liner value prop: "Free 30-minute consultation with a construction PM who's been on both sides"
- Minimal form fields visible immediately: Name, Email, Phone, Message (remove project type selector from initial view or make it optional)

**Form CRO principles:**
- Reduce visible required fields to 3 (name, email, message). Phone and project type optional
- Add micro-copy under submit button: "No obligation. We respond within 1 business day."
- Show social proof near form: "14+ projects delivered | Trusted by Sydney Water, NSW Ambulance"
- Add Calendly booking option as alternative: "Prefer to book directly? Schedule a call"

**Trust signals (already partially implemented):**
- Client logos (already have 5)
- Response time commitment (already have "1 business day")
- Consider adding: "We've managed $X+ in projects" if data available

### Homepage CRO (CRO-03)
- Hero: Already has benefit-driven headline. Strengthen sub-headline with specific outcome
- Add CTAs after each major section (value prop, services overview, case studies)
- Social proof: Ensure client logos appear early (already ClientLogos component after hero)
- Consider adding a "numbers" section: projects delivered, years experience, sectors served

### Service Pages CRO (CRO-04)
- Apply problem-agitate-solve structure to service content sections
- Add a testimonial/case study quote relevant to that service
- Ensure ServiceCta has outcome-driven copy, not generic "Get in Touch"
- Add inline CTAs (not just bottom CTA) -- consider a sticky CTA or mid-page CTA

### CTAs Throughout Site (CRO-05)
- Every scroll depth should have a CTA visible (rule of thumb: one CTA per ~2 scroll heights)
- Use contextual, benefit-driven language: "Get a feasibility assessment" not "Contact us"
- Consider secondary CTA: "Book a 30-min call" (Calendly) alongside primary "Send enquiry"
- Service pages: add contextual CTA between content sections, not just at bottom

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| HubSpot embedded forms (hbspt.forms.create) | Custom forms + Server Action POST to Forms API v3 | Ongoing (embedded forms still exist but add 200KB+ JS) | Full design control, no JS bloat, better CWV scores |
| API key in query string (`?hapikey=`) | Bearer token in Authorization header | HubSpot deprecated hapikey Nov 2022 | Must use private app access token for authenticated endpoint |
| Pages Router `useRouter().events` for SPA tracking | App Router `usePathname()` + useEffect | Next.js 13+ (2023) | No router events in App Router; usePathname is the standard pattern |
| Client-side form submission to HubSpot | Server Action submission | Next.js 14+ (2024) | Eliminates CORS issues, secures credentials, enables cookies() access for hutk |
| Manual cookie parsing (document.cookie) | Next.js `cookies()` in Server Actions | Next.js 14+ (2024) | Type-safe, automatic, works in Server Component context |

**Deprecated/outdated:**
- `hapikey` query parameter: Deprecated by HubSpot in November 2022. Use private app access tokens with Bearer auth header instead
- `hbspt.forms.create()`: Still works but adds 200KB+ JavaScript, breaks custom styling, and is explicitly out of scope for this project
- `next/head` for script injection: Replaced by `next/script` Script component in App Router

## Open Questions

1. **HubSpot Form and Custom Properties Setup**
   - What we know: The Server Action will POST fields to a HubSpot form. Fields must match the form definition in HubSpot.
   - What's unclear: The exact form GUID and custom property names (e.g., `service_interest` for project type) need to be created in HubSpot before the code will work.
   - Recommendation: Create the form and custom properties in HubSpot dashboard as a prerequisite task. Document the portal ID, form GUID, and field internal names in `.env.local`.

2. **HubSpot Plan/Tier for Email Workflows**
   - What we know: Email automation workflows are configured in HubSpot dashboard (Marketing Hub), not via API. Basic form follow-up emails are available on free Marketing Hub.
   - What's unclear: Whether the current HubSpot plan includes automated workflows or only simple auto-response emails.
   - Recommendation: Plan tasks should note that HUB-04 (email automation) is a HubSpot dashboard configuration task, not a code task. Document the workflow setup steps.

3. **Calendly Account and Meeting Link**
   - What we know: react-calendly needs a Calendly scheduling URL to embed.
   - What's unclear: Whether a Calendly account exists and what the meeting link URL is.
   - Recommendation: Create Calendly account and scheduling link as a prerequisite. Store URL in `NEXT_PUBLIC_CALENDLY_URL` env var.

4. **IP Address Forwarding in Server Action**
   - What we know: HubSpot Forms API accepts an `ipAddress` field in context for geo-location.
   - What's unclear: Whether Next.js Server Actions have reliable access to the client IP (depends on deployment platform -- Vercel provides it in `x-forwarded-for` header).
   - Recommendation: Attempt to read from `headers()` in the Server Action. If available, include it; if not, omit it (optional field).

## Sources

### Primary (HIGH confidence)
- [HubSpot Forms API v3 Submit Endpoint](https://developers.hubspot.com/docs/api-reference/legacy/forms-v3-legacy/post-submissions-v3-integration-secure-submit-portalId-formGuid) -- Complete API specification for form submissions
- [HubSpot Tracking Code API - trackPageView](https://developers.hubspot.com/docs/api-reference/legacy/tracking-code-v1/track-page-view) -- Official _hsq setPath/trackPageView specification
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script) -- Official docs for third-party script loading strategies
- [Next.js useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params) -- Official docs for reading URL search params
- [Next.js cookies()](https://nextjs.org/docs/app/api-reference/functions/cookies) -- Official docs for reading cookies in Server Actions
- [@hubspot/api-client GitHub](https://github.com/HubSpot/hubspot-api-nodejs) -- Confirmed SDK does NOT support form submissions

### Secondary (MEDIUM confidence)
- [HubSpot Community: Next.js tracking code installation](https://community.hubspot.com/t5/APIs-Integrations/Next-js-tracking-code-installation/m-p/753441) -- Community-verified pattern for App Router tracking
- [HubSpot Community: SPA page view tracking](https://community.hubspot.com/t5/CMS-Development/How-do-we-track-page-views-in-a-Single-Page-App-SPA-with-HubSpot/td-p/1199353) -- Confirmed setPath + trackPageView pattern
- [HubSpot Community: hutk cookie handling](https://community.hubspot.com/t5/APIs-Integrations/Issues-capturing-the-hubspotutk-cookie-in-form-submission-with/m-p/1128469) -- hutk is "#1 error" when omitted
- [Josh Karamuth: Track HubSpot Events in React SPA](https://joshkaramuth.com/blog/track-hubspot-events-react/) -- Verified useEffect + usePathname pattern with customer identification
- [react-calendly npm](https://www.npmjs.com/package/react-calendly) -- v4.4.0, InlineWidget/PopupButton components
- [HubSpot Meetings embed](https://knowledge.hubspot.com/meetings-tool/embed-the-meeting-widget-on-a-page) -- Official embed approach for HubSpot Meetings

### Tertiary (LOW confidence)
- [B2B CRO benchmarks](https://firstpagesage.com/seo-blog/b2b-conversion-rate-optimization-cro-best-practices-for-2025/) -- Industry benchmarks (2.9% avg B2B conversion rate)
- [Contact form design best practices](https://www.prospermarketingsolutions.com/blogs-contact-form-best-practices-for-2025/) -- CRO principles (each field reduces conversion 4-8%)
- [Calendly vs HubSpot Meetings comparison](https://forecastio.ai/blog/calendly-vs-hubspot) -- Feature comparison for booking tool selection

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries verified via npm, official docs, and existing package.json. `@hubspot/api-client` limitation confirmed via GitHub README.
- Architecture: HIGH -- Server Action + Forms API v3 pattern verified across HubSpot official docs, community forums, and multiple implementation examples. SPA tracking pattern is well-established.
- Pitfalls: HIGH -- Each pitfall documented from multiple community reports and official warnings (hutk omission, double page views, field mismatch).
- CRO guidance: MEDIUM -- Based on industry best practices from multiple sources; specific recommendations are directional rather than data-driven for this site.

**Research date:** 2026-02-14
**Valid until:** 2026-03-14 (30 days -- HubSpot APIs are stable; CRO principles are evergreen)
