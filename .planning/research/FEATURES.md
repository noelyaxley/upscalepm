# Feature Landscape

**Domain:** Professional services consultancy website (property & construction PM)
**Researched:** 2026-02-14

## Table Stakes

Features users expect from a professional consultancy website. Missing = site feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Responsive design (mobile-first) | 60%+ traffic is mobile. Google mobile-first indexing. | Low | Tailwind v4 handles this natively |
| Service pages (one per service) | Visitors must understand what you do. Every competitor has dedicated service pages. | Medium | ~5 pages: Feasibility, Design Management, DA Approval, Tender Assessment, Construction Superintendent |
| Case studies / portfolio | Social proof. #1 trust signal for consultancy. 79% of B2B buyers consult case studies. | Medium | MDX with frontmatter, index page with filtering |
| About / team page | People hire people. Trust signal for boutique firms. | Low | Company story, values, team bios with photos |
| Contact page with form | Primary conversion point. No form = lost leads. | Medium | Custom form -> HubSpot CRM via Server Action |
| Insights / blog | SEO driver, thought leadership, content marketing | Medium | MDX with categories, target long-tail keywords |
| Clear CTAs throughout | Lead generation is the site's purpose. Every scroll depth needs a next step. | Low | Reusable CTA components on every page |
| Fast page loads (<2.5s LCP) | Core Web Vitals = Google ranking factor. 53% of mobile visitors leave after 3s. | Low | Next.js SSG + Vercel edge = fast by default |
| SEO fundamentals | Must be findable. "project management consultancy sydney" etc. | Medium | Metadata API, structured data, sitemap |
| Professional typography | Consultancy = credibility. Typography is 90% of design. | Low | Tailwind typography plugin + custom font via next/font |
| Privacy policy / terms | Legal requirement (Australian Privacy Act) | Low | Static MDX page |
| 404 page | Professional error handling. Missing = amateur feel. | Low | Branded 404 with navigation |
| Favicon & OG images | Shared links without OG images look unprofessional in Slack, LinkedIn. | Low | Custom favicon, site-wide default OG |
| SSL / HTTPS | Chrome marks HTTP as "Not Secure". | None | Vercel handles automatically |

## Differentiators

Features that set UpScalePM apart from typical consultancy WordPress sites.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| GSAP scroll-driven animations | "High-performance" brand feel. Most competitors have static WordPress sites. | High | GSAP ScrollTrigger, diagonal layouts, parallax |
| Geometric overlay design language | Visual distinction. Diagonal lines, floating shapes, depth layers. | Medium | CSS clip-paths + GSAP-animated SVG elements |
| Typography animations (SplitText) | Premium feel. Characters/words animate on scroll reveal. | Medium | GSAP SplitText (now free) |
| Smooth scroll (Lenis) | Buttery navigation feel that signals quality | Low | ~2KB library, pairs with GSAP ScrollTrigger |
| HubSpot CRM integration | Every form submission creates/updates HubSpot contact with full attribution. Competitors use basic mailto. | Medium | Custom forms via Server Actions to @hubspot/api-client |
| Automated email follow-up | Instant response when someone submits. Keeps leads warm. | Medium | Configured in HubSpot workflows, not website code |
| SMS follow-up | Text within minutes of submission. 98% open rate vs 20% email. Novel in construction PM. | Medium | MessageMedia or Sakari via HubSpot marketplace |
| Client logo bar | Quick visual trust signal. "We've worked with [recognizable names]". | Low | Greyscale logos, colour on hover |
| MDX-powered content | Embed React components in articles -- interactive timelines, project stats, before/after. No competitor does this. | Medium | @next/mdx with custom component mapping |
| Consultation booking | Let prospects self-schedule. Removes friction. | Low | Calendly or HubSpot Meetings embed |
| Dual service model positioning | Both subscription-based and project-based. Unique in market. | Low | Content/UX challenge, not technical |
| Structured data / rich snippets | Enhanced Google appearance. 20-30% higher click-through rates. | Low | JSON-LD for LocalBusiness, Service, Article, FAQPage |
| Dark mode | Modern, premium feel | Low | Tailwind dark mode, shadcn built-in |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| CMS admin panel | Overengineered for 1-3 content authors. MDX in repo is simpler, free, version-controlled. | Author MDX in VS Code, deploy via git push |
| User accounts / login | Marketing site, not app. Auth adds complexity for zero value. | SaaS product (upscale.build) handles authenticated users |
| Comments on blog posts | Spam magnet, moderation burden. Construction PM prospects call, not comment. | Drive discussion to LinkedIn shares |
| Live chat widget | 200-500KB JS bloat, hurts CWV, creates staffing expectation. | Contact form + HubSpot automated follow-up |
| Newsletter popup / modal | Annoying. Damages premium brand perception. | Subtle inline CTA in insights articles |
| HubSpot embedded forms | Inject iframe/unstyled DOM, break design, add 200KB+ JS. | Custom shadcn/ui forms -> Server Action -> HubSpot API |
| Stock photography | Generic handshake/hard-hat photos make competitors look identical. | Real project photography + abstract geometric imagery |
| Three.js / WebGL effects | Tank performance, break on mobile, feel like tech demo. | Subtle GSAP animations: transforms, opacity, clip-path |
| Multi-language / i18n | Australian market only. English only. | Single locale |
| E-commerce / payments | Not selling products. Services are bespoke. | "Book a Call" CTA leading to scheduling |
| Page transition animations (SPA-style) | Complex with App Router, accessibility issues, delays content paint. | Per-section scroll animations. Content appears instantly, animates in view. |
| Search functionality | <50 content pages. Navigation and categories are sufficient. | Category filtering on insights page |

## Feature Dependencies

```
Design System (tokens, components) -> All pages
  |
  +-> Service Pages (static)
  +-> About Page (static)
  +-> Contact Form -> HubSpot API integration
  |
MDX Config (@next/mdx) -> Case Studies -> Case Study Index
MDX Config (@next/mdx) -> Insights Articles -> Insights Index
  |
GSAP Setup -> Scroll Animations -> Applied to all page sections
Lenis Setup -> Smooth Scroll -> Pairs with GSAP ScrollTrigger
  |
All Pages -> SEO (metadata, structured data, sitemap)
All Pages -> HubSpot Tracking Code
```

### Critical Path

1. **Design system** must come first -- every page and component depends on it
2. **MDX infrastructure** must be established before any content pages
3. **HubSpot API integration** must work before email/SMS automation
4. **Content pages** can be built in parallel once design system + MDX are ready
5. **Animations and polish** come last -- enhancement, not structure

## MVP Recommendation

### Prioritize (launch-blocking)

1. **Design system** -- typography, colour palette, layout components, responsive grid, GSAP registration
2. **Homepage** -- hero, value proposition, service overview, featured case studies, primary CTA
3. **Service pages (all 5)** -- core content driving organic search
4. **Contact form + HubSpot integration** -- the entire point is lead generation
5. **Case studies (migrated)** -- social proof that closes deals
6. **About + Team page** -- trust signals
7. **SEO fundamentals** -- meta tags, sitemap, robots.txt, structured data at launch
8. **HubSpot tracking script** -- analytics from day one (cannot backfill)

### Defer (post-launch, high value)

- **Insights/articles**: Important for SEO long-term. Migrate 2-3 existing articles for launch, publish consistently post-launch.
- **Email automation workflows**: Configure in HubSpot after forms generate real contacts.
- **SMS integration**: Add once email workflows proven. MessageMedia via HubSpot marketplace.
- **Consultation booking (Calendly)**: Quick win post-launch.
- **Video testimonials**: Build embed infrastructure, add when footage available.
- **Dark mode**: Nice-to-have, add post-launch.

### Defer (future, nice-to-have)

- Service area / location pages for local SEO ("Project Management Sydney")
- Resource downloads (gated PDF guides) for mid-funnel lead capture
- Service calculator / estimator (significant domain modeling)
- Dynamic case study filtering with URL params

## Competitor Feature Matrix

Based on Australian construction PM consultancy websites:

| Feature | RCP | Essence PM | EPM | Gallagher Jeffs | **UpScalePM (target)** |
|---------|-----|-----------|-----|-----------------|----------------------|
| Service pages | Yes | Yes | Yes | Yes | Yes |
| Case studies | Yes (extensive) | Yes | Yes | Yes | Yes (MDX-powered) |
| Team page | Yes | Yes | Yes | Yes | Yes |
| Blog/articles | Sparse | No | No | No | **Yes (Quick Bites)** |
| Contact form | Basic | Basic | Basic | Basic | **HubSpot-integrated** |
| CRM integration | Unknown | Unknown | Unknown | Unknown | **HubSpot full stack** |
| Email automation | Unknown | Unknown | Unknown | Unknown | **Yes** |
| SMS follow-up | No | No | No | No | **Yes** |
| Modern design | Dated | Moderate | Dated | Moderate | **"High-Performance"** |
| Mobile optimised | Partial | Yes | Partial | Partial | **Full responsive** |
| Booking calendar | No | No | No | No | **Calendly/HubSpot** |
| Performance (CWV) | Poor-Fair | Fair | Poor | Fair | **Excellent (target)** |

The competitive landscape reveals most Australian construction PM firms have basic, template-driven websites. UpScalePM's combination of modern design, CRM integration, content marketing, and automated follow-up would be genuinely differentiated.

## Sources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [GSAP ScrollTrigger](https://gsap.com/scroll/)
- [HubSpot API Client Libraries](https://developers.hubspot.com/docs/api/client-libraries)
- [HubSpot Forms in Next.js (2025 Guide)](https://mahmoodchowdhury.com/blog/integrating-hubspot-forms-into-your-next-js-application/)
- [Consulting Success - Client-Generating Website](https://www.consultingsuccess.com/consulting-website)
- [B2B Conversion Rate Optimization](https://directiveconsulting.com/blog/blog-b2b-conversion-rate-optimization-guide/)
