---
phase: 3
plan: 6
subsystem: legal-pages
tags: [privacy-policy, terms-conditions, legal, footer, content-pages]
dependency-graph:
  requires: []
  provides: [PAGE-09, PAGE-10]
  affects: [footer]
tech-stack:
  added: []
  patterns: [prose-typography, narrow-container, legal-content-pages]
key-files:
  created:
    - src/app/privacy-policy/page.tsx
    - src/app/terms-and-conditions/page.tsx
  modified:
    - src/components/layout/footer.tsx
decisions:
  - Real content fetched from live WordPress site rather than writing from scratch
  - Legal column added to footer grid (4-col layout) plus copyright bar links
  - Prose typography plugin used for readable legal content
metrics:
  duration: 2m
  tasks: 3
  files: 3
  completed: 2026-02-14
---

# Phase 3 Plan 6: Privacy Policy & Terms of Service Summary

Real privacy policy and terms content fetched from live WordPress site, rendered as prose pages with PageHeader breadcrumbs and Tailwind typography plugin. Footer updated with Legal column and copyright bar links.

## Tasks Completed

| Task | Description | Commit | Key Files |
|------|-------------|--------|-----------|
| 1 | Privacy policy page | `2e8ff03` | src/app/privacy-policy/page.tsx |
| 2 | Terms and conditions page | `1f7e085` | src/app/terms-and-conditions/page.tsx |
| 3 | Footer legal links | `6b8847f` | src/components/layout/footer.tsx |

## Implementation Details

### Privacy Policy Page (`/privacy-policy`)
- Full 12-section privacy policy sourced from live WordPress site at upscalepm.com.au
- Sections: What We Collect, How We Collect, Why We Collect, Disclosure, Storage & Protection, Cookies & Tracking, Accessing & Correcting, Your Rights, Third-Party Websites, International Transfers, Changes, Contact Us
- Uses `PageHeader` with breadcrumbs, `Container` narrow size, `prose prose-neutral` typography
- Last updated date displayed at top (05/07/2025)
- Contact email: privacy@upscalepm.com.au

### Terms and Conditions Page (`/terms-and-conditions`)
- Full 12-section terms sourced from live WordPress site
- Sections: About UPM, Eligibility, Use of Website, Intellectual Property, Third-Party Links, Disclaimers, Limitation of Liability, Privacy (links to /privacy-policy), Changes, Termination, Governing Law (NSW), Contact Us
- Same layout pattern as privacy policy page
- Internal cross-link to privacy policy in section 8

### Footer Modification
- Added `legalLinks` constant array alongside existing `navLinks`
- New "Legal" column in footer grid with Privacy Policy and Terms & Conditions links
- Grid changed from 3-col to 4-col on md+ (2-col on sm for responsive)
- Copyright bar updated: copyright left, legal links right on desktop; stacked center on mobile
- Accessible with `aria-label="Legal"` on nav elements

## Metadata

| Page | Title | Path | Description |
|------|-------|------|-------------|
| Privacy Policy | Privacy Policy | /privacy-policy | Privacy policy for Upscale Project Management. How we collect, use, and protect your personal information. |
| Terms | Terms and Conditions | /terms-and-conditions | Terms and conditions for using the Upscale Project Management website and services. |

## Deviations from Plan

None -- plan executed exactly as written. Content was successfully fetched from the live WordPress site, so fallback content was not needed.

## Verification

- `npm run build` succeeds with both pages in route list
- `/privacy-policy` renders as static page with full legal content
- `/terms-and-conditions` renders as static page with full legal content
- Footer includes Legal column and copyright bar links
- Prose styling applied via `@tailwindcss/typography` plugin (already installed)

## Self-Check: PASSED

- All 3 created/modified files verified on disk
- All 3 task commits verified in git log (2e8ff03, 1f7e085, 6b8847f)
