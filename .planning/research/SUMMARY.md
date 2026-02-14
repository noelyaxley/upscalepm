# Research Summary: UpScalePM

**Domain:** Consultancy/professional services website (property & construction PM)
**Researched:** 2026-02-14
**Overall confidence:** HIGH

## Executive Summary

UpScalePM is rebuilding from WordPress/Elementor to Next.js 16 on Vercel, targeting a "high-performance minimalist" design that distinguishes them from competitors' dated WordPress sites. The rebuild combines four critical capabilities: (1) MDX-powered content with full design control, (2) GSAP scroll-driven animations (diagonal layouts, floating elements, geometric overlays), (3) deep HubSpot CRM integration for lead generation with email/SMS automation, and (4) complete content migration from the existing WordPress site.

The recommended architecture is static-first with Next.js 16.1.6, React 19, Tailwind v4, and @next/mdx for local content. GSAP 3.14 (now fully free) is the clear choice over Motion for complex scroll-driven animations. All forms submit through Server Actions to @hubspot/api-client, avoiding the design-breaking embedded HubSpot forms. The site targets ~15 pages at launch (homepage, 5 service pages, case studies, insights, about, contact), scaling to ~50 pages over time.

The primary risk is SEO ranking collapse during migration—a critical pitfall requiring pre-migration URL mapping, 301 redirects, and metadata preservation. Secondary risks include React Hook Form's React 19 compatibility issues (mitigated by using useWatch or native useActionState), GSAP/Lenis integration conflicts (mitigated by explicit initialization sequence), and HubSpot tracking breaking on SPA navigation (mitigated by pathname tracking component). Performance is paramount: animations must only use transform/opacity, not layout properties, to maintain Core Web Vitals with LCP < 2.5s and CLS < 0.1.

This research provides high confidence in stack choices (official Next.js patterns, battle-tested libraries) and moderate confidence in animation complexity estimation (GSAP implementation requires careful scoping). The primary gap is WordPress content extraction—Elementor's proprietary JSON structure requires custom migration scripts, likely taking 2-3x initial estimates.

## Key Findings

### Stack (HIGH confidence)

**Core framework:** Next.js 16.1.6 with React 19, TypeScript 5.x, Tailwind CSS v4. Vercel deployment for zero-config hosting.

**MDX content:** @next/mdx with local files (NOT next-mdx-remote or velite). Use gray-matter for frontmatter parsing, remark-gfm for GitHub Flavored Markdown, @tailwindcss/typography for prose styling. This is the official, Turbopack-compatible approach for content living in the repo.

**Animation:** GSAP 3.14.2 (now 100% free) with @gsap/react for useGSAP hook. Includes ScrollTrigger for scroll-driven animations and SplitText for typography animations. Lenis for smooth scroll (~2KB), pairs with ScrollTrigger. Motion (Framer Motion) is NOT needed—GSAP handles all animation requirements.

**HubSpot integration:** Custom forms using shadcn/ui + React Hook Form + Zod, submitting via Server Actions to @hubspot/api-client. Load tracking script via next/script with afterInteractive strategy. DO NOT use next-hubspot package (React 19 incompatible) or embedded forms (design control loss).

**Forms:** React Hook Form 7.71.x with Zod 4.3.x validation (14x faster than v3). Server Actions for submission. Note: Use useWatch instead of watch for React 19 compatibility. For simple forms, consider useActionState directly.

**UI/SEO:** shadcn/ui "new-york" style (consistent with SaaS product), lucide-react icons. Built-in Next.js Metadata API for SEO (no next-seo or next-sitemap packages needed). schema-dts for type-safe JSON-LD structured data.

**Key alternatives rejected:** next-mdx-remote v6 (just released with breaking changes, RSC issues), velite (pre-1.0, Turbopack incompatible), contentlayer (abandoned), Motion for animations (wrong tool for scroll-driven timelines), HubSpot embedded forms (design-breaking), next-sitemap (outdated, App Router has native sitemap.ts).

### Features (MEDIUM confidence)

**Table stakes (launch-blocking):** Mobile-first responsive design, 5 service pages (Feasibility, Design Management, DA Approval, Tender, Construction), case studies with MDX, about/team page, contact form → HubSpot, insights/blog for SEO, CTAs throughout, fast page loads (LCP < 2.5s), SEO metadata/sitemap/structured data, professional typography, privacy policy, 404 page, favicon/OG images.

**Differentiators:** GSAP scroll-driven animations (diagonal layouts, parallax, floating shapes), geometric overlay design language, SplitText typography animations, Lenis smooth scroll, HubSpot CRM integration with full attribution, automated email follow-up, SMS follow-up (MessageMedia/Sakari via HubSpot), client logo bar, MDX-powered interactive content, consultation booking (Calendly/HubSpot Meetings), dual subscription/project model positioning, structured data for rich snippets, dark mode.

**Anti-features (explicitly avoid):** CMS admin panel (MDX in repo is simpler), user accounts/auth, blog comments, live chat widget (CWV bloat), newsletter popup modals, HubSpot embedded forms, stock photography, Three.js/WebGL, multi-language, e-commerce, page transition animations (accessibility issues), search (unnecessary for <50 pages).

**Critical path:** Design system → MDX infrastructure → HubSpot API integration → Content pages (parallel) → Animations/polish (last).

**MVP scope:** Homepage, 5 service pages, contact form + HubSpot, migrated case studies, about/team, SEO fundamentals, HubSpot tracking script at launch. Defer post-launch: insights articles (migrate 2-3 for launch, publish consistently after), email workflows, SMS integration, Calendly booking, video testimonials, dark mode.

### Architecture (HIGH confidence)

**Rendering:** Static-first. All pages are SSG (static site generation) at build time. No SSR, no ISR. Content changes trigger new Vercel deployment via git push. Fastest possible architecture for ~15-50 page marketing site.

**Component boundaries:** Server Components for content (SEO-friendly), thin Client Component wrappers for GSAP animations. Root layout handles fonts/metadata/tracking (server), SmoothScrollProvider initializes Lenis (client), HubSpotTracker monitors pathname changes (client), AnimatedSection wraps server content with scroll triggers (client).

**Data flow:** MDX files → @next/mdx compiler → static HTML at build. Forms: Client validation (RHF + Zod) → Server Action → Zod server validation → @hubspot/api-client → HubSpot CRM. Analytics: HubSpot tracking script loads afterInteractive → usePathname() tracks SPA navigation. Animations: Static HTML visible immediately → Lenis smooth scroll → GSAP ScrollTrigger viewport observation → transform/opacity animations on scroll.

**Directory structure:** app/ for pages/routes, components/ organized by type (ui/, layout/, sections/, animation/, geometric/, forms/, mdx/, seo/, hubspot/), lib/ for utilities (hubspot.ts, animations.ts, content.ts, metadata.ts), actions/ for Server Actions (contact.ts), content/ for MDX files (case-studies/, insights/), mdx-components.tsx at root (required by @next/mdx).

**Key patterns:**
1. Server Component with Client Animation Wrapper—content in server, useGSAP wrapper for animations
2. MDX with Dynamic Imports—generateStaticParams + dynamic import(`@/content/${slug}.mdx`)
3. Form to HubSpot via Server Action—custom UI + Server Action proxy (never client-side API calls)
4. Diagonal sections with CSS clip-path—pure CSS, no JS needed
5. Lenis + GSAP integration—initialize Lenis first, connect via lenis.on('scroll', ScrollTrigger.update)
6. HubSpot page view tracking—usePathname() + window._hsq for SPA navigation

**Anti-patterns to avoid:** Animating Server Components directly (use client wrappers), HubSpot embed forms (use custom + Server Actions), ISR for <50 pages (unnecessary complexity), client-side MDX compilation (slow, bad for SEO), over-animating (3-4 elements per viewport max), animating layout properties (only transform/opacity), making entire sections client components (thin wrappers only).

### Pitfalls (HIGH confidence)

**CRITICAL (5 pitfalls causing ranking loss, lead failure, or major rework):**

1. **SEO ranking collapse during migration:** WordPress → Next.js changes URLs, meta tags, structured data. Google recrawl takes weeks. **Prevention:** Crawl old site first (Screaming Frog), create 301 redirect map, preserve URL structures, rebuild all structured data, submit new sitemap immediately, run pre-launch SEO audit.

2. **React Hook Form + React 19 incompatibility:** watch() doesn't trigger re-renders, React Compiler causes unexpected re-renders. **Prevention:** Use useWatch() instead of watch(), test with React Compiler enabled, consider native useActionState for simple forms.

3. **GSAP ScrollTrigger + Lenis conflict:** Two libraries manipulating scroll without coordination → animations broken/janky. **Prevention:** Initialize Lenis BEFORE ScrollTrigger, connect explicitly via lenis.on('scroll', ScrollTrigger.update) and gsap.ticker.

4. **HubSpot tracking breaks in SPA navigation:** Tracking script only fires on initial load, client-side nav not tracked → 100% bounce rate, broken attribution. **Prevention:** usePathname() component pushing ['setPath'] and ['trackPageView'] to window._hsq on every route change.

5. **Form-to-CRM pipeline silently fails:** CORS errors, field mismatches, missing required fields, exposed API keys. **Prevention:** ALWAYS proxy through Server Actions (never client-side fetch), map fields to exact HubSpot names, implement error monitoring, test end-to-end, add fallback error handling.

**MODERATE (5 pitfalls causing performance/timeline issues):**

6. **Animation-driven performance degradation:** LCP > 4s, CLS spikes, TBT increases from heavy animations. **Prevention:** Performance budget (LCP < 2.5s, CLS < 0.1), only animate transform/opacity (GPU-composited), use useGSAP for auto-cleanup, test on real mid-range Android.

7. **WordPress/Elementor content extraction underestimated:** Elementor stores content in proprietary JSON (_elementor_data postmeta), not exportable via REST API. **Prevention:** Audit content first, write Elementor JSON parser, budget 2-3x initial estimate, migrate images to Vercel/CDN.

8. **"Minimalist" design that fails to convert:** Beautiful but missing trust signals (client logos, metrics, case studies, multiple CTAs). **Prevention:** Design for conversion funnel, trust signals on every page, prominent case studies, problem-first copy, multiple CTA types.

9. **GSAP animations not cleaning up on route change:** ScrollTrigger instances persist, memory leaks, ghost animations. **Prevention:** Always use useGSAP() hook for auto-cleanup, never create instances outside useGSAP scope.

10. **Image pipeline misconfigured:** Hero images at 2-4MB, LCP > 4s, CSS backgrounds bypass optimization. **Prevention:** next/image everywhere with width/height/sizes, priority only on hero LCP image, configure AVIF, lazy-load below-fold, use CSS instead of images for geometric overlays.

**MINOR (9 quick-fix pitfalls):** Missing mdx-components.tsx (file required at root), forgetting dynamicParams = false (causes 404s in production), HubSpot API key in client bundle (NEXT_PUBLIC_ prefix leaks token), GSAP imports in Server Components (window undefined errors), Lenis accessibility issues (keyboard nav, screen readers), Tailwind v4 breaking changes (CSS-first config), staging site indexed by Google (noindex headers on preview), font loading FOUT/FOIT (next/font strategies), MDX dynamic imports breaking with Turbopack (test early).

**Phase-specific warnings:** Foundation phase risks SEO redirect map not created, Tailwind v4 config errors, font loading issues. Content/MDX phase risks missing mdx-components.tsx, Turbopack compatibility, WordPress extraction underestimation. Animation phase risks Lenis/GSAP conflicts, performance degradation, cleanup failures, server component imports. HubSpot phase risks SPA tracking breaks, forms silently failing, API key exposure, RHF compatibility. Launch phase risks SEO collapse, staging indexing, image CWV issues, conversion failures.

## Implications for Roadmap

Based on dependency analysis across all research, the roadmap should follow this phase structure:

### Suggested Phases (4 phases recommended)

**PHASE 1: Foundation & Design System**
- **Rationale:** Everything depends on design tokens, component primitives, and GSAP registration. SEO groundwork must happen before first line of code.
- **Delivers:** Tailwind v4 config, typography scale, color system (orange primary per SaaS consistency), layout components (Container, Section, DiagonalSection), shadcn/ui initialization, GSAP plugin registration, Lenis setup, SEO redirect map created from WordPress crawl.
- **Features from FEATURES.md:** Responsive design foundation, professional typography, favicon/OG setup.
- **Pitfalls to avoid:** #1 (SEO redirect map must be created NOW, not during migration), #16 (Tailwind v4 CSS-first config), #18 (next/font setup with proper display strategies).
- **Standard patterns:** Design system is well-documented. Skip `/gsd:research-phase`.

**PHASE 2: Content Infrastructure (MDX + Migration)**
- **Rationale:** MDX must work before any content pages. WordPress migration is blocking for all existing content (case studies, insights). Underestimated complexity requires dedicated phase.
- **Delivers:** @next/mdx configuration, mdx-components.tsx, gray-matter frontmatter parsing, content loader utilities (lib/content.ts), WordPress/Elementor migration scripts, migrated case studies, migrated images to Vercel.
- **Features from FEATURES.md:** Case studies (table stakes), insights/blog foundation (SEO driver), MDX-powered content (differentiator).
- **Pitfalls to avoid:** #7 (budget 2-3x for Elementor extraction), #11 (create mdx-components.tsx immediately), #19 (test Turbopack compatibility early), #12 (dynamicParams = false).
- **Needs research:** YES. Run `/gsd:research-phase` on Elementor migration strategy (complex domain-specific task).

**PHASE 3: Core Pages & Lead Generation**
- **Rationale:** Homepage and service pages drive organic search. Contact form → HubSpot is the entire business purpose. Must work flawlessly before animations/polish.
- **Delivers:** Homepage (hero, services overview, featured case studies, CTAs), 5 service pages (static SSG), about/team page, contact form with shadcn/ui + RHF + Zod, Server Action → HubSpot contact creation, HubSpot tracking script, pathname-based SPA tracking component, SEO metadata (generateMetadata per page), structured data (LocalBusiness, Service schemas), sitemap.ts, robots.ts.
- **Features from FEATURES.md:** Service pages (table stakes), about/team (table stakes), contact form (table stakes), HubSpot CRM integration (differentiator), automated email follow-up setup (differentiator), SEO fundamentals (table stakes), HubSpot tracking (differentiator).
- **Pitfalls to avoid:** #2 (use useWatch with RHF, test React 19 thoroughly), #4 (implement pathname tracking), #5 (end-to-end CRM pipeline testing), #8 (design for conversion, not just aesthetics), #13 (never NEXT_PUBLIC_ the access token).
- **Standard patterns:** Forms + Server Actions, HubSpot API integration, SEO metadata are well-documented. Skip `/gsd:research-phase`.

**PHASE 4: Animation & Visual Polish**
- **Rationale:** Animations are enhancement, not structure. Come last to avoid blocking content/functionality. Highest complexity risk requires dedicated focus with performance testing.
- **Delivers:** AnimatedSection wrapper components, scroll-triggered fade-ups on all page sections, hero entrance animations with SplitText, floating geometric elements (SVG + GSAP), diagonal wipe transitions between sections, parallax layers, client logo bar with hover animations, smooth scroll via Lenis, performance optimization (only transform/opacity), CWV testing on real devices, prefers-reduced-motion fallbacks.
- **Features from FEATURES.md:** GSAP scroll-driven animations (differentiator), geometric overlay design language (differentiator), typography animations (differentiator), smooth scroll (differentiator), client logo bar (differentiator).
- **Pitfalls to avoid:** #3 (Lenis + ScrollTrigger integration), #6 (performance budget enforcement), #9 (useGSAP cleanup), #14 (all GSAP in 'use client' files), #15 (Lenis accessibility), #10 (image optimization for hero).
- **Needs research:** YES. Run `/gsd:research-phase` on scroll-driven animation performance (complex implementation risk, device-specific behavior).

### Post-Launch Backlog (Defer)

**Quick wins (1-2 weeks post-launch):**
- Consultation booking embed (Calendly or HubSpot Meetings)
- SMS integration via MessageMedia/Sakari + HubSpot workflows
- Dark mode (Tailwind dark: class strategy)
- Additional insights articles (2-3 migrated for launch, publish weekly after)

**Future enhancements (v2+):**
- Service area/location pages for local SEO
- Resource downloads (gated PDF guides)
- Service calculator/estimator
- Dynamic case study filtering with URL params
- Video testimonial embeds

### Research Flags

**Needs `/gsd:research-phase` during roadmap execution:**
- **Phase 2 (Content/MDX):** Elementor migration strategy—proprietary JSON structure, shortcode handling, custom post types. Complex, domain-specific, requires targeted research.
- **Phase 4 (Animation):** Scroll-driven animation performance patterns—GSAP ScrollTrigger on mobile devices, parallax without jank, CWV maintenance with heavy animations. Implementation-specific risks.

**Standard patterns (skip additional research):**
- Phase 1 (Foundation): Design systems, Tailwind config, shadcn/ui setup are well-documented.
- Phase 3 (Pages/Lead Gen): Next.js SSG, Server Actions, HubSpot API, SEO metadata are well-documented.

### Dependency Visualization

```
Phase 1: Foundation & Design System
  └── Tailwind v4 config, tokens, GSAP/Lenis setup
      ├── Phase 2: Content Infrastructure (MDX)
      │   └── WordPress migration, case studies, insights
      │       └── Phase 3: Core Pages & Lead Generation
      │           └── Homepage, services, contact → HubSpot, SEO
      │               └── Phase 4: Animation & Visual Polish
      │                   └── ScrollTrigger, SplitText, floating elements
      └── (Phase 2 and 3 have some parallelization potential after Phase 1 complete)
```

**Critical path:** Phase 1 → Phase 2 (blocking: need MDX for case studies) → Phase 3 (partially parallel with late Phase 2: service pages don't need migrated content) → Phase 4 (pure enhancement).

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | Official Next.js patterns (@next/mdx, Metadata API, Server Actions), battle-tested libraries (GSAP 3.14 stable, Tailwind v4 stable, shadcn/ui mature), HubSpot API well-documented. All choices have clear rationale from primary sources (Next.js docs, GSAP docs, HubSpot developer docs). |
| Features | **MEDIUM** | Table stakes are clear from competitor analysis and B2B consultancy best practices. Differentiators are well-defined (GSAP animations, HubSpot integration). Uncertainty remains around animation scope—"high-performance minimalist" could mean anything from subtle fade-ins to complex parallax choreography. Client expectations need validation. |
| Architecture | **HIGH** | Static-first SSG is the proven pattern for marketing sites. Server/client component boundaries are clear. MDX dynamic imports, Server Actions for forms, and GSAP integration patterns are documented in official sources. Directory structure follows Next.js conventions. |
| Pitfalls | **HIGH** | Critical pitfalls (#1-5) are well-documented from primary sources (HubSpot community threads, React Hook Form GitHub discussions, GSAP/Lenis integration guides, WordPress migration case studies). Moderate/minor pitfalls are based on Next.js/React 19 release notes and common migration issues. Phase-specific warnings map directly to dependency analysis. |

**Overall confidence: HIGH** — Technology stack is stable and well-documented. Architecture patterns are proven. Critical risks are identified with clear mitigation strategies.

## Gaps to Address

**Content scope uncertainty:** WordPress site has unknown number of pages, posts, custom post types, and media assets. Need content audit BEFORE Phase 2 estimation. Research provides Elementor migration strategy but not content volume.

**Animation complexity definition:** "High-performance minimalist" with "diagonal layouts, floating elements, geometric overlays, motion-inspired imagery" is directionally clear but lacks specifics. How many animated elements per page? How aggressive are parallax effects? This affects Phase 4 timeline and performance feasibility. Recommend creating animation style guide during Phase 1 with 2-3 reference examples (approved prototypes) before committing to full implementation in Phase 4.

**HubSpot workflow configuration:** Research covers CRM contact creation via API but not email/SMS automation workflow setup. These are configured in HubSpot admin (not code), but someone needs HubSpot expertise. If client expects turnkey automation, this is out of scope for website development and should be flagged.

**Conversion optimization strategy:** Research identifies risk of minimalist design failing to convert (#8) but doesn't provide quantitative conversion benchmarks or A/B testing plan. Recommend defining success metrics (form submission rate, consultation booking rate) and conversion tracking (Google Analytics 4 + HubSpot attribution) during Phase 3.

**Mobile device testing capacity:** Performance pitfall (#6) requires testing on real mid-range Android devices, not just DevTools throttling. Ensure project has access to physical test devices (Samsung Galaxy A-series or equivalent) or BrowserStack/LambdaTest budget.

**WordPress admin access:** Content migration (Phase 2) requires direct database access or WordPress admin export capabilities. Confirm access before Phase 2 starts to avoid blockers.

## Sources

**Aggregated from research files:**

- Next.js MDX Guide (official, verified Feb 2026): https://nextjs.org/docs/app/guides/mdx
- Next.js 16 Release Blog: https://nextjs.org/blog/next-16
- Next.js 16.1 Release Blog: https://nextjs.org/blog/next-16-1
- Next.js App Router Architecture: https://nextjs.org/docs/app
- Next.js Forms Guide: https://nextjs.org/docs/app/guides/forms
- Next.js JSON-LD Guide: https://nextjs.org/docs/app/guides/json-ld
- Next.js Image Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/images
- GSAP Free License Announcement: https://gsap.com/pricing/
- GSAP React Integration: https://gsap.com/resources/React/
- GSAP ScrollTrigger Docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP Scroll Showcase: https://gsap.com/scroll/
- GSAP React Best Practices: https://gsap.com/resources/React/
- GSAP + Lenis Integration: https://zuncreative.com/en/blog/smooth_scroll_meditation/
- Lenis Smooth Scroll: https://lenis.darkroom.engineering/
- Motion (Framer Motion) v12 Changelog: https://motion.dev/changelog
- Tailwind CSS v4 Release: https://tailwindcss.com/blog/tailwindcss-v4
- Tailwind CSS v4 Migration: https://tailwindcss.com/blog/tailwindcss-v4
- shadcn/ui Tailwind v4 Support: https://ui.shadcn.com/docs/tailwind-v4
- @hubspot/api-client npm: https://www.npmjs.com/package/@hubspot/api-client
- HubSpot API Client Libraries: https://developers.hubspot.com/docs/api/client-libraries
- HubSpot Forms API: https://developers.hubspot.com/docs/api/client-libraries
- HubSpot Forms in Next.js (2025 Guide): https://mahmoodchowdhury.com/blog/integrating-hubspot-forms-into-your-next-js-application/
- HubSpot Community - Next.js Tracking Code: https://community.hubspot.com/t5/APIs-Integrations/Next-js-tracking-code-installation/m-p/753441
- HubSpot CORS/AJAX Support (Legacy Docs): https://legacydocs.hubspot.com/docs/faq/do-hubspot-apis-support-ajax-request
- React Hook Form React 19 Discussion: https://github.com/orgs/react-hook-form/discussions/11832
- React Hook Form Hidden Compatibility Issue: https://www.buildwithmatija.com/blog/the-invisible-form-bug-react-19-react-hook-form-s-hidden-compatibility-issue
- next-mdx-remote v6 npm: https://www.npmjs.com/package/next-mdx-remote
- Velite docs: https://velite.js.org/guide/with-nextjs
- Zod v4 Release Notes: https://zod.dev/v4
- schema-dts npm: https://www.npmjs.com/package/schema-dts
- next-sitemap npm (stale): https://www.npmjs.com/package/next-sitemap
- Vercel Deployment: https://vercel.com/docs/frameworks/full-stack/nextjs
- Consulting Success - Client-Generating Website: https://www.consultingsuccess.com/consulting-website
- B2B Conversion Rate Optimization: https://directiveconsulting.com/blog/blog-b2b-conversion-rate-optimization-guide/
- WordPress to Next.js Migration: https://www.programmiert.at/en/blog/wordpress-to-nextjs-migration-guide
- Site Migration SEO Checklist: https://webifytech.netlify.app/resources/site-migration-seo-checklist-2025
- Chrome Non-Composited Animations: https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations

---

**Research synthesis complete.** Ready for roadmap creation with clear phase structure, dependency mapping, and risk mitigation strategies.
