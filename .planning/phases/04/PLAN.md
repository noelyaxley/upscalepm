# Phase 4: Lead Generation & CRO

## Overview

6 prompts that wire the contact form to HubSpot CRM, install page-view tracking with SPA route change detection, capture UTM parameters, embed Calendly booking, apply CRO principles to all key pages, and document HubSpot automation workflows. After this phase, form submissions create real CRM contacts with attribution, and every page is optimised for conversion.

**Requirements covered:** HUB-01, HUB-02, HUB-03, HUB-04, HUB-05, CRO-01, CRO-02, CRO-03, CRO-04, CRO-05

**Estimated effort:** ~3-4 hours Claude execution time across all prompts.

**Must-Haves (Goal-Backward Derivation):**

Goal: "The site converts visitors into qualified leads -- contact form submissions reach HubSpot CRM, conversion optimisation principles are applied to all key pages, and booking/follow-up workflows are operational."

Observable truths:
1. Submitting the contact form creates a contact in HubSpot CRM with name, email, phone, project type, and message
2. UTM parameters from the landing URL appear on the HubSpot contact record
3. HubSpot tracking shows page views for every route change, including client-side navigation
4. Visitor can book a consultation via Calendly from the contact page and service pages
5. Contact page has benefit-driven headline, minimal fields, trust signals, and booking alternative visible above the fold
6. Every page has a CTA visible within 2 scroll heights
7. Service pages and homepage use outcome-driven copy, not generic templates

Required artifacts:
- `src/actions/contact.ts` -- Server Action posting to HubSpot Forms API v3
- `src/components/hubspot/hubspot-tracker.tsx` -- HubSpot tracking script with SPA route tracking
- `src/components/hubspot/utm-provider.tsx` -- UTM capture component
- `src/lib/utm.ts` -- UTM capture/persist/retrieve utilities
- `src/components/booking/calendly-inline.tsx` -- Calendly InlineWidget wrapper
- `src/components/booking/calendly-popup.tsx` -- Calendly PopupButton wrapper
- `src/components/forms/contact-form.tsx` -- Refactored with react-hook-form + zod + Server Action
- `src/app/layout.tsx` -- Modified to include HubSpotTracker and UTMProvider
- `src/app/contact/page.tsx` -- Enhanced with CRO and Calendly booking

Key links:
- ContactForm -> submitContactForm Server Action (if broken: form shows success but nothing reaches HubSpot)
- Server Action -> HubSpot Forms API v3 secure endpoint (if broken: data never reaches CRM)
- Server Action -> cookies().get('hubspotutk') (if broken: contacts not linked to browsing history)
- UTMProvider -> sessionStorage -> ContactForm -> Server Action (if broken: no attribution on contacts)
- HubSpotTracker usePathname -> _hsq.push (if broken: only initial page view tracked, not SPA navigations)
- CalendlyInline -> NEXT_PUBLIC_CALENDLY_URL env var (if broken: booking widget shows nothing)

---

## Prompt 1: HubSpot Tracking, UTM Capture & Root Layout Wiring

**Requirements:** HUB-02, HUB-03
**Dependencies:** None
**Files created/modified:**
- `src/components/hubspot/hubspot-tracker.tsx` (create)
- `src/components/hubspot/utm-provider.tsx` (create)
- `src/lib/utm.ts` (create)
- `src/app/layout.tsx` (modify -- add HubSpotTracker and UTMProvider)

### Context

The root layout at `src/app/layout.tsx` currently renders Header, main content, and Footer. No third-party tracking scripts are installed. The site uses Next.js 16.1.6 App Router with client-side navigation (Link component), so route changes do not trigger full page reloads -- HubSpot tracking must explicitly call `_hsq.push(['setPath', path])` and `_hsq.push(['trackPageView'])` on each navigation.

UTM parameters arrive in the URL when visitors click Google Ads or other campaigns (e.g., `?utm_source=google&utm_medium=cpc&utm_campaign=sydney-pm`). These parameters disappear from the URL on client-side navigation. They must be captured to sessionStorage on first load and read when submitting the contact form.

**Environment variable required:** `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` -- the HubSpot portal ID. This is a public value (used in the script URL and visible in page source on any HubSpot-tracked site). The executor should create `.env.local` with a placeholder if it does not exist.

### Actions

**1. Create `src/lib/utm.ts`** -- UTM capture and persistence utilities:

```typescript
export const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

export type UTMParams = Partial<Record<(typeof UTM_PARAMS)[number], string>>
```

Three functions:
- `captureUTMParams(searchParams: URLSearchParams): void` -- Checks if any UTM params exist in the URL. If yes AND no UTMs are already stored (first-touch attribution), saves them to `sessionStorage.setItem('utm_params', JSON.stringify(params))`. Guard with `typeof window !== 'undefined'`.
- `getStoredUTMParams(): UTMParams | null` -- Reads from sessionStorage, returns parsed object or null. Guard with `typeof window !== 'undefined'`.
- `clearUTMParams(): void` -- Removes from sessionStorage (used after form submission if desired).

**2. Create `src/components/hubspot/utm-provider.tsx`** -- Client component that captures UTMs:

```typescript
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { captureUTMParams } from '@/lib/utm'
```

Two components:
- `UTMCaptureInner` -- calls `useSearchParams()` and runs `captureUTMParams(searchParams)` in a `useEffect` with `[searchParams]` dependency.
- `UTMProvider` -- wraps `UTMCaptureInner` in `<Suspense fallback={null}>`. This is CRITICAL: `useSearchParams()` without Suspense will de-opt the entire page from static generation.

The component renders `null` (invisible -- purely a side-effect component).

**3. Create `src/components/hubspot/hubspot-tracker.tsx`** -- HubSpot tracking script with SPA route change detection:

```typescript
'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    _hsq?: Array<[string, ...unknown[]]>
  }
}
```

The component:
- Uses `usePathname()` to detect route changes.
- Uses a `useRef(true)` flag (`isFirstLoad`) to SKIP the first `useEffect` call. This is CRITICAL: the HubSpot script automatically fires `trackPageView` on initial load. Calling it again in useEffect would double-count the first page view.
- On subsequent pathname changes: pushes `['setPath', pathname]` then `['trackPageView']` to `window._hsq`.
- Renders a `<Script>` component with `id="hs-script-loader"`, `src={//js.hs-scripts.com/${portalId}.js}`, `strategy="afterInteractive"`.
- Reads portal ID from `process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID`.
- If portal ID is not set, renders `null` (graceful degradation in development).

**4. Modify `src/app/layout.tsx`** -- add both components to the root layout:

Add imports:
```typescript
import { HubSpotTracker } from '@/components/hubspot/hubspot-tracker'
import { UTMProvider } from '@/components/hubspot/utm-provider'
```

Place `<HubSpotTracker />` and `<UTMProvider />` inside `<body>`, after `<Footer />`:
```tsx
<body className="flex min-h-screen flex-col font-sans antialiased">
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
  <HubSpotTracker />
  <UTMProvider />
</body>
```

**5. Create `.env.local`** (if it does not exist) with placeholder values:

```env
HUBSPOT_PORTAL_ID=REPLACE_ME
HUBSPOT_FORM_GUID=REPLACE_ME
HUBSPOT_ACCESS_TOKEN=REPLACE_ME
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=REPLACE_ME
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/REPLACE_ME
```

Also create `.env.example` with the same keys (no values) for documentation. Ensure `.env.local` is in `.gitignore` (it should be by default with Next.js).

### Acceptance Criteria

- [ ] `src/lib/utm.ts` exports `captureUTMParams`, `getStoredUTMParams`, `clearUTMParams` with correct types
- [ ] `src/components/hubspot/utm-provider.tsx` uses `useSearchParams()` inside a `<Suspense>` boundary
- [ ] `src/components/hubspot/hubspot-tracker.tsx` loads HubSpot script and tracks SPA route changes without double-counting initial page view
- [ ] `src/app/layout.tsx` includes both `<HubSpotTracker />` and `<UTMProvider />` after the Footer
- [ ] `.env.local` exists with placeholder env vars; `.env.example` exists and is committed
- [ ] `npm run build` succeeds -- no Suspense boundary warnings, all static pages still generate correctly
- [ ] Dev server loads without errors when `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is not set (graceful degradation)

---

## Prompt 2: Contact Form Server Action & HubSpot Wiring

**Requirements:** HUB-01
**Dependencies:** Prompt 1 (UTM utilities in `src/lib/utm.ts` must exist)
**Files created/modified:**
- `src/actions/contact.ts` (create -- Server Action)
- `src/components/forms/contact-form.tsx` (modify -- refactor to react-hook-form + zod + Server Action)

### Context

The existing contact form at `src/components/forms/contact-form.tsx` is a client component with manual `useState` for each field, manual validation with regex, and a simulated `setTimeout` submission. It needs to be refactored to:
1. Use `react-hook-form` + `zod` for validation (both already installed)
2. Call a Server Action that POSTs to HubSpot Forms API v3 secure endpoint
3. Pass UTM parameters and page attribution data from the client
4. Forward the `hubspotutk` cookie from the Server Action for contact deduplication

The form currently has these fields: Name, Email, Phone (optional), Project Type (optional, Radix Select), Message. The field list stays the same. The PROJECT_TYPES constant stays the same. The success state UI (green confirmation with "Send another enquiry" button) stays the same.

**HubSpot Forms API v3 endpoint:**
- Authenticated (preferred): `https://api.hsforms.com/submissions/v3/integration/secure/submit/{portalId}/{formGuid}`
- Requires `Authorization: Bearer {accessToken}` header
- Body format: `{ submittedAt, fields: [{ objectTypeId: '0-1', name, value }], context: { hutk, pageUri, pageName } }`
- HubSpot field internal names: `firstname`, `email`, `phone`, `message`, `service_interest` (custom property -- must be created in HubSpot dashboard)

**Environment variables (from .env.local, set up in Prompt 1):**
- `HUBSPOT_PORTAL_ID` -- server-side only
- `HUBSPOT_FORM_GUID` -- server-side only
- `HUBSPOT_ACCESS_TOKEN` -- server-side only, private app token

**IMPORTANT:** Do NOT use `@hubspot/api-client` for form submissions -- the SDK does not support form submissions. Use direct `fetch()` to `api.hsforms.com`.

### Actions

**1. Create `src/actions/contact.ts`** -- Server Action:

```typescript
'use server'

import { cookies, headers } from 'next/headers'
import { z } from 'zod'
```

Define a `contactSchema` with zod matching all form fields plus UTM fields and page context:
- `name`: `z.string().min(1, 'Name is required')`
- `email`: `z.string().email('Please enter a valid email')`
- `phone`: `z.string().optional()`
- `projectType`: `z.string().optional()`
- `message`: `z.string().min(1, 'Message is required')`
- `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`: all `z.string().optional()`
- `pageUri`, `pageName`: `z.string().optional()`

Export a `ContactFormState` type: `{ success: boolean; error?: string }`

Export `async function submitContactForm(data: Record<string, string>): Promise<ContactFormState>`:

1. Parse and validate input with `contactSchema.safeParse(data)`. Return `{ success: false, error: 'Invalid form data' }` on failure.
2. Read the `hubspotutk` cookie: `(await cookies()).get('hubspotutk')?.value`
3. Optionally read client IP from headers: `(await headers()).get('x-forwarded-for')?.split(',')[0]?.trim()`
4. Read env vars: `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID`, `HUBSPOT_ACCESS_TOKEN`
5. If any env var is missing or set to `REPLACE_ME`, log a warning and return `{ success: true }` (graceful degradation for development -- form appears to work without HubSpot configured)
6. Construct the HubSpot Forms API body:
   ```typescript
   const body = {
     submittedAt: Date.now().toString(),
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
       ...(ipAddress ? { ipAddress } : {}),
     },
   }
   ```
7. POST to `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formGuid}` with `Authorization: Bearer ${accessToken}` and `Content-Type: application/json`.
8. If response is not ok, log the error body with `console.error('HubSpot submission failed:', response.status, await response.text())` and return `{ success: false, error: 'Something went wrong. Please try again or call us directly.' }`.
9. On success, return `{ success: true }`.

**2. Refactor `src/components/forms/contact-form.tsx`**:

Replace the manual useState/validation approach with react-hook-form + zod. Keep the same UI structure, field layout, and visual design.

Key changes:
- Add `import { useForm } from 'react-hook-form'`
- Add `import { zodResolver } from '@hookform/resolvers/zod'`
- Add `import { z } from 'zod'`
- Add `import { submitContactForm } from '@/actions/contact'`
- Add `import { getStoredUTMParams } from '@/lib/utm'`

Define the form schema with zod (shared with Server Action validation):
```typescript
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

type FormValues = z.infer<typeof formSchema>
```

Replace the 5 individual `useState` calls with:
```typescript
const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: { name: '', email: '', phone: '', projectType: '', message: '' },
})
```

Keep a single `useState<'idle' | 'success' | 'error'>('idle')` for submission status (not form field state).

For the Project Type select (Radix Select does not work with `register` because it's not a native input), use `setValue('projectType', value)` in the `onValueChange` handler and track the displayed value with `watch('projectType')` or a controlled approach.

The `onSubmit` handler:
```typescript
async function onSubmit(data: FormValues) {
  setStatus('idle')
  const utmParams = getStoredUTMParams()
  const payload: Record<string, string> = {
    ...data,
    pageUri: window.location.href,
    pageName: document.title,
  }
  if (utmParams) {
    if (utmParams.utm_source) payload.utmSource = utmParams.utm_source
    if (utmParams.utm_medium) payload.utmMedium = utmParams.utm_medium
    if (utmParams.utm_campaign) payload.utmCampaign = utmParams.utm_campaign
    if (utmParams.utm_term) payload.utmTerm = utmParams.utm_term
    if (utmParams.utm_content) payload.utmContent = utmParams.utm_content
  }

  const result = await submitContactForm(payload)
  if (result.success) {
    setStatus('success')
    reset()
  } else {
    setStatus('error')
    setErrorMessage(result.error ?? 'Something went wrong.')
  }
}
```

Error display: Use the existing `aria-invalid` and error message pattern but now driven by `errors.name?.message`, `errors.email?.message`, `errors.message?.message` from react-hook-form instead of manual state.

Keep the success UI (green confirmation box with CheckCircle2 icon and "Send another enquiry" button). Keep the loading state (Loader2 spinner, disabled button) but use `isSubmitting` from react-hook-form instead of manual status check.

Add an error state below the submit button for server-side errors:
```tsx
{status === 'error' && (
  <p className="text-center text-sm text-destructive">{errorMessage}</p>
)}
```

Keep the privacy note at the bottom of the form.

### Acceptance Criteria

- [ ] `src/actions/contact.ts` exports `submitContactForm` as a Server Action ('use server' directive)
- [ ] Server Action validates with zod, reads `hubspotutk` cookie, POSTs to HubSpot Forms API v3 secure endpoint
- [ ] Server Action gracefully degrades when env vars are not configured (returns success without calling HubSpot)
- [ ] Contact form uses react-hook-form with zodResolver for client-side validation
- [ ] Form fields, layout, and visual design match the existing form (same inputs, same styling)
- [ ] Success state shows green confirmation with "Send another enquiry" button
- [ ] Server error state shows error message below submit button
- [ ] UTM parameters from sessionStorage are included in the submission payload
- [ ] Page URI and page name are included in the submission context
- [ ] `npm run build` succeeds
- [ ] Contact form still renders and submits in development (graceful degradation without real HubSpot credentials)

---

## Prompt 3: Calendly Booking Integration

**Requirements:** HUB-05
**Dependencies:** None (independent -- can run in parallel with Prompts 1-2)
**Files created/modified:**
- `src/components/booking/calendly-inline.tsx` (create)
- `src/components/booking/calendly-popup.tsx` (create)
- `src/app/contact/page.tsx` (modify -- add Calendly inline widget)
- `src/components/sections/service-cta.tsx` (modify -- add optional booking button)

### Context

The `react-calendly` package (v4.4.0) needs to be installed. It provides `InlineWidget` (full embedded calendar) and `PopupButton` (button that opens Calendly in a modal). Both require browser DOM and must be client components with SSR disabled or guarded.

The Calendly URL comes from `process.env.NEXT_PUBLIC_CALENDLY_URL` (set in `.env.local` from Prompt 1, or create the env var here if Prompt 1 hasn't run yet).

The contact page (`src/app/contact/page.tsx`) currently has a 5/3 column layout: form on the left (3 cols), trust signals on the right (2 cols). The Calendly widget should be added below the form as an alternative booking method, OR as a separate section below the main form area.

The `ServiceCta` component at `src/components/sections/service-cta.tsx` currently has a single "Get in Touch" button. It should gain an optional secondary button for booking a consultation.

### Actions

**1. Install react-calendly:**

```bash
npm install react-calendly
```

**2. Create `src/components/booking/calendly-inline.tsx`** -- Inline widget for the contact page:

```typescript
'use client'

import { InlineWidget } from 'react-calendly'
```

Props: `{ url?: string; styles?: React.CSSProperties }`

- If `url` prop is not provided, read from `process.env.NEXT_PUBLIC_CALENDLY_URL`.
- If neither is available, render a fallback: a styled box with "Booking widget loading..." or a link to the Calendly URL.
- Render `<InlineWidget url={calendlyUrl} styles={styles ?? { height: '630px', minWidth: '320px' }} />`.
- Since react-calendly accesses browser DOM, this component must be imported dynamically where used:
  ```typescript
  import dynamic from 'next/dynamic'
  const CalendlyInline = dynamic(
    () => import('@/components/booking/calendly-inline').then(mod => mod.CalendlyInline),
    { ssr: false, loading: () => <div className="h-[630px] animate-pulse rounded-lg bg-muted" /> }
  )
  ```

**3. Create `src/components/booking/calendly-popup.tsx`** -- Popup button for service CTAs:

```typescript
'use client'

import { PopupButton } from 'react-calendly'
```

Props: `{ url?: string; text?: string; className?: string }`

- Reads Calendly URL from prop or env var.
- Renders `<PopupButton url={calendlyUrl} text={text ?? 'Book a Consultation'} rootElement={document.body} />`.
- Must handle SSR: guard with `typeof window !== 'undefined'` check or use dynamic import.
- Style the button to match the site's secondary button appearance. The PopupButton accepts a `className` prop -- apply the same classes as the shadcn outline Button variant: `inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground`.

**4. Modify `src/app/contact/page.tsx`** -- add Calendly booking section:

Import CalendlyInline dynamically (with `ssr: false`).

Add a new section below the existing form/trust-signals grid:

```tsx
{/* Booking section */}
<Section background="muted">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
      Prefer to Book Directly?
    </h2>
    <p className="mt-3 text-muted-foreground">
      Skip the form and schedule a free 30-minute consultation at a time that suits you.
    </p>
  </div>
  <div className="mt-8 mx-auto max-w-3xl">
    <CalendlyInline />
  </div>
</Section>
```

Also add a text link in the trust signals column (right side) above the "Contact details" section:
```tsx
<div className="rounded-lg border bg-primary/5 p-5">
  <p className="text-sm font-medium">
    Prefer to book directly?{' '}
    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#booking'} className="text-primary underline">
      Schedule a free consultation
    </a>
  </p>
</div>
```

Or, link to the `#booking` section on the same page if using an inline widget below the form.

**5. Modify `src/components/sections/service-cta.tsx`** -- add optional secondary booking button:

Add optional props:
```typescript
interface ServiceCtaProps {
  heading: string
  description: string
  buttonText: string
  buttonHref?: string
  showBooking?: boolean  // NEW
  bookingText?: string   // NEW
}
```

When `showBooking` is true, render a secondary button alongside the primary CTA:
```tsx
<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
  <Button asChild size="lg">
    <Link href={buttonHref}>{buttonText}</Link>
  </Button>
  {showBooking && (
    <Button asChild size="lg" variant="outline" className="border-neutral-600 text-white hover:bg-white/10 hover:text-white">
      <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact#booking'}>
        {bookingText ?? 'Book a Consultation'}
      </a>
    </Button>
  )}
</div>
```

Do NOT import react-calendly PopupButton in ServiceCta (it's a server component). Instead, use a plain link to the Calendly URL or to `/contact#booking`.

### Acceptance Criteria

- [ ] `react-calendly` installed and in package.json
- [ ] `src/components/booking/calendly-inline.tsx` renders Calendly InlineWidget when URL is configured
- [ ] `src/components/booking/calendly-popup.tsx` renders Calendly PopupButton with site-consistent styling
- [ ] Contact page shows Calendly inline widget in a "Prefer to Book Directly?" section below the form
- [ ] Contact page trust signals column has a "book directly" link
- [ ] `ServiceCta` accepts optional `showBooking` prop to show a secondary booking button
- [ ] No SSR/hydration errors -- Calendly components loaded with `ssr: false` or guarded
- [ ] Graceful fallback when `NEXT_PUBLIC_CALENDLY_URL` is not set (no crash, shows placeholder or link)
- [ ] `npm run build` succeeds

---

## Prompt 4: CRO -- Contact Page Optimisation

**Requirements:** CRO-01, CRO-05 (partial)
**Dependencies:** Prompt 2 (form must be wired), Prompt 3 (Calendly must be available)
**Files created/modified:**
- `src/app/contact/page.tsx` (modify -- CRO enhancements)

### Context

The contact page at `src/app/contact/page.tsx` is the primary Google Ads landing page. It already has:
- PageHeader with "Get in Touch"
- 5/3 grid: form left, trust signals right
- Trust points (4 bullet points with CheckCircle2 icons)
- Response time commitment ("1 business day")
- Contact details (phone, email, location)
- Client logos (5, greyscale with hover)
- Calendly booking section (added in Prompt 3)

CRO enhancements to apply based on research:

**Above the fold (most critical):**
- Replace generic "Get in Touch" PageHeader with a benefit-driven headline
- Add a clear value proposition sub-headline
- Ensure the form's first field (Name) is visible above the fold on desktop

**Form CRO:**
- Add micro-copy under the submit button: "No obligation. We respond within 1 business day."
- Add social proof near form: mention project count or client names
- Make Phone and Project Type clearly marked as optional with "(optional)" label text

**Trust signals (enhance existing):**
- Add project/experience metrics: "14+ projects delivered" or "$40M+ in projects managed"
- Strengthen the "Why choose Upscale?" section with more specific outcomes

### Actions

**1. Replace PageHeader with a custom hero-style header:**

Instead of the generic `PageHeader` with "Get in Touch", create an inline header section:

```tsx
{/* Custom hero for contact page -- benefit-driven headline */}
<section className="border-b bg-neutral-950 text-white">
  <Container>
    <div className="py-12 md:py-16">
      <nav className="mb-6 text-sm text-neutral-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span className="mx-2">/</span>
        <span>Contact</span>
      </nav>
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        Protect Your Next Project
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-300">
        Free 30-minute consultation with an experienced client-side project
        manager. No obligation, no sales pitch -- just practical advice
        for your project.
      </p>
    </div>
  </Container>
</section>
```

**2. Enhance the form area copy:**

Replace the current sub-heading:
- From: "Let's discuss your project"
- To: "Tell Us About Your Project" (or keep as-is -- it's already decent)

Add under the sub-heading:
```tsx
<p className="mt-1 text-sm text-muted-foreground">
  Takes under 2 minutes. We respond within 1 business day.
</p>
```

**3. Enhance trust points:**

Update the trustPoints array with more specific, outcome-driven copy:
```typescript
const trustPoints = [
  'Your interests represented, not the contractor\'s',
  'Architectural insight meets hands-on delivery',
  '14+ projects delivered across health, education & commercial',
  'Trusted by Sydney Water, NSW Ambulance & government clients',
]
```

**4. Add a metrics/social proof bar above or within the trust signals:**

```tsx
<div className="grid grid-cols-2 gap-4 rounded-lg border bg-muted/50 p-5">
  <div className="text-center">
    <p className="text-2xl font-bold text-primary">14+</p>
    <p className="text-xs text-muted-foreground">Projects Delivered</p>
  </div>
  <div className="text-center">
    <p className="text-2xl font-bold text-primary">5</p>
    <p className="text-xs text-muted-foreground">Sectors Served</p>
  </div>
</div>
```

**5. Enhance form field labels:**

Add "(optional)" text to Phone and Project Type labels:
```tsx
<Label htmlFor="contact-phone">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
```

**6. Enhance submit button area:**

Below the submit button, replace the privacy note with a more conversion-friendly message:
```tsx
<p className="text-center text-xs text-muted-foreground">
  No obligation. We respond within 1 business day. Your information is only used to respond to your enquiry.
</p>
```

### Acceptance Criteria

- [ ] Contact page has a benefit-driven headline ("Protect Your Next Project" or similar), not generic "Get in Touch"
- [ ] Value proposition sub-headline visible above the fold with clear next-step language
- [ ] Trust signals include specific metrics (project count, sectors)
- [ ] Phone and Project Type fields clearly marked as optional
- [ ] Micro-copy under submit button includes "No obligation" and response time
- [ ] Social proof metrics visible alongside the form (project count, sectors served)
- [ ] Page maintains responsive layout (form stacks above trust signals on mobile)
- [ ] `npm run build` succeeds

---

## Prompt 5: CRO -- Homepage & Service Pages

**Requirements:** CRO-02, CRO-03, CRO-04, CRO-05
**Dependencies:** Prompt 3 (ServiceCta needs `showBooking` prop -- if not available, add it here)
**Files created/modified:**
- `src/components/sections/hero.tsx` (modify -- strengthen CTA copy)
- `src/components/sections/homepage-cta.tsx` (modify -- benefit-driven copy + booking button)
- `src/components/sections/value-proposition.tsx` (modify -- outcome-driven copy)
- `src/app/page.tsx` (modify -- add mid-page CTA)
- `src/app/services/[slug]/page.tsx` (modify -- add mid-page CTA, enable booking on ServiceCta)
- `src/app/services/page.tsx` (modify -- strengthen CTA copy)
- `src/components/sections/service-cta.tsx` (modify -- if Prompt 3 hasn't added `showBooking`, add it here)

### Context

Currently, the homepage has:
- Hero with "Client-Side Project Management for Property & Construction" headline, "Start a Project" + "View Our Work" buttons
- ClientLogos
- ValueProposition ("Why Choose Upscale" with 3 cards)
- ServicesOverview (5 service cards)
- FeaturedCaseStudies (3 projects)
- HomepageCta ("Ready to Start Your Project?" with "Get in Touch" button)

Service pages have:
- Hero with background image, breadcrumbs
- Content sections (alternating backgrounds)
- ServiceBenefits grid
- Dual service model callout
- ServiceCta (service-specific heading + "Get in Touch")
- RelatedCaseStudies

CRO principles to apply:
1. **CTAs at every scroll depth** (CRO-05): One CTA per ~2 scroll heights. Currently homepage has CTA only at top (hero) and bottom (HomepageCta). Service pages only have CTA at bottom.
2. **Benefit-driven copy** (CRO-02, CRO-03): Replace generic headings with outcome-focused language. "Why Choose Upscale" -> specific outcomes.
3. **Problem-agitate-solve structure** (CRO-04): Service pages should lead with the problem before presenting the solution.
4. **Social proof placement** (CRO-02): Position proof elements (logos, stats) near decision points.

### Actions

**1. Modify `src/components/sections/hero.tsx`** -- strengthen sub-headline and CTA copy:

Update the sub-headline from generic description to a specific outcome:
```tsx
<p className="mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
  Stop overpaying contractors and missing critical issues. We sit on your
  side of the table -- protecting your budget, timeline, and quality from
  feasibility through to handover.
</p>
```

Update primary CTA from "Start a Project" to "Get a Free Consultation" (lower commitment, higher conversion).
Update secondary CTA from "View Our Work" to "See Our Projects" (more natural language).

**2. Modify `src/components/sections/value-proposition.tsx`** -- outcome-driven copy:

Update section heading:
```tsx
<h2>What You Get With a Client-Side PM</h2>
<p>Most developers hire the contractor's PM. That's like hiring the other side's lawyer.</p>
```

Update the three value props to be more problem/outcome driven:
- "Architectural Insight" -> "Catch Issues Before They Cost You" -- "Our architectural background means we see problems in drawings that most PMs miss. We catch coordination issues, buildability problems, and compliance gaps before they become expensive site variations."
- "Client-Side Focus" -> "Someone in Your Corner" -- "We represent you, not the contractor. Every progress claim reviewed, every variation challenged, every decision made with your investment protected."
- "End-to-End Coverage" -> "One Team, Start to Finish" -- "From feasibility and DA through tender, construction, and handover. No handoffs, no lost context, no starting over with someone new."

**3. Modify `src/components/sections/homepage-cta.tsx`** -- benefit-driven copy + dual CTA:

```tsx
<h2>Your Project Deserves Expert Representation</h2>
<p>
  Whether you are starting a new development or need help with a project
  already underway, we will give you straight answers in a free 30-minute
  consultation.
</p>
<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
  <Button asChild size="lg">
    <Link href="/contact">Send an Enquiry</Link>
  </Button>
  <Button asChild size="lg" variant="outline" className="border-neutral-600 text-white hover:bg-white/10 hover:text-white">
    <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact#booking'}>
      Book a Call
    </a>
  </Button>
</div>
```

Note: `HomepageCta` is currently a server component (no 'use client'). Since we're using a plain `<a>` link (not react-calendly PopupButton), it stays as a server component. Read the env var at render time.

**4. Modify `src/app/page.tsx`** -- add a mid-page CTA between ServicesOverview and FeaturedCaseStudies:

Create an inline CTA section (not a separate component -- it's specific to the homepage):

```tsx
<Hero />
<ClientLogos />
<ValueProposition />
<ServicesOverview services={services} />

{/* Mid-page CTA (CRO-05: CTA at every scroll depth) */}
<Section background="dark">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
      Not Sure What You Need?
    </h2>
    <p className="mt-3 text-neutral-300">
      Tell us about your project and we will recommend the right level of support.
    </p>
    <div className="mt-6">
      <Button asChild size="lg">
        <Link href="/contact">Get Free Advice</Link>
      </Button>
    </div>
  </div>
</Section>

<FeaturedCaseStudies caseStudies={caseStudies} />
<HomepageCta />
```

**5. Modify `src/app/services/[slug]/page.tsx`** -- add mid-page CTA and enable booking:

Add an inline CTA section between the content sections and ServiceBenefits:

```tsx
{/* Content sections */}
{service.sections.map((section, index) => (
  <Section key={section.heading} background={index % 2 === 0 ? 'default' : 'muted'}>
    {/* ... existing content ... */}
  </Section>
))}

{/* Mid-page CTA (CRO-05) */}
<Section background="dark">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
      Ready to Discuss {service.title}?
    </h2>
    <p className="mt-3 text-neutral-300">
      Get practical advice on your project from an experienced client-side PM.
    </p>
    <div className="mt-6">
      <Button asChild size="lg">
        <Link href="/contact">Get a Free Consultation</Link>
      </Button>
    </div>
  </div>
</Section>

<ServiceBenefits benefits={service.benefits} />
{/* ... rest of page ... */}
```

Update the bottom `<ServiceCta>` to include booking:
```tsx
<ServiceCta
  heading={service.ctaText}
  description={service.ctaDescription}
  buttonText="Send an Enquiry"
  showBooking={true}
  bookingText="Book a Call"
/>
```

Note: Change "Get in Touch" to "Send an Enquiry" (more specific, lower friction).

**6. Modify `src/app/services/page.tsx`** -- strengthen bottom CTA copy:

Replace the current bottom CTA:
```tsx
<Section background="dark">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
      Your Project Deserves Expert Representation
    </h2>
    <p className="mt-4 text-lg text-neutral-300">
      Tell us about your project and we will recommend the right service for
      your needs. Free 30-minute consultation, no obligation.
    </p>
    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <Button asChild size="lg">
        <Link href="/contact">Get a Free Consultation</Link>
      </Button>
    </div>
  </div>
</Section>
```

### Acceptance Criteria

- [ ] Homepage hero has outcome-driven sub-headline (mentions protecting budget/timeline, not just describing services)
- [ ] Homepage hero CTAs use lower-commitment language ("Get a Free Consultation", "See Our Projects")
- [ ] Value proposition section uses problem/outcome framing instead of feature-listing
- [ ] Homepage has a mid-page CTA between services and case studies (CRO-05)
- [ ] Homepage bottom CTA has dual buttons (enquiry + booking) with benefit-driven copy
- [ ] Each service page has a mid-page CTA between content sections and benefits (CRO-05)
- [ ] Each service page bottom CTA shows booking button alongside enquiry button
- [ ] Services index page has strengthened CTA copy
- [ ] All new CTA buttons link to valid destinations (/contact or Calendly URL)
- [ ] No broken layouts -- all changes responsive
- [ ] `npm run build` succeeds

---

## Prompt 6: HubSpot Email Automation Documentation & Final Verification

**Requirements:** HUB-04
**Dependencies:** Prompts 1-5 (all prior work must be complete)
**Files created/modified:**
- `docs/hubspot-setup.md` (create -- HubSpot dashboard configuration guide)

### Context

HUB-04 requires automated HubSpot email follow-up when a form is submitted. This is NOT a code task -- email workflows are configured in the HubSpot dashboard and cannot be created programmatically without Operations Hub Professional.

The work here is to:
1. Document the exact HubSpot dashboard steps the user needs to follow
2. Document the prerequisite HubSpot setup (form creation, custom properties)
3. Verify the entire Phase 4 integration end-to-end

### Actions

**1. Create `docs/hubspot-setup.md`** -- HubSpot configuration guide:

The document should cover:

**A. Prerequisites (HubSpot Dashboard)**

1. **Create HubSpot Account** (if not already done):
   - Sign up at app.hubspot.com
   - Free plan is sufficient for forms, basic workflows, and CRM

2. **Create a Private App** (for authenticated form submission):
   - Navigate to: Settings > Integrations > Private Apps > Create private app
   - App name: "UpScalePM Website"
   - Scopes: select `crm.objects.contacts.write` and `forms`
   - Copy the access token -> set as `HUBSPOT_ACCESS_TOKEN` in `.env.local`

3. **Create Custom Contact Property** `service_interest`:
   - Navigate to: Settings > Data Management > Properties > Contact properties
   - Click "Create property"
   - Group: "Contact information"
   - Label: "Service Interest"
   - Internal name: `service_interest` (auto-generated from label, verify it matches)
   - Field type: Dropdown select
   - Options: "Feasibility & Advisory", "Design Management", "DA Approval", "Tender Assessment", "Construction Superintendent", "Not sure yet"

4. **Create Form** in HubSpot:
   - Navigate to: Marketing > Forms > Create form > Embedded form
   - Form name: "Website Contact Form"
   - Add fields: First name (`firstname`), Email (`email`), Phone number (`phone`), Service Interest (`service_interest`), Message (`message`)
   - Note: The `message` field may need to be created as a custom property first (single-line or multi-line text)
   - After saving, copy the Form GUID from the URL or embed code -> set as `HUBSPOT_FORM_GUID` in `.env.local`

5. **Find Portal ID**:
   - Navigate to: Settings (gear icon) > Account Management
   - The portal ID (Hub ID) is shown at the top
   - Set as both `HUBSPOT_PORTAL_ID` and `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` in `.env.local`

**B. Email Automation Workflow**

6. **Create Follow-Up Email**:
   - Navigate to: Marketing > Email > Create email > Regular email
   - Subject: "Thank you for contacting UpScale Project Management"
   - From: info@upscalepm.com.au (or configured sending domain)
   - Content: Thank the contact, confirm receipt, set expectations ("We'll review your enquiry and respond within 1 business day"), include founder's name/signature
   - Save as template

7. **Create Workflow** (form submission auto-response):
   - Navigate to: Automation > Workflows > Create workflow > Contact-based
   - Enrollment trigger: "Contact has submitted form" = "Website Contact Form"
   - Action 1: Send email (the thank-you email created above)
   - Optional Action 2: Send internal notification email to team (info@upscalepm.com.au)
   - Optional Action 3: Create task ("Follow up with [contact name]" assigned to team member)
   - Turn workflow ON

**C. Environment Variables Summary**

```
HUBSPOT_PORTAL_ID=<your-portal-id>
HUBSPOT_FORM_GUID=<your-form-guid>
HUBSPOT_ACCESS_TOKEN=<your-private-app-token>
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=<your-portal-id>
NEXT_PUBLIC_CALENDLY_URL=<your-calendly-booking-url>
```

**D. Testing the Integration**

Steps to verify end-to-end:
1. Set real values in `.env.local`
2. Run `npm run dev`
3. Navigate to `/contact`
4. Submit the form with test data
5. Check HubSpot CRM: Contacts > search for test email
6. Verify: contact exists, all fields populated, form submission recorded on timeline
7. Verify: automated email sent to test email address
8. Check HubSpot Analytics: Reports > Analytics tools > Traffic analytics > verify page views are being tracked
9. Test UTM attribution: visit `/contact?utm_source=test&utm_medium=test&utm_campaign=test`, submit form, verify UTMs appear on contact record

**2. Final build verification:**

```bash
npm run build
```

Verify all pages build successfully with the new components.

### Acceptance Criteria

- [ ] `docs/hubspot-setup.md` exists with complete step-by-step HubSpot dashboard configuration
- [ ] Document covers: Private App creation, custom properties, form creation, workflow setup, env var configuration
- [ ] Document includes testing/verification steps for the end-to-end integration
- [ ] `npm run build` succeeds with all Phase 4 changes in place
- [ ] All 50+ static pages still generate correctly
- [ ] No TypeScript errors or build warnings related to new components

---

## Execution Order

Prompts 1 and 3 are independent and can run in parallel. Prompt 2 depends on Prompt 1 (UTM utilities). Prompt 4 depends on Prompts 2 and 3 (form wired + Calendly available). Prompt 5 depends on Prompt 3 (ServiceCta `showBooking` prop). Prompt 6 depends on all.

```
Wave 1 (parallel):
  Prompt 1: HubSpot Tracking & UTM Capture (HUB-02, HUB-03)
  Prompt 3: Calendly Booking Integration (HUB-05)

Wave 2 (parallel, depends on Wave 1):
  Prompt 2: Contact Form Server Action & HubSpot Wiring (HUB-01) -- needs Prompt 1
  Prompt 5: CRO -- Homepage & Service Pages (CRO-02, CRO-03, CRO-04, CRO-05) -- needs Prompt 3

Wave 3 (depends on Wave 2):
  Prompt 4: CRO -- Contact Page Optimisation (CRO-01, CRO-05 partial) -- needs Prompts 2 + 3

Wave 4 (depends on all):
  Prompt 6: HubSpot Email Automation Documentation & Final Verification (HUB-04)
```

## User Setup Required

Before executing these prompts, the following external setup is needed:

1. **HubSpot Account** -- Create at app.hubspot.com (free plan works)
2. **HubSpot Private App** -- Settings > Integrations > Private Apps (provides access token)
3. **HubSpot Form** -- Marketing > Forms > Create (provides form GUID)
4. **HubSpot Custom Property** -- `service_interest` dropdown (Settings > Properties)
5. **Calendly Account** -- Create at calendly.com, set up a 30-minute meeting type (provides booking URL)

These can be done AFTER prompts are executed -- the code gracefully degrades with placeholder env vars. But real testing requires real credentials.

## Phase Completion Checklist

When all 6 prompts are done, verify the phase success criteria:

1. **Form -> HubSpot works:** Submit the contact form with real HubSpot credentials. Verify contact appears in HubSpot CRM with all fields, UTM params, and page attribution.

2. **Contact page CRO:** Benefit-driven headline, minimal required fields (3), trust signals, social proof metrics, booking alternative, micro-copy under submit button.

3. **Homepage & service page CRO:** Outcome-driven headlines, problem/solution framing in value prop, CTAs at every scroll depth, dual CTA (enquiry + booking) at bottom.

4. **HubSpot tracking works:** Open browser Network tab, navigate between pages. HubSpot tracking script loads. `_hsq` calls fire on route changes.

5. **UTM persistence works:** Visit with `?utm_source=test`, navigate to another page, check sessionStorage still has UTMs. Submit form, verify UTMs in payload.

6. **Calendly booking works:** Contact page shows inline Calendly widget. Service page CTAs show booking button. Clicking opens Calendly.

7. **Email automation configured:** HubSpot workflow sends auto-response on form submission (requires HubSpot dashboard setup per docs/hubspot-setup.md).

8. **Build passes:** `npm run build` completes with zero errors. All pages still statically generate.
