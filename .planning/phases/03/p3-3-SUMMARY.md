# Phase 3 Plan 3: About / Team Page Summary

**One-liner:** About page with WordPress-sourced company story, 4 value cards, team bios with photos, and CTA section.

## Frontmatter

- **Phase:** 3
- **Plan:** 3
- **Subsystem:** pages
- **Tags:** about, team, content, branding
- **Requirements covered:** PAGE-07
- **Dependency graph:**
  - **Requires:** Layout primitives (Phase 1), metadata helper (Phase 1)
  - **Provides:** /about route, TeamGrid component
  - **Affects:** Header nav (already links to /about), sitemap

## Tech Stack

- **Added:** None (uses existing primitives)
- **Patterns:** Section alternation (default/muted/dark backgrounds), 2-col story layout, 4-col value grid, 3-col team grid

## Key Files

### Created
- `src/app/about/page.tsx` -- About page with company story, values, philosophy, team, CTA
- `src/components/sections/team-grid.tsx` -- Reusable team member grid component

### Modified
- None

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| WordPress content fetched via curl for company story and Noel's bio | Accurate real content rather than fallback placeholder |
| Kenny and Nathan bios written from role context (no WP bios available) | WordPress only had Noel's bio; professional bios written for PM roles |
| about-upscale.png used as Noel's photo placeholder | No dedicated headshot exists; plan specified this approach |
| Inline CTA section rather than reusing ServiceCta component | ServiceCta not yet created (Prompt 1 parallel execution); avoided cross-dependency |
| 4 values (not 3) matching plan spec | Plan specified 3-4 values; 4 gives balanced grid on desktop |

## Task Completion

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Create TeamGrid component | `8e0a74e` | `src/components/sections/team-grid.tsx` |
| 2 | Create About page with full content | `48f111b` | `src/app/about/page.tsx` |
| 3 | Build verification | -- | (verified: 49 pages, 0 errors) |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Inline CTA instead of reusing ServiceCta**
- **Found during:** Task 2
- **Issue:** Plan suggested reusing `ServiceCta` component from Prompt 1, but it doesn't exist yet (parallel execution)
- **Fix:** Built CTA section inline in the about page using Section background="dark" and Button component
- **Files modified:** `src/app/about/page.tsx`

**2. [Rule 2 - Missing Content] Added Specialisations and Philosophy sections**
- **Found during:** Task 2
- **Issue:** WordPress about page had richer content (Specialisations, Comprehensive Services, Client-Centric Approach, Philosophy) beyond what the fallback story covered
- **Fix:** Included all substantive WordPress content sections for a complete, accurate about page
- **Files modified:** `src/app/about/page.tsx`

## Verification Results

- [x] `/about` renders with company story, values, and team members
- [x] Team photos display correctly (kenny-gunawan.jpg, nathan-maccullum.jpg, about-upscale.png)
- [x] Page has proper metadata (title: "About", description, canonical URL, OG tags)
- [x] Page has breadcrumbs (Home / About)
- [x] Responsive layout (grid breakpoints for all sections)
- [x] `npm run build` succeeds (49 static pages, 0 errors)

## Metrics

- **Duration:** ~2 minutes
- **Tasks:** 3/3 complete
- **Files created:** 2
- **Completed:** 2026-02-14
