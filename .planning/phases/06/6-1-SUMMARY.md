---
phase: 6
plan: 1
subsystem: animation-infrastructure
tags: [gsap, lenis, smooth-scroll, reduced-motion, animation]
dependency-graph:
  requires: []
  provides: [gsap-config, smooth-scroll-provider, lenis-css]
  affects: [layout.tsx, globals.css]
tech-stack:
  added: [gsap-plugin-registration, lenis-react, gsap-ticker-sync]
  patterns: [centralized-plugin-registration, conditional-rendering-reduced-motion, single-raf-loop]
key-files:
  created:
    - src/lib/gsap/index.ts
    - src/components/animation/smooth-scroll.tsx
  modified:
    - src/app/layout.tsx
    - src/app/globals.css
decisions:
  - "autoRaf: false on ReactLenis -- GSAP ticker drives Lenis to avoid double RAF loop"
  - "Default prefersReducedMotion to false (SSR) -- avoids flash of native-then-smooth scroll"
  - "Lenis CSS placed between @layer base and existing diagonal divider styles for logical ordering"
metrics:
  duration: 2m
  tasks: 4
  files: 4
  completed: 2026-02-14
---

# Phase 6 Plan 1: GSAP Infrastructure, Lenis Smooth Scroll & Reduced-Motion Configuration Summary

Central GSAP plugin registration with ScrollTrigger + SplitText + useGSAP, Lenis smooth scroll via ReactLenis root mode synced to GSAP ticker, and prefers-reduced-motion conditional rendering.

## What Was Built

### 1. Central GSAP Configuration (`src/lib/gsap/index.ts`)

Single "use client" module that registers all GSAP plugins once globally. All animation components import from `@/lib/gsap` instead of directly from `gsap/*` sub-packages. This prevents duplicate plugin registration and ensures proper tree-shaking.

- Registers: ScrollTrigger, SplitText, useGSAP
- Configures: `ScrollTrigger.config({ ignoreMobileResize: true })` to prevent unnecessary recalculations when mobile address bar shows/hides
- Exports: `gsap`, `ScrollTrigger`, `SplitText`, `useGSAP`

### 2. Lenis Smooth Scroll Provider (`src/components/animation/smooth-scroll.tsx`)

Client component that wraps page content with Lenis smooth scrolling, synced to GSAP's ticker for a single RAF loop.

- **ReactLenis root mode**: Uses `<html>` as scroll container, no extra wrapper divs
- **GSAP ticker sync**: `LenisGSAPSync` inner component connects `lenis.on('scroll', ScrollTrigger.update)` and adds `lenis.raf()` to `gsap.ticker`. `lagSmoothing(0)` disabled for perfect sync.
- **autoRaf: false**: Explicitly disabled to prevent double RAF loop (GSAP ticker drives Lenis)
- **Reduced motion**: Checks `window.matchMedia('(prefers-reduced-motion: reduce)')` with dynamic change listener. When active, renders `<>{children}</>` (no smooth scroll). When inactive, renders `<ReactLenis root>` with full GSAP sync.
- **SSR handling**: Defaults `prefersReducedMotion` to `false` during SSR to avoid flash of native scroll

### 3. Root Layout Integration (`src/app/layout.tsx`)

SmoothScroll wraps all body children: GTMScript, Header, main, Footer, HubSpotTracker, UTMProvider. Client component wrapper preserves Server Component children through React composition.

### 4. Lenis CSS Styles (`src/app/globals.css`)

Added recommended Lenis CSS after `@layer base` block:
- `html.lenis` height auto for proper scroll container sizing
- `scroll-behavior: auto !important` to override any CSS smooth scrolling conflicts
- `[data-lenis-prevent]` overscroll-behavior for modal/dropdown opt-out
- `lenis-stopped` overflow hidden for paused state
- `lenis-scrolling` iframe pointer-events none to prevent scroll hijacking

## Commits

| Task | Description | Commit | Files |
|------|------------|--------|-------|
| 1 | Central GSAP config and plugin registration | `4c33d54` | src/lib/gsap/index.ts |
| 2 | Lenis smooth scroll provider with GSAP ticker sync | `a97bc9a` | src/components/animation/smooth-scroll.tsx |
| 3 | Wrap root layout body children in SmoothScroll | `11c3fc4` | src/app/layout.tsx |
| 4 | Add Lenis smooth scroll CSS styles | `e874a53` | src/app/globals.css |

## Deviations from Plan

None -- plan executed exactly as written.

## Acceptance Criteria Verification

- [x] `src/lib/gsap/index.ts` exists with `"use client"`, registers ScrollTrigger + SplitText + useGSAP, exports all four
- [x] `src/components/animation/smooth-scroll.tsx` renders `<ReactLenis root>` with GSAP ticker sync when motion is preferred, renders plain fragment when reduced motion is active
- [x] `src/app/layout.tsx` wraps body children in `<SmoothScroll>`
- [x] `src/app/globals.css` includes Lenis CSS styles
- [x] `npm run build` succeeds with zero errors (50/50 pages)
- [x] No `scroll-behavior: smooth` CSS exists anywhere in the codebase

## Self-Check: PASSED

All 5 files verified present. All 4 commit hashes verified in git log.
