---
phase: 7
plan: 2
subsystem: location-pages
tags: [programmatic-seo, static-generation, location-pages, json-ld, sitemap]
dependency-graph:
  requires: [locations.ts, locations.types.ts, services.ts, metadata.ts, schemas.ts, sitemap.ts]
  provides: [location-service-page-template, locationServiceSchema, sitemap-location-urls]
  affects: [sitemap.ts, schemas.ts]
tech-stack:
  added: []
  patterns: [generateStaticParams, dynamicParams-false, nested-dynamic-routes, location-specific-metadata]
key-files:
  created:
    - src/app/services/[slug]/[location]/page.tsx
  modified:
    - src/components/seo/schemas.ts
    - src/app/sitemap.ts
decisions:
  - "Nested dynamic route [slug]/[location] under existing [slug] -- parent service page unaffected"
  - "dynamicParams = false for strict 404 on non-generated paths (no SSR fallback)"
  - "locationServiceSchema uses Service + LocalBusiness provider with city-specific areaServed"
metrics:
  duration: 2m
  tasks: 3
  files: 3
  completed: 2026-02-15
---

# Phase 7 Plan 2: Location Service Page Template & Static Generation Summary

Nested dynamic route generating 10 location-specific service pages at build time with unique metadata, JSON-LD structured data, and sitemap entries for all service-location combinations.

## What Was Built

### 1. Location Service Page Template (`src/app/services/[slug]/[location]/page.tsx`)

Full page component combining service data from `services.ts` and location data from `locations.ts`:

- **Static generation**: `generateStaticParams()` returns 10 entries from `getAllServiceLocationParams()` (5 services x 2 locations)
- **Strict routing**: `dynamicParams = false` ensures 404 for any URL not matching a generated path (e.g., `/services/feasibility-advisory/melbourne`)
- **Unique metadata**: `generateMetadata()` produces location-specific `title` ("Feasibility and Advisory Sydney"), `description`, and `canonical` URL for each page
- **JSON-LD**: Each page includes `locationServiceSchema` with Service type, LocalBusiness provider, and city-specific `areaServed`
- **Page layout** (in order):
  1. PageHeader with breadcrumbs: Services > Service Name > City Name
  2. Local service description section (from `serviceContexts[slug].localDescription`)
  3. Market context section (from `locationData.marketContext`)
  4. Local benefits with numbered list (from `serviceContexts[slug].localBenefits`)
  5. Parent service link back to `/services/[slug]`
  6. Location-specific CTA via ServiceCta component
  7. Related case studies via RelatedCaseStudies component

### 2. `locationServiceSchema` in `src/components/seo/schemas.ts`

New exported function generating `WithContext<Service>` JSON-LD:

- `@type: 'Service'` with location-qualified name ("Feasibility and Advisory Sydney")
- `provider: { @type: 'LocalBusiness' }` with PostalAddress for the specific city
- `areaServed: { @type: 'City', name: '[city]' }` for local SEO signals
- URL pattern matches `/services/[slug]/[location]` route

### 3. Sitemap Extension in `src/app/sitemap.ts`

Added 10 location page URLs to the sitemap:

- Import `getAllServiceLocationParams` from `@/lib/locations`
- Generate entries with `priority: 0.7` and `changeFrequency: 'monthly'`
- Inserted between service pages and case study pages in the sitemap array

## Build Verification

Build output: **60/60 static pages generated** (previously 50 pages + 10 new location pages):

- `/services/feasibility-advisory/sydney`
- `/services/feasibility-advisory/newcastle`
- `/services/design-management/sydney`
- `/services/design-management/newcastle`
- `/services/da-approval/sydney`
- `/services/da-approval/newcastle`
- `/services/tender-assessment/sydney`
- `/services/tender-assessment/newcastle`
- `/services/construction-superintendent/sydney`
- `/services/construction-superintendent/newcastle`

## Commits

| Task | Description | Commit | Files |
|------|------------|--------|-------|
| 1 | Add locationServiceSchema to structured data | `c185c9c` | src/components/seo/schemas.ts |
| 2 | Create location service page template with static generation | `beeb8bf` | src/app/services/[slug]/[location]/page.tsx |
| 3 | Add 10 location page URLs to sitemap | `d56f761` | src/app/sitemap.ts |

## Deviations from Plan

None -- plan executed exactly as written.

## Acceptance Criteria Verification

- [x] `src/app/services/[slug]/[location]/page.tsx` exists with `generateStaticParams`, `dynamicParams = false`, and `generateMetadata`
- [x] `npm run build` succeeds and generates exactly 10 location pages (60/60 total -- confirmed in build output)
- [x] Each location page renders: PageHeader with breadcrumbs, local context section, market context section, local benefits, parent service link, CTA, and related case studies
- [x] `src/components/seo/schemas.ts` exports `locationServiceSchema` with location-specific `areaServed`
- [x] Sitemap includes all 10 new location page URLs
- [x] `/services/invalid-slug/sydney` returns 404 (dynamicParams = false)
- [x] Each location page metadata has unique title, description, and canonical URL

## Self-Check: PASSED

All 3 files verified present (1 created, 2 modified). All 3 commit hashes verified in git log.
