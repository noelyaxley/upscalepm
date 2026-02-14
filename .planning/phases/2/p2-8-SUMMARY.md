---
phase: 2
plan: 8
subsystem: content-migration
tags: [services, typescript-data, copy-extraction, wordpress-migration]
dependency-graph:
  requires: [phase-1-foundation]
  provides: [service-page-data, service-types, service-lookup-functions]
  affects: [service-page-components-phase-3, navigation, seo-metadata]
tech-stack:
  added: []
  patterns: [typescript-data-file, slug-based-lookup, clean-copy-extraction]
key-files:
  created:
    - src/lib/services.types.ts
    - src/lib/services.ts
  modified: []
decisions:
  - "Service pages as TypeScript data, not MDX -- React components will consume in Phase 3"
  - "Content split into 2 sections per service for structural clarity in rendering"
  - "Related case study slugs mapped by service type relevance"
metrics:
  duration: 6m
  completed: 2026-02-14T07:55:00Z
  tasks: 3
  files: 2
---

# Phase 2 Plan 8: Service Page Copy Extraction Summary

Extracted copy from 5 WordPress service pages into structured TypeScript data with ServicePage interface, 2+ content sections, 6 benefits, and related case study mappings per service.

## Tasks Completed

| Task | Description | Commit | Key Files |
|------|-------------|--------|-----------|
| 1 | Create ServicePage type interface | `87c8db8` | `src/lib/services.types.ts` |
| 2 | Extract all 5 service page copy and create data file | `2ea0185` | `src/lib/services.ts` |
| 3 | Verify TypeScript compilation and data validation | (verified, no code change) | -- |

## Service Pages Extracted

| Service | Slug | Sections | Benefits | Related Case Studies |
|---------|------|----------|----------|---------------------|
| Feasibility and Advisory | `feasibility-advisory` | 2 | 6 | 3 |
| Design Management | `design-management` | 2 | 6 | 3 |
| DA Approval | `da-approval` | 2 | 6 | 3 |
| Tender Assessment | `tender-assessment` | 2 | 6 | 3 |
| Construction Superintendent | `construction-superintendent` | 2 | 6 | 3 |

## Data Structure

Each service contains:
- **slug** -- URL-safe identifier for routing
- **title/subtitle** -- page heading and tagline from WordPress
- **description** -- SEO meta description, cleaned from WordPress metadata
- **heroImage** -- path placeholder for Phase 5 image migration
- **sections** (2 per service) -- heading + body text, split at natural content boundaries
- **benefits** (6 per service) -- title + description pairs from WordPress "Our expertise" blocks
- **ctaText/ctaDescription** -- call-to-action copy
- **relatedCaseStudies** -- slugs mapped by service-to-project relevance

## Helper Functions

- `getServiceBySlug(slug)` -- returns `ServicePage | undefined`
- `getAllServices()` -- returns all 5 services

## Content Source

All content extracted from live WordPress pages at `upscalepm.com.au`. The crawl-data.json had titles and meta descriptions but no body content, so content was fetched directly from the live site and cleaned of all WordPress/Elementor HTML artifacts.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Split single content section into 2 sections**
- **Found during:** Task 2 validation
- **Issue:** Success criteria requires 2+ content sections per service. WordPress pages have one intro block, but the content naturally splits into two logical sections.
- **Fix:** Split each service's intro content at a natural paragraph boundary, creating a second section with a descriptive heading.
- **Files modified:** `src/lib/services.ts`
- **Commit:** `2ea0185`

## Verification

- TypeScript compiles without errors (`npx tsc --noEmit` passes)
- `getAllServices()` returns 5 services
- `getServiceBySlug('feasibility-advisory')` returns correct data
- `getServiceBySlug('nonexistent')` returns `undefined`
- Each service has 2 sections, 6 benefits, 3 related case studies
- No WordPress/Elementor HTML artifacts in any content string

## Self-Check: PASSED

- All 2 created files exist on disk
- Both commits (87c8db8, 2ea0185) found in git history
- SUMMARY.md exists at .planning/phases/2/p2-8-SUMMARY.md
