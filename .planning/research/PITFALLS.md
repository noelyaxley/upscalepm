# Domain Pitfalls

**Domain:** Consultancy website rebuild (WordPress/Elementor to Next.js)
**Project:** UpScalePM -- property/construction project management consultancy
**Researched:** 2026-02-14

## Critical Pitfalls

Mistakes that cause ranking loss, lead generation failure, or major rework.

### Pitfall 1: SEO Ranking Collapse During Platform Migration

**What goes wrong:** Migrating from WordPress to Next.js changes URL structures, destroys existing meta tags, drops structured data, and breaks internal links. Google needs to recrawl the entire site. Even well-executed migrations see 2-6 weeks of ranking fluctuation. Poorly executed ones lose 30%+ organic traffic for months.

**Why it happens:** WordPress with Yoast/RankMath generates structured data, canonical URLs, meta descriptions, OG tags, and sitemaps automatically via plugins. When you move to Next.js, every one of these must be manually rebuilt. Elementor pages also have non-semantic HTML -- heading hierarchy (H1/H2/H3) often gets flattened.

**Consequences:**
- Loss of organic traffic (primary lead generation channel)
- Broken backlinks from external sites pointing to old URLs
- Recovery takes 4-12 weeks, up to 6 months for severe cases
- Direct revenue impact

**Prevention:**
1. Crawl existing WordPress site (Screaming Frog / Ahrefs) BEFORE touching code. Export every URL, meta title, meta description, canonical URL, structured data.
2. Create complete 301 redirect map covering every old URL to its new equivalent in `next.config.mjs` or `vercel.json`.
3. Preserve URL structures where possible. Safest migration = URLs do not change.
4. Rebuild all structured data using Next.js Metadata API: Article schema for posts, LocalBusiness for company, BreadcrumbList for navigation.
5. Submit new sitemap to Google Search Console immediately after launch.
6. Run pre-launch SEO audit comparing old crawl export against new site page-by-page.

**Detection:** No redirect map exists before development starts. URL structures being "cleaned up" without documentation.

### Pitfall 2: React Hook Form + React 19 Incompatibility

**What goes wrong:** The `watch()` method does not reliably trigger re-renders in React 19. The React Compiler (stable in Next.js 16) can cause unexpected full-form re-renders instead of isolated field re-renders.

**Why it happens:** React 19 changed the rendering model. RHF v7 was designed for React 18. The RHF team is working on fixes but they are not yet released.

**Consequences:** Forms appear to work in development but have subtle bugs -- fields don't update, validation messages don't appear, or entire forms re-render on every keystroke.

**Prevention:** Use `useWatch()` hook instead of `watch()`. For simple contact forms (4-5 fields), consider React 19's native `useActionState` + Zod directly, bypassing RHF entirely. Test forms with React Compiler enabled.

**Detection:** Fields not updating when dependent fields change. Console warnings about re-renders.

### Pitfall 3: GSAP ScrollTrigger + Lenis Scroll Conflict

**What goes wrong:** Lenis overrides native scroll behavior. ScrollTrigger relies on native scroll events. If not properly integrated, ScrollTrigger animations either don't fire, fire at wrong positions, or "jump" instead of smooth-scrubbing.

**Why it happens:** Two libraries both manipulating scroll behavior without awareness of each other.

**Consequences:** Animations broken, janky scroll, elements stuck in wrong positions.

**Prevention:** Initialize Lenis BEFORE registering ScrollTrigger. Connect them explicitly:
```typescript
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

**Detection:** Scroll animations not triggering, or triggering at wrong scroll positions.

### Pitfall 4: HubSpot Tracking Breaks in SPA Navigation

**What goes wrong:** HubSpot's tracking script fires once on initial page load. In Next.js App Router, subsequent navigations are client-side (no full page reload), so HubSpot records every visitor as viewing exactly one page with 100% bounce rate. Contact attribution breaks.

**Why it happens:** HubSpot's tracking code was designed for traditional multi-page sites. It does not detect React Router or Next.js route changes.

**Consequences:** Analytics show wildly inaccurate data. Lead source attribution breaks. Marketing loses visibility into content performance.

**Prevention:** Create a HubSpot tracking component using `usePathname()` from `next/navigation`. On every route change, push `['setPath', newPath]` and `['trackPageView']` to `window._hsq`. Validate in staging: navigate through 5+ pages, confirm each recorded in HubSpot analytics.

**Detection:** HubSpot analytics show 100% bounce rate or only homepage views.

### Pitfall 5: Form-to-CRM Pipeline Silently Fails

**What goes wrong:** Custom forms submit to HubSpot but submissions silently fail or create incomplete contacts. Common failures: CORS errors from browser-side API calls, field name mismatches, missing required fields causing 400 errors that the UI swallows, API key exposure.

**Why it happens:** HubSpot APIs do not support CORS from browsers. Developers try to call `api.hubapi.com` directly from client code. Field `name` attributes must exactly match HubSpot internal names (`firstname` not `first_name`).

**Consequences:** Leads permanently lost. API keys exposed. Workflows don't trigger.

**Prevention:**
1. ALWAYS proxy through Server Actions. Never call HubSpot from browser.
2. Map every form field to exact HubSpot internal names before building the form.
3. Implement submission monitoring with alerts on error rate > 0%.
4. Test full pipeline: submit form -> verify contact in HubSpot -> verify workflow triggers.
5. Add client-side error handling with fallback ("Call us at [number]").

**Detection:** Form calls HubSpot API from client-side `fetch()`. No error handling on submissions.

## Moderate Pitfalls

### Pitfall 6: Animation-Driven Performance Degradation

**What goes wrong:** Diagonal layouts, floating elements, parallax, and entrance animations crush Core Web Vitals: LCP > 4s on mobile, CLS spikes from animated layout shifts, TBT increases from JS animation overhead. Google penalizes in mobile rankings.

**Why it happens:** Animations trigger layout recalculations (animating width, height, top, left) instead of GPU-composited properties (transform, opacity). GSAP ScrollTrigger instances leak memory on App Router page transitions. Developers test only on desktop.

**Prevention:**
1. Performance budget: LCP < 2.5s, CLS < 0.1. Test every animation against this.
2. Only animate `transform` and `opacity` -- GPU-composited, no layout recalc.
3. Use `useGSAP()` hook for automatic cleanup on unmount.
4. Call `ScrollTrigger.refresh()` after dynamic content loads.
5. Reserve heavy animations for above-the-fold hero only. Below-fold: simple fade-ins.
6. Test on real mid-range Android device, not just Chrome DevTools throttling.

**Detection:** No performance testing during animation development. "It looks fine on my MacBook Pro" is the only QA.

### Pitfall 7: WordPress/Elementor Content Extraction Underestimated

**What goes wrong:** Team assumes WordPress content is "just HTML" exportable via REST API. In reality, Elementor stores content in proprietary JSON in `_elementor_data` postmeta, not `post_content`. Shortcodes, widgets, forms, and custom post types each need individual migration strategies. Takes 3x longer than estimated.

**Prevention:**
1. Audit content before estimating: how many pages, which use Elementor vs classic editor?
2. Write migration script parsing Elementor's JSON, not WordPress REST API.
3. Budget 2-3x initial estimate for content migration.
4. Migrate images to Vercel/CDN with consistent naming. Don't hotlink old WordPress URLs.

**Detection:** Migration estimate is "a few days". No one has examined Elementor data structure.

### Pitfall 8: "Minimalist" Design That Fails to Convert

**What goes wrong:** Site looks beautiful -- clean typography, dramatic whitespace -- but conversion rate drops. The minimalist aesthetic removes trust signals and conversion elements that construction/property clients respond to: case study proof, client logos, specific outcome metrics, prominent CTAs.

**Why it happens:** Minimalist design from SaaS/agency sites doesn't directly translate to B2B professional services in construction. This audience needs proof of competence, specificity ("$45M Riverside precinct"), and multiple trust touchpoints.

**Prevention:**
1. Design for conversion funnel, not portfolio. Every page needs a clear next step.
2. Include trust signals on every major page: client logos, project counts, outcome metrics.
3. Case studies are the #1 conversion asset. Must be prominent and detailed.
4. Lead with client's problem ("Your $20M development at risk"), not credentials ("25 years experience").
5. Multiple conversion tiers: download guide (low), subscribe (medium), book consultation (high).

**Detection:** Homepage hero has no specific value proposition. Case studies buried behind 3+ clicks. Only one CTA type (contact form).

### Pitfall 9: GSAP Animations Not Cleaning Up on Route Change

**What goes wrong:** ScrollTrigger instances persist across route changes, causing memory leaks and ghost animations on wrong pages.

**Why it happens:** App Router reuses layout components. Client components may not unmount when navigating between pages in the same layout.

**Prevention:** Always use `useGSAP()` from @gsap/react (auto-cleanup). Never create ScrollTrigger instances outside of useGSAP scope.

**Detection:** Navigate between 3-4 pages and back. Check if animations replay correctly. Monitor memory usage.

### Pitfall 10: Image Pipeline Misconfigured for Visual-Heavy Design

**What goes wrong:** Hero images load at 2-4MB, LCP > 4s on mobile. Decorative SVGs inlined as massive strings. CSS background images bypass Next.js optimization.

**Prevention:**
1. Use `next/image` for every raster image with explicit width, height, sizes.
2. `priority` prop on hero/LCP image only.
3. Configure AVIF format in next.config (50% better compression than WebP for photos).
4. Lazy-load all below-fold images (next/image default).
5. Use CSS clip-path and gradients instead of image files for geometric overlays.

**Detection:** Raw `<img>` tags in codebase. Hero images without `priority`. No `sizes` attribute.

## Minor Pitfalls

### Pitfall 11: Missing mdx-components.tsx File
**What goes wrong:** @next/mdx silently fails or throws cryptic errors without this file at project root.
**Prevention:** Create immediately during MDX setup. Must export `useMDXComponents`.

### Pitfall 12: Forgetting dynamicParams = false
**What goes wrong:** MDX pages 404 in production because dynamic routes try to render at request time.
**Prevention:** Set `export const dynamicParams = false` on all MDX content pages using generateStaticParams.

### Pitfall 13: HubSpot API Key in Client Bundle
**What goes wrong:** HUBSPOT_ACCESS_TOKEN prefixed with NEXT_PUBLIC_ and leaked to browser.
**Prevention:** Only NEXT_PUBLIC_HUBSPOT_PORTAL_ID (for tracking) should be public. Access token used only in Server Actions.

### Pitfall 14: GSAP Import Errors in Server Components
**What goes wrong:** Importing GSAP in a Server Component causes "window is not defined".
**Prevention:** All GSAP imports in files with `'use client'` directive. Create dedicated animation wrapper components.

### Pitfall 15: Lenis Accessibility Concerns
**What goes wrong:** Lenis smooth scroll interferes with keyboard navigation, screen readers, prefers-reduced-motion.
**Prevention:** Disable Lenis when `prefers-reduced-motion: reduce` detected. Test keyboard nav (Tab, arrows, Page Up/Down). Ensure anchor links work.

### Pitfall 16: Tailwind v4 Breaking Changes from v3
**What goes wrong:** Copying Tailwind v3 patterns from Stack Overflow. `tailwind.config.js` theme extensions and `@apply` in certain contexts changed.
**Prevention:** Tailwind v4 uses CSS-first config. Use `@import "tailwindcss"` not `@tailwind base/components/utilities`.

### Pitfall 17: Staging Site Indexed by Google
**What goes wrong:** Vercel preview URL gets indexed. Production launches without robots.txt.
**Prevention:** Add `X-Robots-Tag: noindex` to preview deployments. Generate robots.ts dynamically. Set canonical URLs to production domain.

### Pitfall 18: Font Loading FOUT/FOIT
**What goes wrong:** Custom fonts cause Flash of Unstyled/Invisible Text, jarring on typography-heavy design.
**Prevention:** Use `next/font` with `font-display: swap` for body, `optional` for decorative. Preload primary weight.

### Pitfall 19: MDX Dynamic Imports Breaking with Turbopack
**What goes wrong:** Dynamic `import()` for MDX files may behave differently with Turbopack (default in Next.js 16).
**Prevention:** Test with `next dev --turbopack` early. Configure remark/rehype plugins using string-based config (Turbopack compatible).

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Foundation & Design System | SEO redirect map not created (#1) | Crawl old site first, create map before code |
| Foundation & Design System | Tailwind v4 breaking changes (#16) | Use CSS-first config, check migration guide |
| Foundation & Design System | Font loading FOUT (#18) | next/font with appropriate display strategies |
| Content System (MDX) | Missing mdx-components.tsx (#11) | Create file immediately |
| Content System (MDX) | Turbopack + MDX imports (#19) | Test early with --turbopack |
| Content System (MDX) | WordPress extraction underestimated (#7) | Audit content, budget 2-3x |
| Animation & Visual Polish | Lenis + ScrollTrigger conflict (#3) | Initialize Lenis first, connect explicitly |
| Animation & Visual Polish | Performance degradation (#6) | Only transform/opacity, performance budget |
| Animation & Visual Polish | GSAP cleanup on nav (#9) | Always use useGSAP() hook |
| Animation & Visual Polish | GSAP in server components (#14) | All GSAP in 'use client' files |
| Lead Generation & HubSpot | Tracking breaks in SPA (#4) | usePathname() tracking component |
| Lead Generation & HubSpot | Forms silently fail (#5) | Server Actions only, end-to-end CRM test |
| Lead Generation & HubSpot | API key exposure (#13) | No NEXT_PUBLIC_ on access tokens |
| Lead Generation & HubSpot | React Hook Form + React 19 (#2) | useWatch, test thoroughly, consider useActionState |
| SEO & Launch | SEO ranking collapse (#1) | Redirect map, metadata audit, sitemap submit |
| SEO & Launch | Staging indexed (#17) | noindex headers on preview deploys |
| SEO & Launch | Images kill CWV (#10) | next/image everywhere, priority on hero |
| SEO & Launch | Design fails to convert (#8) | Trust signals, multiple CTA types, case studies prominent |

## Sources

- [HubSpot Community - Next.js Tracking Code](https://community.hubspot.com/t5/APIs-Integrations/Next-js-tracking-code-installation/m-p/753441)
- [HubSpot - CORS/AJAX Support (Legacy Docs)](https://legacydocs.hubspot.com/docs/faq/do-hubspot-apis-support-ajax-request)
- [React Hook Form - React 19 Discussion](https://github.com/orgs/react-hook-form/discussions/11832)
- [React Hook Form - Hidden Compatibility Issue](https://www.buildwithmatija.com/blog/the-invisible-form-bug-react-19-react-hook-form-s-hidden-compatibility-issue)
- [GSAP React Best Practices](https://gsap.com/resources/React/)
- [GSAP + Lenis Integration](https://zuncreative.com/en/blog/smooth_scroll_meditation/)
- [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx)
- [Tailwind CSS v4 Migration](https://tailwindcss.com/blog/tailwindcss-v4)
- [WordPress to Next.js Migration](https://www.programmiert.at/en/blog/wordpress-to-nextjs-migration-guide)
- [Site Migration SEO Checklist](https://webifytech.netlify.app/resources/site-migration-seo-checklist-2025)
- [Chrome - Non-Composited Animations](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Consulting Success - Client-Generating Website](https://www.consultingsuccess.com/consulting-website)
