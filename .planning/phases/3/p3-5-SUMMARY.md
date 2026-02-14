---
phase: 3
plan: 5
subsystem: ui-components
tags: [logos, trust-signals, client-logos, hover-effects]
dependency-graph:
  requires: []
  provides: [client-logos-component]
  affects: [homepage, service-pages, contact-page]
tech-stack:
  added: []
  patterns: [greyscale-hover, next-image-logos]
key-files:
  created:
    - src/components/sections/client-logos.tsx
  modified: []
decisions:
  - Consistent h-10/h-12 height approach instead of fixed pixel dimensions for responsive scaling
  - Muted background with compact spacing to keep logo bar unobtrusive
  - Heading rendered as uppercase tracked small text for subtlety
metrics:
  duration: 46s
  completed: 2026-02-14T08:46:28Z
  tasks: 1
  files: 1
---

# Phase 3 Plan 5: Client Logo Bar Component Summary

Reusable greyscale-to-colour logo bar displaying 5 government/institutional client logos with hover reveal effect.

## What Was Built

### Client Logo Bar (`src/components/sections/client-logos.tsx`)

A `<ClientLogos />` component that displays 5 government and institutional client logos in a horizontal flex-wrap layout.

**Logos included:**
- Sydney Water (300x116)
- Health Infrastructure (300x102)
- Blacktown City Council (300x144)
- School Infrastructure (300x97)
- NSW Ambulance (150x150)

**Visual behaviour:**
- Default state: `grayscale(100%)` + `opacity-60` -- logos appear muted and monochrome
- Hover state: `grayscale(0)` + `opacity-100` -- logos reveal full colour with smooth 300ms transition
- Consistent height: `h-10` on mobile, `h-12` on desktop (40px / 48px), width auto-scaled

**Layout:**
- Uses `Section` layout primitive with `spacing="compact"` and `background="muted"`
- `flex flex-wrap items-center justify-center gap-8 md:gap-12`
- Responsive: wraps naturally on narrow screens

**API:**
- `heading` prop (optional, defaults to "Trusted by leading organisations")
- Set `heading=""` or `heading={undefined}` to hide the heading

**Integration note:** The component is ready to be placed on the homepage by Prompt 2 (Wave 2), which will rewrite `src/app/page.tsx`. It can also be used on service pages or the contact page for trust signals.

## Commits

| Hash | Message | Files |
|------|---------|-------|
| `ca77633` | feat(p3-5): client logo bar with greyscale-to-colour hover | src/components/sections/client-logos.tsx |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- Component created with all 5 logos and correct image dimensions
- `npm run build` passes with zero errors
- Logo files confirmed present in `public/images/shared/logos/`

## Self-Check: PASSED

- [x] `src/components/sections/client-logos.tsx` exists
- [x] Commit `ca77633` exists in git log
- [x] Build succeeds
