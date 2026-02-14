# Phase 6: Animation & Visual Polish -- Research

**Date:** 2026-02-14
**Question:** "What do I need to know to PLAN this phase well?"
**Scope:** GSAP ScrollTrigger, Lenis smooth scroll, SplitText typography animations, parallax effects, Core Web Vitals maintenance, prefers-reduced-motion accessibility

---

## 1. Current Codebase State

### Installed Packages (already in package.json)

| Package | Version | Notes |
|---------|---------|-------|
| `gsap` | 3.14.2 | **Full Club/Premium build** -- includes ScrollTrigger, SplitText, ScrollSmoother, Flip, DrawSVG, MorphSVG, etc. |
| `@gsap/react` | 2.1.2 | Provides `useGSAP()` hook -- SSR-safe (uses `useIsomorphicLayoutEffect` internally) |
| `lenis` | 1.3.17 | Smooth scroll library. Exports `lenis/react` with `<ReactLenis>` and `useLenis()` hook |

### Key Finding: SplitText is FREE

The installed `gsap@3.14.2` includes SplitText.js as a full, production-ready module (not a trial). As of GSAP 3.12+, **SplitText was made free** for all GSAP users (no longer Club-only). This eliminates the need for any alternative library. Import path: `gsap/SplitText`.

### Current Animation Usage

**Zero.** No GSAP, Lenis, ScrollTrigger, SplitText, or animation-related code exists anywhere in `/src`. All three packages are installed but unused. The codebase is a clean slate for animation implementation.

### Page Structure (what will be animated)

The site is a standard Next.js App Router structure with Server Components as pages and Client Components as interactive sections:

- **Layout** (`src/app/layout.tsx`): Server Component. Renders `<Header>`, `<main>`, `<Footer>`. Fonts: Inter (sans) + Playfair Display (display). No smooth scroll provider currently.
- **Homepage** (`src/app/page.tsx`): Server Component composing `<Hero>`, `<ClientLogos>`, `<ValueProposition>`, `<ServicesOverview>`, mid-page CTA `<Section>`, `<FeaturedCaseStudies>`, `<HomepageCta>`.
- **Hero** (`src/components/sections/hero.tsx`): Server Component. Dark bg with grid pattern, `<h1>` in Playfair Display, subtitle, two CTAs. **Primary target for SplitText entrance animation + parallax.**
- **Section** (`src/components/layout/section.tsx`): Reusable wrapper with background/spacing variants. **Primary target for scroll-triggered fade-up animations.**
- **Other pages:** About, Services (index + [slug]), Case Studies (index + [slug]), Insights (index + [slug]), Contact, legal pages.

---

## 2. GSAP + Next.js Architecture Pattern

### Plugin Registration (Centralized, Once)

Create a single `"use client"` config file that registers all plugins once. This prevents duplicate registration and ensures a single GSAP instance across the app.

```typescript
// src/lib/gsap/index.ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register plugins once
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
```

### useGSAP Hook (not useEffect)

The `@gsap/react` package provides `useGSAP()` which is the **required** way to use GSAP in React:

- Internally uses `useIsomorphicLayoutEffect` (safe for SSR)
- Automatically creates a GSAP `context()` for cleanup
- Returns `{ context, contextSafe }` for event handler animations
- Scopes all animations to a ref (prevents leaking to other components)
- **Automatically reverts** all animations and ScrollTriggers on unmount

```typescript
"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

function AnimatedSection({ children }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".animate-item", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });
  }, { scope: container }); // Scoped to container ref

  return <div ref={container}>{children}</div>;
}
```

### Server vs Client Component Boundary

Pages (e.g., `page.tsx`) remain Server Components. Animation wrappers must be Client Components (`"use client"`). Two patterns:

1. **Wrapper pattern:** Create a `<ScrollReveal>` Client Component that wraps children and adds animation.
2. **Conversion pattern:** Convert individual section components (hero.tsx, etc.) to Client Components as needed.

**Recommendation:** Wrapper pattern is cleaner -- keeps existing section components as Server Components, wraps them at the page level.

---

## 3. GSAP ScrollTrigger on Mobile -- Performance Patterns & Pitfalls

### How ScrollTrigger Works (Performance Model)

ScrollTrigger does NOT constantly watch every element. It:
1. Calculates start/end positions up-front during `refresh()`
2. Debounces scroll events, updating only on the next `requestAnimationFrame`
3. Throttles resize recalculations (waits 200ms gap before processing)

This makes it inherently efficient. The main performance risks come from **what you animate**, not ScrollTrigger itself.

### Mobile-Specific Pitfalls

| Pitfall | Impact | Mitigation |
|---------|--------|------------|
| **Animating layout properties** (width, height, padding, margin, top, left) | Forces layout recalc every frame, kills 60fps | **Only animate `transform` and `opacity`** -- these run on the compositor thread |
| **Too many ScrollTrigger instances** | Each calculates positions on refresh; 50+ can slow refresh | Use `ScrollTrigger.batch()` for repeating reveal patterns |
| **Pinning on mobile** | iOS Safari address bar show/hide causes position jumps | Avoid pinning on mobile; use `gsap.matchMedia()` to disable |
| **scroll-behavior: smooth** conflict | CSS smooth scroll fights with ScrollTrigger | Never use `scroll-behavior: smooth` with ScrollTrigger |
| **Resize/orientation change** | Triggers expensive recalculation of all positions | Use `ScrollTrigger.config({ ignoreMobileResize: true })` to skip refreshes when only the address bar changes height |
| **Missing cleanup** | Memory leaks on SPA navigation | `useGSAP()` handles this automatically; always use it |
| **Animating the pinned element itself** | Throws off measurements | Nest animated elements inside the pinned container |

### ScrollTrigger.batch() for Reveal Animations

For the repeating "fade-up on scroll" pattern across all sections, `batch()` is far more efficient than individual ScrollTriggers:

```typescript
ScrollTrigger.batch(".reveal", {
  interval: 0.1,     // Batch callbacks within 100ms
  batchMax: 3,       // Max elements per batch
  onEnter: (batch) => gsap.to(batch, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    overwrite: true,
  }),
});
```

### normalizeScroll for iOS Safari

`ScrollTrigger.normalizeScroll(true)` intercepts native scroll and handles it on the JS thread. This:
- Prevents address bar show/hide on most mobile devices
- Fixes iOS Safari scroll position misreporting bugs
- **Caveat:** Recent iOS versions force address bar show/hide in portrait on phones; use `ignoreMobileResize: true` as fallback

**Decision needed:** Whether to use `normalizeScroll` (adds complexity, fights with Lenis) or accept minor iOS address bar quirks.

---

## 4. Parallax Effects Without Jank

### GPU-Accelerated Transforms Only

Parallax must use `transform: translate3d()` or `y`/`x` in GSAP (which compiles to transforms). Never animate `top`, `left`, `background-position`, or `margin`.

```typescript
gsap.to(".parallax-bg", {
  y: -100,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true, // Links animation progress to scroll position
  },
});
```

### Performance Patterns

| Technique | Why |
|-----------|-----|
| `scrub: true` (not a number) | Boolean `true` catches up immediately; numeric values add lerp delay that can compound with Lenis lerp |
| `gsap.quickSetter()` | Pre-compiles property setter for use in `onUpdate` callbacks -- avoids repeated DOM queries |
| `will-change: transform` | Promotes element to its own compositor layer. Use **sparingly** -- only on elements that will actually animate. Too many promoted layers eat GPU memory on mobile |
| Limit parallax speed | Keep speed differences between 0.2-0.5. Beyond 0.7 can induce motion sickness |
| Avoid parallax on mobile | Often janky due to touch scroll physics. Use `gsap.matchMedia()` to disable or reduce on mobile |

### Parallax on Hero Section

The hero already has a background grid pattern (`div.absolute.inset-0`) and gradient overlay. Parallax can be applied to these background elements while keeping text stationary:

```typescript
useGSAP(() => {
  gsap.to(".hero-bg", {
    y: -80,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}, { scope: heroRef });
```

---

## 5. Lenis Smooth Scroll + GSAP ScrollTrigger Integration

### The Synchronization Problem

Lenis and ScrollTrigger both track scroll position independently. Without synchronization, ScrollTrigger may be one frame behind Lenis, causing visual misalignment.

### Canonical Integration Pattern

From the Lenis README and GSAP community:

```typescript
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// 1. Create Lenis instance
const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.2,
  // Do NOT set autoRaf: true when syncing with GSAP ticker
});

// 2. Connect Lenis scroll events to ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// 3. Add Lenis raf to GSAP's ticker (single RAF loop)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // GSAP provides time in seconds, Lenis expects ms
});

// 4. Disable GSAP lag smoothing (prevents animation delay)
gsap.ticker.lagSmoothing(0);
```

### Two Implementation Approaches

#### Approach A: ReactLenis Provider (Simpler)

```tsx
// src/components/smooth-scroll.tsx
"use client";
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        // autoRaf: false -- managed by GSAP ticker
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

Then sync via `useLenis`:

```tsx
"use client";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function LenisGSAPSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerCallback);
    };
  }, [lenis]);

  return null;
}
```

**Pros:** Clean React integration, `useLenis()` hook available everywhere, auto-cleanup.
**Cons:** Community reports of **laggy mobile performance** (especially iOS) when using `<ReactLenis>` wrapper. Extra wrapper div in DOM.

#### Approach B: Raw Lenis with GSAP Ticker (Better Performance)

Instantiate Lenis manually in a `useLayoutEffect`, bypassing the React wrapper entirely. Community consensus says this is **more performant on mobile**.

```tsx
"use client";
import { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
```

**Pros:** Better mobile performance, no extra DOM wrapper, direct control.
**Cons:** No `useLenis()` hook for other components (can pass via context if needed), manual cleanup.

### Recommendation

**Start with Approach A** (`<ReactLenis root>`). The `root` option uses the `<html>` element as scroll container (no extra wrapper div). If mobile testing reveals iOS jank, switch to Approach B.

### Critical Configuration Notes

| Setting | Value | Why |
|---------|-------|-----|
| `autoRaf` | `false` (or omit when using GSAP ticker) | Prevent double RAF loops -- GSAP ticker drives both |
| `lerp` | 0.1 | Subtle smoothing; higher values feel sluggish |
| `duration` | 1.2 | Alternative to lerp; sets fixed scroll animation duration |
| `smoothWheel` | `true` | Smooth mouse wheel events |
| `syncTouch` | `false` | Leave native touch scrolling alone on mobile |
| `gsap.ticker.lagSmoothing(0)` | 0 | Disable lag compensation to prevent scroll animation delay |

### Lenis + normalizeScroll Conflict

**Do NOT use both.** Lenis and `ScrollTrigger.normalizeScroll()` both intercept native scroll. Using both will cause double-handling and broken scroll behavior. Pick one:

- **Lenis** for smooth scroll + aesthetic polish
- **normalizeScroll** for iOS Safari bug workarounds

Since Lenis is the architectural choice here, skip `normalizeScroll`. Accept minor iOS address bar quirks and use `ScrollTrigger.config({ ignoreMobileResize: true })` instead.

---

## 6. SplitText Typography Animations

### SplitText is Available (No Alternative Needed)

The installed `gsap@3.14.2` includes the **full SplitText plugin**. Import from `gsap/SplitText`. No need for `splitting.js` or other alternatives.

### Core API

```typescript
import { SplitText } from "gsap/SplitText";

// Static create method (preferred in v3.14+)
const split = SplitText.create(".hero-heading", {
  type: "words, chars",   // Split into words and characters
  autoSplit: true,         // Re-split on font load and resize
  onSplit: () => {
    // Return animation -- auto-reverts on re-split
    return gsap.from(split.chars, {
      y: 40,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.out",
    });
  },
});
```

### Font Loading Handling

**Critical for this project:** The site uses Google Fonts (Inter + Playfair Display) loaded via `next/font/google` with `display: "swap"`. Fonts may not be ready when SplitText first runs.

Two strategies:

1. **`autoSplit: true` + `onSplit()`** (Recommended): SplitText listens for `document.fonts.loadingdone` and uses a `ResizeObserver` to detect font-induced reflow. When fonts finish loading, it automatically reverts and re-splits, calling `onSplit()` again. If the callback returns a GSAP animation, the animation is seamlessly re-created.

2. **Explicit wait:** `document.fonts.ready.then(() => { /* split */ })` -- less elegant, blocks initial render.

**Use strategy 1.** The `autoSplit: true` + `onSplit()` pattern handles font loading, container resize, and responsive reflow automatically.

### Accessibility

SplitText defaults to `aria: "auto"`:
- Adds `aria-label` on the parent element with the full original text
- Adds `aria-hidden="true"` on all child split elements (chars, words, lines)
- Screen readers read the `aria-label` (full text), not individual letter spans

This means SplitText is **accessible by default**. No extra work needed.

### Performance Considerations for SplitText

| Consideration | Action |
|---------------|--------|
| Split only what you need | If animating words only, use `type: "words"` (skip `chars`) |
| CSS kerning | Apply `font-kerning: none; text-rendering: optimizeSpeed;` on split elements to prevent kerning shifts |
| Revert after animation | Call `split.revert()` after entrance animation completes to restore original DOM (reduces DOM node count) |
| Limit usage | Apply SplitText to 1-3 key headings max (hero, section titles). Not every heading needs it |

### React Pattern for SplitText

```typescript
"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

function HeroHeading() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    SplitText.create(headingRef.current, {
      type: "words, chars",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.chars, {
          y: 30,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
        });
      },
    });
  }, { scope: headingRef });

  return (
    <h1 ref={headingRef} className="font-display text-4xl font-bold">
      Client-Side Project Management
    </h1>
  );
}
```

---

## 7. Core Web Vitals Maintenance with Animations

### Current CWV Baseline

From Phase 5 audit: low risk. GTM uses `afterInteractive`. All images use `next/image`. Build generates ~50 static pages. This is a strong baseline to protect.

### How Animations Can Degrade CWV

| Metric | Risk from Animations | Mitigation |
|--------|---------------------|------------|
| **LCP** (Largest Contentful Paint) | GSAP JS must load and execute before hero content appears. If hero text starts `opacity: 0`, LCP is delayed until GSAP runs. | **Never hide LCP elements initially.** Set initial state via CSS, let GSAP enhance. Or: ensure GSAP runs before paint via `useLayoutEffect` (which `useGSAP` uses internally). |
| **CLS** (Cumulative Layout Shift) | SplitText creates wrapper `<div>`s/`<span>`s that can shift layout if fonts aren't loaded. Pinning elements without proper spacers causes layout jumps. | `autoSplit: true` handles font reflow. ScrollTrigger auto-adds pin-spacers. Only animate `transform`/`opacity` (no layout properties). |
| **INP** (Interaction to Next Paint) | Scroll event handlers that do expensive work can delay input processing. | GSAP ScrollTrigger is already optimized (RAF-synced, debounced). Keep `onUpdate` callbacks lightweight. Avoid synchronous DOM reads in scroll handlers. |

### Critical LCP Protection Pattern

The hero `<h1>` is likely the LCP element. If SplitText wraps it in spans with `autoAlpha: 0`, the browser won't count it as painted until GSAP runs.

**Safe pattern:**

```typescript
// Hero text is VISIBLE by default (no opacity: 0 in CSS)
// SplitText animates FROM offscreen position, not FROM hidden
SplitText.create(headingRef.current, {
  type: "chars",
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.chars, {
      y: 20,         // Slide up from slightly below
      opacity: 0.3,  // Start semi-visible, not invisible
      duration: 0.4,
      stagger: 0.02,
    });
  },
});
```

**Even safer:** Use `gsap.from()` with `delay: 0` so it starts immediately on first paint. The text flashes visible then animates -- this is acceptable because LCP captures the first paint.

### GSAP Bundle Size Impact

| Module | Approx Size (minified) |
|--------|----------------------|
| gsap core | ~28 KB |
| ScrollTrigger | ~14 KB |
| SplitText | ~8 KB |
| **Total** | **~50 KB** |

This is loaded client-side only (`"use client"` components). Next.js will tree-shake unused plugins. Consider dynamic import for pages that don't need animation:

```typescript
// For pages that need animation
const { gsap, ScrollTrigger } = await import("@/lib/gsap");
```

### Monitoring

After implementing animations, test with:
- Lighthouse (lab data)
- Chrome DevTools Performance panel (check for dropped frames)
- `web-vitals` library (field data) -- already in the Next.js bundle
- PageSpeed Insights (real user data after deployment)

---

## 8. prefers-reduced-motion Patterns

### gsap.matchMedia() -- The Canonical Pattern

GSAP's `matchMedia()` is purpose-built for this. It automatically reverts all animations and ScrollTriggers when a media query stops matching.

```typescript
const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 768px)",
    isMobile: "(max-width: 767px)",
    prefersMotion: "(prefers-reduced-motion: no-preference)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { isDesktop, prefersMotion, reducedMotion } = context.conditions!;

    if (reducedMotion) {
      // No scroll animations, no parallax, no SplitText
      // Content is visible by default, so nothing to do
      return;
    }

    // Full animations only when user has no motion preference
    ScrollTrigger.batch(".reveal", {
      onEnter: (batch) =>
        gsap.from(batch, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        }),
    });

    if (isDesktop) {
      // Parallax only on desktop
      gsap.to(".parallax-bg", {
        y: -80,
        scrollTrigger: { trigger: ".hero", scrub: true },
      });
    }
  }
);
```

### What to Disable vs. Reduce

| Animation Type | Full Motion | Reduced Motion |
|---------------|-------------|----------------|
| Scroll reveal (fade-up) | `y: 40, opacity: 0 -> 1` | Skip entirely OR use `opacity: 0 -> 1` only (no movement) |
| SplitText chars | Staggered char reveal with y movement | Skip entirely (text visible immediately) |
| Parallax | Background y-offset on scroll | Disable completely |
| Lenis smooth scroll | Active | **Disable** -- respect native scroll behavior |
| Geometric floating shapes | Subtle CSS animation | Static (no animation) |
| Diagonal dividers | Static CSS clip-path | Keep (no motion involved) |

### Lenis and Reduced Motion

When `prefers-reduced-motion: reduce` is active, Lenis should be **disabled entirely**. Users who request reduced motion expect native scroll behavior.

```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  // Only initialize Lenis when motion is OK
  const lenis = new Lenis({ ... });
  // ... setup
}
```

Or conditionally render the `<ReactLenis>` provider.

### Dynamic Preference Changes

Users can toggle reduced motion in OS settings while the page is open. `gsap.matchMedia()` handles this automatically -- it listens for media query changes and reverts/re-applies animations.

For Lenis, add a listener:

```typescript
const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
mq.addEventListener("change", (e) => {
  if (e.matches) {
    lenis.destroy();
  } else {
    // Re-initialize
  }
});
```

---

## 9. CSS clip-path Diagonal Dividers & Geometric Shapes

### Diagonal Section Dividers

These are **pure CSS** -- no JavaScript animation needed. Use `clip-path: polygon()` on section elements:

```css
/* Diagonal top edge */
.section-diagonal {
  clip-path: polygon(0 4rem, 100% 0, 100% 100%, 0 100%);
  margin-top: -4rem; /* Overlap previous section */
  padding-top: calc(4rem + var(--section-padding));
}

/* Inverted diagonal */
.section-diagonal-reverse {
  clip-path: polygon(0 0, 100% 4rem, 100% 100%, 0 100%);
}
```

### CLS Impact of clip-path

`clip-path` does NOT cause layout shifts because:
- It operates on the paint layer, not the layout layer
- It clips the painted output without changing the element's box model
- `margin-top: -4rem` for overlap is stable once rendered

### Floating Geometric Shapes

Subtle depth effects with CSS animation (no GSAP needed for simple floats):

```css
.geo-shape {
  position: absolute;
  opacity: 0.05;
  animation: float 20s ease-in-out infinite;
  will-change: transform; /* OK here -- long-running animation */
}

@media (prefers-reduced-motion: reduce) {
  .geo-shape { animation: none; }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(3deg); }
}
```

**Keep these subtle.** Opacity 0.03-0.08, slow duration (15-30s), minimal displacement. The visual identity is "high-performance minimalist," not "particles.js."

---

## 10. Implementation Architecture (Recommended)

### File Structure

```
src/
  lib/
    gsap/
      index.ts          # Central GSAP config + plugin registration
  components/
    animation/
      smooth-scroll.tsx  # Lenis provider (wraps layout)
      scroll-reveal.tsx  # Generic fade-up wrapper using ScrollTrigger.batch
      parallax.tsx       # Parallax wrapper component
      split-heading.tsx  # SplitText heading component
      motion-config.tsx  # gsap.matchMedia() setup + reduced motion handling
```

### Initialization Order

1. `<SmoothScroll>` wraps `<body>` children in layout.tsx (Lenis)
2. `<MotionConfig>` sets up `gsap.matchMedia()` with breakpoints + reduced motion
3. Individual components use `useGSAP()` for their animations
4. `ScrollTrigger.batch()` handles bulk reveal animations
5. `<SplitHeading>` handles hero typography animation

### Layout Integration Point

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <SmoothScroll> {/* Lenis provider */}
          <GTMScript />
          <Header />
          <main>{children}</main>
          <Footer />
          <MotionConfig /> {/* gsap.matchMedia setup, renders nothing */}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

---

## 11. Risks & Decisions Needed

### Decisions for Planning Phase

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| D1 | Lenis integration approach | A) `<ReactLenis root>` provider, B) Raw Lenis with GSAP ticker | Start with A, switch to B if mobile jank |
| D2 | normalizeScroll usage | A) Enable for iOS fixes, B) Skip (conflicts with Lenis) | B -- skip it, use `ignoreMobileResize` instead |
| D3 | Parallax on mobile | A) Enable with reduced speed, B) Disable entirely | B -- disable on mobile via `gsap.matchMedia()` |
| D4 | SplitText scope | A) Hero heading only, B) Hero + section headings (2-3) | A -- hero heading only to start; expand later |
| D5 | Scroll reveal pattern | A) Individual ScrollTrigger per section, B) `ScrollTrigger.batch()` | B -- batch is more performant for repeating patterns |
| D6 | Geometric shapes implementation | A) CSS-only animation, B) GSAP-driven | A -- CSS is simpler, respects reduced motion via CSS media query |
| D7 | Reduced motion behavior | A) Disable all animation, B) Replace motion with fade-only | A -- disable all, content visible by default |

### Technical Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Lenis + iOS Safari scroll conflicts | Medium | Test on real iOS devices early. Have Approach B ready as fallback. Can disable Lenis on iOS if needed via UA detection. |
| SplitText + Next.js font swap timing | Low | `autoSplit: true` handles this. `next/font/google` with `display: "swap"` ensures text is visible during load. |
| LCP regression from hero animation | Medium | Never start hero text at `opacity: 0`. Use `gsap.from()` so initial state is visible. Test with Lighthouse before/after. |
| CLS from SplitText DOM manipulation | Low | SplitText v3.14 handles aria and sizing well. `autoSplit` re-splits on font load. Test with CLS audit. |
| Bundle size increase (~50 KB) | Low | GSAP + ScrollTrigger + SplitText total ~50 KB minified. Acceptable for the animation quality gained. Tree-shaking removes unused plugins. |
| INP degradation from scroll handlers | Low | GSAP ScrollTrigger is already optimized. Avoid expensive `onUpdate` callbacks. |

---

## 12. Sources

### GSAP Documentation
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [SplitText Docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- [gsap.matchMedia() Docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
- [normalizeScroll Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/)

### GSAP Community Forums
- [ScrollTrigger Best Practices](https://gsap.com/community/forums/topic/32787-scrolltrigger-best-practices/)
- [Multiple Reveal Animation Performance](https://gsap.com/community/forums/topic/39943-looking-for-best-practices-when-it-comes-to-the-performance-of-multiple-reveal-animations-using-scrolltrigger/)
- [ScrollTrigger Mobile Responsiveness](https://gsap.com/community/forums/topic/39412-scrolltrigger-mobile-responsiveness/)
- [ScrollTrigger + Lenis Synchronization Patterns](https://gsap.com/community/forums/topic/40426-patterns-for-synchronizing-scrolltrigger-and-lenis-in-reactnext/)
- [ScrollTrigger iOS Safari Pinning](https://gsap.com/community/forums/topic/40393-gsap-scrolltrigger-pin-position-is-jumping-on-ios-due-to-its-address-bar/)
- [SplitText in React/Next.js](https://gsap.com/community/forums/topic/36777-scrollsmoother-splittext-nextjs/)
- [prefers-reduced-motion with matchMedia](https://gsap.com/community/forums/topic/27141-scrolltriggermatchmedia-and-prefers-reduced-motion/)

### Lenis
- [Lenis GitHub Repository](https://github.com/darkroomengineering/lenis)
- [Lenis npm](https://www.npmjs.com/package/lenis)

### Tutorials & Articles
- [GSAP ScrollTrigger Complete Guide (GSAPify)](https://gsapify.com/gsap-scrolltrigger)
- [Next.js Smooth Scrolling with Lenis + GSAP](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap)
- [Setting Up GSAP with Next.js: 2025 Edition](https://medium.com/@thomasaugot/setting-up-gsap-with-next-js-2025-edition-bcb86e48eab6)
- [GSAP and Accessibility](https://annebovelett.eu/gsap-and-accessibility-yes-you-can-have-both/)
- [GSAP & Next.js Setup: The BSMNT Way](https://basement.studio/post/gsap-and-nextjs-setup-the-bsmnt-way)
- [SplitText Rewrite (Webflow Blog)](https://webflow.com/blog/gsap-splittext-rewrite)
- [From SplitText to MorphSVG: Creative Demos (Codrops)](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)

### Core Web Vitals
- [Optimizing Core Web Vitals (Vercel)](https://vercel.com/kb/guide/optimizing-core-web-vitals-in-2024)
- [Webflow + GSAP SEO Synergy](https://www.broworks.net/blog/webflow-gsap-seo-synergy-do-animations-hurt-your-rankings)
- [Parallax Scrolling Best Practices (Builder.io)](https://www.builder.io/blog/parallax-scrolling-effect)

### Accessibility
- [Respecting Users' Motion Preferences (Smashing Magazine)](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/)
- [prefers-reduced-motion (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
