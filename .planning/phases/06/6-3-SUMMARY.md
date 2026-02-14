---
phase: 6
plan: 3
subsystem: hero-entrance-animation
tags: [gsap, splittext, parallax, scrolltrigger, hero, reduced-motion, lcp]
dependency-graph:
  requires: [gsap-config]
  provides: [split-heading-component, parallax-hero-component, hero-entrance-animation]
  affects: [hero.tsx]
tech-stack:
  added: [splittext-create, scrolltrigger-scrub-parallax]
  patterns: [gsap-from-for-lcp-safety, autosplit-font-reload, desktop-only-parallax, matchmedia-compound-conditions]
key-files:
  created:
    - src/components/animation/split-heading.tsx
    - src/components/animation/parallax-hero.tsx
  modified:
    - src/components/sections/hero.tsx
decisions:
  - "gsap.from() instead of gsap.to() for hero heading -- heading visible before JS loads, protecting LCP"
  - "Parallax desktop-only via compound matchMedia conditions (min-width: 768px AND prefers-reduced-motion: no-preference)"
  - "SplitText.create() with autoSplit: true for automatic font-load re-splitting of Playfair Display"
  - "Hero does NOT get data-reveal -- it has its own entrance animation independent of ScrollTrigger.batch"
metrics:
  duration: 2m
  tasks: 3
  files: 3
  completed: 2026-02-14
---

# Phase 6 Plan 3: Hero Entrance Animation -- SplitText & Parallax Summary

SplitText character reveal on hero h1 with autoSplit font-load handling, ScrollTrigger scrub parallax on background grid/gradient (desktop-only), and staggered subtitle/CTA fade-in -- all using gsap.from() to protect LCP visibility.

## What Was Built

### 1. SplitHeading Component (`src/components/animation/split-heading.tsx`)

Reusable client component that wraps a heading tag (h1/h2/h3) with SplitText character reveal animation.

- **SplitText.create()** with `autoSplit: true` -- automatically re-splits and re-runs animation when fonts load (handles Playfair Display `display: "swap"` reflow)
- **type: 'chars, words'** -- words as intermediate wrappers ensure correct line-breaking; chars are the animation targets
- **gsap.from()** animates FROM `{ y: 30, opacity: 0 }` TO natural position -- heading is VISIBLE in the DOM by default, protecting LCP
- **gsap.matchMedia** with `(prefers-reduced-motion: no-preference)` auto-reverts all animation for reduced-motion users
- **delay: 0.2** gives the page a moment to paint before starting character reveal
- **stagger: 0.02** between characters for smooth cascading appearance

### 2. ParallaxHero Component (`src/components/animation/parallax-hero.tsx`)

Client component that wraps background elements with scroll-linked parallax movement.

- **ScrollTrigger scrub** creates smooth scroll-linked y-axis movement on background elements
- **Compound matchMedia conditions**: `isDesktop: (min-width: 768px)` AND `prefersMotion: (prefers-reduced-motion: no-preference)` -- both must be true for parallax to activate
- **Desktop-only rationale**: Mobile parallax is janky due to touch scroll physics and address bar height changes
- **speed prop** (default 0.3) controls parallax intensity: `y: () => -100 * speed`
- **triggerRef prop** points to the parent hero section for scroll measurement range (top-to-bottom of hero)

### 3. Hero Section Conversion (`src/components/sections/hero.tsx`)

Converted from Server Component to Client Component with full animation integration.

- **'use client' directive** added for useGSAP and useRef usage
- **sectionRef** on the `<section>` element -- used as triggerRef for ParallaxHero and scope for useGSAP
- **h1 replaced with SplitHeading** -- character reveal animation with LCP-safe gsap.from()
- **Background elements wrapped in ParallaxHero** with `className="absolute inset-0"` preserving absolute positioning
- **Subtitle fade-in** via `.hero-subtitle` class selector: `gsap.from({ y: 20, opacity: 0, delay: 0.6 })`
- **CTAs fade-in** via `.hero-ctas` class selector: `gsap.from({ y: 20, opacity: 0, delay: 0.8 })`
- **Hero does NOT have data-reveal** -- it uses a custom `<section>`, not the Section component, and has its own entrance animation

## Commits

| Task | Description | Commit | Files |
|------|------------|--------|-------|
| 1 | SplitHeading component with SplitText character reveal | `67dfe7e` | src/components/animation/split-heading.tsx |
| 2 | ParallaxHero component with ScrollTrigger scrub parallax | `8aea178` | src/components/animation/parallax-hero.tsx |
| 3 | Convert hero to client component with SplitText + parallax | `caa9ec6` | src/components/sections/hero.tsx |

## Deviations from Plan

None -- plan executed exactly as written.

## Acceptance Criteria Verification

- [x] `src/components/animation/split-heading.tsx` exists with SplitText.create(), autoSplit, and gsap.matchMedia reduced-motion guard
- [x] `src/components/animation/parallax-hero.tsx` exists with parallax via ScrollTrigger scrub, desktop-only via matchMedia
- [x] `src/components/sections/hero.tsx` is a client component with `'use client'` directive
- [x] Hero heading uses SplitHeading component (replaces raw h1)
- [x] Hero backgrounds wrapped in ParallaxHero with `className="absolute inset-0"`
- [x] Hero heading is visible before JavaScript loads (no `opacity: 0` in CSS; gsap.from() used)
- [x] `npm run build` succeeds with zero errors (50/50 pages)
- [x] Each change committed atomically (3 commits)

## Self-Check: PASSED

All 3 created/modified files verified present. All 3 commit hashes verified in git log.
