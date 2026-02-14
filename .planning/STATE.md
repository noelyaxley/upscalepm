# State: UpScalePM

## Project Reference

**Core Value:** Generate qualified leads from property developers and project owners who need experienced client-side PM
**Current Milestone:** v1 -- Website rebuild (WordPress to Next.js)
**Tech Stack:** Next.js 16.1.6, React 19, Tailwind CSS v4, MDX, GSAP, HubSpot, Vercel

## Current Position

**Phase:** 5 of 7 -- Analytics, Tracking & SEO
**Plan:** 1/? prompts complete
**Status:** IN PROGRESS
**Progress:** [####......] 4/7 phases complete

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 1 | Foundation & Design System | Complete |
| 2 | Content Infrastructure & Migration | Complete |
| 3 | Core Pages | Complete |
| 4 | Lead Generation & CRO | Complete |
| 5 | Analytics, Tracking & SEO | In Progress |
| 6 | Animation & Visual Polish | Pending |
| 7 | Programmatic SEO & Launch | Pending |

## Phase 1 Prompt Status

| Prompt | Title | Status | Commit |
|--------|-------|--------|--------|
| 1 | Project Scaffolding & Core Dependencies | Done | `161735d` |
| 2 | Design System -- Colour, Typography, Spacing | Done | `5127341` |
| 3 | Responsive Layout Primitives | Done | `e111fde` |
| 4 | Design System Test Page | Done | `59a93e8` |
| 5 | Favicon, OG Images & SEO Infrastructure | Done | `5f32854` |
| 6 | WordPress Content Crawl & 301 Redirect Map | Done | `77ce4b1` |
| 7 | Vercel Deployment & GitHub Integration | Partial | `e095f40` (vercel.json only) |

## Phase 2 Prompt Status

| Prompt | Title | Status | Commit |
|--------|-------|--------|--------|
| 1 | MDX Pipeline Setup | Done | `9568afc`..`3c4de00` (7 commits) |
| 2 | Case Study Template & Dynamic Route | Done | `cf1967c`..`3d1e042` (5 commits) |
| 3 | Insights Template & Dynamic Route | Done | `f2b0995`..`2e3630f` (3 commits) |
| 4 | Interactive MDX Components | Done | `b770f08`..`b6b66a0` (2 commits) |
| 5 | Image Migration & Organization | Done | `013f119`..`64c8429` (2 commits) |
| 6 | Case Study Content Migration | Done | `fb89488` (1 commit) |
| 7 | Insights Content Migration | Done | `0db2389`..`abd2751` (3 commits) |
| 8 | Service Page Copy Extraction | Done | `87c8db8`..`2ea0185` (3 commits) |

## Phase 3 Prompt Status

| Prompt | Title | Status | Commit |
|--------|-------|--------|--------|
| 1 | Service Page Template & 5 Service Pages | Done | `38e955e`..`3f9240f` (4 commits) |
| 2 | Homepage | Done | `cbe6895`..`cd92252` (6 commits) |
| 3 | About / Team Page | Done | `8e0a74e`..`48f111b` (2 commits) |
| 4 | Contact Page | Done | `351e85f`..`56d3122` (3 commits) |
| 5 | Client Logo Bar Component | Done | `ca77633` |
| 6 | Privacy Policy & Terms of Service | Done | `2e8ff03`..`6b8847f` (3 commits) |
| 7 | Enhance Existing Pages | Done | `b645e49`..`0b201f1` (3 commits) |
| 8 | Navigation Audit & Cross-linking | Done | `db494bd` |

## Phase 4 Prompt Status

| Prompt | Title | Status | Commit |
|--------|-------|--------|--------|
| 1 | HubSpot Tracking, UTM Capture & Root Layout Wiring | Done | `d1dfe98`..`0e4b053` (5 commits) |
| 2 | Contact Form Server Action & HubSpot Wiring | Pending | |
| 3 | Calendly Booking Integration | Pending | |
| 4 | CRO -- Contact Page Optimisation | Pending | |
| 5 | CRO -- Homepage & Service Pages | Pending | |
| 6 | HubSpot Email Automation Documentation & Final Verification | Pending | |

## Phase 5 Prompt Status

| Prompt | Title | Status | Commit |
|--------|-------|--------|--------|
| 1 | GTM Container Script & DataLayer Event Utilities | Done | `d368c1c`..`2a2c0fb` (4 commits) |

## Performance Metrics

| Metric | Value |
|--------|-------|
| Plans completed | 8 |
| Plans failed | 0 |
| Phases completed | 3 |
| Total requirements | 64 |
| Requirements done | 32 (Phase 1: DSGN-01/02/03/09, SEO-01/05, DEPL-01, MIG-01; Phase 2: CONT-01/02/03/05/06/08, MIG-02/03/04/05; Phase 3: PAGE-01/02/03/04/05/06/07/08/09/10/11/12/13, CONT-04/07) |
| P2-P1 duration | 3m (7 tasks, 8 files) |
| P2-P2 duration | 4m (4 tasks, 6 files) |
| P2-P4 duration | 2m (2 tasks, 8 files) |
| P2-P5 duration | 3m (3 tasks, 90 files) |
| P2-P8 duration | 6m (3 tasks, 2 files) |
| P2-P6 duration | 8m (1 task, 15 files) |
| P2-P7 duration | 7m (3 tasks, 15 files) |
| P3-P5 duration | 1m (1 task, 1 file) |
| P3-P4 duration | 2m (3 tasks, 6 files) |
| P3-P3 duration | 2m (3 tasks, 2 files) |
| P3-P6 duration | 2m (3 tasks, 3 files) |
| P3-P1 duration | 2m (6 tasks, 6 files) |
| P3-P2 duration | 2m (6 tasks, 6 files) |
| P3-P7 duration | 2m (4 tasks, 3 files) |
| P4-P1 duration | 2m (5 tasks, 6 files) |
| P4-P3 duration | 3m (5 tasks, 6 files) |
| P5-P1 duration | 1m (5 tasks, 5 files) |

## Accumulated Context

### Key Decisions

| Decision | Rationale | Phase |
|----------|-----------|-------|
| 7 phases (standard depth) | 64 requirements cluster into 7 natural delivery boundaries | Roadmap |
| MIG-01 + SEO-05 in Phase 1 | WordPress crawl and redirect map must happen before any content work or launch | Roadmap |
| CRO grouped with HubSpot (Phase 4) | Conversion optimisation is inseparable from lead generation machinery | Roadmap |
| Animation last (Phase 6) | Enhancement layer, not structural -- pages must work before they animate | Roadmap |
| PSEO + Launch together (Phase 7) | Location pages are the final content; DNS cutover is the final deployment step | Roadmap |
| shadcn bridge variables preserved | Removing --color-X: var(--X) pattern would break all shadcn components | 1 |
| @plugin for typography in TW v4 | v0.5.x typography has no CSS entry point; @plugin is the correct directive | 1 |
| Kept shadcn calc-based radius | Shadcn components expect calc(var(--radius) +/- N) pattern | 1 |
| Header as client component | Sheet (mobile menu) requires client-side interactivity via Radix Dialog | 1 |
| Nav links as shared const array | Header and footer mirror same links; const array prevents drift | 1 |
| Removed static favicon.ico for dynamic icon.tsx | Static favicon.ico takes precedence over dynamic route; removal required for branded favicon | 1 |
| Redirects via readFileSync with try/catch | Build-time loading with graceful fallback if file missing | 1 |
| @next/mdx + remark-frontmatter + remark-mdx-frontmatter | Standard pipeline for local MDX content, no next-mdx-remote needed | 2 |
| Manual migration over automated HTML-to-MDX | Only ~28 articles; manual produces cleaner MDX than Elementor HTML conversion | 2 |
| Service pages as React components, not MDX | Service pages need custom layouts and CTAs; copy stored as TypeScript data | 2 |
| Images in public/ not pre-converted | next/image + sharp handles AVIF/WebP negotiation at serve time | 2 |
| All insights under /insights/ URL | Single URL structure with category frontmatter field for filtering | 2 |
| 3 separate Granville Diggers case studies | Different project phases warrant separate pages | 2 |
| String-based plugin references for Turbopack | Next.js 16 Turbopack cannot serialize function references in loader options; use string names instead | 2 |
| `not-prose` on block-level MDX components | Prevents Tailwind typography plugin from overriding component styles inside MDX | 2 |
| Global MDX component registration | Components registered in mdx-components.tsx so no per-file imports needed in MDX | 2 |
| Hero/gallery naming convention for images | Largest file = hero.ext, rest = gallery-NN.ext per project directory | 2 |
| Relative path for MDX dynamic imports | Turbopack cannot resolve @content alias in dynamic imports; use relative path | 2 |
| turbopack.root in next.config.mjs | Parent lockfile caused incorrect workspace root inference; explicit root fixes it | 2 |
| Placeholder MDX for empty content dirs | Turbopack requires at least one .mdx to resolve dynamic import glob patterns | 2 |
| 89 unique images after WP dedup (not 60-70 estimate) | construction-pm has 18 generic photos; all are genuine originals | 2 |
| Content split into 2 sections per service | Structural clarity for rendering; meets 2+ sections requirement | 2 |
| Related case studies mapped by service relevance | Feasibility/DA linked to planning projects; construction to delivery projects | 2 |
| construction-pm images reused for non-dedicated case studies | private-architectural and delivering-complexity lack dedicated photos; generic construction-pm images used | 2 |
| Peat Island spelling in body, pete-island in slug | Redirect map uses pete-island; body text uses correct Peat Island spelling | 2 |
| Insight content reconstructed from 500-char previews | Crawl data only has bodyTextPreview; full articles written from metadata + domain knowledge | 2 |
| construction-pm images reused for Quick Bites without dedicated dirs | 7 of 10 Quick Bites articles lack dedicated image directories; construction-pm gallery provides contextual hero images | 2 |
| Publication dates inferred from WP image upload timestamps | No explicit publish dates in crawl data; image upload paths (2025/08, 2025/09, etc.) used as proxy | 2 |
| Consistent h-10/h-12 height for logo bar | Responsive scaling with Tailwind classes instead of fixed pixel dimensions; muted background keeps logos unobtrusive | 3 |
| WordPress content fetched via curl for about page | Accurate real content (FJMT, $40M portfolio) rather than generic fallback | 3 |
| Inline CTA on about page (not ServiceCta) | ServiceCta component not yet created by Prompt 1 (parallel execution) | 3 |
| Real WP content for legal pages via curl | Accurate legal content from live site rather than generic fallback | 3 |
| 4-col footer grid with Legal column | Separate Legal nav section keeps footer organized as links grow | 3 |
| Service hero images from case study photos | No dedicated service images exist; case study heroes are the most relevant project visuals | 3 |
| Dual service model as callout + comparison cards | Callout on service pages, side-by-side cards on index -- different contexts need different treatments | 3 |
| Alternating section backgrounds for service pages | default/muted alternation creates visual rhythm without adding complexity | 3 |
| Radix Select for project type dropdown | Accessible, keyboard-navigable dropdown instead of native HTML select; consistent shadcn styling | 3 |
| Form success replaces form with confirmation | Prevents confusion about re-submission; "Send another enquiry" button to reset | 3 |
| Simulated submit with 1s delay | Demonstrates loading UX; actual HubSpot wiring deferred to Phase 4 | 3 |
| Hero uses CSS pattern instead of background image | No suitable hero image exists; CSS grid pattern + gradient avoids missing image risk | 3 |
| Inline SVG icons for value proposition | Avoids Lucide dependency; simple inline SVGs are lighter and self-contained | 3 |
| FeaturedCaseStudies receives pre-sliced array | Parent controls slice size for flexibility; component renders whatever it receives | 3 |
| Featured case study as horizontal 2-col card | First case study gets hero treatment; remaining in standard grid for visual hierarchy | 3 |
| Insights index verified, no changes needed | Existing implementation meets CONT-07 with filtering, responsive grid, and metadata | 3 |
| Dynamic sitemap from content helpers | getAllServices/CaseStudies/Insights generate URLs at build time; no manual URL maintenance | 3 |
| First-touch UTM attribution | Only stores UTMs if none already in sessionStorage, preserving original acquisition source | 4 |
| useRef skip pattern for HubSpot | Prevents double-counting initial page view since HubSpot script auto-fires trackPageView on load | 4 |
| Graceful degradation for HubSpot | HubSpotTracker renders null when portal ID missing or REPLACE_ME; dev works without credentials | 4 |
| .env.example via gitignore exception | Added !.env.example to .gitignore since existing .env* pattern would block it | 4 |
| CalendlyInlineDynamic wrapper pattern | 'use client' wrapper with next/dynamic ssr:false for embedding Calendly in server components | 4 |
| Anchor link over PopupButton in server context | ServiceCta uses plain <a> to Calendly URL since it's a server component | 4 |
| Mounted state guard in CalendlyPopup | useState/useEffect pattern instead of dynamic import for PopupButton SSR safety | 4 |
| GTM afterInteractive strategy | Avoids blocking FCP; loads GTM after hydration instead of beforeInteractive | 5 |
| Graceful degradation for GTM | GTMScript renders null when NEXT_PUBLIC_GTM_ID is unset or REPLACE_ME; dev works without credentials | 5 |
| dataLayer push utilities server-safe | typeof window guard and dataLayer initialization allow SSR-safe event pushing | 5 |

### WordPress Crawl Results

- 55 pages crawled (28 posts, 15 pages, 9 category pages, 3 feeds)
- 120 unique image URLs, 118 downloaded (22MB) to `content/migration/images/`
- 61 redirects mapped in `content/migration/redirects.json`
- Crawl data in `content/migration/crawl-data.json`

### Discovered TODOs

- [ ] Confirm WordPress admin access before Phase 2 (content migration requires database/export access)
- [ ] Define animation complexity scope during Phase 1 (how aggressive are parallax effects?)
- [ ] Clarify HubSpot workflow configuration ownership (in-app config vs code)
- [ ] Acquire real project photos for case studies and service pages (no stock photography)
- [ ] Ensure access to physical mid-range Android device for CWV testing (Phase 6)

### Blockers

None currently.

## Session Continuity

**Last session:** Phase 5 Prompt 1 complete -- GTM container script and dataLayer event utilities.
**Next action:** Execute Phase 5 Prompt 2.
**Context to preserve:** GTM installed in root layout with afterInteractive strategy, graceful degradation when GTM_ID is REPLACE_ME. dataLayer push helpers exported from `src/components/analytics/gtm-event.ts`. GA4 enhanced measurement will handle SPA page views automatically -- no manual page_view events needed. Contact form wired to HubSpot via Server Action with zod validation + UTM attribution. All integrations gracefully degrade with placeholder env vars.

---
*State initialized: 2026-02-14*
*Phase 2 planned: 2026-02-14*
*Phase 2 Prompt 1 completed: 2026-02-14*
*Phase 2 Prompt 4 completed: 2026-02-14*
*Phase 2 Prompt 5 completed: 2026-02-14*
*Phase 2 Prompt 2 completed: 2026-02-14*
*Phase 2 Prompt 8 completed: 2026-02-14*
*Phase 2 Prompt 6 completed: 2026-02-14*
*Phase 2 Prompt 7 completed: 2026-02-14*
*Phase 2 COMPLETE: 2026-02-14*
*Phase 3 Prompt 5 completed: 2026-02-14*
*Phase 3 Prompt 3 completed: 2026-02-14*
*Phase 3 Prompt 6 completed: 2026-02-14*
*Phase 3 Prompt 1 completed: 2026-02-14*
*Phase 3 Prompt 4 completed: 2026-02-14*
*Phase 3 Prompt 2 completed: 2026-02-14*
*Phase 3 Prompt 7 completed: 2026-02-14*
*Phase 3 Prompt 8 completed: 2026-02-14*
*Phase 3 COMPLETE: 2026-02-14*
*Phase 4 Prompt 1 completed: 2026-02-14*
*Phase 4 Prompt 3 completed: 2026-02-14*
*Phase 5 Prompt 1 completed: 2026-02-14*
