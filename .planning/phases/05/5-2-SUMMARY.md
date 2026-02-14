---
phase: 5
plan: 2
subsystem: analytics
tags: [gtm, datalayer, conversion-tracking, contact-form]
dependency-graph:
  requires: [5-1]
  provides: [TRACK-03, TRACK-05]
  affects: [contact-form]
tech-stack:
  added: []
  patterns: [dataLayer-push-on-form-success]
key-files:
  modified:
    - src/components/forms/contact-form.tsx
decisions: []
metrics:
  duration: 1m
  completed: 2026-02-14
---

# Phase 5 Plan 2: Contact Form DataLayer Integration Summary

DataLayer form_submission event pushed on contact form success, enabling GTM to fire GA4, Google Ads, and Meta Pixel conversion tags.

## What Was Done

### Task 1: Add dataLayer push to contact form on successful submission

- Added import of `trackFormSubmission` from `@/components/analytics/gtm-event`
- Inserted `trackFormSubmission('contact_form')` call in the `onSubmit` handler, immediately after `if (result.success) {` and before `setStatus('success')`
- This pushes `{ event: 'form_submission', form_name: 'contact_form', form_destination: 'hubspot' }` to `window.dataLayer`
- GTM picks up this event and fires: GA4 `generate_lead` event, Google Ads conversion tag, and Meta Pixel `Lead` event

**Commit:** `d22a081`

## Verification

- [x] `contact-form.tsx` imports `trackFormSubmission` from `@/components/analytics/gtm-event`
- [x] `trackFormSubmission('contact_form')` called before `setStatus('success')` in success branch
- [x] Existing form functionality unchanged (validation, HubSpot submission, UTM inclusion, success/error states)
- [x] `npm run build` succeeds

## Requirements Satisfied

| Requirement | Description | How |
|-------------|-------------|-----|
| TRACK-03 | Google Ads conversion tracking | form_submission dataLayer event triggers GTM Google Ads conversion tag |
| TRACK-05 | UTM tracking across platforms | GA4 auto-captures UTMs from URL; HubSpot receives UTMs via Server Action (Phase 4); dataLayer event connects the conversion |

## Deviations from Plan

None -- plan executed exactly as written.

## Notes

- The `trackFormSubmission` function is SSR-safe (no-ops on server) and GTM-independent (pushes to array regardless of GTM load state)
- UTM attribution flows through two parallel channels: HubSpot (sessionStorage via Server Action, already in Phase 4) and GA4 (automatic URL parameter capture)
- No additional UTM code was needed for this prompt -- GA4 handles it natively

## Self-Check: PASSED

- [x] `src/components/forms/contact-form.tsx` exists
- [x] Commit `d22a081` found in git log
