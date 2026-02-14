---
phase: 5
plan: 1
subsystem: analytics
tags: [gtm, ga4, datalayer, tracking]
dependency-graph:
  requires: []
  provides: [gtm-container, datalayer-events]
  affects: [layout, env-config]
tech-stack:
  added: [google-tag-manager]
  patterns: [afterInteractive-script, graceful-degradation, typed-datalayer]
key-files:
  created:
    - src/components/analytics/gtm-script.tsx
    - src/components/analytics/gtm-event.ts
  modified:
    - src/app/layout.tsx
    - .env.local
    - .env.example
decisions:
  - afterInteractive strategy to avoid blocking FCP
  - Graceful degradation pattern (render null for missing/placeholder GTM ID)
  - dataLayer push utilities safe for SSR and GTM-absent environments
metrics:
  duration: 1m
  completed: 2026-02-14
  tasks: 5
  files: 5
---

# Phase 5 Plan 1: GTM Container Script & DataLayer Event Utilities Summary

GTM container injection via Next.js Script component with afterInteractive strategy, typed dataLayer push helpers for form_submission events, graceful degradation when credentials are placeholder values.

## What Was Built

### GTM Script Component (`src/components/analytics/gtm-script.tsx`)
- Client component reading `NEXT_PUBLIC_GTM_ID` environment variable
- Returns `null` when GTM ID is unset or equals `REPLACE_ME` (dev-safe)
- Renders `<Script strategy="afterInteractive">` with standard GTM snippet
- Includes `<noscript>` iframe fallback per GTM installation requirements
- Placed before `<Header />` in root layout body

### DataLayer Event Utilities (`src/components/analytics/gtm-event.ts`)
- `pushToDataLayer(event, data?)` -- guarded against SSR with `typeof window` check, initializes `window.dataLayer` if needed
- `trackFormSubmission(formName)` -- pushes `form_submission` event with `form_name` and `form_destination: 'hubspot'`
- TypeScript global `Window.dataLayer` declaration
- Both functions no-op safely on server and when GTM is not loaded

### Root Layout Integration (`src/app/layout.tsx`)
- Added `<GTMScript />` import and render before `<Header />`
- Noscript iframe is as close to opening `<body>` tag as possible

### Environment Configuration
- `.env.local`: Added `NEXT_PUBLIC_GTM_ID=REPLACE_ME`
- `.env.example`: Added `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` with section comments

## Commits

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | GTM container script component | `d368c1c` | `src/components/analytics/gtm-script.tsx` |
| 2 | Typed dataLayer push utilities | `88ee536` | `src/components/analytics/gtm-event.ts` |
| 3 | Wire GTMScript into root layout | `23d4a6d` | `src/app/layout.tsx` |
| 4-5 | Env var placeholders (local + example) | `2a2c0fb` | `.env.example`, `.env.local` |

## Verification

- [x] `npm run build` succeeds with no errors
- [x] GTMScript renders null when `NEXT_PUBLIC_GTM_ID=REPLACE_ME` (graceful degradation)
- [x] `pushToDataLayer` and `trackFormSubmission` exported with proper TypeScript types
- [x] Layout includes `<GTMScript />` before `<Header />`
- [x] `.env.local` and `.env.example` include new env vars

## Deviations from Plan

None -- plan executed exactly as written.

## Requirements Addressed

- **TRACK-01** (partial): GTM container installed and loading; full verification requires real GTM ID
- **TRACK-02** (partial): GA4 will be configured as a tag within GTM dashboard; enhanced measurement handles SPA page views automatically

## Self-Check: PASSED

All 5 files verified present. All 4 commits verified in git log.
