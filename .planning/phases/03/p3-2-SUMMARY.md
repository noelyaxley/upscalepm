---
phase: 3
plan: 2
subsystem: homepage
tags: [homepage, hero, sections, marketing, cta]
dependency-graph:
  requires: [p3-1, p3-5]
  provides: [homepage, hero-section, value-proposition, services-overview, featured-case-studies, homepage-cta]
  affects: [page.tsx]
tech-stack:
  added: []
  patterns: [section-composition, data-driven-rendering]
key-files:
  created:
    - src/components/sections/hero.tsx
    - src/components/sections/value-proposition.tsx
    - src/components/sections/services-overview.tsx
    - src/components/sections/featured-case-studies.tsx
    - src/components/sections/homepage-cta.tsx
  modified:
    - src/app/page.tsx
decisions:
  - Hero uses CSS grid pattern and gradient instead of background image to avoid missing image risk
  - Inline SVG icons for value proposition cards rather than Lucide dependency
  - FeaturedCaseStudies receives pre-sliced array rather than slicing internally for flexibility
metrics:
  duration: 2m
  completed: 2026-02-14
  tasks: 6
  files: 6
---

# Phase 3 Plan 2: Homepage Summary

Full marketing homepage composed from 5 new section components replacing the minimal placeholder, with data-driven service cards and featured case study cards.

## What Was Built

### 1. Hero Section (`src/components/sections/hero.tsx`)
- Full-width dark background with subtle CSS grid pattern and primary gradient accent
- Large display heading: "Client-Side Project Management for Property & Construction"
- Supporting subheading describing the value proposition
- Two CTAs above the fold: primary "Start a Project" (-> /contact) and outline "View Our Work" (-> /case-studies)
- Responsive typography scaling (text-4xl to text-6xl)
- Generous vertical padding (py-20 to py-36)

### 2. Value Proposition (`src/components/sections/value-proposition.tsx`)
- 3-column grid on desktop, single column on mobile
- Three differentiators: Architectural Insight, Client-Side Focus, End-to-End Coverage
- Each card has an SVG icon with primary accent background, heading, and description
- Muted background for visual rhythm
- Section heading "Why Choose Upscale"

### 3. Services Overview (`src/components/sections/services-overview.tsx`)
- Receives `ServicePage[]` from `getAllServices()`
- 5 service cards in responsive grid (1/2/3 columns)
- Each card shows title, subtitle (line-clamped), and "Learn more" link
- Links to `/services/{slug}` with hover effects
- "View All Services" link at bottom

### 4. Featured Case Studies (`src/components/sections/featured-case-studies.tsx`)
- Receives `ContentItem<CaseStudyFrontmatter>[]` (first 3 by order)
- Cards with hero image (4:3 aspect ratio), category badge, title, excerpt
- Links to `/case-studies/{slug}` with image zoom hover effect
- "View All Case Studies" link at bottom
- Muted background section

### 5. Homepage CTA (`src/components/sections/homepage-cta.tsx`)
- Full-width dark background
- "Ready to Start Your Project?" heading
- Value reminder description
- Primary "Get in Touch" button linking to /contact

### 6. Homepage Composition (`src/app/page.tsx`)
- Replaced minimal placeholder with full section composition
- Order: Hero -> ClientLogos -> ValueProposition -> ServicesOverview -> FeaturedCaseStudies -> HomepageCta
- No PageHeader (uses Hero instead)
- Data loaded from `getAllServices()` and `getAllCaseStudies().slice(0, 3)`

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- Build succeeds with zero errors (`npm run build`)
- All 50 static pages generated successfully
- Homepage renders: hero, client logos, value proposition, 5 service cards, 3 featured case studies, CTA
- At least one CTA above fold (hero section)
- Service cards link to `/services/{slug}`
- Case study cards link to `/case-studies/{slug}`
- Responsive layout stacks to single column on mobile
- No broken images (hero uses CSS patterns, case study images from existing content)

## Commits

| Commit | Description |
|--------|-------------|
| `cbe6895` | feat(p3-2): create hero section component |
| `58ab9ae` | feat(p3-2): create value proposition section component |
| `f545e05` | feat(p3-2): create services overview section component |
| `84b5542` | feat(p3-2): create featured case studies section component |
| `3d8f1bd` | feat(p3-2): create homepage CTA section component |
| `cd92252` | feat(p3-2): compose full homepage from section components |

## Self-Check: PASSED

- All 6 files verified present on disk
- All 6 commits verified in git log
- Build succeeds with 50 static pages generated
