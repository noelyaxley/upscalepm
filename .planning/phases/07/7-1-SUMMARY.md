---
phase: 7
plan: 1
subsystem: location-data
tags: [programmatic-seo, locations, sydney, newcastle, data-module]
dependency-graph:
  requires: [services.ts, services.types.ts]
  provides: [locations.ts, locations.types.ts, getLocationBySlug, getAllLocations, getAllServiceLocationParams]
  affects: []
tech-stack:
  added: []
  patterns: [data-driven-content, typed-location-data, service-location-matrix]
key-files:
  created:
    - src/lib/locations.types.ts
    - src/lib/locations.ts
  modified: []
decisions:
  - "Explicit case study slug arrays per service-location (not fuzzy matching) -- follows existing services.ts pattern"
  - "Newcastle pages include Central Coast and Regional NSW case studies as relevant nearby work"
  - "Each localDescription 500-600+ chars with unique market-specific content, not template text"
metrics:
  duration: 3m
  tasks: 2
  files: 2
  completed: 2026-02-15
---

# Phase 7 Plan 1: Location Data Module & TypeScript Types Summary

Typed location data module with Sydney (6 councils, 7 suburbs) and Newcastle (4 councils, 6 suburbs), 10 unique service-location content blocks, and helper functions for static page generation.

## What Was Built

### 1. TypeScript Interfaces (`src/lib/locations.types.ts`)

Two exported interfaces that define the shape of location data:

- **ServiceLocationContext**: localDescription (string), localBenefits (string[]), relatedCaseStudies (string[]), localCta (string) -- one per service-location combination
- **LocationData**: slug, name, region, councils, suburbs, marketContext, and serviceContexts (Record keyed by service slug)

### 2. Location Data Module (`src/lib/locations.ts`)

Full data module following the `src/lib/services.ts` pattern with a `locations` array and three helper functions.

**Sydney data:**
- 6 councils: City of Sydney, Inner West Council, Cumberland City Council, City of Parramatta, Ku-ring-gai Council, Hornsby Shire Council
- 7 suburbs: Sydney CBD, Surry Hills, Darling Harbour, Granville, Asquith, Macquarie Park, Parramatta
- 3-paragraph marketContext covering Sydney's competitive market, regulatory complexity (EP&A Act, DCPs, LEPs), infrastructure investment corridors, and Upscale's local experience
- 5 serviceContexts with unique localDescription (500-600+ chars each), 4 localBenefits, 3 relatedCaseStudies, and localCta per service

**Newcastle data:**
- 4 councils: City of Newcastle, Lake Macquarie City Council, Cessnock City Council, Maitland City Council
- 6 suburbs: Newcastle CBD, Newcastle West, Honeysuckle, Merewether, Charlestown, Maitland
- 3-paragraph marketContext covering Newcastle's urban renewal, Hunter region economic diversification, collaborative council culture, and Upscale's regional capabilities
- 5 serviceContexts with unique localDescription (500-600+ chars each), 4 localBenefits, 2 relatedCaseStudies, and localCta per service

**Case study mappings:**
- Sydney services have 3 case studies each, all verified against `content/case-studies/` slugs
- Newcastle services have 2 case studies each -- the Newcastle office fit-out plus Central Coast (Pete Island) or Regional NSW (health infrastructure) as relevant nearby work
- All 26 case study references across 10 contexts are valid slugs

**Helper functions:**
- `getLocationBySlug(slug)` -- returns LocationData or undefined
- `getAllLocations()` -- returns both locations
- `getAllServiceLocationParams()` -- returns 10 `{ slug, location }` entries for generateStaticParams

## Commits

| Task | Description | Commit | Files |
|------|------------|--------|-------|
| 1 | TypeScript interfaces for location data | `605dade` | src/lib/locations.types.ts |
| 2 | Location data module with Sydney and Newcastle | `2307af4` | src/lib/locations.ts |

## Deviations from Plan

None -- plan executed exactly as written.

## Acceptance Criteria Verification

- [x] `src/lib/locations.types.ts` exports `LocationData` and `ServiceLocationContext` interfaces
- [x] `src/lib/locations.ts` exports `locations` array with Sydney and Newcastle entries, each containing `serviceContexts` for all 5 service slugs
- [x] `getLocationBySlug('sydney')` returns the Sydney data, `getLocationBySlug('newcastle')` returns Newcastle
- [x] `getAllServiceLocationParams()` returns exactly 10 entries (5 services x 2 locations)
- [x] Sydney `marketContext` is substantive (3 paragraphs), references real councils, suburbs, and market dynamics
- [x] Newcastle `marketContext` is substantive (3 paragraphs), references real councils, suburbs, and Hunter region dynamics
- [x] Each `localDescription` across all 10 service-location combinations is unique (500-600+ chars, not template text)
- [x] Case study slugs in `relatedCaseStudies` arrays all match actual case study filenames in `content/case-studies/`
- [x] `npm run build` succeeds (50/50 pages, zero errors)

## Self-Check: PASSED

All 2 files verified present. Both commit hashes verified in git log.
