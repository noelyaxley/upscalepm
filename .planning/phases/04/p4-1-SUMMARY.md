---
phase: 04
plan: 1
subsystem: tracking
tags: [hubspot, utm, analytics, next-script, sessionStorage]

# Dependency graph
requires:
  - phase: 03
    provides: Root layout with Header/Footer, all 50 static pages building
provides:
  - UTM capture/persist/retrieve utilities (src/lib/utm.ts)
  - HubSpot tracking script with SPA route change detection
  - UTM provider with Suspense boundary for search params
  - Root layout wired with HubSpotTracker and UTMProvider
  - .env.example with HubSpot and Calendly environment variable keys
affects: [p4-2 contact form server action, p4-3 calendly integration]

# Tech tracking
tech-stack:
  added: []
  patterns: [HubSpot _hsq tracking array, sessionStorage UTM persistence, useRef skip-first-render, Suspense boundary for useSearchParams]

key-files:
  created:
    - src/lib/utm.ts
    - src/components/hubspot/utm-provider.tsx
    - src/components/hubspot/hubspot-tracker.tsx
    - .env.example
  modified:
    - src/app/layout.tsx
    - .gitignore

key-decisions:
  - "First-touch UTM attribution: only stores UTMs if none already in sessionStorage"
  - "useRef(true) skip pattern for HubSpot initial page view to prevent double-counting"
  - "Graceful degradation: HubSpotTracker renders null when portal ID is missing or REPLACE_ME"
  - ".env.example committed via gitignore exception (!.env.example)"

patterns-established:
  - "HubSpot SPA tracking: usePathname + _hsq.push(['setPath', path]) + _hsq.push(['trackPageView']) on route change"
  - "Suspense boundary required around useSearchParams to preserve static generation"
  - "Environment variable graceful degradation: check for REPLACE_ME placeholder"

# Metrics
duration: 2min
completed: 2026-02-14
---

# Phase 4 Plan 1: HubSpot Tracking, UTM Capture & Root Layout Wiring Summary

**HubSpot page-view tracking with SPA route detection, UTM first-touch capture to sessionStorage, and root layout integration with graceful degradation**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-14T11:02:54Z
- **Completed:** 2026-02-14T11:04:55Z
- **Tasks:** 5
- **Files modified:** 6

## Accomplishments
- UTM parameter capture utilities with first-touch attribution and sessionStorage persistence
- HubSpot tracking script that detects SPA route changes without double-counting initial page view
- UTM provider wrapped in Suspense boundary to preserve static page generation
- Root layout wired with both components for site-wide tracking
- Environment variable documentation via .env.example

## Task Commits

Each task was committed atomically:

1. **Task 1: Create src/lib/utm.ts** - `d1dfe98` (feat)
2. **Task 2: Create src/components/hubspot/utm-provider.tsx** - `f4cf1f9` (feat)
3. **Task 3: Create src/components/hubspot/hubspot-tracker.tsx** - `9d6db6e` (feat)
4. **Task 4: Modify src/app/layout.tsx** - `a7cc6f9` (feat)
5. **Task 5: Create .env.example and .env.local** - `0e4b053` (chore)

## Files Created/Modified
- `src/lib/utm.ts` - UTM capture, retrieve, and clear utilities with sessionStorage persistence
- `src/components/hubspot/utm-provider.tsx` - Client component wrapping useSearchParams in Suspense for UTM capture
- `src/components/hubspot/hubspot-tracker.tsx` - HubSpot tracking script with SPA route change detection via _hsq
- `src/app/layout.tsx` - Added HubSpotTracker and UTMProvider after Footer
- `.env.example` - Environment variable documentation for HubSpot and Calendly
- `.gitignore` - Added !.env.example exception

## Decisions Made
- **First-touch UTM attribution:** Only stores UTM params if none already exist in sessionStorage, preserving the original acquisition source
- **useRef skip pattern:** Prevents double-counting the initial page view since HubSpot script automatically fires trackPageView on load
- **Graceful degradation:** HubSpotTracker renders null when portal ID is missing or set to REPLACE_ME, allowing dev/local to work without HubSpot credentials
- **.env.example via gitignore exception:** Added `!.env.example` to `.gitignore` since the existing `.env*` pattern would block it

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness
- UTM utilities (`getStoredUTMParams`) ready for Prompt 2 (contact form server action)
- HubSpot tracking operational site-wide once `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is set
- All 50 static pages still building correctly with zero warnings
- `npm run build` passes cleanly

## Self-Check: PASSED

All 7 files verified present. All 5 commits verified in git log.

---
*Phase: 04*
*Completed: 2026-02-14*
