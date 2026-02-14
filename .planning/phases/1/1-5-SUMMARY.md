---
phase: 1
plan: 5
subsystem: seo-metadata
tags: [favicon, og-image, sitemap, robots, 404, redirects, seo]
dependency-graph:
  requires: [layout-primitives, design-system, wordpress-crawl]
  provides: [favicon, og-images, sitemap, robots, 404-page, redirect-map]
  affects: [all-pages, social-sharing, search-indexing]
tech-stack:
  added: [next/og ImageResponse]
  patterns: [dynamic-favicon, dynamic-og-images, metadata-route-handlers]
key-files:
  created:
    - src/app/icon.tsx
    - src/app/apple-icon.tsx
    - src/app/opengraph-image.tsx
    - src/app/twitter-image.tsx
    - src/app/sitemap.ts
    - src/app/robots.ts
    - src/app/not-found.tsx
  modified:
    - next.config.mjs
  deleted:
    - src/app/favicon.ico
decisions:
  - Removed static favicon.ico in favour of dynamic icon.tsx to ensure branded favicon renders
  - Twitter image duplicated rather than re-exported for explicit route registration
  - Redirects loaded via readFileSync at build time with try/catch for resilience
metrics:
  duration: 71s
  completed: 2026-02-14T07:05:30Z
---

# Phase 1 Plan 5: SEO Metadata, Favicons, and 404 Page Summary

Dynamic branded favicon and Apple touch icon using next/og ImageResponse, OG and Twitter social images with gradient background, sitemap and robots.txt as Next.js route handlers, branded 404 page, and WordPress redirect map integrated into next.config.mjs.

## What Was Built

### Dynamic Favicon (icon.tsx)
32x32 PNG generated at build time using `next/og` ImageResponse. White "U" on orange (#c2410c) background with 4px border radius. Replaces the default Next.js favicon.ico.

### Apple Touch Icon (apple-icon.tsx)
180x180 PNG with same branding -- white "U" on orange background with 24px border radius for iOS home screen.

### OG Image (opengraph-image.tsx)
1200x630 default Open Graph image. Dark-to-orange gradient background with "UpScalePM" label, "Client-Side Project Management" heading, and tagline.

### Twitter Image (twitter-image.tsx)
Mirrors the OG image for Twitter card rendering. Separate file ensures explicit route registration.

### Sitemap (sitemap.ts)
Six static pages: home, services, case-studies, insights, about, contact. Returns XML at `/sitemap.xml` with appropriate change frequencies and priorities.

### Robots (robots.ts)
Allows all crawlers on `/`, disallows `/design-system`. Points to sitemap at `https://upscalepm.com.au/sitemap.xml`.

### 404 Page (not-found.tsx)
Branded not-found page using Section layout primitive. Shows "404" in primary color, "Page not found" heading, explanatory text, and two buttons: "Go home" and "Contact us".

### WordPress Redirect Map (next.config.mjs)
60 redirects loaded from `content/migration/redirects.json` at build time. Covers old WordPress blog posts, category pages, author pages, feed URLs, WP API endpoints, and service pages. All mapped to their new Next.js equivalents as 301 permanent redirects.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Removed default favicon.ico**
- **Found during:** Task 1 (icon.tsx creation)
- **Issue:** Default Next.js `favicon.ico` would take precedence over the dynamic `icon.tsx`, preventing the branded favicon from rendering
- **Fix:** Deleted `src/app/favicon.ico`
- **Files modified:** src/app/favicon.ico (deleted)
- **Commit:** 5f32854

## Verification

- Build passes: All routes registered (icon, apple-icon, opengraph-image, twitter-image, sitemap.xml, robots.txt, _not-found)
- No TypeScript errors
- No compilation warnings (aside from unrelated workspace root detection)

## Commits

| Hash | Message |
|------|---------|
| 5f32854 | feat(phase-1): favicon, OG images, sitemap, robots.txt, and 404 page |

## Self-Check: PASSED

All 7 created files verified on disk. Deleted file (favicon.ico) confirmed absent. Commit 5f32854 confirmed in git log. Build passes with all routes registered.
