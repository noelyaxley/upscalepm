---
phase: 04
plan: 3
subsystem: ui
tags: [react-calendly, calendly, booking, next-dynamic, ssr-false]

# Dependency graph
requires:
  - phase: 03
    provides: Contact page layout, ServiceCta component, Section layout primitive
provides:
  - CalendlyInline widget component for embedded booking
  - CalendlyPopup button component for modal booking
  - CalendlyInlineDynamic SSR-safe wrapper for server components
  - Contact page booking section with #booking anchor
  - ServiceCta showBooking/bookingText optional props
affects: [p4-4, p4-5, p4-6]

# Tech tracking
tech-stack:
  added: [react-calendly]
  patterns: [dynamic-import-ssr-false, client-wrapper-for-server-component, env-var-graceful-fallback]

key-files:
  created:
    - src/components/booking/calendly-inline.tsx
    - src/components/booking/calendly-popup.tsx
    - src/components/booking/calendly-inline-dynamic.tsx
  modified:
    - src/app/contact/page.tsx
    - src/components/sections/service-cta.tsx

key-decisions:
  - "CalendlyInlineDynamic wrapper pattern for SSR-safe usage in server components"
  - "Anchor link (#booking) for in-page navigation instead of PopupButton in server components"
  - "Mounted state guard in CalendlyPopup instead of dynamic import for SSR safety"

patterns-established:
  - "Dynamic import wrapper: create a 'use client' wrapper component that uses next/dynamic with ssr:false, then import the wrapper in server components"
  - "Env var fallback: check for both missing and placeholder (REPLACE_ME) values, show graceful fallback UI"

# Metrics
duration: 3min
completed: 2026-02-14
---

# Phase 4 Plan 3: Calendly Booking Integration Summary

**react-calendly InlineWidget and PopupButton components with SSR-safe dynamic imports, contact page booking section, and ServiceCta dual-CTA support**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-14T11:02:55Z
- **Completed:** 2026-02-14T11:05:32Z
- **Tasks:** 5
- **Files modified:** 6

## Accomplishments
- Calendly InlineWidget component with graceful fallback when URL not configured
- Calendly PopupButton component with SSR mount guard and consistent shadcn styling
- Contact page shows full Calendly booking section below the form with anchor navigation
- ServiceCta component extended with optional showBooking prop for dual CTA pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Install react-calendly** - `43260e5` (chore)
2. **Task 2: Create calendly-inline.tsx** - `f784928` (feat)
3. **Task 3: Create calendly-popup.tsx** - `97ee8dd` (feat)
4. **Task 4: Modify contact page with booking section** - `06d27c2` (feat)
5. **Task 5: Add showBooking prop to ServiceCta** - `8dba319` (feat)

## Files Created/Modified
- `src/components/booking/calendly-inline.tsx` - InlineWidget wrapper with URL prop/env fallback
- `src/components/booking/calendly-popup.tsx` - PopupButton wrapper with mounted state SSR guard
- `src/components/booking/calendly-inline-dynamic.tsx` - SSR-safe dynamic import wrapper for server components
- `src/app/contact/page.tsx` - Added booking section with CalendlyInlineDynamic and trust signal link
- `src/components/sections/service-cta.tsx` - Added showBooking/bookingText props with outline button
- `package.json` - Added react-calendly dependency

## Decisions Made
- **CalendlyInlineDynamic wrapper pattern**: Created a dedicated 'use client' wrapper that uses `next/dynamic` with `ssr: false` to load CalendlyInline. This allows the contact page (a server component) to embed the Calendly widget without hydration errors.
- **Anchor link over PopupButton in server context**: ServiceCta is a server component, so we use a plain `<a>` link to the Calendly URL (or `/contact#booking` fallback) instead of importing react-calendly PopupButton which requires client-side DOM.
- **Mounted state guard in CalendlyPopup**: Used `useState(false)` + `useEffect` pattern instead of dynamic import for the PopupButton component, since PopupButton accesses `document.body` for the rootElement prop.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created CalendlyInlineDynamic wrapper component**
- **Found during:** Task 4 (Modify contact page)
- **Issue:** Contact page is a server component. Plan suggests using `next/dynamic` with `ssr: false` directly in the page, but `dynamic()` must be called in a client component module scope.
- **Fix:** Created `src/components/booking/calendly-inline-dynamic.tsx` as a 'use client' wrapper that does the dynamic import internally, then imported this wrapper in the server component page.
- **Files modified:** src/components/booking/calendly-inline-dynamic.tsx (created)
- **Verification:** npm run build succeeds, all 50 pages generate correctly
- **Committed in:** 06d27c2 (Task 4 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary architectural adaptation for Next.js App Router server/client component boundary. No scope creep.

## Issues Encountered
None - all tasks completed without errors.

## User Setup Required
**Calendly URL must be configured.** Set `NEXT_PUBLIC_CALENDLY_URL` in `.env.local` with your Calendly booking page URL (e.g., `https://calendly.com/your-username/30min`). Until configured, the booking section shows a graceful placeholder.

## Next Phase Readiness
- Calendly components ready for Prompt 4 (CRO Contact Page) and Prompt 5 (CRO Homepage & Service Pages)
- ServiceCta `showBooking` prop ready for service page dual-CTA pattern
- Build passes with all 50 static pages generating correctly

## Self-Check: PASSED

All 5 created/modified files verified on disk. All 5 task commit hashes found in git log. react-calendly confirmed in package.json. npm run build succeeds with all 50 static pages.

---
*Phase: 04*
*Completed: 2026-02-14*
