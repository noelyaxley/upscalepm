---
phase: 3
plan: 4
subsystem: pages
tags: [contact, forms, cro, trust-signals, lead-generation]
dependency-graph:
  requires: []
  provides: [contact-page, contact-form-component]
  affects: [hubspot-integration, lead-generation]
tech-stack:
  added: [shadcn-input, shadcn-label, shadcn-textarea, shadcn-select]
  patterns: [client-side-validation, form-state-machine, cro-layout]
key-files:
  created:
    - src/app/contact/page.tsx
    - src/components/forms/contact-form.tsx
    - src/components/ui/input.tsx
    - src/components/ui/label.tsx
    - src/components/ui/textarea.tsx
    - src/components/ui/select.tsx
  modified: []
decisions:
  - Native HTML select via shadcn Radix Select for accessible dropdown instead of plain HTML select
  - Client-side validation with inline errors cleared on input change for immediate feedback
  - Success state replaces entire form with confirmation card to prevent re-submission confusion
  - 5-column grid for logos on trust panel instead of row to fit within narrower right column
  - Simulated 1s submit delay to demonstrate loading state before Phase 4 HubSpot wiring
metrics:
  duration: 103s
  completed: 2026-02-14T08:47:11Z
  tasks: 3
  files: 6
---

# Phase 3 Plan 4: Contact Page Summary

CRO-optimised contact page with client-side validated form, trust signals, client logos, and response time commitment -- ready for HubSpot wiring in Phase 4.

## What Was Built

### Contact Form (`src/components/forms/contact-form.tsx`)

A client component managing form state with `useState` across 4 states: idle, submitting, success, error.

**Fields:**
- Name (required) -- text input with autoComplete="name"
- Email (required) -- email input with regex validation
- Phone (optional) -- tel input with autoComplete="tel"
- Project type (optional) -- Radix Select dropdown with 6 options matching service pages
- Message (required) -- textarea, 4 rows

**Validation:**
- Client-side validation on submit with inline error messages
- Errors clear when user starts typing in the errored field
- `aria-invalid` and `aria-describedby` for accessibility
- `noValidate` on form to use custom validation instead of browser default

**State machine:**
- `idle` -- form ready for input
- `submitting` -- button disabled, spinner icon, "Sending..." text
- `success` -- form replaced with green confirmation card: "Thank you for your enquiry. We'll be in touch within 1 business day."
- "Send another enquiry" button resets to idle

**CRO details:**
- Only 3 required fields (name, email, message) -- low friction
- Privacy reassurance text below submit button
- Full-width submit button for clear call to action

### Contact Page (`src/app/contact/page.tsx`)

**Layout:** Two-column grid on desktop (3/5 + 2/5 = ~60/40 split), stacks on mobile.

**Left column (form):**
- Benefit-driven headline: "Let's discuss your project"
- Supporting text about protecting investments
- Full `ContactForm` component

**Right column (trust signals):**
- "Why choose Upscale?" -- 4 bullet points with checkmark icons
- Response time card: "We respond within 1 business day" with clock icon
- Contact details: phone, email, location with Lucide icons
- Client logos: 5 logos in 3-column grid, greyscale with colour-on-hover

**Metadata:**
- Title: "Contact"
- Description: "Get in touch with Upscale Project Management. Client-side project management for property and construction in Sydney and Newcastle."
- Canonical: https://upscalepm.com.au/contact
- OG tags configured

### Shadcn UI Components

Installed 4 shadcn components needed for the form:
- `Input` -- styled text/email/tel inputs
- `Label` -- accessible form labels via Radix Label primitive
- `Textarea` -- styled multiline input
- `Select` -- full Radix Select with trigger, content, items, scroll buttons

## Commits

| Hash | Message | Files |
|------|---------|-------|
| `351e85f` | chore(p3-4): install shadcn form components | input.tsx, label.tsx, textarea.tsx, select.tsx |
| `68fa346` | feat(p3-4): create CRO-optimised contact form component | contact-form.tsx |
| `56d3122` | feat(p3-4): create contact page with CRO-optimised layout | page.tsx |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- `/contact` renders with form and trust signals in build output
- Form has all 5 fields with validation
- Submit shows success message (simulated 1s delay)
- Client logos display alongside form
- Responsive layout: form stacks above trust signals on mobile
- `npm run build` succeeds with `/contact` statically generated

## Self-Check: PASSED

- [x] `src/app/contact/page.tsx` exists
- [x] `src/components/forms/contact-form.tsx` exists
- [x] `src/components/ui/input.tsx` exists
- [x] `src/components/ui/label.tsx` exists
- [x] `src/components/ui/textarea.tsx` exists
- [x] `src/components/ui/select.tsx` exists
- [x] Commit `351e85f` exists in git log
- [x] Commit `68fa346` exists in git log
- [x] Commit `56d3122` exists in git log
- [x] `npm run build` passes
