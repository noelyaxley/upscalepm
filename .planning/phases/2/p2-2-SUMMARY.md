---
phase: 2
plan: 2
subsystem: content-templates
tags: [case-studies, mdx, dynamic-routes, next.js]
dependency-graph:
  requires: [p2-1]
  provides: [case-study-template, case-study-listing, case-study-header]
  affects: [p2-6]
tech-stack:
  added: []
  patterns: [generateStaticParams, async-params, dynamic-mdx-import, turbopack-root]
key-files:
  created:
    - src/app/case-studies/[slug]/page.tsx
    - src/app/case-studies/page.tsx
    - src/components/case-study-header.tsx
    - content/case-studies/_placeholder.mdx
  modified:
    - next.config.mjs
  removed:
    - content/case-studies/example.mdx
decisions:
  - Relative path for dynamic MDX import (Turbopack cannot resolve @content alias in dynamic imports)
  - Added turbopack.root to next.config.mjs to fix workspace root inference from parent lockfile
  - Placeholder MDX file required for Turbopack glob pattern resolution when directory has no real content
metrics:
  duration: 4m
  tasks: 4
  files-created: 4
  files-modified: 1
  files-removed: 1
  completed: 2026-02-14
---

# Phase 2 Plan 2: Case Study Template & Dynamic Route Summary

Dynamic route, listing page, and header component for case studies using MDX content pipeline from Prompt 1. Relative dynamic import path with Turbopack root config to work around workspace root inference.

## What Was Built

### 1. Case Study Header (`src/components/case-study-header.tsx`)
- Breadcrumbs: Home > Case Studies > {title}
- Full-width hero image with gradient overlay (aspect-[21/9])
- Category badge with oklch orange palette
- Semantic `<dl>` metadata grid: projectType, location, client, architect, services (as inline tags)
- Responsive layout using Container primitive

### 2. Dynamic Route (`src/app/case-studies/[slug]/page.tsx`)
- `generateStaticParams()` discovers all non-draft MDX files via `getAllCaseStudies()`
- `dynamicParams = false` for static-only generation
- `generateMetadata()` populates title, description, OG tags from frontmatter
- Dynamic MDX import using relative path (`../../../../content/case-studies/${slug}.mdx`)
- Prose styling with `prose-headings:font-display`, `prose-a:text-primary-600`
- Next.js 16 async params pattern (`params: Promise<{ slug: string }>`)

### 3. Listing Page (`src/app/case-studies/page.tsx`)
- PageHeader with breadcrumbs and portfolio subtitle
- Responsive card grid: 1 col mobile, 2 cols sm, 3 cols lg
- Cards: hero image (aspect-[4/3]) with hover scale, category badge, title, excerpt, arrow CTA
- Hover effects: shadow elevation, image zoom, title color shift to primary-600
- Empty state placeholder for pre-migration period
- SEO metadata via `generatePageMetadata()` helper

### 4. Cleanup
- Removed `content/case-studies/example.mdx` (draft test file from Prompt 1)
- Added `content/case-studies/_placeholder.mdx` (draft:true) for Turbopack glob resolution

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Turbopack @content alias does not work with dynamic imports**
- **Found during:** Task 1
- **Issue:** `@content/case-studies/${slug}.mdx` fails in Turbopack -- dynamic imports require resolvable glob patterns and path aliases are not expanded
- **Fix:** Used relative path `../../../../content/case-studies/${slug}.mdx` as plan's fallback option
- **Files modified:** `src/app/case-studies/[slug]/page.tsx`

**2. [Rule 3 - Blocking] Turbopack workspace root inferred from parent lockfile**
- **Found during:** Build verification
- **Issue:** `/Users/noelyaxley/package-lock.json` caused Turbopack to use parent directory as workspace root, breaking relative path resolution for dynamic imports
- **Fix:** Added `turbopack: { root: __dirname }` to `next.config.mjs`
- **Files modified:** `next.config.mjs`
- **Commit:** `e45ca07`

**3. [Rule 3 - Blocking] Dynamic import glob requires at least one .mdx file in directory**
- **Found during:** Task 4 (after removing example.mdx)
- **Issue:** Turbopack cannot resolve dynamic import glob pattern when directory has zero `.mdx` files
- **Fix:** Added `_placeholder.mdx` (draft:true, order:999) to satisfy Turbopack resolver
- **Files created:** `content/case-studies/_placeholder.mdx`
- **Commit:** `9e6ed31`

**4. [Rule 3 - Blocking] Pre-existing insights pages had broken dynamic import path**
- **Found during:** Initial build
- **Issue:** `src/app/insights/[slug]/page.tsx` (from prior Prompt 3 execution) used `@content/insights/` which Turbopack cannot resolve
- **Fix:** File was already corrected to relative path by prior edit; turbopack.root config completed the fix
- **Files modified:** `next.config.mjs` (same fix as deviation #2)

## Commits

| # | Hash | Message |
|---|------|---------|
| 1 | `cf1967c` | feat(p2-2): create case study header component with hero, metadata grid, breadcrumbs |
| 2 | `e45ca07` | feat(p2-2): create case study dynamic route with generateStaticParams |
| 3 | `46d96a1` | feat(p2-2): create case studies listing page with responsive card grid |
| 4 | `6d94884` | chore(p2-2): remove test MDX file from pipeline verification |
| 5 | `3d1e042` | chore(p2-2): add placeholder MDX for Turbopack dynamic import resolution |

## Verification

- `npm run build` passes with zero errors
- `/case-studies` route registered as static (prerendered)
- `/case-studies/[slug]` route registered as SSG (uses generateStaticParams)
- No TypeScript errors
- All 5 commits present in git log

## Self-Check: PASSED

All created files verified present on disk. All 5 commits verified in git log. `example.mdx` confirmed removed.
