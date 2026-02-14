# Phase 5: Analytics, Tracking & SEO - Research

**Researched:** 2026-02-14
**Domain:** Google Tag Manager, GA4, Google Ads conversion tracking, Meta Pixel, JSON-LD structured data, Core Web Vitals, Next.js Metadata API
**Confidence:** HIGH

## Summary

Phase 5 installs the full measurement and SEO infrastructure for upscalepm.com.au. The codebase already has significant foundations from Phases 1 and 4: every page exports metadata via `generatePageMetadata()` with title, description, canonical URL, and OG tags; `sitemap.ts` dynamically generates entries for all pages; `robots.ts` is configured; UTM parameters are captured in sessionStorage; and the contact form Server Action already passes UTM data to HubSpot. What Phase 5 adds is Google Tag Manager (GTM) as the tag management layer, GA4 page view and event tracking through GTM, Google Ads conversion tracking for form submissions, Meta Pixel for Facebook/Instagram remarketing, JSON-LD structured data across all page types, and Core Web Vitals verification.

The recommended approach loads GTM via the Next.js `<Script>` component in the root layout, then configures GA4, Google Ads conversion tracking, and Meta Pixel as tags within the GTM container -- NOT as separate scripts injected into the page. This keeps all tracking managed centrally and avoids multiple third-party script injections that would degrade Core Web Vitals. The GTM dataLayer receives a custom `form_submission` event when the contact form succeeds, which GTM triggers route to GA4 events, Google Ads conversions, and Meta Pixel custom events. For SPA route tracking, GA4's enhanced measurement handles History Change events automatically when loaded via GTM, so no custom page view code is needed (unlike the HubSpot tracker which required manual `setPath`/`trackPageView`).

For SEO, `schema-dts` (already installed at v1.1.5) provides TypeScript types for JSON-LD structured data. Each page type gets its appropriate schema: `LocalBusiness` on the homepage, `Service` on service pages, `Article` on insights, and `FAQPage` where applicable. These are injected as `<script type="application/ld+json">` tags via Next.js metadata export or inline `<script>` in the page component.

**Primary recommendation:** Use GTM as the single container for GA4, Google Ads, and Meta Pixel. Push `form_submission` events to `dataLayer` from the contact form component. Add JSON-LD structured data to all page types using `schema-dts` types. Audit metadata completeness across all pages. Verify Core Web Vitals with Lighthouse and real-device testing.

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Script component, Metadata API, generateMetadata, sitemap.ts | Already provides all SEO infrastructure primitives |
| schema-dts | 1.1.5 | TypeScript types for JSON-LD structured data | Already installed; provides typed Schema.org definitions |

### No New Dependencies Required

All tracking is managed through GTM (loaded as a script tag) and the dataLayer (a plain JavaScript array). GA4, Google Ads, and Meta Pixel are configured as tags within GTM, not as npm packages. JSON-LD is rendered as plain JSON in `<script>` tags using `schema-dts` types for type safety.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GTM container | Individual script tags for GA4, Ads, Meta Pixel | Harder to manage, more script tags, no centralized trigger management, more client JS, worse for CWV |
| GTM via `<Script>` | @next/third-parties `GoogleTagManager` | @next/third-parties is a newer package that wraps GTM. The `<Script>` approach is more transparent and equally performant. @next/third-parties is viable but adds a dependency for minimal benefit |
| schema-dts for JSON-LD | next-seo or schema-markup-generator | schema-dts is already installed, lightweight (types only, no runtime), and gives full control over JSON-LD shape |
| dataLayer push from client component | Server-side conversion tracking | Server-side tracking (via GA4 Measurement Protocol) is better for accuracy but requires server infrastructure. GTM + dataLayer is the standard approach for marketing sites and works with the existing form flow |
| Manual page view tracking | GA4 enhanced measurement History Change | GA4's built-in enhanced measurement detects History API changes in SPAs automatically. No custom code needed for page views when using GTM |

**Installation:**
```bash
# No npm packages to install. All tracking is via GTM container script + dataLayer.
```

**Environment Variables Required:**
```env
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Meta Pixel (used in GTM, but also needed for noscript fallback)
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXX
```

Note: GA4 Measurement ID (G-XXXXXXXXXX) and Google Ads Conversion ID/Label are configured inside GTM, not in env vars. The GTM container ID is the only tracking ID needed in the Next.js codebase.

## Architecture Patterns

### Recommended Project Structure
```
src/
  app/
    layout.tsx                  # GTM script injection (alongside existing HubSpot/UTM)
    page.tsx                    # Homepage JSON-LD (LocalBusiness)
    about/page.tsx              # About page JSON-LD (LocalBusiness)
    contact/page.tsx            # Contact page JSON-LD (LocalBusiness)
    services/page.tsx           # Services index JSON-LD (LocalBusiness + Service list)
    services/[slug]/page.tsx    # Service page JSON-LD (Service)
    case-studies/[slug]/page.tsx  # Case study JSON-LD (Article)
    insights/[slug]/page.tsx    # Insight JSON-LD (Article)
    privacy-policy/page.tsx     # (no specific schema needed)
    robots.ts                   # Already configured
    sitemap.ts                  # Already configured
  components/
    analytics/
      gtm-script.tsx            # Client component: GTM <Script> + noscript
      gtm-event.ts              # Utility: typed dataLayer push helpers
    seo/
      json-ld.tsx               # Reusable JSON-LD renderer component
      schemas.ts                # Schema generators: localBusiness(), service(), article(), faq()
  lib/
    metadata.ts                 # Already exists: generatePageMetadata() -- verify completeness
```

### Pattern 1: GTM Container Installation
**What:** Load Google Tag Manager via Next.js `<Script>` component with `afterInteractive` strategy in the root layout. Include the `<noscript>` fallback `<iframe>` for JavaScript-disabled browsers.
**When to use:** Root layout only -- loads once, persists across all navigations.
**Example:**
```typescript
// src/components/analytics/gtm-script.tsx
'use client'

import Script from 'next/script'

export function GTMScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  // Graceful degradation: render nothing if GTM ID is not configured
  if (!gtmId || gtmId === 'REPLACE_ME') {
    return null
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
```

```typescript
// In src/app/layout.tsx -- add alongside existing HubSpotTracker and UTMProvider:
import { GTMScript } from '@/components/analytics/gtm-script'

// Inside <body>:
<GTMScript />
<HubSpotTracker />
<UTMProvider />
```

### Pattern 2: DataLayer Event Push for Conversions
**What:** When the contact form submits successfully, push a custom event to `window.dataLayer` that GTM can trigger on for GA4 events, Google Ads conversions, and Meta Pixel events.
**When to use:** After successful form submission in the ContactForm component.
**Example:**
```typescript
// src/components/analytics/gtm-event.ts

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function pushToDataLayer(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...data,
  })
}

// Specific typed event helpers:
export function trackFormSubmission(formName: string) {
  pushToDataLayer('form_submission', {
    form_name: formName,
    form_destination: 'hubspot',
  })
}
```

```typescript
// In contact-form.tsx onSubmit handler, after successful result:
import { trackFormSubmission } from '@/components/analytics/gtm-event'

// After: if (result.success) {
trackFormSubmission('contact_form')
// setStatus('success')
```

### Pattern 3: JSON-LD Structured Data Component
**What:** A reusable component that renders a `<script type="application/ld+json">` tag with properly escaped JSON-LD. Uses `schema-dts` types for type safety.
**When to use:** Every page that needs structured data.
**Example:**
```typescript
// src/components/seo/json-ld.tsx
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

```typescript
// src/components/seo/schemas.ts
import type { WithContext, LocalBusiness, Service, Article, FAQPage } from 'schema-dts'

const SITE_URL = 'https://upscalepm.com.au'

export function localBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Upscale Project Management',
    description: 'Client-side project management for property and construction projects in Sydney and Newcastle.',
    url: SITE_URL,
    telephone: '+61299998888',
    email: 'info@upscalepm.com.au',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    areaServed: [
      { '@type': 'City', name: 'Sydney' },
      { '@type': 'City', name: 'Newcastle' },
    ],
    founder: {
      '@type': 'Person',
      name: 'Noel Yaxley',
      jobTitle: 'Founder & Principal',
    },
    image: `${SITE_URL}/images/og-default.jpg`,
    priceRange: '$$',
  }
}

export function serviceSchema(service: {
  title: string
  description: string
  slug: string
}): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Upscale Project Management',
      url: SITE_URL,
    },
    areaServed: [
      { '@type': 'City', name: 'Sydney' },
      { '@type': 'City', name: 'Newcastle' },
    ],
    serviceType: 'Project Management',
  }
}

export function articleSchema(article: {
  title: string
  excerpt: string
  slug: string
  date: string
  updated?: string
  author: string
  heroImage: string
  path: string
}): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}${article.path}`,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Upscale Project Management',
      url: SITE_URL,
    },
    image: article.heroImage.startsWith('http')
      ? article.heroImage
      : `${SITE_URL}${article.heroImage}`,
  }
}

export function faqSchema(
  questions: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}
```

### Pattern 4: GTM Configuration for GA4, Google Ads, and Meta Pixel
**What:** Inside the GTM container (configured in GTM web UI, not in code), create tags for each tracking platform triggered by built-in and custom events.
**When to use:** GTM dashboard configuration -- documented here for the planner.

**GTM Tags to create:**
1. **GA4 Configuration Tag** -- Type: Google Analytics: GA4 Configuration. Measurement ID: G-XXXXXXXXXX. Trigger: All Pages.
2. **GA4 Form Submission Event Tag** -- Type: GA4 Event. Event Name: `generate_lead`. Trigger: Custom Event = `form_submission`.
3. **Google Ads Conversion Tag** -- Type: Google Ads Conversion Tracking. Conversion ID + Label from Ads account. Trigger: Custom Event = `form_submission`.
4. **Google Ads Remarketing Tag** -- Type: Google Ads Remarketing. Conversion ID. Trigger: All Pages.
5. **Meta Pixel Base Code Tag** -- Type: Custom HTML. Contains Meta Pixel base code. Trigger: All Pages.
6. **Meta Pixel Lead Event Tag** -- Type: Custom HTML. Contains `fbq('track', 'Lead')`. Trigger: Custom Event = `form_submission`.

**GTM Triggers to create:**
1. **All Pages** -- Built-in: Page View trigger (fires on every page, including SPA History Change with GA4 enhanced measurement).
2. **Form Submission** -- Custom Event trigger. Event name: `form_submission`. Fires when `dataLayer.push({ event: 'form_submission' })` is called.

**GTM Variables:**
- No custom variables needed. GA4 enhanced measurement handles SPA page view tracking automatically via History Change detection.

### Pattern 5: Metadata Audit and Completion
**What:** Verify every page exports metadata with unique title, description, and canonical URL via the existing `generatePageMetadata()` helper.
**When to use:** Audit step before finalizing Phase 5.

**Current metadata coverage (from codebase analysis):**

| Page | Has Metadata | Title | Description | Canonical | Notes |
|------|-------------|-------|-------------|-----------|-------|
| `/` (homepage) | Partial | Via layout default | Via layout default | No explicit canonical | Missing: generatePageMetadata call for homepage-specific metadata |
| `/about` | Yes | "About" | Custom | `/about` | Complete |
| `/contact` | Yes | "Contact" | Custom | `/contact` | Complete |
| `/services` | Yes | "Services" | Custom | `/services` | Complete |
| `/services/[slug]` | Yes | Dynamic (service.title) | Dynamic (service.description) | `/services/{slug}` | Complete |
| `/case-studies` | Yes | "Case Studies" | Custom | `/case-studies` | Complete |
| `/case-studies/[slug]` | Yes | Dynamic (study title) | Dynamic (study excerpt) | `/case-studies/{slug}` | Complete |
| `/insights` | Yes | "Insights" | Custom | `/insights` | Complete |
| `/insights/[slug]` | Yes | Dynamic (insight title) | Dynamic (insight excerpt) | `/insights/{slug}` | Complete, includes article OG type |
| `/privacy-policy` | Yes | "Privacy Policy" | Custom | `/privacy-policy` | Complete |
| `/terms-and-conditions` | Yes | "Terms and Conditions" | Custom | `/terms-and-conditions` | Complete |
| `/not-found` (404) | No | Falls back to layout default | Falls back to layout default | N/A (not indexed) | Acceptable: 404 pages don't need SEO metadata |

**Gaps to address:**
- Homepage (`/`) has no explicit `generatePageMetadata()` call -- it falls through to the layout's default metadata. This means no canonical URL is set for the homepage specifically. Should add explicit metadata export.

### Anti-Patterns to Avoid
- **Loading GA4, Ads, and Meta Pixel as separate `<Script>` tags:** This creates 4+ third-party script loads. Use GTM as a single container to manage all tracking tags.
- **Custom SPA page view code for GA4:** GA4's enhanced measurement (enabled in GA4 property settings) automatically detects History API changes in SPAs. Adding custom `gtag('event', 'page_view')` calls will double-count views.
- **Injecting JSON-LD in `<head>` via metadata API:** While Next.js supports JSON-LD in the metadata object, rendering it as a `<script>` tag in the page body is equally valid per Google's documentation and more flexible for dynamic data. Both approaches work; pick one and be consistent.
- **Hardcoding tracking IDs in source code:** Always use environment variables. Tracking IDs differ between staging and production.
- **Forgetting the noscript GTM fallback:** The `<noscript><iframe>` fallback is required by GTM's installation instructions for JavaScript-disabled browsers.
- **Blocking the main thread with synchronous GTM loading:** Always use `afterInteractive` strategy (not `beforeInteractive`) to avoid delaying First Contentful Paint.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tag management | Individual GA4/Ads/Meta script tags | Google Tag Manager container | Centralized management, no code changes for new tags, built-in consent mode |
| Page view tracking in SPA | Custom usePathname + gtag calls | GA4 enhanced measurement (History Change) | Built into GA4, zero custom code, handles all edge cases |
| Conversion tracking | Custom fetch to GA4 Measurement Protocol | GTM trigger on dataLayer event | Standard pattern, works across GA4 + Ads + Meta simultaneously |
| JSON-LD types | Manual JSON objects | `schema-dts` TypeScript types | Already installed, catches schema errors at compile time |
| Sitemap generation | Manual XML file | Next.js `sitemap.ts` (already exists) | Dynamic generation from content, automatic /sitemap.xml route |
| Robots.txt | Manual text file | Next.js `robots.ts` (already exists) | Type-safe, co-located with app code |

## Common Pitfalls

### Pitfall 1: GTM Blocking First Contentful Paint
**What goes wrong:** GTM script loads synchronously, delays FCP and LCP by 200-500ms, failing Core Web Vitals targets.
**Why it happens:** GTM's default snippet uses synchronous `<script>` tag insertion. If loaded via `beforeInteractive` strategy or placed in `<head>` without async, it becomes render-blocking.
**How to avoid:** Use Next.js `<Script>` with `strategy="afterInteractive"`. This loads GTM after the page hydrates, preventing any render-blocking. Alternatively, use `strategy="lazyOnload"` if tracking can wait until the page is fully idle -- but this delays initial page view tracking.
**Warning signs:** Lighthouse shows "Reduce impact of third-party code" with GTM as the top offender; FCP jumps from <1s to >1.5s after GTM installation.

### Pitfall 2: Double Page Views in GA4 on SPA Navigation
**What goes wrong:** Every page navigation fires two page_view events in GA4, inflating analytics and making data unreliable.
**Why it happens:** GA4 enhanced measurement detects History API changes automatically. If you ALSO push manual page_view events via dataLayer or gtag, each navigation fires twice.
**How to avoid:** Let GA4 enhanced measurement handle all page views. Do NOT push `page_view` events from Next.js code. Only push custom events (like `form_submission`) to dataLayer.
**Warning signs:** GA4 shows exactly 2x expected page views; session counts are normal but page views are doubled.

### Pitfall 3: Meta Pixel Firing Before Consent
**What goes wrong:** Privacy compliance issues in Australia (Privacy Act 1988 / APPs). Meta Pixel fires on all visitors without consent, potentially collecting personal information.
**Why it happens:** Default GTM + Pixel setup fires on every page load.
**How to avoid:** For Australian sites, the Privacy Act does not require cookie consent banners the same way GDPR does. However, the privacy policy must disclose tracking (already covered by existing privacy policy page). If targeting EU visitors in future, GTM's built-in Consent Mode can gate Pixel firing. For now, ensure the privacy policy accurately describes GA4, Google Ads, and Meta Pixel data collection. No consent banner needed for Australian-only audience.
**Warning signs:** Privacy complaints; Meta account flagged for non-compliance if targeting EU audiences.

### Pitfall 4: Google Ads Conversion Not Matching Form Submissions
**What goes wrong:** Google Ads reports 0 conversions despite forms being submitted. Campaign optimization cannot occur.
**Why it happens:** The GTM conversion trigger doesn't fire because the dataLayer event name doesn't match, or the conversion tag is misconfigured (wrong Conversion ID/Label).
**How to avoid:** Test the full flow: submit form -> verify `form_submission` event appears in GTM Preview/Debug mode -> verify conversion tag fires -> verify conversion appears in Google Ads within 24 hours. Use GTM's built-in preview mode to debug before publishing the container.
**Warning signs:** GTM preview shows the trigger fires but the tag doesn't; Google Ads conversion reporting shows 0; GA4 shows the event but Ads doesn't.

### Pitfall 5: JSON-LD Validation Errors
**What goes wrong:** Google Search Console reports structured data errors. Rich results don't appear.
**Why it happens:** Missing required fields (e.g., `@context`, `@type`), incorrect field types (string where array expected), or using deprecated properties.
**How to avoid:** Use `schema-dts` types for compile-time validation. Test all JSON-LD output with Google's Rich Results Test (https://search.google.com/test/rich-results) and Schema.org Validator (https://validator.schema.org/). Required fields for LocalBusiness: name, address. Required for Article: headline, datePublished, author.
**Warning signs:** Google Search Console "Enhancements" tab shows structured data errors; no rich results appearing for pages that should have them.

### Pitfall 6: Cumulative Layout Shift from Third-Party Scripts
**What goes wrong:** CLS exceeds 0.1 threshold after adding tracking scripts, particularly if they inject visible elements (consent banners, chat widgets).
**Why it happens:** Third-party scripts sometimes inject DOM elements that shift existing content. GTM itself doesn't inject visible elements, but poorly configured tags might.
**How to avoid:** Only add tracking tags (GA4, Ads, Meta Pixel) via GTM -- these inject no visible elements. Do not add chat widgets, notification banners, or other UI-injecting scripts through GTM. Test CLS before and after GTM installation using Lighthouse.
**Warning signs:** CLS score jumps from <0.05 to >0.1 after deploying tracking; elements "jump" on page load.

## GTM Container Configuration Guide

This section documents the exact GTM configuration needed. This is dashboard configuration, not code.

### Prerequisites (before any code work)
1. Create a Google Tag Manager account and container for upscalepm.com.au
2. Create a Google Analytics 4 property and get the Measurement ID (G-XXXXXXXXXX)
3. Create a Google Ads account and set up a conversion action for "Lead" -- note the Conversion ID and Conversion Label
4. Create a Meta Business Suite account and create a Meta Pixel -- note the Pixel ID

### GTM Tags

| Tag Name | Tag Type | Trigger | Configuration |
|----------|----------|---------|---------------|
| GA4 Configuration | GA4 Configuration | All Pages | Measurement ID = G-XXXXXXXXXX. Enable enhanced measurement (page views, scrolls, outbound clicks, site search) |
| GA4 - Form Submission | GA4 Event | form_submission | Event name = `generate_lead`. Parameters: `form_name` = {{DLV - form_name}} |
| Google Ads Conversion - Lead | Google Ads Conversion Tracking | form_submission | Conversion ID + Conversion Label from Ads account |
| Google Ads Remarketing | Google Ads Remarketing | All Pages | Conversion ID from Ads account |
| Meta Pixel - Base | Custom HTML | All Pages | Standard Meta Pixel base code with `fbq('init', 'PIXEL_ID')` and `fbq('track', 'PageView')` |
| Meta Pixel - Lead | Custom HTML | form_submission | `fbq('track', 'Lead')` |

### GTM Triggers

| Trigger Name | Trigger Type | Configuration |
|-------------|-------------|---------------|
| All Pages | Page View | All page views (built-in) |
| form_submission | Custom Event | Event name = `form_submission` |

### GTM Variables

| Variable Name | Variable Type | Configuration |
|--------------|---------------|---------------|
| DLV - form_name | Data Layer Variable | Data Layer Variable Name = `form_name` |

## Metadata and SEO Completeness Checklist

### Pages Requiring JSON-LD Structured Data

| Page | Schema Type | Key Fields | Priority |
|------|------------|------------|----------|
| Homepage (`/`) | LocalBusiness | name, address, telephone, areaServed, founder, url | HIGH |
| About (`/about`) | LocalBusiness (same as homepage) | Reuse homepage schema | MEDIUM |
| Contact (`/contact`) | LocalBusiness (same as homepage) | Reuse homepage schema | HIGH |
| Services index (`/services`) | LocalBusiness + ItemList of Services | name + list of service URLs | MEDIUM |
| Each service page (`/services/[slug]`) | Service | name, description, provider, areaServed | HIGH |
| Each case study (`/case-studies/[slug]`) | Article | headline, datePublished (use order as proxy), author, publisher | MEDIUM |
| Each insight (`/insights/[slug]`) | Article | headline, datePublished, author, publisher, image | HIGH |
| Privacy policy | None needed | N/A | -- |
| Terms and conditions | None needed | N/A | -- |
| 404 | None needed | N/A | -- |

### Case Study Date Issue
Case studies do not have a `date` field in their frontmatter (only insights do). The `CaseStudyFrontmatter` type has `order`, `category`, `location`, etc. but no publication date. For JSON-LD Article schema on case studies, options:
1. Add an optional `date` field to `CaseStudyFrontmatter` and populate it (requires content updates)
2. Omit `datePublished` from case study schemas (valid but loses potential rich result eligibility)
3. Use a default/approximate date based on when the project was completed

**Recommendation:** Add an optional `date` field to case study frontmatter. For existing case studies, use the WordPress publication date (available in crawl data) or the current date.

## Core Web Vitals Strategy

### Targets
| Metric | Target | Current Risk Level |
|--------|--------|-------------------|
| LCP (Largest Contentful Paint) | < 2.5s | LOW -- Static pages, optimized images, no client-blocking JS |
| CLS (Cumulative Layout Shift) | < 0.1 | LOW -- All images have dimensions, no dynamic ads/banners |
| INP (Interaction to Next Paint) | < 200ms | LOW -- Minimal client interactivity, no heavy client computations |

### Risk Factors from Phase 5 Changes
1. **GTM script load:** afterInteractive strategy prevents FCP impact. May add ~100-200ms to TTI. Acceptable.
2. **GA4 + Meta Pixel loaded via GTM:** Each adds ~30-50KB gzipped. Combined impact is ~100-150ms on slow 3G. Acceptable on modern connections.
3. **JSON-LD scripts in body:** Zero performance impact (parsed by search engines, not rendered).
4. **No new visible UI elements:** Phase 5 adds no visible components, so no CLS risk.

### Verification Steps
1. Run Lighthouse on all key pages (homepage, contact, 2 service pages, 1 case study, 1 insight) BEFORE Phase 5 changes
2. Run Lighthouse again AFTER all changes
3. Compare LCP, CLS, INP scores
4. If any metric degrades beyond target, identify the causing script and adjust loading strategy (e.g., switch to `lazyOnload`)
5. Test on real device (mid-range Android on throttled 4G) for realistic mobile performance

### Pages to Prioritize for CWV Testing
1. `/contact` -- Google Ads landing page, must load fast
2. `/` -- Homepage, first impression
3. `/services/feasibility-advisory` -- Representative service page
4. `/insights/tender-evaluation-how-we-choose-the-right-contractor` -- Representative content page

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Individual GA/Ads/Pixel script tags in `<head>` | GTM container manages all tags | GTM standard since 2012, dominant since 2018 | Single script load, centralized management, no code deploys for tag changes |
| Universal Analytics (analytics.js) | GA4 (gtag.js via GTM) | UA sunset July 2023 | GA4 is the only supported Google Analytics platform |
| Manual gtag('event', 'page_view') for SPAs | GA4 enhanced measurement (History Change) | GA4 default since 2023 | Automatic SPA tracking, zero custom code |
| Meta Pixel SDK npm package (react-facebook-pixel) | Meta Pixel via GTM Custom HTML | react-facebook-pixel last updated 2021, unmaintained | GTM approach is actively supported, centrally managed |
| Separate conversion tracking scripts | GTM trigger → multiple tags | Standard practice | One dataLayer event triggers GA4 + Ads + Meta simultaneously |
| JSON-LD via next-seo package | Native JSON-LD with schema-dts types | Next.js 14+ metadata API | No runtime dependency, TypeScript safety, full control |

**Deprecated/outdated:**
- **Universal Analytics (UA / analytics.js):** Sunset July 1, 2023. GA4 is the only option
- **react-facebook-pixel npm package:** Last updated 2021, does not support latest Pixel API. Use GTM Custom HTML instead
- **@next/third-parties (for GTM):** While not deprecated, this is a thin wrapper that adds a dependency for no meaningful benefit over direct Script component usage
- **gtag.js script tag for GA4:** Works but bypasses GTM. Using GTM is preferred for sites that also need Ads + Meta tracking

## Open Questions

1. **GTM Container ID**
   - What we know: A GTM container must be created in tagmanager.google.com for upscalepm.com.au.
   - What's unclear: Whether a GTM account/container already exists for the business.
   - Recommendation: Create the container as a prerequisite task. The GTM ID (GTM-XXXXXXX) goes in `NEXT_PUBLIC_GTM_ID`.

2. **GA4 Property and Measurement ID**
   - What we know: A GA4 property must exist to receive analytics data.
   - What's unclear: Whether an existing GA4 property exists (the WordPress site may already have one).
   - Recommendation: If an existing GA4 property exists, reuse it (migration preserves historical data). If not, create a new one. The Measurement ID (G-XXXXXXXXXX) is configured in GTM, not in code.

3. **Google Ads Account and Conversion Action**
   - What we know: The Phase 5 requirement (TRACK-03) requires Google Ads conversion tracking for form submissions.
   - What's unclear: Whether a Google Ads account exists and whether a conversion action has been created.
   - Recommendation: Create a "Lead" conversion action in Google Ads. Note the Conversion ID and Conversion Label for GTM configuration. This is a dashboard task.

4. **Meta Pixel ID**
   - What we know: Meta Pixel must be installed (TRACK-04) for Facebook/Instagram ad tracking.
   - What's unclear: Whether a Meta Business Suite account and Pixel exist for UpScalePM.
   - Recommendation: Create Meta Business Suite account and Pixel. Note the Pixel ID for GTM configuration.

5. **Case Study Publication Dates for JSON-LD**
   - What we know: Case study frontmatter has no `date` field. JSON-LD Article schema benefits from `datePublished`.
   - What's unclear: Exact publication dates for each case study.
   - Recommendation: Add optional `date` field to `CaseStudyFrontmatter`. Use WordPress publication dates from crawl data as source, or omit for case studies and only use Article schema on insights (which already have dates).

6. **Privacy Policy Update for Tracking Disclosure**
   - What we know: The privacy policy page exists with content migrated from WordPress. Phase 5 adds GA4, Google Ads, and Meta Pixel tracking.
   - What's unclear: Whether the existing privacy policy already discloses Google Analytics and Meta Pixel tracking.
   - Recommendation: Review and update the privacy policy to explicitly mention Google Analytics 4, Google Ads conversion tracking, Meta Pixel, and cookie usage. This is a content task, not a code task.

7. **Homepage Metadata Gap**
   - What we know: The homepage (`src/app/page.tsx`) does not export a `metadata` constant. It inherits the root layout default, which provides title and description but no canonical URL.
   - What's unclear: Whether the root layout's `metadataBase` is sufficient for canonical URL generation.
   - Recommendation: Add an explicit `metadata` export to `page.tsx` using `generatePageMetadata({ title: 'Client-Side Project Management Sydney & Newcastle', description: '...', path: '/' })` to ensure canonical URL is set.

## Implementation Sequence Recommendation

Based on dependency analysis, the recommended implementation order for Phase 5 plans:

1. **GTM + GA4 Setup** (TRACK-01, TRACK-02) -- GTM container script in layout, GA4 tag in GTM. Foundational for all other tracking.
2. **DataLayer Events + Google Ads Conversion** (TRACK-03, TRACK-05) -- Push `form_submission` to dataLayer from contact form, configure Ads conversion tag in GTM. Depends on GTM being live.
3. **Meta Pixel via GTM** (TRACK-04) -- Add Meta Pixel base + Lead event tags in GTM. Independent of Ads but depends on GTM.
4. **Metadata Audit + JSON-LD Structured Data** (SEO-02, SEO-03) -- Add homepage metadata, JSON-LD components for all page types. Independent of tracking.
5. **Sitemap/Robots Verification + CWV Audit** (SEO-04, SEO-06) -- Verify existing sitemap/robots, run Lighthouse baseline and post-change comparison. Should be last to capture full impact.

## Sources

### Primary (HIGH confidence)
- [Google Tag Manager Installation Guide](https://developers.google.com/tag-platform/tag-manager/web) -- Official GTM web installation snippet and setup
- [GA4 Enhanced Measurement](https://support.google.com/analytics/answer/9216061) -- Page view tracking for SPAs via History Change
- [Google Ads Conversion Tracking via GTM](https://support.google.com/google-ads/answer/6095821) -- Official guide for setting up conversion tags in GTM
- [Meta Pixel via GTM](https://www.facebook.com/business/help/1021909254506499) -- Official Meta documentation for GTM integration
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script) -- Official docs for third-party script loading strategies
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) -- Official docs for SEO metadata
- [Next.js sitemap.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) -- Official docs for dynamic sitemap generation
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness) -- Structured data specification for local business
- [Schema.org Service](https://schema.org/Service) -- Structured data specification for services
- [Google Rich Results Test](https://search.google.com/test/rich-results) -- Validation tool for structured data

### Secondary (MEDIUM confidence)
- [Google Developers: Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) -- Best practices for JSON-LD implementation
- [Web.dev Core Web Vitals](https://web.dev/articles/vitals) -- LCP, CLS, INP definitions and thresholds
- [GTM Server-Side Tagging](https://developers.google.com/tag-platform/tag-manager/server-side) -- Future upgrade path for more accurate tracking (not needed for v1)
- [schema-dts npm](https://www.npmjs.com/package/schema-dts) -- TypeScript types for Schema.org vocabulary

### Tertiary (LOW confidence)
- [Australian Privacy Act 1988 - APPs](https://www.oaic.gov.au/privacy/australian-privacy-principles) -- Privacy compliance context for tracking disclosures (no cookie consent banner required for AU-only sites, but disclosure in privacy policy is required)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new npm packages needed. GTM, GA4, Ads, Meta Pixel are all loaded via GTM script (well-documented, billions of installations). schema-dts already installed.
- Architecture: HIGH -- GTM + dataLayer pattern is the industry standard for multi-platform tracking. JSON-LD via `<script>` tag with schema-dts types is the recommended Next.js approach.
- Pitfalls: HIGH -- Each pitfall documented from production experience and official documentation (double page views, CLS from scripts, consent requirements).
- CWV guidance: HIGH -- Risk is low because Phase 5 adds no visible UI elements. Third-party script impact is well-understood and mitigated by afterInteractive strategy.

**Research date:** 2026-02-14
**Valid until:** 2026-03-14 (30 days -- GTM/GA4 APIs are stable; Meta Pixel rarely changes)
