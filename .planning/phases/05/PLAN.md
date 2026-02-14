# Phase 5: Analytics, Tracking & SEO

## Overview

5 prompts that install Google Tag Manager as the single tracking container, configure GA4 page view and event tracking, push form submission conversions to Google Ads and Meta Pixel via the dataLayer, add JSON-LD structured data across all page types, audit metadata completeness, and verify Core Web Vitals after all changes. After this phase, every page view, form submission, and ad conversion is tracked across GA4, Google Ads, Meta Pixel, and HubSpot with unified UTM attribution, and all technical SEO is production-ready.

**Requirements covered:** TRACK-01, TRACK-02, TRACK-03, TRACK-04, TRACK-05, SEO-02, SEO-03, SEO-04, SEO-06

**Estimated effort:** ~2-3 hours Claude execution time across all prompts.

**Must-Haves (Goal-Backward Derivation):**

Goal: "Full measurement infrastructure is live -- every page view, form submission, and ad conversion is tracked across GA4, Google Ads, Meta Pixel, and HubSpot with unified UTM attribution. All technical SEO is production-ready."

Observable truths:
1. Google Tag Manager container is installed and GA4 reports page views for every page, including client-side navigations
2. A contact form submission registers as a conversion in both Google Ads and GA4, with UTM source/medium/campaign correctly attributed
3. Meta Pixel fires on page load and tracks standard events, visible in Meta Events Manager
4. Every page has unique title, meta description, canonical URL, and appropriate JSON-LD structured data (LocalBusiness, Service, Article, or FAQPage as relevant)
5. Sitemap.xml and robots.txt are accessible, and Lighthouse scores meet Core Web Vitals targets (LCP < 2.5s, CLS < 0.1, INP < 200ms) on all key pages

Required artifacts:
- `src/components/analytics/gtm-script.tsx` -- Client component: GTM `<Script>` tag + noscript fallback
- `src/components/analytics/gtm-event.ts` -- Typed dataLayer push helpers for conversions
- `src/components/seo/json-ld.tsx` -- Reusable JSON-LD renderer component
- `src/components/seo/schemas.ts` -- Schema generators: localBusinessSchema(), serviceSchema(), articleSchema(), faqSchema()
- `src/app/layout.tsx` -- Modified to include GTMScript component
- `src/components/forms/contact-form.tsx` -- Modified to push `form_submission` to dataLayer on success
- `src/app/page.tsx` -- Modified with explicit metadata export + LocalBusiness JSON-LD
- Multiple page files -- Modified to include JSON-LD structured data
- `.env.local` / `.env.example` -- Updated with GTM and Meta Pixel env vars

Key links:
- GTMScript -> `NEXT_PUBLIC_GTM_ID` env var (if broken: no tracking at all -- GA4, Ads, Meta Pixel all silent)
- ContactForm -> trackFormSubmission -> `dataLayer.push({ event: 'form_submission' })` (if broken: form works but no conversions tracked in GA4/Ads/Meta)
- GTM container -> GA4 tag triggered by All Pages (if broken: no page views in GA4)
- GTM container -> Ads Conversion tag triggered by `form_submission` (if broken: no conversion data in Google Ads)
- GTM container -> Meta Pixel tags triggered by All Pages + `form_submission` (if broken: no Meta Pixel data)
- JsonLd component -> schema generators (if broken: no structured data in search results)
- Homepage page.tsx -> metadata export (if broken: homepage has no canonical URL)

---

## Prompt 1: GTM Container Script & DataLayer Event Utilities

**Requirements:** TRACK-01, TRACK-02
**Dependencies:** None
**Files created/modified:**
- `src/components/analytics/gtm-script.tsx` (create)
- `src/components/analytics/gtm-event.ts` (create)
- `src/app/layout.tsx` (modify -- add GTMScript)
- `.env.local` (modify -- add GTM env var)
- `.env.example` (modify -- add GTM env var)

### Context

The root layout at `src/app/layout.tsx` currently renders Header, main content, Footer, HubSpotTracker, and UTMProvider. No Google Tag Manager or GA4 tracking is installed. The site uses Next.js 16.1.6 App Router with client-side navigation, so GA4's enhanced measurement (History Change detection) will handle SPA page view tracking automatically -- no custom page view code is needed.

GTM is the single container that will manage GA4, Google Ads conversion tracking, and Meta Pixel. Only one script tag (GTM) needs to be injected into the page. All other tracking platforms are configured as tags within the GTM dashboard.

The `<noscript>` fallback iframe is required by GTM's installation instructions for JavaScript-disabled browsers. It should be placed immediately after the opening `<body>` tag.

**Environment variable required:** `NEXT_PUBLIC_GTM_ID` -- the GTM container ID (format: GTM-XXXXXXX). This is a public value visible in page source.

GA4's enhanced measurement, configured in the GA4 property settings and enabled via the GA4 Configuration tag in GTM, automatically detects History API changes in SPAs. This means Next.js client-side navigations (via `<Link>`) are tracked as page views without any custom code. Do NOT push manual `page_view` events to dataLayer -- this would double-count page views.

### Actions

**1. Create `src/components/analytics/gtm-script.tsx`** -- Client component that loads Google Tag Manager:

```typescript
'use client'

import Script from 'next/script'
```

The component:
- Reads `process.env.NEXT_PUBLIC_GTM_ID`.
- If the GTM ID is not set or equals `'REPLACE_ME'`, renders `null` (graceful degradation in development).
- Otherwise renders two elements:
  1. A `<Script>` with `id="gtm-script"`, `strategy="afterInteractive"`, and `dangerouslySetInnerHTML` containing the standard GTM snippet. The snippet initializes `window.dataLayer`, pushes the `gtm.start` event, and loads the GTM script asynchronously from `https://www.googletagmanager.com/gtm.js`.
  2. A `<noscript>` block containing an `<iframe>` pointing to `https://www.googletagmanager.com/ns.html?id=${gtmId}` with `height="0"`, `width="0"`, and `style={{ display: 'none', visibility: 'hidden' }}`.

CRITICAL: Use `strategy="afterInteractive"` (not `beforeInteractive`) to avoid blocking First Contentful Paint. The `afterInteractive` strategy loads GTM after hydration, preventing any render-blocking impact.

**2. Create `src/components/analytics/gtm-event.ts`** -- Typed dataLayer push utility:

```typescript
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}
```

Two exported functions:
- `pushToDataLayer(event: string, data?: Record<string, unknown>): void` -- Guards with `typeof window === 'undefined'` check, initializes `window.dataLayer` if needed, and pushes `{ event, ...data }`.
- `trackFormSubmission(formName: string): void` -- Calls `pushToDataLayer('form_submission', { form_name: formName, form_destination: 'hubspot' })`. This is the specific event that GTM triggers on for GA4 events, Google Ads conversions, and Meta Pixel Lead events.

Both functions are safe to call on the server (they no-op) and in environments where GTM is not loaded (events are queued in dataLayer).

**3. Modify `src/app/layout.tsx`** -- Add GTMScript to the root layout:

Add import:
```typescript
import { GTMScript } from '@/components/analytics/gtm-script'
```

Place `<GTMScript />` inside `<body>`, before `<Header />`. The noscript iframe should be as close to the opening `<body>` tag as possible per GTM installation instructions. The layout body should become:

```tsx
<body className="flex min-h-screen flex-col font-sans antialiased">
  <GTMScript />
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
  <HubSpotTracker />
  <UTMProvider />
</body>
```

**4. Update `.env.local`** -- Add GTM placeholder:

```env
NEXT_PUBLIC_GTM_ID=REPLACE_ME
```

**5. Update `.env.example`** -- Document the new env var:

Add to the file:
```env
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=

# Meta Pixel (for noscript fallback)
NEXT_PUBLIC_META_PIXEL_ID=
```

### Acceptance Criteria

- [ ] `src/components/analytics/gtm-script.tsx` renders GTM script with `afterInteractive` strategy and noscript iframe fallback
- [ ] `src/components/analytics/gtm-event.ts` exports `pushToDataLayer` and `trackFormSubmission` with proper TypeScript types
- [ ] `src/app/layout.tsx` includes `<GTMScript />` before the Header
- [ ] `.env.local` and `.env.example` include `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] Dev server loads without errors when `NEXT_PUBLIC_GTM_ID` is `REPLACE_ME` (graceful degradation -- no GTM script injected)
- [ ] `npm run build` succeeds with no errors
- [ ] When a real GTM ID is set, the GTM script appears in page source (verify in browser DevTools Network tab for `gtm.js`)

---

## Prompt 2: Contact Form DataLayer Integration (Conversion Events)

**Requirements:** TRACK-03, TRACK-05
**Dependencies:** Prompt 1 (gtm-event.ts must exist)
**Files created/modified:**
- `src/components/forms/contact-form.tsx` (modify -- add dataLayer push on success)

### Context

The contact form at `src/components/forms/contact-form.tsx` is a `'use client'` component using react-hook-form + zod. On successful submission, it calls `submitContactForm()` Server Action which POSTs to HubSpot, then sets `status` to `'success'` and resets the form. UTM parameters from sessionStorage are already included in the HubSpot submission.

For Google Ads and GA4 conversion tracking, the form must push a `form_submission` event to `window.dataLayer` when the submission succeeds. This event is what GTM triggers on to fire the GA4 `generate_lead` event tag, the Google Ads Conversion tag, and the Meta Pixel Lead event tag. The dataLayer push happens on the client side (the contact form component), not in the Server Action.

UTM attribution flows through two channels simultaneously:
1. **HubSpot:** UTM params from sessionStorage are sent directly via the Server Action (already implemented in Phase 4)
2. **GA4/Google Ads:** UTM parameters are automatically captured by GA4 from the page URL on the initial landing. No additional code needed -- GA4 reads `utm_source`, `utm_medium`, `utm_campaign` from the URL and associates them with the user session.

So TRACK-05 (UTM tracking across GA4, HubSpot, and Google Ads) is already satisfied by the combination of Phase 4's HubSpot UTM handling and GA4's built-in UTM capture. No additional code is needed for UTM in this prompt.

### Actions

**1. Modify `src/components/forms/contact-form.tsx`** -- Add dataLayer push on successful submission:

Add import at the top:
```typescript
import { trackFormSubmission } from '@/components/analytics/gtm-event'
```

In the `onSubmit` handler, after `if (result.success) {`, add the dataLayer push BEFORE `setStatus('success')`:

```typescript
if (result.success) {
  trackFormSubmission('contact_form')
  setStatus('success')
  reset()
}
```

This pushes `{ event: 'form_submission', form_name: 'contact_form', form_destination: 'hubspot' }` to `window.dataLayer`. GTM picks this up and fires:
- GA4 event tag: `generate_lead` event with `form_name` parameter
- Google Ads conversion tag: conversion with configured Conversion ID + Label
- Meta Pixel event tag: `fbq('track', 'Lead')`

The `trackFormSubmission` function is safe to call even when GTM is not loaded -- it just pushes to the array, and GTM will process it when it initializes (or ignore it if GTM never loads in development).

### Acceptance Criteria

- [ ] `src/components/forms/contact-form.tsx` imports `trackFormSubmission` from `@/components/analytics/gtm-event`
- [ ] On successful form submission, `trackFormSubmission('contact_form')` is called before `setStatus('success')`
- [ ] The `form_submission` event with `form_name: 'contact_form'` and `form_destination: 'hubspot'` appears in `window.dataLayer` after successful submission (verify in browser DevTools console: `window.dataLayer`)
- [ ] Existing form functionality is unchanged -- validation, HubSpot submission, UTM inclusion, success/error states all work as before
- [ ] `npm run build` succeeds

---

## Prompt 3: JSON-LD Structured Data Components & Schema Generators

**Requirements:** SEO-03
**Dependencies:** None (independent of tracking prompts)
**Files created/modified:**
- `src/components/seo/json-ld.tsx` (create)
- `src/components/seo/schemas.ts` (create)
- `src/app/page.tsx` (modify -- add LocalBusiness JSON-LD)
- `src/app/about/page.tsx` (modify -- add LocalBusiness JSON-LD)
- `src/app/contact/page.tsx` (modify -- add LocalBusiness JSON-LD)
- `src/app/services/page.tsx` (modify -- add LocalBusiness JSON-LD)
- `src/app/services/[slug]/page.tsx` (modify -- add Service JSON-LD)
- `src/app/insights/[slug]/page.tsx` (modify -- add Article JSON-LD)
- `src/app/case-studies/[slug]/page.tsx` (modify -- add Article JSON-LD)
- `src/lib/content.types.ts` (modify -- add optional `date` field to CaseStudyFrontmatter)

### Context

JSON-LD structured data helps search engines understand page content and enables rich results (knowledge panels, enhanced listings). The `schema-dts` package (v1.1.5) is already installed and provides TypeScript types for all Schema.org vocabularies. JSON-LD is rendered as a `<script type="application/ld+json">` tag in the page body -- this has zero performance impact (search engines parse it, browsers ignore it for rendering).

Each page type gets its appropriate schema:
- **LocalBusiness** on homepage, about, contact, and services index -- describes UpScalePM as a local business with name, address, phone, service area, and founder
- **Service** on individual service pages -- describes each service with name, description, provider, and area served
- **Article** on insights and case studies -- describes content with headline, date, author, and publisher

Case studies currently have no `date` field in their frontmatter (`CaseStudyFrontmatter`). An optional `date` field should be added to support the Article schema's `datePublished` property. Existing case studies can use a fallback date if the field is not set.

Business contact details for JSON-LD:
- Name: Upscale Project Management
- Phone: Check the footer component for the actual phone number
- Email: Check the footer component for the actual email
- Location: Sydney, NSW, Australia
- Area served: Sydney, Newcastle
- Founder: Noel Yaxley, Founder & Principal

### Actions

**1. Create `src/components/seo/json-ld.tsx`** -- Reusable JSON-LD renderer:

```typescript
import type { Thing, WithContext } from 'schema-dts'

interface JsonLdProps {
  data: WithContext<Thing>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

This is a server component (no `'use client'` directive). It renders a `<script>` tag with the JSON-LD data serialized as JSON. It can be placed anywhere in a page component's JSX.

**2. Create `src/components/seo/schemas.ts`** -- Schema generator functions:

Define `SITE_URL = 'https://upscalepm.com.au'`.

Export four functions:

a) `localBusinessSchema(): WithContext<LocalBusiness>` -- Returns the LocalBusiness schema with:
- `@context: 'https://schema.org'`
- `@type: 'LocalBusiness'`
- `name: 'Upscale Project Management'`
- `description: 'Client-side project management for property and construction projects in Sydney and Newcastle.'`
- `url: SITE_URL`
- `telephone` -- Use the actual phone number from the footer component
- `email` -- Use the actual email from the footer component
- `address: { @type: 'PostalAddress', addressLocality: 'Sydney', addressRegion: 'NSW', addressCountry: 'AU' }`
- `areaServed: [{ @type: 'City', name: 'Sydney' }, { @type: 'City', name: 'Newcastle' }]`
- `founder: { @type: 'Person', name: 'Noel Yaxley', jobTitle: 'Founder & Principal' }`
- `image: '${SITE_URL}/images/og-default.jpg'`
- `priceRange: '$$'`

b) `serviceSchema(service: { title: string; description: string; slug: string }): WithContext<Service>` -- Returns:
- `@type: 'Service'`
- `name: service.title`
- `description: service.description`
- `url: '${SITE_URL}/services/${service.slug}'`
- `provider: { @type: 'LocalBusiness', name: 'Upscale Project Management', url: SITE_URL }`
- `areaServed: [Sydney, Newcastle]`
- `serviceType: 'Project Management'`

c) `articleSchema(article: { title: string; excerpt: string; slug: string; date: string; updated?: string; author: string; heroImage: string; path: string }): WithContext<Article>` -- Returns:
- `@type: 'Article'`
- `headline: article.title`
- `description: article.excerpt`
- `url: '${SITE_URL}${article.path}'`
- `datePublished: article.date`
- `dateModified: article.updated ?? article.date`
- `author: { @type: 'Person', name: article.author }`
- `publisher: { @type: 'Organization', name: 'Upscale Project Management', url: SITE_URL }`
- `image: article.heroImage.startsWith('http') ? article.heroImage : '${SITE_URL}${article.heroImage}'`

d) `faqSchema(questions: Array<{ question: string; answer: string }>): WithContext<FAQPage>` -- Returns:
- `@type: 'FAQPage'`
- `mainEntity: questions.map(q => ({ @type: 'Question', name: q.question, acceptedAnswer: { @type: 'Answer', text: q.answer } }))`

Import types from `schema-dts`: `WithContext`, `LocalBusiness`, `Service`, `Article`, `FAQPage`.

**3. Modify `src/lib/content.types.ts`** -- Add optional `date` field to CaseStudyFrontmatter:

Add `date?: string` to the `CaseStudyFrontmatter` interface. This is optional so existing case studies without the field continue to work. When present, it is used for the Article JSON-LD `datePublished` property. When absent, use `'2024-01-01'` as a fallback date (approximate WordPress site era).

**4. Add JSON-LD to page files:**

For each page, add the `JsonLd` component import and the appropriate schema. Place the `<JsonLd data={...} />` component at the top of the returned JSX (before other content). This is a server component, so it renders inline with no hydration cost.

a) **`src/app/page.tsx` (homepage)** -- Add `<JsonLd data={localBusinessSchema()} />` as the first child of the fragment.

b) **`src/app/about/page.tsx`** -- Add `<JsonLd data={localBusinessSchema()} />` at the top of the returned JSX.

c) **`src/app/contact/page.tsx`** -- Add `<JsonLd data={localBusinessSchema()} />` at the top of the returned JSX.

d) **`src/app/services/page.tsx`** -- Add `<JsonLd data={localBusinessSchema()} />` at the top of the returned JSX.

e) **`src/app/services/[slug]/page.tsx`** -- Add Service JSON-LD using the service's title, description, and slug:
```typescript
<JsonLd data={serviceSchema({ title: service.title, description: service.description, slug: service.slug })} />
```

f) **`src/app/insights/[slug]/page.tsx`** -- Add Article JSON-LD using the insight's frontmatter:
```typescript
<JsonLd data={articleSchema({
  title: insight.frontmatter.title,
  excerpt: insight.frontmatter.excerpt,
  slug: insight.slug,
  date: insight.frontmatter.date,
  updated: insight.frontmatter.updated,
  author: insight.frontmatter.author,
  heroImage: insight.frontmatter.heroImage,
  path: `/insights/${insight.slug}`,
})} />
```

g) **`src/app/case-studies/[slug]/page.tsx`** -- Add Article JSON-LD using the case study's frontmatter:
```typescript
<JsonLd data={articleSchema({
  title: study.frontmatter.title,
  excerpt: study.frontmatter.excerpt,
  slug: study.slug,
  date: study.frontmatter.date ?? '2024-01-01',
  author: 'Noel Yaxley',
  heroImage: study.frontmatter.heroImage,
  path: `/case-studies/${study.slug}`,
})} />
```
Note: Case studies use `'Noel Yaxley'` as author and a fallback date if `date` is not in frontmatter.

### Acceptance Criteria

- [ ] `src/components/seo/json-ld.tsx` exports `JsonLd` component that renders valid `<script type="application/ld+json">` tag
- [ ] `src/components/seo/schemas.ts` exports `localBusinessSchema()`, `serviceSchema()`, `articleSchema()`, `faqSchema()` with correct Schema.org types
- [ ] `CaseStudyFrontmatter` in `src/lib/content.types.ts` has an optional `date?: string` field
- [ ] Homepage, about, contact, and services index pages include LocalBusiness JSON-LD
- [ ] Individual service pages include Service JSON-LD with dynamic title, description, and slug
- [ ] Individual insight pages include Article JSON-LD with dates, author, and hero image
- [ ] Individual case study pages include Article JSON-LD with fallback date when `date` field is absent
- [ ] All JSON-LD output is valid JSON when viewed in page source (no unescaped characters, no missing fields)
- [ ] `npm run build` succeeds
- [ ] JSON-LD is visible in page source (View Source in browser, search for `application/ld+json`)

---

## Prompt 4: Homepage Metadata & Metadata Audit

**Requirements:** SEO-02
**Dependencies:** None (independent of other prompts)
**Files created/modified:**
- `src/app/page.tsx` (modify -- add explicit metadata export)

### Context

Every page in the site exports metadata via `generatePageMetadata()` or a manual `metadata` export -- EXCEPT the homepage (`src/app/page.tsx`). The homepage currently has no `metadata` export, so it falls through to the root layout's default metadata. This means:
- Title: "UpScalePM | Client-Side Project Management" (from layout template default) -- acceptable but not optimized
- Description: "Client-side project management for property and construction..." (from layout default) -- acceptable
- Canonical URL: NOT set -- the homepage has no explicit canonical, which is an SEO gap

The root layout's `metadataBase` provides the base URL for relative paths, but canonical URLs only generate when a page explicitly sets `alternates.canonical` via `generatePageMetadata()`.

All other pages are covered:

| Page | Status | Notes |
|------|--------|-------|
| `/` (homepage) | MISSING | No metadata export. Needs `generatePageMetadata()` call |
| `/about` | Complete | Has `generatePageMetadata({ title: 'About', ... })` |
| `/contact` | Complete | Has `generatePageMetadata({ title: 'Contact', ... })` |
| `/services` | Complete | Has `generatePageMetadata({ title: 'Services', ... })` |
| `/services/[slug]` | Complete | Dynamic `generateMetadata()` per service |
| `/case-studies` | Complete | Has `generatePageMetadata()` call |
| `/case-studies/[slug]` | Complete | Dynamic `generateMetadata()` per study |
| `/insights` | Complete | Has `generatePageMetadata()` call |
| `/insights/[slug]` | Complete | Dynamic `generateMetadata()` per insight, includes article OG type |
| `/privacy-policy` | Complete | Has `generatePageMetadata()` call |
| `/terms-and-conditions` | Complete | Has `generatePageMetadata()` call |
| `/design-system` | Complete | Has `robots: { index: false }` -- intentionally hidden |

### Actions

**1. Add explicit metadata export to `src/app/page.tsx`:**

Add import at top:
```typescript
import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
```

Add metadata export before the `Home` component:
```typescript
export const metadata: Metadata = generatePageMetadata({
  title: 'Client-Side Project Management Sydney & Newcastle',
  description:
    'Upscale Project Management delivers expert client-side PM for property and construction. Feasibility, design management, DA approval, tender assessment, and construction superintendent services across Sydney and Newcastle.',
  path: '/',
})
```

This ensures:
- A homepage-specific title appears in search results (more descriptive than the layout default)
- The canonical URL `https://upscalepm.com.au/` is explicitly set
- OG tags use the homepage-specific title and description
- The title template from the layout applies: "Client-Side Project Management Sydney & Newcastle | UpScalePM"

Note: The title deliberately includes location keywords ("Sydney & Newcastle") for local SEO. The description includes key service names for keyword coverage.

### Acceptance Criteria

- [ ] `src/app/page.tsx` exports `metadata` using `generatePageMetadata()` with title, description, and `path: '/'`
- [ ] Viewing the homepage source shows `<link rel="canonical" href="https://upscalepm.com.au/" />` (or equivalent in head)
- [ ] The homepage `<title>` tag contains the specific title, not just the layout default
- [ ] `npm run build` succeeds
- [ ] Every page in the site now has an explicit metadata export (no pages relying solely on layout defaults for title/description/canonical)

---

## Prompt 5: Sitemap/Robots Verification & Core Web Vitals Audit

**Requirements:** SEO-04, SEO-06
**Dependencies:** Prompts 1-4 (all changes must be in place to measure final CWV impact)
**Files created/modified:**
- `src/app/sitemap.ts` (verify -- may need minor adjustments)
- `src/app/robots.ts` (verify -- may need minor adjustments)

### Context

The sitemap (`src/app/sitemap.ts`) and robots.txt (`src/app/robots.ts`) were created in Phase 1 and are already functional. The sitemap dynamically generates entries for all static pages, service pages, case studies, and insights using `getAllServices()`, `getAllCaseStudies()`, and `getAllInsights()`. The robots.ts disallows `/design-system` and points to the sitemap URL.

This prompt verifies both are still correct after all Phase 3-5 changes, and runs a Core Web Vitals audit to measure the impact of GTM script addition.

Phase 5 added:
- GTM script (afterInteractive strategy) -- potential impact on TTI (+100-200ms)
- JSON-LD script tags -- zero rendering impact
- DataLayer push utility -- zero rendering impact
- Homepage metadata export -- zero rendering impact

No visible UI elements were added, so CLS risk is zero.

### Actions

**1. Verify sitemap.ts output:**

Run `npm run dev` and visit `localhost:3000/sitemap.xml`. Verify:
- Homepage entry with `priority: 1.0`
- All static pages present: `/services`, `/case-studies`, `/insights`, `/about`, `/contact`, `/privacy-policy`, `/terms-and-conditions`
- All service pages present (5 services: `feasibility-advisory`, `design-management`, `da-approval`, `tender-assessment`, `construction-superintendent`)
- All published case study pages present
- All published insight pages present
- No `/design-system` entry in sitemap
- All URLs use `https://upscalepm.com.au` as base

If any pages are missing, update `sitemap.ts` to include them.

**2. Verify robots.ts output:**

Visit `localhost:3000/robots.txt`. Verify:
- `User-agent: *` rule allows `/`
- `/design-system` is disallowed
- Sitemap URL points to `https://upscalepm.com.au/sitemap.xml`

**3. Run Core Web Vitals baseline:**

Run Lighthouse in Chrome DevTools (Performance audit, mobile simulation) on these key pages:
- `/` -- Homepage
- `/contact` -- Google Ads landing page (highest priority for fast load)
- `/services/feasibility-advisory` -- Representative service page
- One insight page -- Representative content page

For each page, record:
- LCP (target: < 2.5s)
- CLS (target: < 0.1)
- INP (target: < 200ms)
- Performance score

**4. Verify GTM does not degrade CWV beyond targets:**

If any metric exceeds its target:
- Check if GTM script is the cause (Lighthouse "Reduce impact of third-party code" section)
- If GTM causes LCP > 2.5s, consider switching from `afterInteractive` to `lazyOnload` strategy
- If CLS > 0.1, investigate what is shifting (should not be GTM-related since no visible elements are added)
- If Performance score drops significantly (>10 points), document the cause

**5. Build verification:**

Run `npm run build` and verify:
- Build completes without errors
- No warnings about missing metadata or structured data
- Static pages generate correctly

**6. Document results:**

Create a brief summary of CWV scores in the commit message or as inline comments. This provides a baseline for Phase 6 (Animation) which will add GSAP -- a more significant performance consideration.

### Acceptance Criteria

- [ ] `localhost:3000/sitemap.xml` returns valid XML with entries for all published pages
- [ ] `localhost:3000/robots.txt` returns valid robots directives with sitemap reference
- [ ] Sitemap includes homepage, all static pages, all service pages, all published case studies, and all published insights
- [ ] Sitemap does NOT include `/design-system`
- [ ] Lighthouse Performance audit passes Core Web Vitals targets on all key pages: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] `npm run build` completes without errors
- [ ] If any CWV metric fails, the cause is identified and either fixed or documented with a mitigation plan

---

## Execution Order

Prompts 1-2 are sequential (form event depends on GTM utilities). Prompts 3-4 are independent of tracking and can run in parallel with 1-2. Prompt 5 must run last to capture the full CWV impact of all changes.

```
Prompt 1: GTM Container Script + DataLayer Utilities
  |
  v
Prompt 2: Contact Form DataLayer Integration       Prompt 3: JSON-LD Components + Schema Generators
  |                                                   |
  |                                                 Prompt 4: Homepage Metadata Audit
  |                                                   |
  +---------------------------------------------------+
  |
  v
Prompt 5: Sitemap/Robots Verification + CWV Audit (LAST -- captures all impact)
```

Wave assignment for parallel execution:
- **Wave 1:** Prompt 1 (GTM foundation) + Prompt 3 (JSON-LD, independent) + Prompt 4 (metadata, independent)
- **Wave 2:** Prompt 2 (depends on Prompt 1)
- **Wave 3:** Prompt 5 (depends on all)

NOTE: Prompt 3 and 4 both modify `src/app/page.tsx`. If running in parallel, Prompt 4's metadata export and Prompt 3's JSON-LD must be merged. Safer to run Prompt 3 first, then Prompt 4 (or combine them). Alternatively, the executor can handle the merge.

Revised wave assignment (safe for file conflicts):
- **Wave 1:** Prompt 1 (GTM foundation)
- **Wave 2:** Prompt 2 (form events) + Prompt 3 (JSON-LD) -- these modify different files
- **Wave 3:** Prompt 4 (homepage metadata -- modifies page.tsx which Prompt 3 already touched)
- **Wave 4:** Prompt 5 (verification -- must be last)

## GTM Dashboard Configuration Guide

This section documents the GTM container configuration that must be done in the GTM web UI (tagmanager.google.com) AFTER the code is deployed. This is NOT code -- it is dashboard work.

### Prerequisites (human tasks before deployment)
1. Create a Google Tag Manager account and container for upscalepm.com.au -- note the GTM container ID (GTM-XXXXXXX) and set it in `NEXT_PUBLIC_GTM_ID`
2. Create a Google Analytics 4 property and note the Measurement ID (G-XXXXXXXXXX)
3. Create a Google Ads conversion action for "Lead" -- note the Conversion ID and Conversion Label
4. Create a Meta Business Suite account and Meta Pixel -- note the Pixel ID

### GTM Tags to Configure

| Tag Name | Tag Type | Trigger | Configuration |
|----------|----------|---------|---------------|
| GA4 Configuration | GA4 Configuration | All Pages | Measurement ID = G-XXXXXXXXXX. Enable enhanced measurement. |
| GA4 - Form Submission | GA4 Event | form_submission (custom event) | Event name = `generate_lead`. Parameters: `form_name` = {{DLV - form_name}} |
| Google Ads Conversion - Lead | Google Ads Conversion Tracking | form_submission (custom event) | Conversion ID + Conversion Label from Ads account |
| Google Ads Remarketing | Google Ads Remarketing | All Pages | Conversion ID from Ads account |
| Meta Pixel - Base | Custom HTML | All Pages | Standard Meta Pixel base code: `fbq('init', 'PIXEL_ID')` and `fbq('track', 'PageView')` |
| Meta Pixel - Lead | Custom HTML | form_submission (custom event) | `fbq('track', 'Lead')` |

### GTM Triggers to Configure

| Trigger Name | Trigger Type | Configuration |
|-------------|-------------|---------------|
| All Pages | Page View | All page views (built-in) |
| form_submission | Custom Event | Event name = `form_submission` |

### GTM Variables to Configure

| Variable Name | Variable Type | Configuration |
|--------------|---------------|---------------|
| DLV - form_name | Data Layer Variable | Data Layer Variable Name = `form_name` |

## Phase Completion Checklist

When all 5 prompts are done, verify:

- [ ] GTM script loads on all pages (check Network tab for `gtm.js` request)
- [ ] GA4 reports page views (verify in GA4 Realtime report with real GTM ID configured)
- [ ] Contact form submission pushes `form_submission` event to `dataLayer` (check `window.dataLayer` in console)
- [ ] Google Ads conversion tag fires on form submission (verify in GTM Preview/Debug mode)
- [ ] Meta Pixel fires PageView on all pages and Lead on form submission (verify in Meta Events Manager)
- [ ] Every page has unique title, meta description, and canonical URL (view source on each page)
- [ ] Homepage has explicit metadata with canonical URL set to `https://upscalepm.com.au/`
- [ ] JSON-LD `<script type="application/ld+json">` visible in page source for: homepage (LocalBusiness), service pages (Service), insight pages (Article), case study pages (Article)
- [ ] `localhost:3000/sitemap.xml` returns valid XML with all published pages
- [ ] `localhost:3000/robots.txt` returns valid robots directives
- [ ] Core Web Vitals pass on all key pages: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] `npm run build` completes without errors
- [ ] All commits pushed to GitHub
- [ ] Privacy policy reviewed to ensure disclosure of GA4, Google Ads, and Meta Pixel tracking
