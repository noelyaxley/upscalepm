# Technology Stack

**Project:** UpScalePM Consultancy Website
**Researched:** 2026-02-14

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | 16.1.6 | Full-stack React framework | Stable release with Turbopack default, React Compiler stable, layout deduplication. Vercel-native for zero-config deployment. Already used in the SaaS product -- consistency across UpScale projects. | HIGH |
| React | 19.x | UI library | Ships with Next.js 16. Server Components for SEO-critical pages, use cache for performance. | HIGH |
| TypeScript | 5.x | Type safety | Non-negotiable for any production project. Next.js 16 has first-class TS support. | HIGH |
| Tailwind CSS | 4.x | Utility-first CSS | CSS-first config, 5x faster builds, cascade layers. Already used in SaaS product. v4 is stable since Jan 2025. | HIGH |

### Content Management (MDX)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @next/mdx | latest (matches Next.js 16) | MDX compilation | Official Next.js MDX plugin. Handles local .mdx files as pages/imports. Turbopack compatible. Recommended by Next.js official docs (verified Feb 2026). | HIGH |
| @mdx-js/loader | latest | Webpack/Turbopack loader | Required peer dependency for @next/mdx. | HIGH |
| @mdx-js/react | latest | MDX React provider | Required for custom component mapping via mdx-components.tsx. | HIGH |
| gray-matter | ^4.0 | Frontmatter parsing | Parse YAML frontmatter from MDX files for metadata (title, date, author, category). Lightweight, well-maintained. | HIGH |
| remark-gfm | latest | GitHub Flavored Markdown | Tables, task lists, strikethrough in case studies/insights. | MEDIUM |
| rehype-pretty-code | latest | Syntax highlighting | Shiki-powered, works at build time. Only needed if technical content includes code blocks. | LOW |
| @tailwindcss/typography | latest | Prose styling | `prose` classes for beautiful MDX content rendering. Essential for case studies and insights articles. | HIGH |

**MDX Architecture Decision:** Use `@next/mdx` with local files and dynamic imports, NOT `next-mdx-remote` or `velite`.

**Rationale:**
- `next-mdx-remote` v6.0.0 just released with breaking security changes (blockJS: true default). v5.0.0 had reported RSC issues with Next.js 15.2+. Adds unnecessary complexity for content that lives in the repo.
- `velite` is still v0.3.1 (pre-1.0), has Turbopack compatibility issues, and is overkill for a consultancy site with ~20-50 content pages.
- `contentlayer` / `contentlayer2` is effectively abandoned. The community fork has compatibility concerns.
- `@next/mdx` is the official, stable, Turbopack-compatible approach. For a consultancy site where content is authored by the team (not user-generated), local MDX files with `generateStaticParams` and dynamic imports is the simplest and most maintainable pattern.

### Animation / Motion

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| GSAP | 3.14.2 | Primary animation engine | Now 100% FREE (including ALL plugins) since Webflow acquisition. ScrollTrigger for scroll-driven diagonal layouts, parallax floating elements, geometric overlays. SplitText for typography animations. Superior performance for complex timelines. GPU-accelerated transforms. | HIGH |
| @gsap/react | 2.1.2 | React integration | Official `useGSAP()` hook -- drop-in replacement for useEffect with automatic cleanup via gsap.context(). Required for App Router client components. | HIGH |
| Lenis | latest | Smooth scroll | Lightweight (~2KB gzipped), pairs perfectly with GSAP ScrollTrigger. Provides the butter-smooth scroll feel that "high-performance minimalist" design demands. Open-source, actively maintained by darkroom.engineering. | MEDIUM |

**Animation Architecture Decision:** Use GSAP as the primary engine, NOT Motion (formerly Framer Motion).

**Rationale:**
- The design brief calls for "diagonal layouts, floating elements, geometric overlays, motion-inspired imagery" -- these are complex, timeline-based, scroll-driven animations. This is exactly GSAP's wheelhouse.
- GSAP ScrollTrigger provides scrub-linked animations (parallax tied to scroll position), pinning sections, and diagonal wipe transitions -- all critical for the design language.
- GSAP SplitText (now free) enables the character/word-level typography animations that premium consultancy sites use.
- Motion (Framer Motion) v12 is excellent for UI state transitions (hover, enter/exit, layout animations) but is less suited for complex scroll-driven choreography across multiple elements.
- GSAP's bundle (~23KB core + plugins as needed) is comparable to Motion (~32KB), and GSAP's runtime performance is superior for complex simultaneous tweens.
- GSAP is now fully free for commercial use (license change May 2025). The only restriction is building visual animation builder tools that compete with Webflow -- not applicable here.

**Where to use Motion (if needed):** You do NOT need Motion for this project. GSAP handles everything. If you later want simple hover/tap micro-interactions, CSS transitions with Tailwind are sufficient. Adding Motion would be redundant bundle weight.

### HubSpot Integration

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @hubspot/api-client | 13.4.0 | Server-side CRM API | Official HubSpot Node.js SDK for form submissions to CRM, contact creation, deal pipeline. Use in Next.js API routes / Server Actions. | HIGH |
| next/script | (built-in) | HubSpot tracking code | Load HubSpot analytics tracking via Next.js Script component in root layout. afterInteractive strategy for performance. | HIGH |

**HubSpot Integration Decision:** Custom implementation with @hubspot/api-client, NOT next-hubspot package or HubSpot embed forms.

**Rationale:**
- `next-hubspot` npm package is not compatible with React 19 without --legacy-peer-deps. It is a thin wrapper that just loads HubSpot's form embed script -- adds a dependency for something trivially done with next/script.
- HubSpot embedded forms inject their own styles and DOM, breaking the "ultra-clean minimalist" design. They are iframes or injected HTML that cannot be styled to match your design system.
- Instead: Build forms with shadcn/ui components + React Hook Form + Zod validation, then submit to HubSpot via @hubspot/api-client in a Server Action. This gives full design control while still flowing leads into HubSpot CRM.
- HubSpot tracking code: Load via `<Script>` component in layout.tsx with `strategy="afterInteractive"`. Track page views on route changes via usePathname() in a client component.

### Form Handling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| React Hook Form | 7.71.x | Client-side form management | Industry standard for React forms. Use `useWatch` instead of `watch` for React 19 compatibility. Handles validation UX, field state, error display. | MEDIUM |
| Zod | 4.3.x | Schema validation | Shared client/server validation schemas. v4 is 14x faster string parsing, 57% smaller bundle than v3. @zod/mini available at ~1.9KB for lighter pages. | HIGH |
| Server Actions | (built-in) | Form submission | Next.js native. Submit form data to server, validate with Zod, forward to HubSpot API. No API route files needed. | HIGH |

**Form Handling Note:** React Hook Form 7.x has known quirks with React 19 -- the `watch` method does not reliably trigger re-renders. Use `useWatch` hook instead. The React Compiler (stable in Next.js 16) may cause unexpected full form re-renders. Test thoroughly. For simple contact forms, consider using React 19's `useActionState` directly without React Hook Form to avoid these issues entirely.

### UI Components

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| shadcn/ui | latest | Component library | Copy-paste components, full design control. Already used in SaaS product. Tailwind v4 + React 19 compatible. "new-york" style consistent with existing project. | HIGH |
| clsx | latest | Conditional classes | Used in cn() utility with tailwind-merge. | HIGH |
| tailwind-merge | latest | Class deduplication | Prevents Tailwind class conflicts in component composition. | HIGH |
| lucide-react | latest | Icons | Default shadcn/ui icon set. Clean, consistent, MIT licensed. | HIGH |

### SEO

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js Metadata API | (built-in) | Meta tags, OG images | Export `metadata` or `generateMetadata` from pages/layouts. Title templates, OpenGraph, Twitter cards. No third-party package needed. | HIGH |
| Next.js sitemap.xml | (built-in) | Sitemap generation | Use `app/sitemap.ts` file convention to generate sitemaps. No need for `next-sitemap` package (last updated 2 years ago, v4.2.3). | HIGH |
| Next.js robots.txt | (built-in) | Search engine directives | Use `app/robots.ts` file convention. | HIGH |
| schema-dts | latest | JSON-LD types | Google's TypeScript types for Schema.org structured data. Type-safe JSON-LD for LocalBusiness, Service, Article, FAQPage schemas. | MEDIUM |

**SEO Decision:** Use ALL built-in Next.js capabilities. Do NOT install `next-seo` or `next-sitemap` -- they are legacy packages for Pages Router that duplicate what App Router provides natively.

### Image Optimization

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| next/image | (built-in) | Image optimization | Automatic WebP/AVIF, lazy loading, responsive sizing, CLS prevention. | HIGH |
| sharp | latest | Production image processing | Strongly recommended by Next.js for production. Much faster than default squoosh. Vercel handles this automatically on their platform. | HIGH |

### Deployment / Infrastructure

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vercel | - | Hosting platform | Zero-config Next.js deployment. Edge network, automatic HTTPS, preview deployments, analytics. Custom domain upscalepm.com.au via DNS config. | HIGH |
| Vercel Analytics | - | Performance monitoring | Real User Monitoring, Core Web Vitals, LCP breakdown. Built into Vercel dashboard. | MEDIUM |
| Vercel Speed Insights | - | Performance tracking | Complements Analytics with page-level performance data. | MEDIUM |

### Dev Tooling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| ESLint | 9.x | Linting | Next.js 16 ships with flat config. | HIGH |
| Prettier | latest | Formatting | Consistent code style. | HIGH |
| prettier-plugin-tailwindcss | latest | Tailwind class sorting | Automatic class ordering in templates. | HIGH |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| MDX | @next/mdx (local files) | next-mdx-remote v6 | RSC issues reported with Next.js 15.2+, v6 just released with breaking changes, unnecessary for local content |
| MDX | @next/mdx (local files) | velite v0.3.1 | Pre-1.0, Turbopack incompatible, overkill for ~30 content pages |
| MDX | @next/mdx (local files) | contentlayer2 | Abandoned upstream, community fork maintenance uncertain |
| Animation | GSAP 3.14 | Motion (Framer Motion) v12 | Not ideal for complex scroll-driven timelines, diagonal layouts. GSAP ScrollTrigger + SplitText are purpose-built for this |
| Animation | GSAP 3.14 | CSS-only (Tailwind) | Insufficient for parallax, scroll-linked animations, floating elements. Fine for simple hovers |
| Smooth scroll | Lenis | GSAP ScrollSmoother | ScrollSmoother is heavier and overlaps with Lenis+ScrollTrigger combo |
| HubSpot forms | Custom + @hubspot/api-client | next-hubspot embed | React 19 incompatible, embedded forms break design control |
| HubSpot forms | Custom + @hubspot/api-client | HubSpot iframe embed | Zero design control, breaks minimalist aesthetic |
| Forms | React Hook Form + Zod | useActionState only | RHF provides better UX for multi-field forms with instant validation feedback |
| SEO sitemap | Built-in app/sitemap.ts | next-sitemap v4.2.3 | Last updated 2 years ago, unnecessary with App Router |
| UI | shadcn/ui | Material UI, Chakra | shadcn gives full design control (copy-paste), already used in SaaS product |
| Icons | lucide-react | heroicons, phosphor | Default shadcn set, consistent ecosystem |
| Hosting | Vercel | Cloudflare Pages, AWS | Vercel is purpose-built for Next.js, zero-config, best DX |

## Installation

```bash
# Initialize Next.js 16 project
npx create-next-app@latest upscalepm --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Core MDX
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx

# MDX plugins
npm install gray-matter remark-gfm

# Typography for MDX content
npm install @tailwindcss/typography

# Animation
npm install gsap @gsap/react lenis

# HubSpot
npm install @hubspot/api-client

# Forms & validation
npm install react-hook-form zod @hookform/resolvers

# UI components (via shadcn CLI)
npx shadcn@latest init

# SEO structured data
npm install schema-dts

# Image optimization (production)
npm install sharp

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

## Version Pinning Strategy

Pin major versions in package.json to avoid breaking changes:
- Next.js: `^16.1.6` (stay on 16.x)
- GSAP: `^3.14.2` (stay on 3.x)
- Zod: `^4.3.0` (stay on 4.x, significant API changes from v3)
- React Hook Form: `^7.71.0` (stay on 7.x)

## Key Configuration Notes

### Next.js Config (next.config.mjs)
```javascript
import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

### MDX Components (mdx-components.tsx)
Required at project root. Map MDX elements to custom components (e.g., next/image for images, custom heading components with anchor links).

### HubSpot Tracking (layout.tsx)
```typescript
import Script from 'next/script'

// In root layout:
<Script
  id="hubspot-tracking"
  src={`//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
  strategy="afterInteractive"
/>
```

### GSAP Registration (client component)
```typescript
'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)
```

## Sources

- [Next.js MDX Guide (official, verified Feb 2026)](https://nextjs.org/docs/app/guides/mdx)
- [Next.js 16 Release Blog](https://nextjs.org/blog/next-16)
- [Next.js 16.1 Release Blog](https://nextjs.org/blog/next-16-1)
- [GSAP Free License Announcement](https://gsap.com/pricing/)
- [GSAP React Integration](https://gsap.com/resources/React/)
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Motion (Framer Motion) v12 Changelog](https://motion.dev/changelog)
- [Tailwind CSS v4 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [shadcn/ui Tailwind v4 Support](https://ui.shadcn.com/docs/tailwind-v4)
- [@hubspot/api-client npm](https://www.npmjs.com/package/@hubspot/api-client)
- [next-mdx-remote v6 npm](https://www.npmjs.com/package/next-mdx-remote)
- [Velite docs](https://velite.js.org/guide/with-nextjs)
- [Zod v4 Release Notes](https://zod.dev/v4)
- [React Hook Form React 19 Discussion](https://github.com/orgs/react-hook-form/discussions/11832)
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld)
- [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- [next-sitemap npm (stale)](https://www.npmjs.com/package/next-sitemap)
- [schema-dts npm](https://www.npmjs.com/package/schema-dts)
