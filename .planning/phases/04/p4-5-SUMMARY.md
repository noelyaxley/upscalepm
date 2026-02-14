# Summary: p4-5 CRO -- Homepage & Service Pages

## Result
status: complete
duration: 3min
tasks_completed: 6
tasks_total: 6

## What Was Built
Applied CRO principles across homepage and all service pages: outcome-driven hero copy, problem/solution value proposition framing, mid-page CTAs at every scroll depth, and dual CTA buttons (enquiry + booking) on homepage and service pages.

## One-Liner
CRO copy and mid-page CTAs applied to homepage, value proposition, and all service pages.

## Key Changes
- **Hero**: Sub-headline rewritten to outcome-driven ("Stop overpaying contractors..."), CTAs changed to "Get a Free Consultation" / "See Our Projects"
- **Value Proposition**: Heading changed to "What You Get With a Client-Side PM", cards reframed as problem/outcome ("Catch Issues Before They Cost You", "Someone in Your Corner", "One Team, Start to Finish")
- **Homepage CTA**: Dual buttons (Send an Enquiry + Book a Call), benefit-driven heading
- **Homepage mid-page CTA**: "Not Sure What You Need?" section between services and case studies
- **Service pages**: Mid-page CTA between content sections and benefits, bottom CTA updated with showBooking + "Send an Enquiry" / "Book a Call"
- **Services index**: Bottom CTA strengthened with "Your Project Deserves Expert Representation"

## Commits
- `e4fd13c`: feat(p4-5): apply CRO to homepage and service pages

## Files Modified
- src/components/sections/hero.tsx
- src/components/sections/value-proposition.tsx
- src/components/sections/homepage-cta.tsx
- src/app/page.tsx
- src/app/services/[slug]/page.tsx
- src/app/services/page.tsx

## Deviations
None — executed as planned. ServiceCta already had showBooking/bookingText props from Prompt 3.

## Self-Check: PASSED
- [x] Homepage hero has outcome-driven sub-headline
- [x] Homepage hero CTAs use lower-commitment language
- [x] Value proposition uses problem/outcome framing
- [x] Homepage has mid-page CTA between services and case studies
- [x] Homepage bottom CTA has dual buttons
- [x] Service pages have mid-page CTA
- [x] Service pages bottom CTA shows booking button
- [x] Services index CTA strengthened
- [x] npm run build succeeds
