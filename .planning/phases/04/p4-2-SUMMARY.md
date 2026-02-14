# Summary: p4-2 Contact Form Server Action & HubSpot Wiring

## Result
status: complete
duration: 3min
tasks_completed: 2
tasks_total: 2

## What Was Built
Created Server Action (src/actions/contact.ts) that validates with zod, reads hubspotutk cookie, and POSTs to HubSpot Forms API v3 secure endpoint with UTM attribution. Refactored contact form from manual useState/validation to react-hook-form + zodResolver, calling the Server Action on submit.

## One-Liner
Contact form wired to HubSpot CRM via Server Action with zod validation and UTM attribution.

## Key Changes
- **src/actions/contact.ts**: Server Action with 'use server' directive, zod validation, hubspotutk cookie reading, HubSpot Forms API v3 POST, graceful degradation when env vars not configured
- **src/components/forms/contact-form.tsx**: Refactored to react-hook-form + zodResolver, calls submitContactForm Server Action, passes UTM params from sessionStorage, page URI/name in context

## Commits
- `eb2d378`: feat(p4-2): wire contact form to HubSpot via Server Action

## Files Modified
- src/actions/contact.ts (created)
- src/components/forms/contact-form.tsx (refactored)

## Self-Check: PASSED
- [x] Server Action exports submitContactForm with 'use server' directive
- [x] Validates with zod, reads hubspotutk cookie
- [x] Graceful degradation when env vars not configured
- [x] Contact form uses react-hook-form + zodResolver
- [x] UTM parameters included in submission payload
- [x] Success state with "Send another enquiry" preserved
- [x] Error state shows message below submit button
- [x] npm run build succeeds
