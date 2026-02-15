---
phase: 2
plan: 3
title: "Insights Template & Dynamic Route"
subsystem: content
tags: [insights, mdx, dynamic-route, category-filter, rsc]
dependency-graph:
  requires: [p2-1]
  provides: [insights-route, insights-listing, insight-header]
  affects: [p2-7]
tech-stack:
  patterns: [server-component, client-component-boundary, generateStaticParams, async-params]
key-files:
  created:
    - src/app/insights/[slug]/page.tsx
    - src/app/insights/page.tsx
    - src/app/insights/insights-grid.tsx
    - src/components/insight-header.tsx
    - content/insights/_placeholder.mdx
decisions:
  - Relative path for dynamic MDX import instead of @content alias (Turbopack compatibility)
  - Placeholder MDX file required for empty content directories (Turbopack dynamic import resolution)
  - InsightsGrid as separate 'use client' component to keep page.tsx as server component
  - Data serialised from server to client via props to maintain RSC boundary
metrics:
  duration: 3m
  completed: "2026-02-14T07:52:33Z"
  tasks: 3
  files: 5
---

# Phase 2 Plan 3: Insights Template & Dynamic Route Summary

Insights dynamic route, listing page with client-side category filtering (All/Quick Bites/Articles), and insight header component with author, date, reading time, and tag display.

## What Was Built

### 1. Insight Header Component (`src/components/insight-header.tsx`)

Server component that renders the full header for individual insight articles:
- Breadcrumbs: Home > Insights > {title}
- Category badge with distinct styling (amber for Quick Bites, primary orange for Articles)
- Title in Playfair Display (font-display)
- Meta line: author name, formatted date (e.g. "14 February 2026"), reading time (e.g. "5 min read")
- Tags rendered as small inline badges
- Conditional hero image with `next/image` fill + priority

### 2. Insight Dynamic Route (`src/app/insights/[slug]/page.tsx`)

- `generateStaticParams()` discovers all non-draft insight MDX files
- `dynamicParams = false` for full static generation
- Async params pattern for Next.js 16 compatibility
- OpenGraph metadata includes `type: 'article'`, `publishedTime`, `modifiedTime`, `authors`, `tags`
- MDX content rendered inside prose container with typography customisations

### 3. Insights Listing Page (`src/app/insights/page.tsx` + `insights-grid.tsx`)

**Server component (page.tsx):**
- PageHeader with title, subtitle, and breadcrumbs
- Calls `getAllInsights()` to fetch all non-draft insights sorted by date
- Serialises insight data to plain objects for client component consumption
- Empty state placeholder when no insights exist yet

**Client component (insights-grid.tsx):**
- Category filter tabs: All, Quick Bites, Articles (client-side filtering, no page reload)
- Responsive card grid: 1 col mobile, 2 cols md, 3 cols lg
- Cards display: hero image (aspect-4/3 with hover scale), category badge, title, excerpt, author, date, reading time
- ARIA roles on filter tabs for accessibility

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Turbopack cannot resolve @content alias in dynamic imports**
- **Found during:** Task 2
- **Issue:** `@content/insights/${slug}.mdx` dynamic import fails with Turbopack because it cannot serialise the alias for glob pattern resolution
- **Fix:** Changed to relative path `../../../../content/insights/${slug}.mdx`
- **Files modified:** `src/app/insights/[slug]/page.tsx`

**2. [Rule 3 - Blocking] Turbopack fails on dynamic import to empty directory**
- **Found during:** Task 2 (build verification)
- **Issue:** When `content/insights/` directory has no `.mdx` files, Turbopack cannot create a module context for the dynamic import glob pattern, causing build failure
- **Fix:** Created `content/insights/_placeholder.mdx` (draft: true) so Turbopack can resolve the glob. This file will be removed once real insight content is migrated in Prompt 7.
- **Files created:** `content/insights/_placeholder.mdx`

## Commits

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Insight header component | `f2b0995` | `src/components/insight-header.tsx` |
| 2 | Insight dynamic route | `781005a` | `src/app/insights/[slug]/page.tsx`, `content/insights/_placeholder.mdx` |
| 3 | Insights listing page with category filter | `2e3630f` | `src/app/insights/page.tsx`, `src/app/insights/insights-grid.tsx` |

## Verification

- `npm run build` succeeds with zero errors
- `/insights` route registered as static (prerendered)
- `/insights/[slug]` route registered as SSG with generateStaticParams
- Category filter component uses `'use client'` directive
- Page component remains a server component
- All TypeScript compiles without errors

## Self-Check: PASSED

All 5 created files verified on disk. All 3 commit hashes (`f2b0995`, `781005a`, `2e3630f`) verified in git log. `'use client'` directive confirmed in `insights-grid.tsx`.
