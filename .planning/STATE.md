# State: UpScalePM

## Project Reference

**Core Value:** Generate qualified leads from property developers and project owners who need experienced client-side PM
**Current Milestone:** v1 -- Website rebuild (WordPress to Next.js)
**Tech Stack:** Next.js 16.1.6, React 19, Tailwind CSS v4, MDX, GSAP, HubSpot, Vercel

## Current Position

**Phase:** 2 of 7 -- Content Infrastructure & Migration
**Plan:** Prompt 1 of 8 complete, next: Prompt 2 (Case Study Template & Dynamic Route)
**Status:** EXECUTING (Prompt 1 complete)
**Progress:** [#.........] 1/7 phases complete (Phase 2: 1/8 prompts)

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 1 | Foundation & Design System | Complete |
| 2 | Content Infrastructure & Migration | Planned |
| 3 | Core Pages | Pending |
| 4 | Lead Generation & CRO | Pending |
| 5 | Analytics, Tracking & SEO | Pending |
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
| 2 | Case Study Template & Dynamic Route | Pending | -- |
| 3 | Insights Template & Dynamic Route | Pending | -- |
| 4 | Interactive MDX Components | Pending | -- |
| 5 | Image Migration & Organization | Pending | -- |
| 6 | Case Study Content Migration | Pending | -- |
| 7 | Insights Content Migration | Pending | -- |
| 8 | Service Page Copy Extraction | Pending | -- |

## Performance Metrics

| Metric | Value |
|--------|-------|
| Plans completed | 2 |
| Plans failed | 0 |
| Phases completed | 1 |
| Total requirements | 64 |
| Requirements done | 9 (Phase 1: DSGN-01/02/03/09, SEO-01/05, DEPL-01, MIG-01; Phase 2: CONT-01) |
| P2-P1 duration | 3m (7 tasks, 8 files) |

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

**Last session:** Phase 2 Prompt 1 (MDX Pipeline Setup) executed successfully. 7 atomic commits.
**Next action:** Execute Phase 2 Prompt 2 (Case Study Template & Dynamic Route)
**Context to preserve:** Research recommends `/gsd:research-phase` for Phase 6 (scroll animation performance). Turbopack requires string-based plugin refs in next.config.mjs.

---
*State initialized: 2026-02-14*
*Phase 2 planned: 2026-02-14*
*Phase 2 Prompt 1 completed: 2026-02-14*
