---
phase: 3
plan: 1
subsystem: pages/services
tags: [services, dynamic-routes, page-template, dual-model]
dependency-graph:
  requires: [services.ts, services.types.ts, content.ts, layout-primitives]
  provides: [service-page-template, services-index, service-benefits, service-cta, related-case-studies]
  affects: [homepage, navigation]
tech-stack:
  added: [lucide-react-arrows]
  patterns: [generateStaticParams, async-params, alternating-section-bg]
key-files:
  created:
    - src/app/services/[slug]/page.tsx
    - src/app/services/page.tsx
    - src/components/sections/service-benefits.tsx
    - src/components/sections/service-cta.tsx
    - src/components/sections/related-case-studies.tsx
  modified:
    - src/lib/services.ts
decisions:
  - Hero images sourced from related case study photos instead of non-existent service images
  - Dual service model (PAGE-12) rendered as callout box on service pages and comparison cards on index
  - Content sections alternate between default and muted backgrounds for visual rhythm
metrics:
  duration: 2m
  completed: 2026-02-14
  tasks: 6
  files: 6
---

# Phase 3 Plan 1: Service Page Template & 5 Service Pages Summary

Dynamic service page template rendering 5 services with hero overlay, alternating content sections, benefits grid, dual engagement model callout, CTA, and related case studies -- plus a services index with grid cards and engagement model comparison.

## What Was Built

### Service Page Template (`src/app/services/[slug]/page.tsx`)
- Dynamic route with `generateStaticParams()` for all 5 service slugs
- `dynamicParams = false` for strict static generation
- Async params pattern for Next.js 16 compatibility
- Hero section: case study photo as subtle background overlay with gradient fade
- PageHeader with breadcrumbs (Home > Services > [Service Name])
- Content sections from `service.sections[]` with alternating `default`/`muted` backgrounds
- `ServiceBenefits` component rendering benefit cards in responsive grid
- Dual service model callout (PAGE-12): styled aside with left border accent
- `ServiceCta` component with dark background and primary button
- `RelatedCaseStudies` component fetching and rendering up to 3 related project cards

### Services Index (`src/app/services/page.tsx`)
- Grid of 5 service cards (1 col mobile, 2 cols md, 3 cols lg)
- Each card: title, subtitle, excerpt (first 120 chars of first section), arrow link
- Dual service model section (PAGE-12): "Two Ways to Work With Us" with project engagement vs advisory retainer comparison cards
- Bottom CTA section with dark background

### Reusable Section Components
- **ServiceBenefits**: Responsive 3-column grid of benefit cards with orange accent bar, hover shadow, title/description
- **ServiceCta**: Full-width dark section with centered heading, description, and primary CTA button
- **RelatedCaseStudies**: Fetches case study frontmatter by slug, renders cards with hero image, category badge, title, excerpt, and "View project" link. Gracefully handles missing slugs.

### Hero Image Fix
Updated all 5 `heroImage` paths in `services.ts` to reference existing case study hero photos:
- feasibility-advisory: `/images/case-studies/granville-diggers/hero.jpg`
- design-management: `/images/case-studies/crosslife-church/hero.jpg`
- da-approval: `/images/case-studies/pete-island/hero.jpg`
- tender-assessment: `/images/case-studies/vibe-hotel/hero.jpg`
- construction-superintendent: `/images/case-studies/sydney-water/hero.jpg`

## Requirements Covered

| Requirement | Description | Status |
|-------------|-------------|--------|
| PAGE-02 | Feasibility & Advisory service page | Done |
| PAGE-03 | Design Management service page | Done |
| PAGE-04 | DA Approval service page | Done |
| PAGE-05 | Tender Assessment service page | Done |
| PAGE-06 | Construction Superintendent service page | Done |
| PAGE-12 | Dual service model (project + retainer) | Done |

## Deviations from Plan

None -- plan executed exactly as written.

## Commits

| Commit | Description |
|--------|-------------|
| `38e955e` | fix(p3-1): update service heroImage paths to use existing case study images |
| `f5829e2` | feat(p3-1): add ServiceBenefits, ServiceCta, and RelatedCaseStudies components |
| `0564e0c` | feat(p3-1): add dynamic service page template with all 5 services |
| `3f9240f` | feat(p3-1): add services index page with 5 service cards and dual model section |

## Verification

- `npm run build` passes with all 5 service pages statically generated
- All hero images verified to exist on disk
- 50 static pages generated successfully (including 5 service pages)
- No TypeScript errors, no build warnings

## Self-Check: PASSED

All 5 created files verified on disk. All 4 commits verified in git log.
