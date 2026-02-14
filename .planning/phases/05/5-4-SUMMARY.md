---
phase: 5
plan: 4
subsystem: seo
tags: [metadata, seo, canonical-url, homepage]
dependency-graph:
  requires: []
  provides: [SEO-02]
  affects: [homepage]
tech-stack:
  added: []
  patterns: [generatePageMetadata]
key-files:
  created: []
  modified:
    - src/app/page.tsx
decisions: []
metrics:
  duration: 1m
  completed: 2026-02-14
---

# Phase 5 Plan 4: Homepage Metadata & Metadata Audit Summary

Explicit metadata export added to homepage with location-targeted SEO title and canonical URL, closing the last gap in site-wide metadata coverage.

## What Was Done

### Task 1: Add Metadata Export to Homepage (c008a69)
Modified `src/app/page.tsx` to import `generatePageMetadata` from `@/lib/metadata` and `Metadata` type from `next`. Added a static metadata export before the `Home` component:

```typescript
export const metadata: Metadata = generatePageMetadata({
  title: 'Client-Side Project Management Sydney & Newcastle',
  description:
    'Upscale Project Management delivers expert client-side PM for property and construction. Feasibility, design management, DA approval, tender assessment, and construction superintendent services across Sydney and Newcastle.',
  path: '/',
})
```

This produces:
- **Title**: "Client-Side Project Management Sydney & Newcastle | UpScalePM" (via layout template)
- **Canonical URL**: `https://upscalepm.com.au/`
- **OG tags**: Homepage-specific title and description with locale `en_AU`
- **Twitter card**: summary_large_image with homepage description

The homepage was the only page without an explicit metadata export. All 12 page routes now have explicit metadata (static `generatePageMetadata()` calls for leaf pages, dynamic `generateMetadata()` functions for `[slug]` routes).

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- `npm run build` succeeds -- all 50 static pages generated
- Homepage exports `metadata` via `generatePageMetadata()` with title, description, and `path: '/'`
- Title contains location keywords "Sydney & Newcastle"
- Canonical URL resolves to `https://upscalepm.com.au/` via `generatePageMetadata` path concatenation
- No TypeScript errors

## Self-Check: PASSED

All 1 file verified present. All 1 commit verified in git log.
