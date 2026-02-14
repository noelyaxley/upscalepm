---
phase: 6
plan: 2
subsystem: scroll-reveal-animations
tags: [gsap, scrolltrigger, scroll-reveal, batch-animation, reduced-motion]
dependency-graph:
  requires: [gsap-config, smooth-scroll-provider]
  provides: [scroll-reveal-batch, data-reveal-sections]
  affects: [section.tsx, layout.tsx, globals.css]
tech-stack:
  added: [scrolltrigger-batch]
  patterns: [css-initial-state-with-media-query, gsap-matchmedia-motion-guard, data-attribute-animation-targets]
key-files:
  created:
    - src/components/animation/scroll-reveal.tsx
  modified:
    - src/components/layout/section.tsx
    - src/app/globals.css
    - src/app/layout.tsx
decisions:
  - "CSS initial state scoped to prefers-reduced-motion: no-preference -- reduced-motion users see content immediately"
  - "ScrollReveal in layout.tsx instead of page.tsx -- works on all pages regardless of entry URL"
  - "ScrollTrigger.batch over individual ScrollTriggers -- single watcher for all [data-reveal] elements"
metrics:
  duration: 1m
  tasks: 4
  files: 4
  completed: 2026-02-14
---

# Phase 6 Plan 2: ScrollTrigger Batch Reveal Animations on All Sections Summary

ScrollTrigger.batch for performant fade-up section reveals via [data-reveal] CSS attribute targeting, with CSS-first initial state and prefers-reduced-motion guard at both CSS and JS layers.

## What Was Built

### 1. ScrollReveal Component (`src/components/animation/scroll-reveal.tsx`)

Client component that renders null but registers a global ScrollTrigger.batch watcher for all `[data-reveal]` elements.

- **gsap.matchMedia** wraps all animation in `(prefers-reduced-motion: no-preference)` -- auto-reverts when reduced motion is active
- **ScrollTrigger.batch** config: `interval: 0.1`, `batchMax: 3`, `start: 'top 85%'`
- **onEnter animation**: `opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', overwrite: true`
- **useGSAP** handles cleanup on unmount automatically

### 2. Section Component Data Attribute (`src/components/layout/section.tsx`)

Added `data-reveal=""` attribute to the `<section>` element. All pages using the Section component (homepage, services, about, contact, case studies, insights) now automatically participate in scroll-driven reveal animations without per-page changes.

The hero section is unaffected -- it uses a custom `<section>` element, not the Section component, so it does not receive `data-reveal`.

### 3. CSS Initial State (`src/app/globals.css`)

Added `[data-reveal]` CSS rule scoped to `@media (prefers-reduced-motion: no-preference)`:
- `opacity: 0; transform: translateY(2.5rem)` -- elements hidden before JS loads
- Media query ensures reduced-motion users see content immediately (no opacity/transform applied)
- CSS media query matches gsap.matchMedia condition exactly for consistent behavior

### 4. Root Layout Integration (`src/app/layout.tsx`)

Added `<ScrollReveal />` inside the `<SmoothScroll>` wrapper, after `<UTMProvider />`. This ensures the batch watcher is active on every page load regardless of entry URL, unlike placing it on page.tsx which would only work for homepage direct loads.

## Commits

| Task | Description | Commit | Files |
|------|------------|--------|-------|
| 1 | ScrollReveal component with ScrollTrigger.batch | `211f5fe` | src/components/animation/scroll-reveal.tsx |
| 2 | Add data-reveal attribute to Section component | `7eda926` | src/components/layout/section.tsx |
| 3 | CSS initial state for scroll reveal elements | `f184c35` | src/app/globals.css |
| 4 | Add ScrollReveal to root layout | `b02502e` | src/app/layout.tsx |

## Deviations from Plan

None -- plan executed exactly as written.

## Acceptance Criteria Verification

- [x] `src/components/animation/scroll-reveal.tsx` exists with ScrollTrigger.batch setup inside gsap.matchMedia
- [x] `src/components/layout/section.tsx` has `data-reveal=""` on the section element
- [x] `src/app/globals.css` has `[data-reveal]` CSS with opacity/transform initial state, scoped to `prefers-reduced-motion: no-preference`
- [x] `src/app/layout.tsx` includes `<ScrollReveal />` inside the SmoothScroll wrapper
- [x] `npm run build` succeeds with zero errors (50/50 pages)

## Self-Check: PASSED

All 4 files verified present. All 4 commit hashes verified in git log.
