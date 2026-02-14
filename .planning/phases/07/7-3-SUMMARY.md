---
phase: 7
plan: 3
subsystem: og-images
tags: [og-images, twitter-cards, social-sharing, image-generation, satori]
dependency-graph:
  requires: [services.ts, locations.ts, getAllServiceLocationParams]
  provides: [location-og-images, location-twitter-images]
  affects: []
tech-stack:
  added: []
  patterns: [next-og-ImageResponse, generateStaticParams-for-images, satori-inline-styles]
key-files:
  created:
    - src/app/services/[slug]/[location]/opengraph-image.tsx
    - src/app/services/[slug]/[location]/twitter-image.tsx
  modified: []
decisions:
  - "Template literal for city+state text avoids Satori multi-child-node error in OG image divs"
  - "Same 1200x630 dimensions for both OG and Twitter images (summary_large_image format)"
metrics:
  duration: 1m
  tasks: 2
  files: 2
  completed: 2026-02-15
---

# Phase 7 Plan 3: Dynamic OG Images & Social Sharing Optimization Summary

Dynamic OG and Twitter card images for all 10 location service pages using next/og ImageResponse with branded dark gradient, orange accent, service title, and city name.

## What Was Built

### 1. Dynamic OG Image (`src/app/services/[slug]/[location]/opengraph-image.tsx`)

File-based OG image using `ImageResponse` from `next/og`:

- **Static generation**: `generateStaticParams()` returns all 10 service-location combinations from `getAllServiceLocationParams()`
- **Exports**: `alt` ("UpScalePM Service"), `size` (1200x630), `contentType` ("image/png")
- **Params**: `params` is `Promise<{ slug: string; location: string }>` (Next.js 16 convention, awaited)
- **Visual layout** (matches root `src/app/opengraph-image.tsx` style):
  - Dark gradient background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #c2410c 100%)`
  - "UpScalePM" in orange (#c2410c) at top
  - Service title in large white text (52px)
  - City name + ", NSW" in light grey (#d4d4d4, 36px)
  - Tagline in muted grey (#a3a3a3, 22px)

### 2. Dynamic Twitter Card Image (`src/app/services/[slug]/[location]/twitter-image.tsx`)

Identical visual layout to the OG image, ensuring the `twitter:image` meta tag is explicitly set for each location page:

- Same `generateStaticParams()`, same dimensions (1200x630 for `summary_large_image`)
- Ensures Twitter/X shows the service-and-city-specific image rather than falling back to generic site OG

## Build Verification

Build output: **80/80 routes generated** (60 pages + 10 OG image routes + 10 Twitter image routes):

- `/services/feasibility-advisory/sydney/opengraph-image`
- `/services/feasibility-advisory/sydney/twitter-image`
- `/services/design-management/newcastle/opengraph-image`
- `/services/design-management/newcastle/twitter-image`
- (and all other 16 image routes)

## Commits

| Task | Description | Commit | Files |
|------|------------|--------|-------|
| 1 | Add dynamic OG images for location service pages | `1ebe9f0` | src/app/services/[slug]/[location]/opengraph-image.tsx |
| 2 | Add dynamic Twitter card images for location service pages | `7312cb7` | src/app/services/[slug]/[location]/twitter-image.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Satori multi-child-node error in city/state text**
- **Found during:** Task 1 (build verification)
- **Issue:** `{cityName}, NSW` in a `<div>` without `display: 'flex'` was treated by Satori as two child nodes (JSX expression + text literal), causing `Expected <div> to have explicit "display: flex" or "display: none"` error
- **Fix:** Changed to template literal `{`${cityName}, NSW`}` so the div has a single text child node
- **Files modified:** opengraph-image.tsx, twitter-image.tsx
- **Commit:** Both fixes included in `1ebe9f0` and `7312cb7`

## Acceptance Criteria Verification

- [x] `src/app/services/[slug]/[location]/opengraph-image.tsx` exists with `generateStaticParams` returning all 10 combinations
- [x] `src/app/services/[slug]/[location]/twitter-image.tsx` exists with `generateStaticParams` returning all 10 combinations
- [x] Both export `alt`, `size`, `contentType`
- [x] `npm run build` succeeds -- OG images generated at build time for all 10 pages (80/80 routes)
- [x] OG image shows service name and city name on branded dark gradient background
- [x] Visual style matches root OG image (same gradient, orange accent, white text, system font)

## Self-Check: PASSED
