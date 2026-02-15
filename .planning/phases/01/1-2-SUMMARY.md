---
phase: 1
plan: 2
subsystem: design-system
tags: [tailwind-v4, css-tokens, typography, fonts, metadata]
dependency-graph:
  requires: [1-1]
  provides: [colour-tokens, typography-scale, spacing-system, metadata-helper, shadcn-bridge]
  affects: [all-components, all-pages]
tech-stack:
  added: [Inter-font, Playfair-Display-font, oklch-colour-system]
  patterns: [css-first-tailwind-v4, theme-inline-block, plugin-directive]
key-files:
  created:
    - src/lib/metadata.ts
  modified:
    - src/app/layout.tsx
    - src/app/globals.css
    - src/app/page.tsx
decisions:
  - Kept shadcn bridge variables (--color-X: var(--X)) for component compatibility
  - Used @plugin directive instead of @import for @tailwindcss/typography (Tailwind v4)
  - Retained shadcn radius calculations (calc-based) rather than fixed values
  - Preserved dark mode and sidebar variable blocks for future use
metrics:
  duration: ~2min
  completed: 2026-02-14T06:56:57Z
---

# Phase 1 Plan 2: Design System Summary

**oklch orange palette, Inter/Playfair typography, spacing tokens, and shadcn bridge -- all via Tailwind v4 CSS-first @theme**

## What Was Built

### Colour System
- 11-shade orange primary palette (primary-50 through primary-950) using oklch colour space
- 11-shade warm-tinted neutral grey palette (neutral-50 through neutral-950)
- Semantic colour aliases bridging to shadcn/ui CSS variables
- All chart, sidebar, and component variables mapped to orange palette

### Typography
- **Inter** as primary body font (`--font-sans`, set via next/font variable)
- **Playfair Display** as display/heading font (`--font-display`, set via next/font variable)
- Base styles apply `font-family: var(--font-display)` to h1/h2 elements
- Major third (1.25) type scale from xs (0.75rem) to 7xl (4.5rem)
- Monospace stack defined for code blocks

### Spacing & Layout
- Section spacing tokens: `--spacing-section` (6rem), `--spacing-section-lg` (8rem)
- Container width: `--width-container` (80rem)
- Content width: `--width-content` (48rem)

### Transitions
- `--ease-out-expo`: cubic-bezier(0.16, 1, 0.3, 1)
- `--duration-base`: 200ms, `--duration-slow`: 500ms

### Metadata Helper
- `generatePageMetadata()` in `src/lib/metadata.ts`
- Generates title, description, canonical URL, Open Graph, and Twitter card metadata
- Defaults to UpScalePM site URL and description

### Root Layout
- metadataBase set to `https://upscalepm.com.au`
- Title template: `%s | UpScalePM`
- Robots: index + follow enabled
- Open Graph: siteName, en_AU locale, website type

### Verification Page
- Home page updated with h1 (Playfair Display), body text (Inter), and Button (orange primary)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed @tailwindcss/typography import for Tailwind v4**
- **Found during:** Task 6 (build verification)
- **Issue:** `@import "@tailwindcss/typography"` fails in Tailwind v4 because the v0.5.x package has no CSS entry point. Tailwind v4 requires `@plugin` directive for JS plugins.
- **Fix:** Changed `@import "@tailwindcss/typography"` to `@plugin "@tailwindcss/typography"`
- **Files modified:** src/app/globals.css
- **Commit:** 5127341

**2. [Rule 2 - Missing Critical] Preserved shadcn/ui compatibility layer**
- **Found during:** Task 2 (globals.css rewrite)
- **Issue:** The plan's CSS replaced all shadcn bridge variables and radius calculations. Removing the `--color-X: var(--X)` pattern and `shadcn/tailwind.css` import would break all shadcn components (Button, etc).
- **Fix:** Kept the `@theme inline` block with shadcn bridge variables, `shadcn/tailwind.css` import, `tw-animate-css` import, and `@custom-variant dark` directive. Merged the new design tokens into this structure rather than replacing it wholesale.
- **Files modified:** src/app/globals.css
- **Commit:** 5127341

## Commits

| Hash | Message |
|------|---------|
| 5127341 | feat(phase-1): design system with colour tokens, typography, and spacing |

## Self-Check: PASSED

- [x] src/lib/metadata.ts -- FOUND
- [x] src/app/layout.tsx -- FOUND
- [x] src/app/globals.css -- FOUND
- [x] src/app/page.tsx -- FOUND
- [x] src/lib/utils.ts -- FOUND
- [x] src/components/ui/button.tsx -- FOUND
- [x] Commit 5127341 -- FOUND
- [x] npm run build -- PASSED
