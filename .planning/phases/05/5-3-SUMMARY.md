---
phase: 5
plan: 3
subsystem: seo
tags: [json-ld, structured-data, schema-org, seo]
dependency-graph:
  requires: []
  provides: [SEO-03]
  affects: [homepage, about, contact, services, insights, case-studies]
tech-stack:
  added: []
  patterns: [json-ld-component, schema-generators, schema-dts-types]
key-files:
  created:
    - src/components/seo/json-ld.tsx
    - src/components/seo/schemas.ts
  modified:
    - src/lib/content.types.ts
    - src/app/page.tsx
    - src/app/about/page.tsx
    - src/app/contact/page.tsx
    - src/app/services/page.tsx
    - src/app/services/[slug]/page.tsx
    - src/app/insights/[slug]/page.tsx
    - src/app/case-studies/[slug]/page.tsx
decisions:
  - Used contact page phone/email (02 9999 8888, info@upscalepm.com.au) over footer placeholders for schema data
metrics:
  duration: 3m
  completed: 2026-02-14
---

# Phase 5 Plan 3: JSON-LD Structured Data Components & Schema Generators Summary

JSON-LD structured data infrastructure with schema-dts typed generators and integration across all 7 page types for rich search results.

## What Was Done

### Task 1: JsonLd Component (afcc467)
Created `src/components/seo/json-ld.tsx` -- a server component that renders `<script type="application/ld+json">` tags with properly serialized JSON. Accepts typed `WithContext<Thing>` data from schema-dts. Zero hydration cost.

### Task 2: Schema Generators (6ea5efc)
Created `src/components/seo/schemas.ts` with four generator functions:
- `localBusinessSchema()` -- Upscale PM as a LocalBusiness with Sydney/Newcastle area served, founder info, contact details, and postal address
- `serviceSchema({ title, description, slug })` -- Individual service pages with provider and area served
- `articleSchema({ title, excerpt, slug, date, updated, author, heroImage, path })` -- Insights and case studies with dates, author, publisher, and image handling (absolute/relative URL support)
- `faqSchema(questions)` -- FAQ pages with Question/Answer pairs

All functions return properly typed `WithContext<T>` objects using schema-dts types.

### Task 3: CaseStudyFrontmatter Date Field (2b27c4f)
Added optional `date?: string` to `CaseStudyFrontmatter` interface in `src/lib/content.types.ts`. Existing case studies without the field continue to work; fallback date `'2024-01-01'` used in Article JSON-LD when absent.

### Task 4: JSON-LD Integration Across All Pages (2f10cfd)
Added `<JsonLd>` component to all 7 page types:
- **LocalBusiness**: homepage (`page.tsx`), about, contact, services index
- **Service**: individual service pages (`services/[slug]`) with dynamic title/description/slug
- **Article**: insight pages (`insights/[slug]`) with dates, author, and hero from frontmatter
- **Article**: case study pages (`case-studies/[slug]`) with fallback date and Noel Yaxley as author

## Deviations from Plan

None -- plan executed exactly as written.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Used contact page phone/email over footer placeholders | Footer has `1300 XXX XXX` placeholder; contact page has `(02) 9999 8888` and `info@upscalepm.com.au` which appear to be real values |

## Verification

- `npm run build` succeeds -- all 50 static pages generated
- JsonLd component renders valid `<script type="application/ld+json">` tags
- Schema generators produce correctly typed Schema.org structures
- No TypeScript errors in any modified files

## Self-Check: PASSED

All 10 files verified present. All 4 commits verified in git log.
