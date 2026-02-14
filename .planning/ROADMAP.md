# Roadmap: UpScalePM

**Created:** 2026-02-14
**Depth:** Standard (7 phases)
**Core Value:** Generate qualified leads from property developers and project owners who need experienced client-side PM

## Overview

Rebuild upscalepm.com.au from WordPress/Elementor to a high-performance Next.js marketing site optimised for lead generation. The roadmap moves from design foundation through content migration, page construction, lead generation machinery, analytics/SEO, visual polish, and finally programmatic SEO pages with DNS cutover. Content migration from Elementor is isolated early due to non-trivial extraction complexity. Analytics and tracking are ready before launch. Animations come last as enhancement, not structure.

## Phases

### Phase 1: Foundation & Design System

**Goal:** Project scaffolding, design tokens, responsive layout primitives, and SEO groundwork are in place so all subsequent pages can be built consistently.

**Dependencies:** None (first phase)

**Requirements:** DSGN-01, DSGN-02, DSGN-03, DSGN-09, SEO-01, SEO-05, DEPL-01, MIG-01

**Success Criteria:**
1. Running `npm run dev` serves a Next.js app on localhost with Tailwind v4, custom fonts loading without FOUT, and shadcn/ui components rendering correctly
2. A test page demonstrates the responsive layout system working across mobile, tablet, and desktop breakpoints with consistent spacing and typography
3. Favicon appears in browser tab and a default OG image is configured for social sharing
4. WordPress site has been fully crawled and a complete 301 redirect map exists mapping every old URL to its new equivalent
5. Vercel project is created and preview deployments work on push to the repo

**Research flag:** None -- standard patterns, skip `/gsd:research-phase`

---

### Phase 2: Content Infrastructure & Migration

**Goal:** MDX content pipeline is operational and all existing WordPress content (case studies, insights, service copy, images) has been extracted, converted, and committed as MDX files in the repo.

**Dependencies:** Phase 1 (design system, fonts, layout primitives needed for content templates)

**Requirements:** CONT-01, CONT-02, CONT-03, CONT-05, CONT-06, CONT-08, MIG-02, MIG-03, MIG-04, MIG-05

**Success Criteria:**
1. Creating a new `.mdx` file in the content directory with frontmatter automatically makes it available as a rendered page with correct typography, layout, and metadata
2. All existing case studies from WordPress (Granville Diggers, Crosslife Church Asquith, others) are readable as fully formatted MDX pages with project details, imagery, and outcomes
3. All existing Quick Bites / insights articles from WordPress are readable as formatted MDX pages with author, date, reading time, and categories
4. Interactive MDX components (timelines, project stats, before/after comparisons) render correctly when embedded in article content
5. All migrated images are optimised (WebP/AVIF), load via next/image, and no broken image references exist across any content page

**Research flag:** YES -- run `/gsd:research-phase` on Elementor content extraction (proprietary JSON structure, budget 2-3x estimates)

---

### Phase 3: Core Pages

**Goal:** Every page on the site exists with real content, correct structure, and internal navigation -- a complete, browsable website (without CRO polish, animations, or integrations).

**Dependencies:** Phase 2 (migrated content needed for case study and insights pages; content templates needed for index pages)

**Requirements:** PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07, PAGE-08, PAGE-09, PAGE-10, PAGE-11, PAGE-12, PAGE-13, CONT-04, CONT-07

**Plans:** 8 plans

Plans:
- [ ] 3-01-PLAN.md -- Service page template and 5 service pages
- [ ] 3-02-PLAN.md -- Homepage with hero, services, featured case studies, CTA
- [ ] 3-03-PLAN.md -- About / Team page
- [ ] 3-04-PLAN.md -- Contact page with CRO-optimised form
- [ ] 3-05-PLAN.md -- Client logo bar component
- [ ] 3-06-PLAN.md -- Privacy policy and terms of service pages
- [ ] 3-07-PLAN.md -- Enhance existing pages (case study index, insights index, 404, sitemap)
- [ ] 3-08-PLAN.md -- Navigation audit and cross-linking verification

**Success Criteria:**
1. Visitor can navigate from homepage through all 5 service pages, about/team page, case study index, insights index, contact page, privacy policy, and terms of service without any dead links or missing pages
2. Homepage displays hero section, value proposition, service overview cards, featured case studies, and at least one visible CTA
3. Each service page presents clear scope of work, client benefits, and a contextual CTA -- with both subscription-based and project-based models visible where appropriate
4. Case study index shows project cards linking to individual case studies; insights index shows articles with category filtering
5. Contact page renders a functional form (UI only at this stage -- submission wired in Phase 4), and the branded 404 page appears for invalid URLs with navigation back to key pages

---

### Phase 4: Lead Generation & CRO

**Goal:** The site converts visitors into qualified leads -- contact form submissions reach HubSpot CRM, conversion optimisation principles are applied to all key pages, and booking/follow-up workflows are operational.

**Dependencies:** Phase 3 (pages must exist before CRO can be applied and forms wired up)

**Requirements:** HUB-01, HUB-02, HUB-03, HUB-04, HUB-05, CRO-01, CRO-02, CRO-03, CRO-04, CRO-05

**Success Criteria:**
1. Submitting the contact form creates or updates a contact in HubSpot CRM with all form fields, UTM parameters, and page attribution correctly recorded
2. Contact page (Google Ads landing page) has minimal form fields, clear value proposition above fold, trust signals, social proof, and follows form-CRO best practices
3. Homepage and all service pages use benefit-driven headlines, problem-agitate-solve structure, social proof placement, and CTAs visible at every scroll depth
4. HubSpot tracking script fires page views on every route change (including client-side navigation), and UTM parameters persist across the session
5. Form submission triggers automated HubSpot email follow-up, and consultation booking (Calendly or HubSpot Meetings) is available on the contact page and service pages

---

### Phase 5: Analytics, Tracking & SEO

**Goal:** Full measurement infrastructure is live -- every page view, form submission, and ad conversion is tracked across GA4, Google Ads, Meta Pixel, and HubSpot with unified UTM attribution. All technical SEO is production-ready.

**Dependencies:** Phase 4 (form submissions must exist to track as conversions; HubSpot tracking must be live for UTM unification)

**Requirements:** TRACK-01, TRACK-02, TRACK-03, TRACK-04, TRACK-05, SEO-02, SEO-03, SEO-04, SEO-06

**Success Criteria:**
1. Google Tag Manager container is installed and GA4 reports page views for every page, including client-side navigations
2. A contact form submission registers as a conversion in both Google Ads and GA4, with UTM source/medium/campaign correctly attributed
3. Meta Pixel fires on page load and tracks standard events, visible in Meta Events Manager
4. Every page has unique title, meta description, canonical URL, and appropriate JSON-LD structured data (LocalBusiness, Service, Article, or FAQPage as relevant)
5. Sitemap.xml and robots.txt are accessible, and Lighthouse scores meet Core Web Vitals targets (LCP < 2.5s, CLS < 0.1, INP < 200ms) on all key pages

---

### Phase 6: Animation & Visual Polish

**Goal:** The site has the "high-performance minimalist" visual identity -- scroll-driven animations, geometric overlays, smooth scrolling, and motion effects that differentiate it from every other consultancy website, without sacrificing performance.

**Dependencies:** Phase 3 (pages must be built to animate them); can run in parallel with Phases 4-5 if pages are stable

**Requirements:** DSGN-04, DSGN-05, DSGN-06, DSGN-07, DSGN-08, DSGN-10

**Success Criteria:**
1. Scrolling through any page triggers smooth fade-up animations on sections, with GSAP ScrollTrigger controlling timing based on viewport position
2. Homepage hero has entrance animation with SplitText typography effect on the main heading and parallax movement on background imagery
3. Diagonal section dividers (CSS clip-path) and floating geometric shapes with subtle depth appear throughout the site, creating the signature visual language
4. Lenis smooth scroll is active site-wide, integrated with GSAP ScrollTrigger without jank or conflict
5. All animations respect `prefers-reduced-motion` (gracefully disabled), perform at 60fps on mid-range mobile devices, and do not degrade Core Web Vitals below targets

**Research flag:** YES -- run `/gsd:research-phase` on scroll-driven animation performance (GSAP ScrollTrigger on mobile, parallax without jank, CWV maintenance)

---

### Phase 7: Programmatic SEO & Launch

**Goal:** Location-based service pages are live for Sydney and Newcastle, DNS is cut over from WordPress to Vercel, and the site is publicly accessible at upscalepm.com.au with all redirects working.

**Dependencies:** Phase 5 (SEO metadata, redirects, sitemap must be ready); Phase 6 (animations should be complete for launch quality)

**Requirements:** PSEO-01, PSEO-02, PSEO-03, PSEO-04, DEPL-02, DEPL-03

**Success Criteria:**
1. "Service in City" template generates pages for all 5 services in Sydney and all 5 services in Newcastle (10 location pages total), each with localised content, relevant case studies, and local CTAs
2. Visiting upscalepm.com.au in a browser loads the new Next.js site (DNS pointed to Vercel, SSL active)
3. Every old WordPress URL returns a 301 redirect to the correct new page -- no 404s for previously indexed URLs
4. Sharing any page URL on LinkedIn, Twitter/X, or Facebook shows correct OG image, title, and description in the link preview
5. Google Search Console shows the new sitemap submitted and pages beginning to be indexed

---

## Progress

| Phase | Name | Requirements | Status |
|-------|------|--------------|--------|
| 1 | Foundation & Design System | 8 | Complete |
| 2 | Content Infrastructure & Migration | 10 | Complete |
| 3 | Core Pages | 15 | Planned (8 prompts) |
| 4 | Lead Generation & CRO | 10 | Pending |
| 5 | Analytics, Tracking & SEO | 9 | Pending |
| 6 | Animation & Visual Polish | 6 | Pending |
| 7 | Programmatic SEO & Launch | 6 | Pending |
| **Total** | | **64** | |

## Dependency Graph

```
Phase 1: Foundation & Design System
  |
  v
Phase 2: Content Infrastructure & Migration
  |
  v
Phase 3: Core Pages
  |
  +---> Phase 4: Lead Generation & CRO
  |       |
  |       v
  |     Phase 5: Analytics, Tracking & SEO
  |       |
  +---> Phase 6: Animation & Visual Polish (parallel with 4-5)
  |       |
  v       v
Phase 7: Programmatic SEO & Launch
```

## Coverage

All 64 v1 requirements mapped. No orphans. No duplicates.

NOTE: REQUIREMENTS.md stated "48 total" but actual count of listed v1 requirements is 64. Traceability table updated to reflect actual count.

---
*Roadmap created: 2026-02-14*
