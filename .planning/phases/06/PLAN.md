# Phase 6: Animation & Visual Polish

## Overview

5 prompts that establish the GSAP animation infrastructure (plugin registration, Lenis smooth scroll, reduced-motion handling), add scroll-driven fade-up animations to all page sections via ScrollTrigger.batch(), create the hero entrance animation with SplitText and parallax, implement the geometric overlay design language (CSS clip-path diagonal dividers and floating shapes), and verify performance across all pages. After this phase, every page has smooth scroll-driven reveal animations, the homepage hero has a premium entrance sequence, diagonal section dividers and floating geometric shapes create a signature visual identity, and all motion respects prefers-reduced-motion while maintaining 60fps and Core Web Vitals targets.

**Requirements covered:** DSGN-04, DSGN-05, DSGN-06, DSGN-07, DSGN-08, DSGN-10

**Estimated effort:** ~3-4 hours Claude execution time across all prompts.

**Must-Haves (Goal-Backward Derivation):**

Goal: "The site has the 'high-performance minimalist' visual identity -- scroll-driven animations, geometric overlays, smooth scrolling, and motion effects that differentiate it from every other consultancy website, without sacrificing performance."

Observable truths:
1. Lenis smooth scroll is active site-wide and synced with GSAP ScrollTrigger via the GSAP ticker -- scrolling feels buttery-smooth on desktop with no jank or conflict between the two systems
2. Scrolling through any page triggers smooth fade-up animations on sections, with GSAP ScrollTrigger.batch() controlling timing based on viewport position
3. Homepage hero has an entrance animation with SplitText character reveal on the main heading and parallax movement on background grid/gradient elements
4. Diagonal section dividers (CSS clip-path) appear between key sections and floating geometric shapes with subtle depth (opacity 0.03-0.08, CSS-only animation) create the signature visual language
5. All animations respect prefers-reduced-motion (GSAP matchMedia auto-reverts all animations, Lenis disabled entirely, CSS animations stopped via media query), perform at 60fps on mid-range mobile devices, and do not degrade Core Web Vitals below targets (LCP < 2.5s, CLS < 0.1, INP < 200ms)

Required artifacts:
- `src/lib/gsap/index.ts` -- Central GSAP config: plugin registration (ScrollTrigger, SplitText, useGSAP)
- `src/components/animation/smooth-scroll.tsx` -- Lenis provider with GSAP ticker sync + reduced-motion handling
- `src/components/animation/scroll-reveal.tsx` -- ScrollTrigger.batch wrapper for fade-up section reveals
- `src/components/animation/split-heading.tsx` -- SplitText heading component for hero
- `src/components/animation/parallax-hero.tsx` -- Parallax wrapper for hero background elements
- `src/components/animation/geometric-shapes.tsx` -- Floating geometric shapes component
- `src/app/layout.tsx` -- Modified to wrap children in SmoothScroll provider
- `src/app/globals.css` -- Modified with diagonal divider classes, geometric shape keyframes, clip-path utilities
- `src/components/sections/hero.tsx` -- Modified: converted to client component with SplitText + parallax
- `src/components/layout/section.tsx` -- Modified: adds `data-reveal` attribute for ScrollTrigger.batch
- `src/app/page.tsx` -- Modified: adds diagonal dividers and geometric shapes to homepage

Key links:
- SmoothScroll provider -> layout.tsx (if broken: no smooth scrolling, but everything else works -- graceful degradation)
- GSAP plugin registration -> all animation components (if broken: no animations at all, but content visible -- graceful degradation)
- ScrollTrigger.batch -> `[data-reveal]` elements (if broken: sections visible immediately without fade-up)
- SplitText -> hero heading (if broken: heading visible immediately without character animation)
- Parallax -> hero background (if broken: static background, no visual regression)
- Geometric shapes -> CSS animation (if broken: shapes visible but static)
- prefers-reduced-motion -> gsap.matchMedia() + Lenis conditional init (if broken: users with motion sensitivity see all animations)

---

## Prompt 1: GSAP Infrastructure, Lenis Smooth Scroll & Reduced-Motion Configuration

**Requirements:** DSGN-07, DSGN-10
**Dependencies:** None (foundation prompt)
**Wave:** 1
**Files created/modified:**
- `src/lib/gsap/index.ts` (create)
- `src/components/animation/smooth-scroll.tsx` (create)
- `src/app/layout.tsx` (modify -- wrap body children in SmoothScroll)
- `src/app/globals.css` (modify -- add Lenis CSS)

### Context

The three animation packages are already installed in package.json: `gsap@3.14.2` (full build with ScrollTrigger, SplitText), `@gsap/react@2.1.2` (useGSAP hook), and `lenis@1.3.17` (smooth scroll). No animation code exists in the codebase -- all three packages are unused.

GSAP requires a centralized plugin registration file (`"use client"`) that runs once. All animation components import from this file, not directly from `gsap/*`. This prevents duplicate registration and ensures tree-shaking works correctly.

Lenis smooth scroll is integrated via `<ReactLenis root>` (Approach A from research). The `root` option uses the `<html>` element as the scroll container, avoiding extra wrapper divs. Lenis must be synced with GSAP's ticker (single RAF loop) by:
1. Connecting Lenis scroll events to `ScrollTrigger.update`
2. Adding Lenis `raf()` to GSAP's ticker callback
3. Disabling GSAP lag smoothing (`gsap.ticker.lagSmoothing(0)`)

ReactLenis's `autoRaf` option must NOT be set to `true` when syncing with GSAP ticker -- this would create double RAF loops.

For `prefers-reduced-motion: reduce`, Lenis must be **disabled entirely** (users expect native scroll behavior). The SmoothScroll component should check the media query and conditionally render `<ReactLenis>` or a plain fragment.

`ScrollTrigger.config({ ignoreMobileResize: true })` prevents unnecessary position recalculations when the mobile address bar shows/hides. Do NOT use `ScrollTrigger.normalizeScroll()` -- it conflicts with Lenis.

The root layout at `src/app/layout.tsx` currently renders: `<body>` > `<GTMScript />` > `<Header />` > `<main>` > `<Footer />` > `<HubSpotTracker />` > `<UTMProvider />`. The SmoothScroll provider should wrap all body children.

### Actions

**1. Create `src/lib/gsap/index.ts`** -- Central GSAP configuration and plugin registration:

```typescript
"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

// Register plugins once, globally
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// Configure ScrollTrigger for mobile
ScrollTrigger.config({
  ignoreMobileResize: true,
})

export { gsap, ScrollTrigger, SplitText, useGSAP }
```

This file is `"use client"` because GSAP operates on the DOM. All animation components import from `@/lib/gsap` (not `gsap/*` directly).

**2. Create `src/components/animation/smooth-scroll.tsx`** -- Lenis provider with GSAP ticker sync:

```typescript
'use client'
```

This component:
- Imports `ReactLenis` from `lenis/react` and `useLenis` from `lenis/react`.
- Imports `gsap`, `ScrollTrigger` from `@/lib/gsap`.
- Imports `useEffect`, `useState` from `react`.
- Exports `SmoothScroll` component that accepts `{ children: React.ReactNode }`.

The component must:

a) **Check reduced-motion preference on mount.** Use `useState` to track whether the user prefers reduced motion. In a `useEffect`, check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and also add a `change` event listener for dynamic preference changes. Update state accordingly.

b) **Conditionally render Lenis.** If `prefersReducedMotion` is `true`, render `<>{children}</>` (no smooth scroll). If `false`, render:
```tsx
<ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
  <LenisGSAPSync />
  {children}
</ReactLenis>
```

c) **Create a `LenisGSAPSync` inner component** that uses `useLenis()` to get the Lenis instance and syncs it with GSAP:
```typescript
function LenisGSAPSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(tickerCallback)
    }
  }, [lenis])

  return null
}
```

IMPORTANT: Do NOT set `autoRaf: true` in Lenis options. GSAP ticker drives Lenis. Setting `autoRaf: true` would create a double RAF loop.

d) **Handle SSR.** The `prefersReducedMotion` state should default to `false` (assume motion is OK during SSR). The `useEffect` for detecting the preference only runs on the client. During the brief SSR-to-hydration window, Lenis will render. This is acceptable -- the alternative (defaulting to `true`) would mean a flash of native-then-smooth scroll, which is worse.

**3. Modify `src/app/layout.tsx`** -- Wrap body children in SmoothScroll:

Add import:
```typescript
import { SmoothScroll } from '@/components/animation/smooth-scroll'
```

Wrap all body children:
```tsx
<body className="flex min-h-screen flex-col font-sans antialiased">
  <SmoothScroll>
    <GTMScript />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <HubSpotTracker />
    <UTMProvider />
  </SmoothScroll>
</body>
```

The SmoothScroll component is a client component but only adds a thin wrapper. The children (Header, main, Footer, etc.) remain Server Components -- React Server Component composition allows client components to wrap server component children without forcing them into client bundles.

**4. Modify `src/app/globals.css`** -- Add Lenis base styles:

Add at the end of the file, after the `@layer base` block:

```css
/* ---- Lenis Smooth Scroll ---- */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
```

These are the recommended Lenis CSS styles from the library documentation. They ensure:
- `scroll-behavior: auto` overrides any CSS smooth scrolling (which conflicts with Lenis)
- `[data-lenis-prevent]` elements opt out of Lenis (useful for scrollable modals/dropdowns)
- `lenis-stopped` hides overflow when Lenis is paused
- Iframes don't capture pointer events during scroll (prevents scroll hijacking by embedded content like Calendly)

### Acceptance Criteria

- [ ] `src/lib/gsap/index.ts` exists with `"use client"`, registers ScrollTrigger + SplitText + useGSAP, exports all four
- [ ] `src/components/animation/smooth-scroll.tsx` renders `<ReactLenis root>` with GSAP ticker sync when motion is preferred, renders plain fragment when reduced motion is active
- [ ] `src/app/layout.tsx` wraps body children in `<SmoothScroll>`
- [ ] `src/app/globals.css` includes Lenis CSS styles
- [ ] `npm run build` succeeds with no errors
- [ ] Dev server loads without errors; scrolling feels smooth (mouse wheel interpolation visible)
- [ ] Setting `prefers-reduced-motion: reduce` in browser DevTools (Rendering tab) disables Lenis; scrolling reverts to native behavior
- [ ] No `scroll-behavior: smooth` CSS exists anywhere (it conflicts with both Lenis and ScrollTrigger)

---

## Prompt 2: ScrollTrigger Batch Reveal Animations on All Sections

**Requirements:** DSGN-04, DSGN-10
**Dependencies:** Prompt 1 (GSAP infrastructure + SmoothScroll must exist)
**Wave:** 2
**Files created/modified:**
- `src/components/animation/scroll-reveal.tsx` (create)
- `src/components/layout/section.tsx` (modify -- add `data-reveal` attribute)
- `src/app/page.tsx` (modify -- wrap sections in ScrollReveal)

### Context

The `Section` component (`src/components/layout/section.tsx`) is used across the entire site -- homepage, service pages, about, contact, etc. It renders a `<section>` with background/spacing variants wrapping a `<Container>`. Every `Section` instance should animate in when it enters the viewport.

The research recommends `ScrollTrigger.batch()` over individual ScrollTrigger instances for repeating reveal patterns. `batch()` groups multiple elements that enter the viewport around the same time, creating a performant staggered reveal with a single ScrollTrigger watcher.

The pattern:
1. Mark all revealable elements with a `data-reveal` attribute
2. Set initial state via CSS (`opacity: 0; transform: translateY(2.5rem)`)
3. A single `ScrollReveal` client component uses `ScrollTrigger.batch('[data-reveal]')` to animate them in
4. Wrap animations in `gsap.matchMedia()` so they auto-revert for `prefers-reduced-motion: reduce`

Initial state MUST be set via CSS (not GSAP) so elements are hidden before JS loads. For the hero section specifically, do NOT apply `data-reveal` -- the hero is the LCP element and must be visible immediately. The hero has its own entrance animation (Prompt 3).

The `ScrollReveal` component should be placed in the root layout or homepage. It registers `ScrollTrigger.batch` once and it applies to all matching elements on all pages (ScrollTrigger automatically picks up new elements on route change).

For `prefers-reduced-motion: reduce`, all fade-up animations are skipped. The CSS initial state (`opacity: 0; translate`) should also be conditional -- use a CSS media query so elements are visible immediately for reduced-motion users.

### Actions

**1. Create `src/components/animation/scroll-reveal.tsx`** -- Global ScrollTrigger.batch registration:

```typescript
'use client'
```

This component:
- Imports `useRef` from `react`.
- Imports `gsap`, `ScrollTrigger`, `useGSAP` from `@/lib/gsap`.
- Exports `ScrollReveal` as a component that takes no props and renders `null`.
- Uses `useGSAP()` with no scope (global) to set up the batch.

Inside `useGSAP`:

a) Wrap everything in `gsap.matchMedia()`:

```typescript
const mm = gsap.matchMedia()

mm.add('(prefers-reduced-motion: no-preference)', () => {
  ScrollTrigger.batch('[data-reveal]', {
    interval: 0.1,
    batchMax: 3,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        overwrite: true,
      })
    },
    start: 'top 85%',
  })
})
```

b) When `prefers-reduced-motion: reduce` matches, `gsap.matchMedia()` automatically reverts all animations and ScrollTriggers created inside the callback. Elements then show their CSS-defined visible state.

c) The `useGSAP` hook handles cleanup on unmount automatically.

**2. Modify `src/components/layout/section.tsx`** -- Add `data-reveal` attribute:

Add `data-reveal` attribute to the `<section>` element. This marks all Section components for batch reveal animation.

The modified section element should have `data-reveal` as an empty string attribute:

```tsx
<section
  id={id}
  data-reveal=""
  className={cn(
    // ... existing classes
  )}
>
```

**3. Modify `src/app/globals.css`** -- Add reveal initial state with reduced-motion override:

Add after the Lenis styles (from Prompt 1):

```css
/* ---- Scroll Reveal Initial State ---- */
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] {
    opacity: 0;
    transform: translateY(2.5rem);
  }
}
```

This sets the initial hidden state for reveal elements ONLY when the user has no motion preference. Users with `prefers-reduced-motion: reduce` see elements immediately (no opacity/transform applied).

CRITICAL: The CSS media query must match the `gsap.matchMedia()` condition exactly. Both use `prefers-reduced-motion: no-preference` to ensure consistent behavior.

**4. Modify `src/app/page.tsx`** -- Add ScrollReveal component:

Import and add the `ScrollReveal` component on the homepage. Place it at the top of the returned JSX (it renders null but registers the batch watcher):

```typescript
import { ScrollReveal } from '@/components/animation/scroll-reveal'
```

```tsx
return (
  <>
    <ScrollReveal />
    <JsonLd data={localBusinessSchema()} />
    <Hero />
    <ClientLogos />
    <ValueProposition />
    {/* ... rest of sections */}
  </>
)
```

NOTE: A better long-term approach would be to place `<ScrollReveal />` in `layout.tsx` so it works on all pages. But since ScrollTrigger.batch picks up all `[data-reveal]` elements globally regardless of where the component is mounted, placing it on the homepage is sufficient. It will also work for other pages because the batch is registered globally. If the user navigates to another page via client-side navigation, ScrollTrigger detects the new `[data-reveal]` elements after the DOM updates. However, if the user loads a non-homepage URL directly (server-side), ScrollReveal won't be in the React tree. To fix this, place `<ScrollReveal />` in `layout.tsx` instead of `page.tsx`.

REVISED: Place `<ScrollReveal />` in `src/app/layout.tsx` instead of `page.tsx`. Add it inside the `<SmoothScroll>` wrapper, after `<UTMProvider />`:

```tsx
<SmoothScroll>
  <GTMScript />
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
  <HubSpotTracker />
  <UTMProvider />
  <ScrollReveal />
</SmoothScroll>
```

This ensures the batch watcher is active on every page load, regardless of entry URL.

### Acceptance Criteria

- [ ] `src/components/animation/scroll-reveal.tsx` exists with ScrollTrigger.batch setup inside gsap.matchMedia
- [ ] `src/components/layout/section.tsx` has `data-reveal=""` on the section element
- [ ] `src/app/globals.css` has `[data-reveal]` CSS with opacity/transform initial state, scoped to `prefers-reduced-motion: no-preference`
- [ ] `src/app/layout.tsx` includes `<ScrollReveal />` inside the SmoothScroll wrapper
- [ ] `npm run build` succeeds
- [ ] Scrolling through the homepage shows sections fading up smoothly as they enter the viewport
- [ ] Scrolling through other pages (services, about, case studies) also shows section reveals
- [ ] With `prefers-reduced-motion: reduce` set, all sections are immediately visible (no animation, no hidden content)
- [ ] No content is permanently hidden if JavaScript fails to load (CSS initial state uses media query, so elements are visible by default for reduced-motion users)

---

## Prompt 3: Hero Entrance Animation -- SplitText & Parallax

**Requirements:** DSGN-06, DSGN-08, DSGN-10
**Dependencies:** Prompt 1 (GSAP infrastructure must exist)
**Wave:** 2
**Files created/modified:**
- `src/components/animation/split-heading.tsx` (create)
- `src/components/animation/parallax-hero.tsx` (create)
- `src/components/sections/hero.tsx` (modify -- convert to client component, add SplitText + parallax)

### Context

The homepage hero (`src/components/sections/hero.tsx`) is currently a Server Component. It contains:
- A dark background (`bg-neutral-950`)
- A grid pattern (`absolute inset-0` div with CSS linear-gradient grid lines)
- A primary-tinted gradient overlay (`absolute inset-0` div)
- A Container with `h1` (Playfair Display font, 4xl-6xl), subtitle paragraph, and two CTA buttons

The hero needs two animation effects:
1. **SplitText character reveal on the `<h1>`** -- Characters animate in with y-offset and opacity stagger
2. **Parallax on background elements** -- Grid pattern and gradient move at different speeds when scrolling

The `<h1>` is likely the LCP element. CRITICAL: Do NOT start the heading at `opacity: 0`. Use `gsap.from()` so the initial rendered state is fully visible. The animation runs FROM an offset position TO the natural position. If GSAP fails to load, the heading is visible at its natural position.

SplitText should use the `SplitText.create()` static method with `autoSplit: true` and `onSplit()` callback. This handles font-loading automatically -- when Playfair Display finishes loading via `display: "swap"`, SplitText re-splits and re-runs the animation.

Parallax should only run on desktop (`min-width: 768px`) via `gsap.matchMedia()`. On mobile, parallax is often janky due to touch scroll physics and address bar changes. The parallax effect applies to the background grid and gradient elements, moving them upward (`y: -80`) as the user scrolls past the hero.

All effects must be inside `gsap.matchMedia()` with `prefers-reduced-motion: no-preference` so they auto-revert for reduced-motion users.

The hero must be converted from a Server Component to a Client Component (`'use client'`) to use `useGSAP` and refs.

### Actions

**1. Create `src/components/animation/split-heading.tsx`** -- Reusable SplitText heading:

```typescript
'use client'
```

This component:
- Accepts `{ children: React.ReactNode; className?: string; as?: 'h1' | 'h2' | 'h3' }` props.
- Defaults `as` to `'h1'`.
- Uses a ref on the heading element.
- Uses `useGSAP()` scoped to the heading ref.
- Inside `useGSAP`, wraps everything in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`.

Inside the matchMedia callback:
```typescript
SplitText.create(headingRef.current, {
  type: 'chars, words',
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.chars, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.out',
      delay: 0.2,
    })
  },
})
```

Key details:
- `type: 'chars, words'` splits into both characters and words. Words are needed as intermediate wrappers so characters stay on the correct line.
- `autoSplit: true` handles font-load re-splitting automatically.
- `gsap.from()` means the heading is VISIBLE by default and animates FROM the offset state. If GSAP doesn't load, heading is fully visible.
- `delay: 0.2` gives the page a moment to paint before starting the animation.
- `opacity: 0` in `gsap.from()` is acceptable here because it's the FROM state, not the initial CSS state. The heading renders fully visible, then GSAP immediately sets chars to opacity 0 and animates them to 1. This happens synchronously in the same frame via `useLayoutEffect` (inside `useGSAP`), so there's no visible flash.

The component renders the heading tag with the ref and className:
```tsx
const Tag = as
return <Tag ref={headingRef} className={className}>{children}</Tag>
```

**2. Create `src/components/animation/parallax-hero.tsx`** -- Parallax wrapper for hero backgrounds:

```typescript
'use client'
```

This component:
- Accepts `{ children: React.ReactNode; className?: string; speed?: number; triggerRef: React.RefObject<HTMLElement> }` props.
- Defaults `speed` to `0.3`.
- Uses a ref on the parallax container div.
- Uses `useGSAP()` scoped to the parallax ref.

Inside `useGSAP`, wrap in `gsap.matchMedia()`:
```typescript
const mm = gsap.matchMedia()

mm.add(
  {
    isDesktop: '(min-width: 768px)',
    prefersMotion: '(prefers-reduced-motion: no-preference)',
  },
  (context) => {
    const { isDesktop, prefersMotion } = context.conditions!
    if (!isDesktop || !prefersMotion) return

    gsap.to(containerRef.current, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }
)
```

The component renders:
```tsx
return <div ref={containerRef} className={className}>{children}</div>
```

**3. Modify `src/components/sections/hero.tsx`** -- Convert to client component with animations:

Add `'use client'` directive at the top.

Add imports:
```typescript
import { useRef } from 'react'
import { SplitHeading } from '@/components/animation/split-heading'
import { ParallaxHero } from '@/components/animation/parallax-hero'
```

Add a ref to the hero section:
```typescript
const sectionRef = useRef<HTMLElement>(null)
```

Add `ref={sectionRef}` to the `<section>` element.

Replace the `<h1>` with `<SplitHeading>`:
```tsx
<SplitHeading className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
  Client-Side Project Management for Property &amp; Construction
</SplitHeading>
```

Wrap the background elements (grid pattern + gradient overlay) in `<ParallaxHero>`:
```tsx
<ParallaxHero triggerRef={sectionRef} speed={0.3}>
  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
</ParallaxHero>
```

The `<ParallaxHero>` wrapper needs `className="absolute inset-0"` so the background elements remain absolutely positioned within the hero.

Also add `data-reveal-exclude` or simply do NOT add `data-reveal` to the hero section. The hero should NOT have the scroll reveal animation -- it has its own entrance animation. Since the hero does not use the `<Section>` component (it has a custom section element), it won't have `data-reveal` by default. No change needed.

IMPORTANT: The hero `<section>` element itself should NOT be animated by ScrollTrigger.batch because:
- It's the first visible element (already in viewport on page load)
- It has its own SplitText entrance animation
- Animating it with scroll reveal would conflict and delay LCP

The subtitle paragraph and CTA buttons can have a simple fade-in animation. Add them inside `useGSAP`:
```typescript
useGSAP(() => {
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.6,
      ease: 'power2.out',
    })
    gsap.from('.hero-ctas', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.8,
      ease: 'power2.out',
    })
  })
}, { scope: sectionRef })
```

Add `className="hero-subtitle"` to the subtitle `<p>` and `className="hero-ctas"` to the CTA wrapper `<div>` (add to existing className with cn() or string concatenation).

### Acceptance Criteria

- [ ] `src/components/animation/split-heading.tsx` exists with SplitText.create(), autoSplit, and gsap.matchMedia reduced-motion guard
- [ ] `src/components/animation/parallax-hero.tsx` exists with parallax via ScrollTrigger scrub, desktop-only via matchMedia
- [ ] `src/components/sections/hero.tsx` is a client component with `'use client'` directive
- [ ] Hero heading animates with character reveal on page load (smooth staggered appearance)
- [ ] Hero background grid/gradient moves with parallax on desktop when scrolling
- [ ] Hero subtitle and CTAs fade in shortly after the heading
- [ ] With `prefers-reduced-motion: reduce`: heading visible immediately, no parallax, no fade effects
- [ ] On mobile (< 768px): no parallax (disabled via matchMedia), SplitText still works
- [ ] Hero heading is visible before JavaScript loads (no `opacity: 0` in CSS for the hero)
- [ ] `npm run build` succeeds

---

## Prompt 4: Geometric Overlay Design Language -- Diagonal Dividers & Floating Shapes

**Requirements:** DSGN-05, DSGN-10
**Dependencies:** None (CSS-only, independent of GSAP infrastructure)
**Wave:** 1
**Files created/modified:**
- `src/app/globals.css` (modify -- add diagonal divider classes and geometric shape keyframes)
- `src/components/animation/geometric-shapes.tsx` (create)
- `src/app/page.tsx` (modify -- add diagonal dividers and geometric shapes to homepage)
- `src/components/sections/value-proposition.tsx` (modify -- add diagonal top edge)
- `src/components/sections/homepage-cta.tsx` (modify -- add diagonal top edge)

### Context

The "geometric overlay design language" requirement (DSGN-05) has two parts:

1. **Diagonal section dividers** -- CSS `clip-path: polygon()` on key sections to create angled transitions between sections. These are pure CSS, no JavaScript. They work by clipping the top or bottom edge of a section at an angle, then using negative margin to overlap the previous section.

2. **Floating geometric shapes** -- Subtle, nearly transparent shapes (opacity 0.03-0.08) that float with a very slow CSS animation. These add depth and visual interest without being distracting. CSS-only implementation (no GSAP needed for simple float animations).

Both elements are pure CSS and don't require GSAP. They should respect `prefers-reduced-motion: reduce` -- diagonal dividers stay (no motion involved), but floating shapes should stop animating.

The homepage currently has these sections in order:
1. Hero (dark bg, neutral-950)
2. ClientLogos (light bg)
3. ValueProposition (muted bg)
4. ServicesOverview (default bg)
5. Mid-page CTA (dark bg)
6. FeaturedCaseStudies (default bg?)
7. HomepageCta (dark bg?)

Diagonal dividers should be applied at 2-3 key transitions where the visual language benefits most. Applying to every section would feel excessive. Best candidates:
- ValueProposition (muted bg after ClientLogos) -- diagonal top
- Mid-page CTA dark section or HomepageCta -- diagonal top

Floating geometric shapes should be placed as absolute-positioned elements within specific sections. Keep them sparse -- 3-5 shapes total on the homepage.

### Actions

**1. Modify `src/app/globals.css`** -- Add diagonal divider and geometric shape styles:

Add after the scroll reveal styles:

```css
/* ---- Diagonal Section Dividers ---- */
.section-diagonal-top {
  clip-path: polygon(0 3rem, 100% 0, 100% 100%, 0 100%);
  margin-top: -3rem;
  padding-top: calc(3rem + var(--spacing-section));
}

.section-diagonal-top-reverse {
  clip-path: polygon(0 0, 100% 3rem, 100% 100%, 0 100%);
  margin-top: -3rem;
  padding-top: calc(3rem + var(--spacing-section));
}

@media (min-width: 768px) {
  .section-diagonal-top {
    clip-path: polygon(0 4rem, 100% 0, 100% 100%, 0 100%);
    margin-top: -4rem;
    padding-top: calc(4rem + var(--spacing-section));
  }

  .section-diagonal-top-reverse {
    clip-path: polygon(0 0, 100% 4rem, 100% 100%, 0 100%);
    margin-top: -4rem;
    padding-top: calc(4rem + var(--spacing-section));
  }
}

/* ---- Floating Geometric Shapes ---- */
.geo-shape {
  position: absolute;
  pointer-events: none;
  opacity: 0.04;
  animation: geo-float 25s ease-in-out infinite;
}

.geo-shape-alt {
  animation-direction: alternate-reverse;
  animation-duration: 30s;
}

.geo-shape-slow {
  animation-duration: 35s;
}

@keyframes geo-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(1.5deg);
  }
  66% {
    transform: translateY(-8px) rotate(-1deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .geo-shape,
  .geo-shape-alt,
  .geo-shape-slow {
    animation: none;
  }
}
```

The diagonal dividers use `--spacing-section` (defined in the theme as `6rem`) for padding calculation so the content still has proper spacing after the clip-path eats into the top of the section.

Geometric shapes are extremely subtle (opacity 0.04) with very slow animation (25-35s cycles). The `prefers-reduced-motion` media query stops all animation but keeps the shapes visible (they're so subtle that static placement still adds depth).

**2. Create `src/components/animation/geometric-shapes.tsx`** -- Floating geometric shapes component:

This is a Server Component (no `'use client'` needed -- it's pure CSS animation).

```typescript
import { cn } from '@/lib/utils'

interface GeometricShapesProps {
  variant?: 'default' | 'dark'
  className?: string
}

export function GeometricShapes({ variant = 'default', className }: GeometricShapesProps) {
  const baseColor = variant === 'dark' ? 'border-white/[0.06]' : 'border-neutral-950/[0.06]'

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {/* Large diamond shape, top-right */}
      <div
        className={cn(
          'geo-shape absolute -right-12 top-1/4 size-48 rotate-45 rounded-lg border-2 md:size-64',
          baseColor,
        )}
      />
      {/* Small square, bottom-left */}
      <div
        className={cn(
          'geo-shape geo-shape-alt absolute -left-6 bottom-1/3 size-24 rotate-12 rounded-sm border-2 md:size-32',
          baseColor,
        )}
      />
      {/* Medium circle, center-right */}
      <div
        className={cn(
          'geo-shape geo-shape-slow absolute right-1/4 top-2/3 size-32 rounded-full border-2 md:size-40',
          baseColor,
        )}
      />
    </div>
  )
}
```

The shapes are:
- Absolutely positioned within a relative parent
- Using border (not background) for an outlined/wireframe aesthetic
- Extremely low opacity (via the parent `.geo-shape` class at 0.04)
- Different sizes, rotations, and animation timings for visual variety
- `aria-hidden="true"` because they're decorative
- `pointer-events: none` so they don't interfere with clicks

The `variant` prop controls the border color -- white for dark sections, dark for light sections.

**3. Modify `src/app/page.tsx`** -- Add geometric shapes to homepage:

Import the component:
```typescript
import { GeometricShapes } from '@/components/animation/geometric-shapes'
```

Add `GeometricShapes` to 2-3 sections. The best approach is to add them to sections that already have a `relative` parent or make them relative. The `Section` component renders a `<section>` but it's not `relative` by default. The best approach is to add shapes as children of sections that already have `overflow-hidden relative` set, or add `className="relative overflow-hidden"` to specific Section usages.

For the homepage, add shapes to:
- The `ValueProposition` section (it uses `<Section background="muted">` -- modify in the component)
- The mid-page CTA `<Section background="dark">` -- add inline

For the mid-page CTA section on the homepage, wrap the content:
```tsx
<Section background="dark" className="relative overflow-hidden">
  <GeometricShapes variant="dark" />
  <div className="relative mx-auto max-w-2xl text-center">
    {/* ... existing content */}
  </div>
</Section>
```

Note: The `Section` component needs to accept `className` and pass it to the `<section>`. Check current implementation -- it already does via `cn()`.

**4. Modify `src/components/sections/value-proposition.tsx`** -- Add diagonal top edge and geometric shapes:

Add `className="section-diagonal-top relative overflow-hidden"` to the Section component. Also add GeometricShapes inside:

```tsx
import { GeometricShapes } from '@/components/animation/geometric-shapes'

export function ValueProposition() {
  return (
    <Section background="muted" className="section-diagonal-top relative overflow-hidden">
      <GeometricShapes />
      <div className="relative mx-auto max-w-2xl text-center">
        {/* ... existing heading and subtitle */}
      </div>
      <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* ... existing cards */}
      </div>
    </Section>
  )
}
```

The `relative` class on content divs ensures they stack above the geometric shapes (which are `absolute`).

**5. Modify `src/components/sections/homepage-cta.tsx`** -- Add diagonal top edge:

Read the component first. Add `section-diagonal-top` class if appropriate. The HomepageCta likely uses a dark background, so add:
```tsx
<Section background="dark" className="section-diagonal-top-reverse relative overflow-hidden">
  <GeometricShapes variant="dark" />
  {/* ... existing content wrapped in relative div */}
</Section>
```

### Acceptance Criteria

- [ ] `src/app/globals.css` has diagonal divider classes (.section-diagonal-top, .section-diagonal-top-reverse) with responsive clip-path values
- [ ] `src/app/globals.css` has geometric shape CSS (.geo-shape, keyframes, reduced-motion override)
- [ ] `src/components/animation/geometric-shapes.tsx` exists as a Server Component with 3 outlined shapes
- [ ] ValueProposition section has a visible diagonal top edge (angled clip-path)
- [ ] At least one other section has a diagonal divider (HomepageCta or mid-page CTA)
- [ ] Geometric shapes are visible (very subtle, look for them at low zoom) in 2-3 sections
- [ ] `prefers-reduced-motion: reduce` stops geometric shape animation but keeps shapes visible; diagonal dividers unchanged
- [ ] No layout shifts from diagonal dividers (clip-path operates on paint layer, not layout)
- [ ] `npm run build` succeeds

---

## Prompt 5: Performance Verification & Cross-Page Animation Audit

**Requirements:** DSGN-10 (verification), DSGN-04 (cross-page verification)
**Dependencies:** Prompts 1, 2, 3, 4 (all animation work must be complete)
**Wave:** 3
**Files created/modified:**
- None (verification-only prompt) -- or minor fixes as needed

### Context

This prompt is a verification pass, not an implementation prompt. All animation code is complete from Prompts 1-4. The goal is to verify:

1. **Build succeeds** -- `npm run build` must produce zero errors across all ~50 pages
2. **Scroll reveal works on non-homepage pages** -- Service pages, about, case studies, insights, contact all use `<Section>` and should have fade-up animations
3. **No CLS from animations** -- SplitText doesn't cause layout shifts, diagonal dividers don't shift content
4. **Reduced-motion is complete** -- All animation code paths have matchMedia guards
5. **No accessibility regressions** -- SplitText adds aria-label by default, geometric shapes have aria-hidden

### Actions

**1. Run `npm run build`** -- Verify the production build succeeds with zero errors:

Run the full build. If there are TypeScript errors, fix them. Common issues to watch for:
- Import paths for new `@/lib/gsap` module
- Missing `"use client"` directives
- Type mismatches in component props (especially `triggerRef` in ParallaxHero)
- SplitText type declarations (may need `@ts-expect-error` if types are not included in the gsap package)

**2. Check all pages using the Section component** -- Verify `data-reveal` reaches all pages:

Run a search for all files that import `Section` from `@/components/layout/section`. Every page using Section should automatically get scroll reveal without any per-page changes. Verify this by listing the pages.

Non-Section pages to check:
- Hero (should NOT have data-reveal -- it has its own animation)
- PageHeader (used on about, services, case-studies, insights, contact) -- it doesn't use Section, so it won't have reveal animation. This is OK -- page headers are usually visible on load.

**3. Verify reduced-motion coverage** -- Audit all animation code:

Check each animation file for proper `prefers-reduced-motion` handling:
- `src/components/animation/smooth-scroll.tsx` -- Should conditionally render Lenis
- `src/components/animation/scroll-reveal.tsx` -- Should use gsap.matchMedia
- `src/components/animation/split-heading.tsx` -- Should use gsap.matchMedia
- `src/components/animation/parallax-hero.tsx` -- Should use gsap.matchMedia
- `src/app/globals.css` -- Should have CSS media queries for `[data-reveal]` and `.geo-shape`

**4. Verify SplitText accessibility** -- Check that aria attributes are present:

SplitText with default `aria: "auto"` setting should:
- Add `aria-label` to the parent `<h1>` with the full text
- Add `aria-hidden="true"` to all generated `<div>`/`<span>` child elements

Verify this is the case in the rendered HTML (browser DevTools).

**5. Check for duplicate animation registration** -- Ensure GSAP plugins are only registered once:

Verify that only `src/lib/gsap/index.ts` calls `gsap.registerPlugin()`. No other file should import directly from `gsap/ScrollTrigger` or `gsap/SplitText`.

**6. If any issues found, fix them** -- Apply minimal targeted fixes:

- Fix TypeScript errors
- Fix missing reduced-motion guards
- Fix import paths
- Add missing `'use client'` directives

### Acceptance Criteria

- [ ] `npm run build` succeeds with zero errors
- [ ] All pages using `<Section>` have scroll reveal animations on scroll
- [ ] Hero entrance animation plays on homepage load (SplitText + parallax)
- [ ] Diagonal dividers visible on at least 2 sections
- [ ] Geometric shapes visible (very subtle) on at least 2 sections
- [ ] `prefers-reduced-motion: reduce` disables ALL motion: no smooth scroll, no scroll reveal, no SplitText, no parallax, no floating shapes
- [ ] Hero heading is visible and readable before JavaScript loads (no invisible LCP)
- [ ] SplitText `<h1>` has `aria-label` attribute with full text
- [ ] No GSAP plugin imports from `gsap/*` in any file except `src/lib/gsap/index.ts`
- [ ] No `scroll-behavior: smooth` in any CSS file
- [ ] Build output shows no increase in page count (animations don't create new routes)

---

## Verification Criteria (Phase-Level)

After all 5 prompts are complete, the following must be true:

1. **DSGN-04 (ScrollTrigger animations):** Scrolling through any page triggers smooth fade-up animations on `<Section>` components. ScrollTrigger.batch controls timing. Animations play once on enter.

2. **DSGN-05 (Geometric overlay language):** At least 2 diagonal section dividers (CSS clip-path) are visible on the homepage. At least 2-3 sections contain floating geometric shapes (outlined border shapes, opacity ~0.04, slow CSS float animation). The visual language is consistent -- wireframe aesthetic, not filled shapes.

3. **DSGN-06 (SplitText typography):** Homepage hero `<h1>` has a SplitText character reveal animation on page load. Characters stagger in smoothly. Font loading is handled via `autoSplit: true`.

4. **DSGN-07 (Lenis smooth scroll):** Smooth scroll is active site-wide on desktop. Mouse wheel input produces fluid, interpolated scrolling. Lenis is synced with GSAP ScrollTrigger (no jank or one-frame offset). Scrolling anchors and programmatic scroll work correctly.

5. **DSGN-08 (Parallax effects):** Hero background elements (grid pattern + gradient) have parallax movement on scroll (desktop only). Parallax speed is subtle (0.3). Background moves slower than content.

6. **DSGN-10 (Accessibility & performance):** Setting `prefers-reduced-motion: reduce` disables all motion -- Lenis reverts to native scroll, all GSAP animations are auto-reverted by matchMedia, CSS animations stop. Content is fully visible and accessible. Page loads at 60fps on desktop. `npm run build` succeeds. No CWV regression.
