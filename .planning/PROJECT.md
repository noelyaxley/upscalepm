# UpScalePM

## What This Is

A modern consultancy website for UpScalePM (upscalepm.com.au) — a client-side project management firm specialising in property and construction projects. The site positions the business as the "owner's representative" who helps clients plan, coordinate, and deliver developments from early feasibility through to handover. Rebuilt from WordPress/Elementor to Next.js for better design control, performance, and maintainability.

## Core Value

Generate qualified leads from property developers and project owners who need experienced client-side PM to protect their time, budget, and quality.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Rebuild upscalepm.com.au as a modern Next.js site with "high-performance" minimalist design
- [ ] Full migration of existing content (case studies, articles, service pages, copy)
- [ ] HubSpot CRM integration — form submissions create/update contacts
- [ ] HubSpot automated email workflows triggered by form submissions
- [ ] SMS/text messaging integration via HubSpot or third-party service
- [ ] HubSpot tracking script for page views and UTM attribution
- [ ] MDX-powered case studies (e.g., Granville Diggers, Crosslife Church Asquith)
- [ ] MDX-powered insights/articles section ("Quick Bites" thought leadership)
- [ ] Service pages: Feasibility & Advisory, Design Management, DA Approval, Tender Assessment, Construction Superintendent
- [ ] Lead generation CTAs throughout the site ("Start Now", "Book a Call", contact forms)
- [ ] Both subscription-based and project-based service positioning
- [ ] Deploy to Vercel with custom domain upscalepm.com.au

### Out of Scope

- Client portal / login — this is a marketing site, not an app
- E-commerce / online payments — engagement is via consultation
- WordPress migration tooling — content will be manually migrated and rewritten as MDX
- Mobile app — web only

## Context

- **Current site**: upscalepm.com.au on WordPress + Elementor. Functional but design-limited.
- **Target audience**: Property developers and project owners in Australia, primarily small-to-mid-scale ($500K–$50M projects)
- **Related project**: upscale.build (separate SaaS product at upscale.build-saas). Different business line, separate codebase.
- **Existing content to migrate**: ~5 service pages, 2+ case studies (Granville Diggers, Crosslife Church Asquith), multiple insights/articles
- **Brand positioning**: Boutique firm vibe — experienced, hands-on, client-side focus. Not a generic big consultancy.

## Constraints

- **Tech stack**: Next.js + React, Tailwind CSS, MDX for content, Vercel hosting
- **Design direction**: "High-Performance" minimalist — diagonal layouts, ultra-clean typography, floating elements with subtle depth, motion-inspired imagery, geometric overlays, generous whitespace, crisp modern edges
- **CRM**: HubSpot (forms, email automation, SMS, tracking)
- **Domain**: upscalepm.com.au (existing domain, DNS will need to be pointed to Vercel)
- **Separate from upscale.build**: Own repo, own deployment, no shared codebase

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over WordPress | Design control, performance, developer experience | — Pending |
| MDX over headless CMS | Simple, free, content lives in repo, full design control | — Pending |
| Separate repo from upscale.build | Different business line, different concerns | — Pending |
| HubSpot for CRM/automation | Full marketing automation stack — forms, email, SMS, tracking | — Pending |
| Vercel for hosting | Consistent with existing infrastructure, great Next.js support | — Pending |

---
*Last updated: 2026-02-14 after initialization*
