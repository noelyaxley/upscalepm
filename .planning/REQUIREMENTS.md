# Requirements: UpScalePM

**Defined:** 2026-02-14
**Core Value:** Generate qualified leads from property developers and project owners who need experienced client-side PM

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Core Pages

- [ ] **PAGE-01**: Homepage with hero, value proposition, service overview, featured case studies, and primary CTA
- [ ] **PAGE-02**: Service page — Feasibility & Advisory with clear scope, benefits, and CTA
- [ ] **PAGE-03**: Service page — Design Management with clear scope, benefits, and CTA
- [ ] **PAGE-04**: Service page — DA Approval with clear scope, benefits, and CTA
- [ ] **PAGE-05**: Service page — Tender Assessment with clear scope, benefits, and CTA
- [ ] **PAGE-06**: Service page — Construction Superintendent / Client-side PM with clear scope, benefits, and CTA
- [ ] **PAGE-07**: About / Team page with company story, values, and team member bios with photos
- [ ] **PAGE-08**: Contact page optimised as Google Ads landing page — form-CRO principles, marketing psychology, minimal friction, clear value proposition, trust signals
- [ ] **PAGE-09**: Privacy policy page
- [ ] **PAGE-10**: Terms of service page
- [ ] **PAGE-11**: Branded 404 page with navigation back to key pages
- [ ] **PAGE-12**: Dual service model positioning — both subscription-based and project-based models clearly presented
- [ ] **PAGE-13**: Client logo bar with greyscale logos, colour on hover

### Content System

- [ ] **CONT-01**: MDX content pipeline configured with @next/mdx, frontmatter parsing, and typed schemas
- [ ] **CONT-02**: Case study template with project details, challenge, approach, outcomes, and imagery
- [ ] **CONT-03**: All existing case studies migrated from WordPress to MDX (Granville Diggers, Crosslife Church Asquith, others)
- [ ] **CONT-04**: Case study index page with project cards
- [ ] **CONT-05**: Insights/articles template with categories, author, date, and reading time
- [ ] **CONT-06**: All existing Quick Bites articles migrated from WordPress to MDX
- [ ] **CONT-07**: Insights index page with category filtering
- [ ] **CONT-08**: Interactive MDX components — embeddable React components in articles (timelines, project stats, before/after)

### Design & Animation

- [ ] **DSGN-01**: Design system with colour palette, typography scale, spacing tokens, and component library (shadcn/ui + Tailwind v4)
- [ ] **DSGN-02**: Responsive mobile-first layout system with breakpoints
- [ ] **DSGN-03**: Professional typography with custom font via next/font
- [ ] **DSGN-04**: GSAP ScrollTrigger scroll-driven animations on page sections
- [ ] **DSGN-05**: Geometric overlay design language — diagonal section dividers via CSS clip-path, floating shapes with subtle depth
- [ ] **DSGN-06**: Typography animations using GSAP SplitText on key headings
- [ ] **DSGN-07**: Lenis smooth scroll integrated with GSAP ScrollTrigger
- [ ] **DSGN-08**: Motion-inspired imagery and parallax effects on hero sections
- [ ] **DSGN-09**: Custom favicon and site-wide default OG images
- [ ] **DSGN-10**: All animations respect prefers-reduced-motion and perform at 60fps on mobile

### HubSpot Integration

- [ ] **HUB-01**: Custom contact form (shadcn/ui) submitting via Server Action to HubSpot Forms API — creates/updates CRM contacts
- [ ] **HUB-02**: HubSpot tracking script installed on all pages with SPA-aware route change tracking
- [ ] **HUB-03**: UTM parameter capture and attribution passed to HubSpot contacts
- [ ] **HUB-04**: HubSpot email automation workflows configured for form submission follow-up
- [ ] **HUB-05**: Consultation booking integration (Calendly or HubSpot Meetings embed) on contact page and service pages

### Analytics & Tracking

- [ ] **TRACK-01**: Google Tag Manager (GTM) container installed and configured
- [ ] **TRACK-02**: Google Analytics 4 (GA4) configured via GTM with page view and event tracking
- [ ] **TRACK-03**: Google Ads conversion tracking — form submissions tracked as conversions for ad campaign optimisation
- [ ] **TRACK-04**: Meta Pixel installed via GTM for Facebook/Instagram ad tracking
- [ ] **TRACK-05**: UTM parameter tracking across GA4, HubSpot, and Google Ads for full attribution

### Conversion Optimisation (CRO)

- [ ] **CRO-01**: Contact page (Google Ads landing page) — optimised with form-CRO principles: minimal fields, clear value proposition above fold, trust signals, social proof, urgency/scarcity where authentic
- [ ] **CRO-02**: Marketing psychology principles applied to all key pages — cognitive bias awareness, persuasion frameworks, decision-making shortcuts
- [ ] **CRO-03**: Page CRO applied to homepage — clear hierarchy, benefit-driven headlines, social proof placement, CTA visibility at every scroll depth
- [ ] **CRO-04**: Page CRO applied to service pages — problem-agitate-solve structure, specific outcomes, clear next step
- [ ] **CRO-05**: CTAs throughout site — contextual, benefit-driven calls-to-action on every page with appropriate urgency

### SEO

- [ ] **SEO-01**: SEO-informed site structure — URL hierarchy, internal linking, heading structure
- [ ] **SEO-02**: Next.js Metadata API configured for all pages — title, description, canonical URLs
- [ ] **SEO-03**: JSON-LD structured data — LocalBusiness, Service, Article, FAQPage schemas
- [ ] **SEO-04**: Sitemap.ts and robots.txt configured for search engine crawling
- [ ] **SEO-05**: WordPress URL redirect map — 301 redirects for all existing URLs to preserve rankings
- [ ] **SEO-06**: Core Web Vitals targets — LCP <2.5s, CLS <0.1, INP <200ms on all pages

### Programmatic SEO

- [ ] **PSEO-01**: Service + location template page for generating "Service in City" pages
- [ ] **PSEO-02**: Sydney location pages — one per service (e.g., "Feasibility & Advisory Sydney", "Design Management Sydney")
- [ ] **PSEO-03**: Newcastle location pages — one per service (e.g., "DA Approval Newcastle", "Construction Superintendent Newcastle")
- [ ] **PSEO-04**: Location pages include local context, relevant case studies, and localised CTAs

### Content Migration

- [ ] **MIG-01**: Crawl existing WordPress site and export all content (pages, posts, images, metadata)
- [ ] **MIG-02**: Migrate all service page copy to new page structure (rewrite as needed for new design)
- [ ] **MIG-03**: Migrate all case study content and images to MDX format
- [ ] **MIG-04**: Migrate all insights/articles content to MDX format
- [ ] **MIG-05**: Migrate all images — optimise and convert to WebP/AVIF, store in /public or use next/image

### Deployment

- [ ] **DEPL-01**: Vercel project configured with custom domain upscalepm.com.au
- [ ] **DEPL-02**: DNS pointed from current WordPress hosting to Vercel
- [ ] **DEPL-03**: Social sharing optimised — OG images, Twitter cards, LinkedIn preview tested

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### SMS & Advanced Automation

- **SMS-01**: SMS follow-up integration via MessageMedia or Sakari through HubSpot marketplace
- **SMS-02**: Multi-step nurture sequences combining email and SMS

### Additional Content

- **CONT-09**: Video testimonial embeds from real clients
- **CONT-10**: Resource downloads (gated PDF guides) for mid-funnel lead capture

### Design Enhancements

- **DSGN-11**: Dark mode toggle (light/dark theme)

### Expansion

- **PSEO-05**: Additional location pages beyond Sydney and Newcastle based on search data
- **ADS-01**: Multiple ad-specific landing pages for different Google Ads campaigns
- **SOCIAL-01**: Social content sharing templates optimised per platform (LinkedIn, Instagram)

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS admin panel | MDX in repo is simpler, free, version-controlled for 1-3 authors |
| User accounts / login | Marketing site, not app. upscale.build handles authenticated users |
| Blog comments | Spam magnet, moderation burden. Drive discussion to LinkedIn |
| Live chat widget | 200-500KB JS bloat, hurts CWV, creates staffing expectation |
| Newsletter popup / modal | Damages premium brand perception. Use inline CTAs instead |
| HubSpot embedded forms | Break design, add 200KB+ JS. Use custom forms via Server Actions |
| Stock photography | Makes competitors look identical. Use real project photos + geometric imagery |
| Three.js / WebGL effects | Tank performance, break on mobile. Use subtle GSAP animations |
| Multi-language / i18n | Australian market only, English only |
| E-commerce / payments | Services are bespoke, not products. Use "Book a Call" CTA |
| Page transition animations | Complex with App Router, accessibility issues, delays content paint |
| Search functionality | <50 pages, navigation and categories sufficient |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01 | Phase 1 - Foundation & Design System | Pending |
| DSGN-02 | Phase 1 - Foundation & Design System | Pending |
| DSGN-03 | Phase 1 - Foundation & Design System | Pending |
| DSGN-09 | Phase 1 - Foundation & Design System | Pending |
| SEO-01 | Phase 1 - Foundation & Design System | Pending |
| SEO-05 | Phase 1 - Foundation & Design System | Pending |
| DEPL-01 | Phase 1 - Foundation & Design System | Pending |
| MIG-01 | Phase 1 - Foundation & Design System | Pending |
| CONT-01 | Phase 2 - Content Infrastructure & Migration | Pending |
| CONT-02 | Phase 2 - Content Infrastructure & Migration | Pending |
| CONT-03 | Phase 2 - Content Infrastructure & Migration | Pending |
| CONT-05 | Phase 2 - Content Infrastructure & Migration | Pending |
| CONT-06 | Phase 2 - Content Infrastructure & Migration | Pending |
| CONT-08 | Phase 2 - Content Infrastructure & Migration | Pending |
| MIG-02 | Phase 2 - Content Infrastructure & Migration | Pending |
| MIG-03 | Phase 2 - Content Infrastructure & Migration | Pending |
| MIG-04 | Phase 2 - Content Infrastructure & Migration | Pending |
| MIG-05 | Phase 2 - Content Infrastructure & Migration | Pending |
| PAGE-01 | Phase 3 - Core Pages | Pending |
| PAGE-02 | Phase 3 - Core Pages | Pending |
| PAGE-03 | Phase 3 - Core Pages | Pending |
| PAGE-04 | Phase 3 - Core Pages | Pending |
| PAGE-05 | Phase 3 - Core Pages | Pending |
| PAGE-06 | Phase 3 - Core Pages | Pending |
| PAGE-07 | Phase 3 - Core Pages | Pending |
| PAGE-08 | Phase 3 - Core Pages | Pending |
| PAGE-09 | Phase 3 - Core Pages | Pending |
| PAGE-10 | Phase 3 - Core Pages | Pending |
| PAGE-11 | Phase 3 - Core Pages | Pending |
| PAGE-12 | Phase 3 - Core Pages | Pending |
| PAGE-13 | Phase 3 - Core Pages | Pending |
| CONT-04 | Phase 3 - Core Pages | Pending |
| CONT-07 | Phase 3 - Core Pages | Pending |
| HUB-01 | Phase 4 - Lead Generation & CRO | Pending |
| HUB-02 | Phase 4 - Lead Generation & CRO | Pending |
| HUB-03 | Phase 4 - Lead Generation & CRO | Pending |
| HUB-04 | Phase 4 - Lead Generation & CRO | Pending |
| HUB-05 | Phase 4 - Lead Generation & CRO | Pending |
| CRO-01 | Phase 4 - Lead Generation & CRO | Pending |
| CRO-02 | Phase 4 - Lead Generation & CRO | Pending |
| CRO-03 | Phase 4 - Lead Generation & CRO | Pending |
| CRO-04 | Phase 4 - Lead Generation & CRO | Pending |
| CRO-05 | Phase 4 - Lead Generation & CRO | Pending |
| TRACK-01 | Phase 5 - Analytics, Tracking & SEO | Pending |
| TRACK-02 | Phase 5 - Analytics, Tracking & SEO | Pending |
| TRACK-03 | Phase 5 - Analytics, Tracking & SEO | Pending |
| TRACK-04 | Phase 5 - Analytics, Tracking & SEO | Pending |
| TRACK-05 | Phase 5 - Analytics, Tracking & SEO | Pending |
| SEO-02 | Phase 5 - Analytics, Tracking & SEO | Pending |
| SEO-03 | Phase 5 - Analytics, Tracking & SEO | Pending |
| SEO-04 | Phase 5 - Analytics, Tracking & SEO | Pending |
| SEO-06 | Phase 5 - Analytics, Tracking & SEO | Pending |
| DSGN-04 | Phase 6 - Animation & Visual Polish | Pending |
| DSGN-05 | Phase 6 - Animation & Visual Polish | Pending |
| DSGN-06 | Phase 6 - Animation & Visual Polish | Pending |
| DSGN-07 | Phase 6 - Animation & Visual Polish | Pending |
| DSGN-08 | Phase 6 - Animation & Visual Polish | Pending |
| DSGN-10 | Phase 6 - Animation & Visual Polish | Pending |
| PSEO-01 | Phase 7 - Programmatic SEO & Launch | Pending |
| PSEO-02 | Phase 7 - Programmatic SEO & Launch | Pending |
| PSEO-03 | Phase 7 - Programmatic SEO & Launch | Pending |
| PSEO-04 | Phase 7 - Programmatic SEO & Launch | Pending |
| DEPL-02 | Phase 7 - Programmatic SEO & Launch | Pending |
| DEPL-03 | Phase 7 - Programmatic SEO & Launch | Pending |

**Coverage:**
- v1 requirements: 64 total
- Mapped to phases: 64
- Unmapped: 0

---
*Requirements defined: 2026-02-14*
*Last updated: 2026-02-14 after roadmap creation*
