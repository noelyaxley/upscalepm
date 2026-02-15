# Phase 3: Core Pages

## Overview

8 prompts that build every page on the site: homepage, 5 service pages, about/team, contact, privacy, terms, and enhance existing pages (case study index, insights index, 404). After this phase, the entire site is browsable with real content and working navigation.

**Requirements covered:** PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07, PAGE-08, PAGE-09, PAGE-10, PAGE-11, PAGE-12, PAGE-13, CONT-04, CONT-07

**Estimated effort:** ~5-7 hours Claude execution time across all prompts.

---

## Prompt 1: Service Page Template & 5 Service Pages

**Requirements:** PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-12
**Dependencies:** None (service data already exists in src/lib/services.ts)
**Files created/modified:**
- `src/app/services/[slug]/page.tsx` (create — single template handles all 5 services via data from services.ts)
- `src/app/services/page.tsx` (create — services index)
- `src/components/sections/service-benefits.tsx` (create)
- `src/components/sections/service-cta.tsx` (create)
- `src/components/sections/related-case-studies.tsx` (create)
- `src/lib/services.ts` (modify — fix heroImage paths to use case study images)

### Context

Service page data is fully extracted and ready in `src/lib/services.ts` (5 services with sections, benefits, CTAs, related case studies). Types are in `src/lib/services.types.ts`. The `ServicePage` type has: slug, title, subtitle, description, heroImage, sections[], benefits[], ctaText, ctaDescription, relatedCaseStudies[]. Layout primitives available: `Container`, `Section`, `PageHeader` from `@/components/layout/`. Metadata helper: `generatePageMetadata` from `@/lib/metadata`. Header already has a "Services" nav link pointing to `/services`.

Service slugs (from services.ts):
- `feasibility-advisory`
- `design-management`
- `da-approval`
- `tender-assessment`
- `construction-superintendent`

Hero images: Only `public/images/services/commercial-government.webp` exists. The `heroImage` paths in services.ts reference non-existent files. **Fix:** Update the `heroImage` field in `src/lib/services.ts` for each service to use related case study hero images:
- `feasibility-advisory` → `/images/case-studies/granville-diggers/hero.jpg`
- `design-management` → `/images/case-studies/crosslife-church/hero.jpg`
- `da-approval` → `/images/case-studies/pete-island/hero.jpg`
- `tender-assessment` → `/images/case-studies/vibe-hotel/hero.jpg`
- `construction-superintendent` → `/images/case-studies/sydney-water/hero.jpg`

These are the most relevant project images for each service. Do NOT reference non-existent image files.

Case study data available via `getAllCaseStudies()` and `getCaseStudyBySlug()` from `@/lib/content`.

IMPORTANT: Next.js 16 uses async params: `params: Promise<{ slug: string }>`.

### Actions

**1. Create `src/app/services/[slug]/page.tsx`** -- dynamic route for individual service pages:

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getServiceBySlug, getAllServices } from '@/lib/services'
import { getCaseStudyBySlug } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { ServiceBenefits } from '@/components/sections/service-benefits'
import { ServiceCta } from '@/components/sections/service-cta'
import { RelatedCaseStudies } from '@/components/sections/related-case-studies'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Not Found' }
  return generatePageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
  })
}
```

The page component renders:
- `PageHeader` with title, subtitle, breadcrumbs: [{ label: 'Services', href: '/services' }, { label: service.title }]
- Content sections from `service.sections[]` -- each section gets a heading (h2, font-display) and body text (rendered as paragraphs, splitting on `\n\n`). Alternate between white and muted backgrounds for visual rhythm.
- `ServiceBenefits` component -- 3-column grid on desktop, 1-column mobile. Each benefit is a card with icon area (use a simple orange circle or Lucide icon), title (h3), and description paragraph.
- `ServiceCta` component -- full-width section with primary background, CTA heading, description, and `<Button asChild><Link href="/contact">` button.
- `RelatedCaseStudies` component -- fetches related case study data by slug from `service.relatedCaseStudies`, renders 3 cards with hero image, title, excerpt, and link.

For PAGE-12 (dual service model), add a note/callout near the CTA on each service page: "Available as a project engagement or as part of our ongoing advisory retainer. Contact us to discuss the right model for your project." This should be a styled aside or callout box.

**2. Create `src/app/services/page.tsx`** -- services index/overview page:

```typescript
export const metadata: Metadata = generatePageMetadata({
  title: 'Services',
  description: 'Client-side project management services: feasibility advisory, design management, DA approval, tender assessment, and construction superintendent.',
  path: '/services',
})
```

Renders:
- `PageHeader` with title "Services" and subtitle about comprehensive PM services
- Grid of 5 service cards (1 col mobile, 2 cols md, 3 cols lg) -- each card links to `/services/{slug}` and shows: title (h2), subtitle, a brief excerpt from the first section body (truncated to ~120 chars), and an arrow/link indicator
- A bottom section summarising the dual service model (PAGE-12): "Whether you need project-based support or an ongoing advisory retainer, we tailor our engagement to your project's needs."
- CTA section at bottom

**3. Create `src/components/sections/service-benefits.tsx`**:

Props: `{ benefits: Array<{ title: string; description: string }> }`

Renders a responsive grid (1 col sm, 2 cols md, 3 cols lg) of benefit cards. Each card:
- Small orange accent element (line, dot, or icon placeholder)
- Title (h3, font-semibold)
- Description (text-muted-foreground)
- Light border, rounded corners, subtle shadow on hover

**4. Create `src/components/sections/service-cta.tsx`**:

Props: `{ heading: string; description: string; buttonText: string; buttonHref?: string }`

Full-width section with dark background (`bg-neutral-950 text-white`), centered text, heading (font-display), description paragraph, and orange primary Button linking to /contact.

**5. Create `src/components/sections/related-case-studies.tsx`**:

Props: `{ slugs: string[] }`

Fetches case study frontmatter for each slug using `getCaseStudyBySlug()`. Renders up to 3 cards in a grid: hero image (aspect-[4/3]), title, excerpt, "View project" link. Skip any slugs that don't resolve (graceful handling).

### Acceptance Criteria

- [ ] `/services` shows overview page with 5 service cards linking to individual pages
- [ ] `/services/feasibility-advisory`, `/services/design-management`, `/services/da-approval`, `/services/tender-assessment`, `/services/construction-superintendent` all render with full content
- [ ] Each service page has: breadcrumbs, content sections, benefits grid, CTA, related case studies
- [ ] Dual service model messaging visible on each service page and on services index
- [ ] No broken images (use only images that exist in public/images/)
- [ ] `npm run build` succeeds with all 5 service pages statically generated
- [ ] Page metadata (title, description, OG) set correctly per service

---

## Prompt 2: Homepage

**Requirements:** PAGE-01
**Dependencies:** Prompt 1 (service cards reuse service data; related case studies component)
**Files created/modified:**
- `src/app/page.tsx` (modify -- replace placeholder)
- `src/components/sections/hero.tsx` (create)
- `src/components/sections/value-proposition.tsx` (create)
- `src/components/sections/services-overview.tsx` (create)
- `src/components/sections/featured-case-studies.tsx` (create)
- `src/components/sections/homepage-cta.tsx` (create)

### Context

The current homepage (`src/app/page.tsx`) is a minimal placeholder with just the site name, tagline, and a "Get in Touch" button. It needs to become a full marketing homepage.

Available data:
- `getAllServices()` from `@/lib/services` -- for service overview cards
- `getAllCaseStudies()` from `@/lib/content` -- for featured case studies (pick 3-4 highest-order ones)
- Layout components: `Container`, `Section` from `@/components/layout/`
- Button from `@/components/ui/button`
- The `ServiceCta` component from Prompt 1 can be reused for the bottom CTA

Client logos are at `public/images/shared/logos/` (5 files: sydney-water.webp, health-infrastructure.webp, blacktown-city-council.webp, school-infrastructure.webp, nsw-ambulance.webp). These will be used in Prompt 5 (logo bar) and referenced on the homepage.

Team photos at `public/images/shared/team/` (kenny-gunawan.jpg, nathan-maccullum.jpg). About image at `public/images/shared/about-upscale.png`.

### Actions

**1. Create `src/components/sections/hero.tsx`**:

The hero section for the homepage. Structure:
- Full-width section with generous vertical padding (`py-20 md:py-28 lg:py-36`)
- Heading: Large, impactful headline using font-display. Something like "Client-Side Project Management for Property & Construction" (pull from actual business positioning). Use `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight`.
- Subheading: Supporting text explaining the value prop. Use `text-lg md:text-xl text-muted-foreground max-w-2xl`.
- Two CTAs: Primary button "Start a Project" linking to /contact, secondary outline button "View Our Work" linking to /case-studies.
- Optional: Background image or gradient. If no suitable hero image exists, use a subtle gradient or pattern (CSS only, no missing images).

**2. Create `src/components/sections/value-proposition.tsx`**:

3-column grid highlighting key differentiators:
- "Architectural Insight" -- background in architecture brings design-informed PM
- "Client-Side Focus" -- we represent YOUR interests, not the contractor's
- "End-to-End Coverage" -- from feasibility through to handover

Each item: icon area (Lucide icons or simple SVG), heading (h3), short description. Use `Section` with muted background.

**3. Create `src/components/sections/services-overview.tsx`**:

Props: receives services from `getAllServices()`. Renders:
- Section heading "Our Services" with subtitle
- 5 service cards in a grid (1 col mobile, 2 cols md, 3 cols lg for first row, 2 cols for second row centered, OR 5-card layout)
- Each card: title, brief description (from subtitle), link to `/services/{slug}`
- A "View All Services" link at the bottom

**4. Create `src/components/sections/featured-case-studies.tsx`**:

Shows 3 featured case studies. Props: receives case studies from `getAllCaseStudies()` (take first 3 by order).
- Section heading "Featured Projects" with subtitle
- 3 cards: hero image, category badge, title, excerpt, "View Project" link
- A "View All Case Studies" link at bottom
- This is similar to `RelatedCaseStudies` from Prompt 1 but with a section heading wrapper

**5. Create `src/components/sections/homepage-cta.tsx`**:

Bottom-of-page CTA section. Full-width with dark or primary background.
- Heading: "Ready to Start Your Project?"
- Description: brief value reminder
- Button: "Get in Touch" linking to /contact

**6. Modify `src/app/page.tsx`** -- replace the current placeholder with the full homepage:

```typescript
import { getAllServices } from '@/lib/services'
import { getAllCaseStudies } from '@/lib/content'
import { Hero } from '@/components/sections/hero'
import { ValueProposition } from '@/components/sections/value-proposition'
import { ServicesOverview } from '@/components/sections/services-overview'
import { FeaturedCaseStudies } from '@/components/sections/featured-case-studies'
import { HomepageCta } from '@/components/sections/homepage-cta'

export default function Home() {
  const services = getAllServices()
  const caseStudies = getAllCaseStudies().slice(0, 3)

  return (
    <>
      <Hero />
      <ValueProposition />
      <ServicesOverview services={services} />
      <FeaturedCaseStudies caseStudies={caseStudies} />
      <HomepageCta />
    </>
  )
}
```

The homepage should NOT have `PageHeader` -- it uses its own Hero section instead.

### Acceptance Criteria

- [ ] Homepage displays: hero, value proposition, service overview cards (5 services), featured case studies (3 projects), and CTA
- [ ] At least one visible CTA above the fold (in hero)
- [ ] Service cards link to `/services/{slug}`
- [ ] Featured case study cards link to `/case-studies/{slug}`
- [ ] Responsive layout: stacks to single column on mobile
- [ ] No broken images
- [ ] `npm run build` succeeds

---

## Prompt 3: About / Team Page

**Requirements:** PAGE-07
**Dependencies:** None (independent of Prompts 1-2)
**Files created/modified:**
- `src/app/about/page.tsx` (create)
- `src/components/sections/team-grid.tsx` (create)

### Context

The WordPress about page content is at `upscalepm.com.au/about-us/`. The crawl data at `content/migration/crawl-data.json` has a limited preview. **Extraction method:** Use WebFetch to fetch `https://upscalepm.com.au/about-us/` and extract the main content. If WebFetch fails or returns insufficient content, use the fallback company story below and write bios based on team roles.

**Fallback company story:** "Upscale Project Management was founded by Noel Yaxley, whose background in architecture gives him a unique perspective on construction project management. After seeing too many property owners left without expert representation during their builds, Noel created Upscale to provide dedicated client-side project management — ensuring developers, owners, and investors have someone in their corner from feasibility through to handover. Based in Sydney and Newcastle, Upscale works across residential, commercial, health, education, and infrastructure sectors."

**Fallback team bios:** Write professional bios appropriate for project managers in the Australian construction industry if WordPress content is unavailable.

Available images:
- `public/images/shared/about-upscale.png` -- company/brand image
- `public/images/shared/team/kenny-gunawan.jpg` -- team member
- `public/images/shared/team/nathan-maccullum.jpg` -- team member
- Noel Yaxley (founder) -- no dedicated photo in the repo. Use a placeholder or the about-upscale.png.

The about page needs: company story, values, and team member bios with photos.

Key facts about the business (from context):
- Founded by Noel Yaxley, background in architecture and project management
- Client-side PM for property and construction
- Covers education, health, commercial, and residential sectors
- Based in Sydney and Newcastle
- Services from feasibility through to handover

### Actions

**1. Create `src/app/about/page.tsx`**:

```typescript
export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description: 'Upscale Project Management delivers client-side project management for property and construction. Founded on architectural insight and a commitment to protecting client interests.',
  path: '/about',
})
```

Page structure:
- `PageHeader` with title "About Upscale Project Management", subtitle about the company mission, breadcrumbs: [{ label: 'About' }]
- **Company Story section**: 2-column layout on desktop (text left, image right using about-upscale.png). Heading "Built on Architectural Insight". Write compelling copy about the company's origin: Noel Yaxley's transition from architecture to project management, the gap he saw in client-side representation, and why Upscale exists. Fetch the actual content from the WordPress about page at `upscalepm.com.au/about-us/` during execution for accurate copy.
- **Values section**: 3-4 value cards in a grid. Values like "Client-First Advocacy", "Design-Informed Decisions", "Transparent Communication", "Practical Delivery". Each with a short description.
- **Team section**: Using `TeamGrid` component.
- **CTA section**: Reuse `ServiceCta` component or similar -- "Work with our team" linking to /contact.

**2. Create `src/components/sections/team-grid.tsx`**:

Renders team member cards. Hardcode team data directly in the component (or in the page) since there are only 2-3 team members:

```typescript
const team = [
  {
    name: 'Noel Yaxley',
    role: 'Founder & Principal',
    image: '/images/shared/about-upscale.png', // Use company image as placeholder until dedicated photo exists
    bio: 'With a background in architecture and over X years in project management, Noel founded Upscale to bring design-informed, client-side project leadership to property and construction.',
  },
  {
    name: 'Kenny Gunawan',
    role: 'Project Manager',
    image: '/images/shared/team/kenny-gunawan.jpg',
    bio: '...', // Extract from WordPress if available, or write appropriate bio
  },
  {
    name: 'Nathan MacCullum',
    role: 'Project Manager',
    image: '/images/shared/team/nathan-maccullum.jpg',
    bio: '...', // Extract from WordPress if available, or write appropriate bio
  },
]
```

Each card: circular or rounded-square photo (aspect-square, object-cover), name (h3), role (text-muted-foreground), bio paragraph. Use a 3-column grid on desktop, 1-column mobile.

### Acceptance Criteria

- [ ] `/about` renders with company story, values, and team members
- [ ] Team photos display correctly (kenny-gunawan.jpg, nathan-maccullum.jpg)
- [ ] Page has proper metadata and breadcrumbs
- [ ] Responsive: stacks on mobile
- [ ] `npm run build` succeeds

---

## Prompt 4: Contact Page

**Requirements:** PAGE-08
**Dependencies:** None (independent)
**Files created/modified:**
- `src/app/contact/page.tsx` (create)
- `src/components/forms/contact-form.tsx` (create)

### Context

The contact page must be optimised as a Google Ads landing page with form-CRO principles: minimal friction, clear value proposition, trust signals. The form is UI only in this phase -- HubSpot wiring happens in Phase 4.

The WordPress contact page had a simple form. The new page should be significantly better -- designed for conversion.

Trust signals available: client logos in `public/images/shared/logos/`, case study count (14 projects), service scope.

### Actions

**1. Create `src/components/forms/contact-form.tsx`** (client component):

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
```

Form fields (minimal for low friction):
- Name (required) -- single text input
- Email (required) -- email input
- Phone (optional) -- tel input
- Project type (optional) -- select dropdown: "Feasibility & Advisory", "Design Management", "DA Approval", "Tender Assessment", "Construction Superintendent", "Not sure yet"
- Message (required) -- textarea, 4 rows
- Submit button: "Send Enquiry" with loading state

Form UX:
- Use native HTML form elements with shadcn styling (Input, Label, Textarea, Select from shadcn -- install if needed)
- Client-side validation: required fields, email format
- Use `useState` for form state management: `status: 'idle' | 'submitting' | 'success' | 'error'`
- Disable submit button while `status === 'submitting'` (simulate 1s delay with setTimeout)
- On success: clear form fields, show success message above the form: "Thank you for your enquiry. We'll be in touch within 1 business day."
- Prevent double submission by checking status before handling submit
- No actual API submission -- Phase 4 wires to HubSpot
- No CAPTCHA in this phase

Install shadcn form components if not already available:
```bash
npx shadcn@latest add input label textarea select
```

**2. Create `src/app/contact/page.tsx`**:

```typescript
export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description: 'Get in touch with Upscale Project Management. Client-side project management for property and construction in Sydney and Newcastle.',
  path: '/contact',
})
```

Page structure (optimised for Google Ads landing page -- PAGE-08):
- `PageHeader` with title "Get in Touch", breadcrumbs: [{ label: 'Contact' }]
- **Two-column layout** on desktop:
  - **Left column (wider, ~60%)**: Contact form
  - **Right column (~40%)**: Trust signals and contact info
    - "Why choose Upscale?" -- 3-4 bullet points with checkmark icons
    - Contact details: phone, email, locations (Sydney | Newcastle)
    - Response time commitment: "We respond within 1 business day"
    - Client logos row (small, greyscale) -- use the 5 logos from `public/images/shared/logos/`
- **Mobile**: Form first, then trust signals below
- Value proposition above the form: A short, benefit-driven headline like "Let's discuss your project" with supporting text "Tell us about your project and we'll explain how client-side PM can protect your investment."

CRO principles applied:
- Form above the fold on desktop
- Minimal required fields (3: name, email, message)
- Social proof visible alongside form (client logos)
- Clear next-step expectation ("We respond within 1 business day")
- No navigation distractions beyond the standard header

### Acceptance Criteria

- [ ] `/contact` renders with form and trust signals
- [ ] Form has fields: name, email, phone (optional), project type (optional), message
- [ ] Client-side validation prevents empty required fields
- [ ] Submit shows success message (no actual API call)
- [ ] Client logos display alongside the form
- [ ] Responsive: form stacks above trust signals on mobile
- [ ] Page metadata set correctly
- [ ] `npm run build` succeeds

---

## Prompt 5: Client Logo Bar Component

**Requirements:** PAGE-13
**Dependencies:** None (independent)
**Files created/modified:**
- `src/components/sections/client-logos.tsx` (create)
- `src/app/page.tsx` (modify -- add logo bar to homepage)

### Context

5 client logos in `public/images/shared/logos/`:
- `sydney-water.webp`
- `health-infrastructure.webp`
- `blacktown-city-council.webp`
- `school-infrastructure.webp`
- `nsw-ambulance.webp`

These are government/institutional clients -- strong trust signals. The logo bar should appear on the homepage (between hero and value proposition, or between value prop and services) and optionally on service pages.

### Actions

**1. Create `src/components/sections/client-logos.tsx`**:

A reusable logo bar component. Requirements:
- Display 5 client logos in a horizontal row
- Greyscale by default, colour on hover (CSS filter: `grayscale(100%)` default, `grayscale(0)` on hover with transition)
- Logos should be consistent height (~40-48px), width auto
- Optional heading: "Trusted by leading organisations" or similar
- Responsive: wraps on mobile if needed, or uses flex-wrap
- Use `next/image` with appropriate sizes

```typescript
import Image from 'next/image'
import { Section } from '@/components/layout/section'

const logos = [
  { src: '/images/shared/logos/sydney-water.webp', alt: 'Sydney Water', width: 140, height: 48 },
  { src: '/images/shared/logos/health-infrastructure.webp', alt: 'Health Infrastructure', width: 140, height: 48 },
  { src: '/images/shared/logos/blacktown-city-council.webp', alt: 'Blacktown City Council', width: 140, height: 48 },
  { src: '/images/shared/logos/school-infrastructure.webp', alt: 'School Infrastructure', width: 140, height: 48 },
  { src: '/images/shared/logos/nsw-ambulance.webp', alt: 'NSW Ambulance', width: 140, height: 48 },
]
```

Styling:
- Logos: `grayscale transition-all duration-300 hover:grayscale-0 opacity-60 hover:opacity-100`
- Container: `flex flex-wrap items-center justify-center gap-8 md:gap-12`
- Section: compact spacing, muted or default background

**2. Modify `src/app/page.tsx`** -- add `<ClientLogos />` to the homepage between Hero and ValueProposition (or after ValueProposition):

```typescript
import { ClientLogos } from '@/components/sections/client-logos'

// In the JSX:
<Hero />
<ClientLogos />
<ValueProposition />
// ...
```

### Acceptance Criteria

- [ ] Logo bar displays 5 greyscale logos
- [ ] Hovering a logo transitions it to full colour
- [ ] Logos are consistent height and responsive
- [ ] Logo bar appears on the homepage
- [ ] `npm run build` succeeds

---

## Prompt 6: Privacy Policy & Terms of Service

**Requirements:** PAGE-09, PAGE-10
**Dependencies:** None (independent)
**Files created/modified:**
- `src/app/privacy-policy/page.tsx` (create)
- `src/app/terms-and-conditions/page.tsx` (create)
- `src/components/layout/footer.tsx` (modify -- add links to privacy and terms)

### Context

Both pages exist on the WordPress site:
- `upscalepm.com.au/privacy-policy/` -- last updated 05/07/2025, covers information collection, use, storage, disclosure
- `upscalepm.com.au/terms-and-conditions/` -- last updated 05/07/2025, covers site use, services, liability

**Extraction method:** Use WebFetch to fetch `https://upscalepm.com.au/privacy-policy/` and `https://upscalepm.com.au/terms-and-conditions/` and extract the prose content. Also check `content/migration/crawl-data.json` for these page entries. If neither source provides full content, write standard Australian privacy policy and terms of service content appropriate for a project management consultancy, covering the section headings listed below. Legal content must be professional and complete.

Redirects already mapped:
- `/privacy-policy/` -> `/privacy-policy`
- `/terms-and-conditions/` -> `/terms-and-conditions`

These are legal content pages -- straightforward prose layout, no complex components.

### Actions

**1. Create `src/app/privacy-policy/page.tsx`**:

```typescript
export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for Upscale Project Management. How we collect, use, and protect your personal information.',
  path: '/privacy-policy',
})
```

Page structure:
- `PageHeader` with title "Privacy Policy", breadcrumbs: [{ label: 'Privacy Policy' }]
- Prose content section using `Container` with narrow size and `prose` Tailwind typography classes
- Fetch the full privacy policy content from `upscalepm.com.au/privacy-policy/` during execution
- Structure the content with proper heading hierarchy (h2 for major sections, h3 for subsections)
- Include "Last updated" date at the top
- Business details: Upscale Project Management, website URL, contact email

The content should cover standard Australian privacy principles:
1. What Information We Collect
2. How We Use Your Information
3. How We Store and Protect Your Information
4. Sharing of Information
5. Your Rights
6. Cookies and Tracking
7. Changes to This Policy
8. Contact Us

**2. Create `src/app/terms-and-conditions/page.tsx`**:

Same structure as privacy policy. Fetch content from `upscalepm.com.au/terms-and-conditions/`.

Key sections:
1. About Upscale Project Management
2. Use of the Site
3. Intellectual Property
4. Services and Engagements
5. Limitation of Liability
6. Indemnification
7. Governing Law (NSW, Australia)
8. Changes to Terms
9. Contact Us

**3. Modify `src/components/layout/footer.tsx`** -- add links to Privacy Policy and Terms:

Add a "Legal" column or add links to the existing footer layout:
```
Privacy Policy -> /privacy-policy
Terms & Conditions -> /terms-and-conditions
```

Place these in the copyright bar area or as a separate small link group.

### Acceptance Criteria

- [ ] `/privacy-policy` renders with full legal content, proper heading structure
- [ ] `/terms-and-conditions` renders with full legal content, proper heading structure
- [ ] Both pages have correct metadata and breadcrumbs
- [ ] Footer includes links to both pages
- [ ] Prose styling (Tailwind typography) makes content readable
- [ ] `npm run build` succeeds

---

## Prompt 7: Enhance Existing Pages (Case Study Index, Insights Index, 404)

**Requirements:** CONT-04, CONT-07, PAGE-11
**Dependencies:** Prompt 1 (related case studies component), Prompt 5 (client logos available)
**Files created/modified:**
- `src/app/case-studies/page.tsx` (modify -- enhance)
- `src/app/insights/page.tsx` (modify -- enhance if needed)
- `src/app/insights/insights-grid.tsx` (modify -- enhance if needed)
- `src/app/not-found.tsx` (modify -- enhance)
- `src/app/sitemap.ts` (modify -- add new pages)

### Context

These pages already exist from Phase 2 and Phase 1. The requirement is to verify they meet Phase 3 standards and enhance where needed.

**Case study index** (`src/app/case-studies/page.tsx`): Already shows a grid of project cards with hero images, category badges, titles, excerpts, and "View project" links. Currently has 14 case studies. CONT-04 requires "project cards linking to individual case studies" -- this is already implemented. May need minor enhancements.

**Insights index** (`src/app/insights/page.tsx` + `insights-grid.tsx`): Already has category filtering (All/Quick Bites/Articles), responsive grid, proper card layout with date, author, reading time. CONT-07 requires "articles with category filtering" -- this is already implemented. May need minor enhancements.

**404 page** (`src/app/not-found.tsx`): Already has branded layout with "Go home" and "Contact us" buttons. PAGE-11 requires "navigation back to key pages" -- currently has home and contact. Could add more navigation options.

**Sitemap** (`src/app/sitemap.ts`): Currently only has static pages (/, /services, /case-studies, /insights, /about, /contact). Needs service pages, case study pages, insight pages, and new legal pages added.

**Phase 2 functions available:** `getAllServices()` from `@/lib/services`, `getAllCaseStudies()` and `getAllInsights()` from `@/lib/content` — all verified working from Phase 2 execution.

### Actions

**1. Enhance `src/app/case-studies/page.tsx`** (minor):

Review the existing page. Potential enhancements:
- Add a featured/pinned case study at the top (larger card for the first item -- Granville Diggers Club Development)
- Add a count indicator: "14 projects" or similar
- The existing implementation is solid -- only enhance if there's a clear gap

**2. Enhance `src/app/insights/page.tsx` and `insights-grid.tsx`** (minor):

Review existing page. Potential enhancements:
- The implementation already has category filtering and responsive grid
- Verify the filter tabs work correctly with real data
- Only enhance if there's a clear gap

**3. Enhance `src/app/not-found.tsx`**:

Add more navigation options beyond just "Go home" and "Contact us":
- Add links to key pages: Services, Case Studies, Insights
- Consider adding a search suggestion or popular pages section
- Keep the clean, branded layout

Example enhancement:
```typescript
<div className="mt-12">
  <p className="text-sm font-medium text-muted-foreground mb-4">Try one of these pages:</p>
  <ul className="flex flex-wrap justify-center gap-4 text-sm">
    <li><Link href="/services" className="text-primary-600 hover:underline">Services</Link></li>
    <li><Link href="/case-studies" className="text-primary-600 hover:underline">Case Studies</Link></li>
    <li><Link href="/insights" className="text-primary-600 hover:underline">Insights</Link></li>
    <li><Link href="/about" className="text-primary-600 hover:underline">About</Link></li>
  </ul>
</div>
```

**4. Update `src/app/sitemap.ts`** to include all new pages:

Add:
- 5 service page URLs: `/services/feasibility-advisory`, `/services/design-management`, `/services/da-approval`, `/services/tender-assessment`, `/services/construction-superintendent`
- All case study URLs (dynamic from `getAllCaseStudies()`)
- All insight URLs (dynamic from `getAllInsights()`)
- `/privacy-policy`
- `/terms-and-conditions`

```typescript
import { getAllCaseStudies, getAllInsights } from '@/lib/content'
import { getAllServices } from '@/lib/services'

// Add service pages
const servicePages = getAllServices().map((s) => ({
  url: `${SITE_URL}/services/${s.slug}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}))

// Add case study pages
const caseStudyPages = getAllCaseStudies().map((cs) => ({
  url: `${SITE_URL}/case-studies/${cs.slug}`,
  lastModified: new Date(),
  changeFrequency: 'yearly' as const,
  priority: 0.6,
}))

// Add insight pages
const insightPages = getAllInsights().map((i) => ({
  url: `${SITE_URL}/insights/${i.slug}`,
  lastModified: new Date(i.frontmatter.date),
  changeFrequency: 'yearly' as const,
  priority: 0.5,
}))
```

### Acceptance Criteria

- [ ] Case study index displays project cards correctly (verify with real data)
- [ ] Insights index category filtering works (10 Quick Bites, 4 Articles)
- [ ] 404 page has navigation links to key pages (Services, Case Studies, Insights, About)
- [ ] Sitemap includes all pages: static, services (5), case studies (14), insights (14), legal (2)
- [ ] `npm run build` succeeds

---

## Prompt 8: Navigation Audit & Cross-linking

**Requirements:** (All -- cross-cutting verification and linking)
**Dependencies:** Prompts 1-7 (all pages must exist)
**Files created/modified:**
- `src/components/layout/header.tsx` (modify if needed)
- `src/components/layout/footer.tsx` (modify if needed)
- Various page files (minor link fixes if needed)

### Context

With all pages now built, this prompt verifies complete site navigation and fixes any gaps. The Phase 3 success criteria require "navigate from homepage through all 5 service pages, about/team page, case study index, insights index, contact page, privacy policy, and terms of service without any dead links or missing pages."

### Actions

**1. Audit header navigation (`src/components/layout/header.tsx`)**:

Current nav links:
```typescript
const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]
```

Verify all these routes exist. Consider whether a Services dropdown/submenu is needed showing the 5 individual services. For Phase 3, a simple link to `/services` is sufficient -- the services index links to individual pages.

**2. Audit footer navigation (`src/components/layout/footer.tsx`)**:

Verify footer has:
- All main nav links (Services, Case Studies, Insights, About, Contact)
- Privacy Policy and Terms & Conditions links (added in Prompt 6)
- Contact info (phone, email, locations)
- Copyright notice

**3. Cross-link audit**: Navigate the site manually (or describe the navigation flow) to verify:

- Homepage -> click "Services" in nav -> services index
- Services index -> click any service card -> individual service page
- Service page -> click related case study -> case study page
- Service page -> click CTA -> contact page
- Homepage -> click featured case study -> case study page
- Homepage -> click "View All Case Studies" -> case study index
- Case study index -> click any card -> individual case study
- Homepage -> click "Insights" -> insights index
- Insights index -> filter by category -> filtered list
- Insights index -> click any article -> individual insight
- Any page -> click "About" -> about page
- Any page -> click "Contact" / CTA button -> contact page
- Footer -> Privacy Policy -> privacy policy page
- Footer -> Terms -> terms page
- Invalid URL -> 404 page -> click any navigation link -> valid page

**4. Fix any dead links** discovered during the audit. Common issues:
- Service page hero images referencing non-existent files
- Related case study slugs that don't match actual MDX filenames
- Footer links not updated with new pages

**5. Final build verification**:
```bash
npm run build
```

All pages should generate without errors. Check the build output for any warnings about missing images or broken links.

### Acceptance Criteria

- [ ] Every nav link in header and footer resolves to a real page
- [ ] All CTAs across all pages link to valid destinations
- [ ] Service pages link to real case studies that exist
- [ ] No 404s when navigating the full site (except the intentional 404 page)
- [ ] `npm run build` succeeds with zero errors
- [ ] Complete navigation path verified: homepage -> services -> service page -> case study -> back to homepage (and similar paths)

---

## Execution Order

Prompts 1, 3, 4, 5, 6 are independent and can run in parallel. Prompt 2 depends on Prompt 1 (reuses service data and related case studies component). Prompt 7 depends on Prompts 1 and 5. Prompt 8 depends on all others.

```
Wave 1 (parallel):
  Prompt 1: Service Pages (PAGE-02 through PAGE-06, PAGE-12)
  Prompt 3: About/Team Page (PAGE-07)
  Prompt 4: Contact Page (PAGE-08)
  Prompt 5: Client Logo Bar (PAGE-13)
  Prompt 6: Privacy & Terms (PAGE-09, PAGE-10)

Wave 2 (depends on Prompt 1):
  Prompt 2: Homepage (PAGE-01)

Wave 3 (depends on Prompts 1-6):
  Prompt 7: Enhance Existing Pages (CONT-04, CONT-07, PAGE-11)

Wave 4 (depends on all):
  Prompt 8: Navigation Audit & Cross-linking
```

## Phase Completion Checklist

When all 8 prompts are done, verify the phase success criteria:

1. **Full navigation works:** Start at `/` and click through to every page on the site: 5 service pages, about, case studies index, insights index, contact, privacy policy, terms of service, and back. No dead links.

2. **Homepage complete:** Hero section, value proposition, service overview cards, featured case studies, at least one CTA visible.

3. **Service pages complete:** Each of the 5 service pages has clear scope of work, benefits grid, contextual CTA, and related case studies. Dual service model (subscription + project) visible.

4. **Content indexes work:** Case study index shows 14 project cards. Insights index shows 14 articles with working category filter.

5. **Contact page functional:** Form renders with name, email, phone, project type, message fields. Submit shows success message. Trust signals visible alongside form.

6. **Legal pages exist:** `/privacy-policy` and `/terms-and-conditions` render with real content.

7. **404 page enhanced:** Shows navigation links to key pages.

8. **Client logos:** Greyscale logos with colour-on-hover appear on the homepage.

9. **Build passes:** `npm run build` completes with zero errors. All static pages generated.

10. **Sitemap complete:** `/sitemap.xml` includes all pages (static + dynamic).
