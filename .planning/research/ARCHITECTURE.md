# Architecture Patterns

**Domain:** Professional services consultancy website
**Researched:** 2026-02-14

## Recommended Architecture

Static-first marketing site with client-side GSAP animations and server-side form processing.

```
                    +------------------+
                    |     Vercel       |
                    |  (Edge Network)  |
                    +--------+---------+
                             |
                    +--------+---------+
                    |   Next.js 16     |
                    |   App Router     |
                    +--------+---------+
                             |
          +------------------+------------------+
          |                  |                  |
    +-----+------+   +------+------+   +-------+------+
    | Static     |   | Client      |   | Server       |
    | Pages      |   | Components  |   | Actions      |
    | (SSG/MDX)  |   | (GSAP anim) |   | (HubSpot)    |
    +-----+------+   +------+------+   +-------+------+
          |                  |                  |
    +-----+------+   +------+------+   +-------+------+
    | MDX Files  |   | GSAP +      |   | @hubspot/    |
    | (content/) |   | ScrollTrig  |   | api-client   |
    +------------+   | + Lenis     |   +--------------+
                     +-------------+
```

### Rendering Strategy

| Page Type | Rendering | Why |
|-----------|-----------|-----|
| Home | SSG (Static) | Content rarely changes. Fastest possible load. |
| Service pages | SSG (Static) | Static content. Rebuild on deploy. |
| Case studies | SSG (Static) | MDX compiled at build time. generateStaticParams for routes. |
| Insights/blog | SSG (Static) | Same as case studies. New articles = new deploy. |
| About | SSG (Static) | Rarely changes. |
| Contact | SSG + Server Action | Page is static, form submission is server-side. |

Everything is statically generated at build time. No SSR, no ISR needed. Content changes trigger a new Vercel deployment via git push. This is the fastest possible architecture for a marketing site.

## Component Boundaries

| Component | Responsibility | Communicates With | Server/Client |
|-----------|---------------|-------------------|---------------|
| Root Layout | HTML structure, fonts, HubSpot tracking script | All pages | Server |
| Navigation (Header) | Site nav, mobile menu, scroll-aware header | Root Layout | Client (scroll detection) |
| Footer | Site footer, contact info, links | Root Layout | Server |
| Page Sections | Hero, Services, CTA blocks | Pages | Server (content) + Client (animation) |
| AnimatedSection | GSAP scroll-triggered wrapper | Page Sections | Client |
| MDXContent | Renders compiled MDX with custom components | Case Studies, Insights | Server |
| ContactForm | Form UI, validation, submission | HubSpot Server Action | Client |
| HubSpotTracker | Page view tracking on route changes | Root Layout | Client |
| CTABlock | Reusable call-to-action component | Multiple pages | Server |
| DiagonalSection | CSS clip-path diagonal edge sections | Page Sections | Server (pure CSS) |
| FloatingElement | GSAP-animated decorative elements | Page Sections | Client |

### Data Flow

```
Content Flow:
  MDX files (content/) -> @next/mdx compiler -> Static HTML at build time
  Frontmatter (gray-matter) -> Page metadata, index pages, generateMetadata

Form Flow:
  User fills form (Client)
    -> React Hook Form / useActionState validates (Client)
    -> Server Action receives FormData
    -> Zod validates on server
    -> @hubspot/api-client creates contact + deal
    -> Return success/error to client

Analytics Flow:
  HubSpot tracking script (loaded afterInteractive)
    -> Automatic page view on initial load
    -> usePathname() triggers trackPageView on client-side navigation

Animation Flow:
  Page loads (static HTML visible immediately -- no FOIT)
    -> Lenis initializes smooth scroll
    -> GSAP ScrollTrigger observes viewport
    -> Elements animate as they enter viewport (transform + opacity only)
    -> Scroll-linked animations scrub with scroll position
```

## Directory Structure

```
upscalepm/
  src/
    app/
      layout.tsx              # Root layout: fonts, metadata base, tracking
      page.tsx                # Home page
      globals.css             # Tailwind v4 imports, CSS custom properties
      about/page.tsx          # About page
      services/
        page.tsx              # Services overview
        [slug]/page.tsx       # Individual service (generateStaticParams)
      case-studies/
        page.tsx              # Case study index
        [slug]/page.tsx       # Individual case study (dynamic MDX import)
      insights/
        page.tsx              # Insights index
        [slug]/page.tsx       # Individual article (dynamic MDX import)
      contact/
        page.tsx              # Contact page
      sitemap.ts              # Auto-generated sitemap
      robots.ts               # Robots.txt config
      not-found.tsx           # Custom 404 page
    components/
      ui/                     # shadcn/ui components (Button, Card, Input, etc.)
      layout/                 # Header, Footer, MobileNav, Container, Section
      sections/               # HeroSection, ServiceCard, CaseStudyCard, CTASection, StatBlock
      animation/              # AnimatedSection, FloatingElement, ParallaxLayer, TextReveal
      geometric/              # DiagonalSection, GeometricOverlay, AngledDivider
      forms/                  # ContactForm, InlineCTA
      mdx/                    # Custom MDX component overrides (Callout, ProjectStats, etc.)
      seo/                    # JsonLd helper, BreadcrumbJsonLd
      hubspot/                # HubSpotTracker (client component for page views)
    lib/
      hubspot.ts              # HubSpot API client setup + helpers
      animations.ts           # GSAP animation presets/utilities (register plugins here)
      content.ts              # MDX content loading: glob slugs, parse frontmatter, sort/filter
      metadata.ts             # Shared metadata generation (generatePageMetadata helper)
      utils.ts                # cn() and other utilities
    actions/
      contact.ts              # Server Action: form -> Zod validate -> HubSpot API
  content/
    case-studies/             # MDX files for case studies
      granville-diggers.mdx
      crosslife-church.mdx
    insights/                 # MDX files for blog/insights
      da-approval-process.mdx
  public/
    images/                   # Static images (project photos, team, etc.)
    fonts/                    # Custom fonts (if not using next/font Google)
  mdx-components.tsx          # Global MDX component mapping (REQUIRED by @next/mdx)
  next.config.mjs             # MDX + Next.js config
```

## Patterns to Follow

### Pattern 1: Server Component with Client Animation Wrapper

**What:** Keep content in Server Components for SEO. Wrap with thin Client Components for GSAP animations.
**When:** Every page section that needs scroll-triggered animation.

```typescript
// components/animation/animated-section.tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function AnimatedSection({
  children,
  animation = 'fadeUp',
}: {
  children: React.ReactNode
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'diagonal'
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      y: animation === 'fadeUp' ? 60 : 0,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  return <div ref={ref}>{children}</div>
}

// Usage in a page (Server Component):
export default function ServicePage() {
  return (
    <AnimatedSection animation="fadeUp">
      <h2>Our Approach</h2>
      <p>Content here is SSG, visible immediately, animates on scroll.</p>
    </AnimatedSection>
  )
}
```

### Pattern 2: MDX Content with Dynamic Imports

**What:** Load MDX files dynamically using Next.js dynamic imports + generateStaticParams.
**When:** Case studies and insights pages.

```typescript
// app/case-studies/[slug]/page.tsx
import { getCaseStudySlugs, getCaseStudyMeta } from '@/lib/content'

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = getCaseStudyMeta(slug)
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { images: [meta.coverImage] },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Content } = await import(`@/content/case-studies/${slug}.mdx`)
  return (
    <article className="prose prose-lg max-w-none">
      <Content />
    </article>
  )
}

export const dynamicParams = false
```

### Pattern 3: Form to HubSpot via Server Action

**What:** Custom-styled form submits to HubSpot CRM without exposing API keys.
**When:** Contact form, inline CTA forms.

```typescript
// actions/contact.ts
'use server'
import { z } from 'zod'
import { Client } from '@hubspot/api-client'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10),
})

const hubspot = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN })

export async function submitContact(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  try {
    await hubspot.crm.contacts.basicApi.create({
      properties: {
        firstname: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? '',
        company: parsed.data.company ?? '',
        message: parsed.data.message,
        hs_lead_status: 'NEW',
      },
    })
    return { success: true }
  } catch (error) {
    console.error('HubSpot submission failed:', error)
    return { error: { _form: ['Submission failed. Please try again or call us directly.'] } }
  }
}
```

### Pattern 4: Diagonal Section with CSS Clip-Path (Server Component)

**What:** Sections with diagonal edges using pure CSS. No JavaScript needed.
**When:** Hero sections, service showcases, visual breaks.

```typescript
// components/geometric/diagonal-section.tsx
// This is a Server Component -- no 'use client' needed
import { cn } from '@/lib/utils'

export function DiagonalSection({
  children,
  className,
  angle = 'down', // 'down' | 'up' | 'both'
}: {
  children: React.ReactNode
  className?: string
  angle?: 'down' | 'up' | 'both'
}) {
  const clipPaths = {
    down: '[clip-path:polygon(0_0,100%_5%,100%_100%,0_95%)]',
    up:   '[clip-path:polygon(0_5%,100%_0,100%_95%,0_100%)]',
    both: '[clip-path:polygon(0_5%,100%_0,100%_95%,0_100%)]',
  }

  return (
    <section className={cn('relative py-24', clipPaths[angle], className)}>
      {children}
    </section>
  )
}
```

### Pattern 5: Lenis + GSAP ScrollTrigger Integration

**What:** Connect Lenis smooth scroll with GSAP ScrollTrigger so both work together.
**When:** Root layout initialization. Must happen once.

```typescript
// components/layout/smooth-scroll-provider.tsx
'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for Lenis RAF
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      lenis.destroy()
      lenisRef.current = null
    }

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
```

### Pattern 6: HubSpot Page View Tracking on SPA Navigation

**What:** Track page views on client-side navigation since HubSpot's script only fires on full page loads.
**When:** Root layout, runs on every route change.

```typescript
// components/hubspot/hubspot-tracker.tsx
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    _hsq: Array<[string, ...unknown[]]>
  }
}

export function HubSpotTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && window._hsq) {
      window._hsq.push(['setPath', pathname])
      window._hsq.push(['trackPageView'])
    }
  }, [pathname])

  return null
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Animating Server Components Directly
**What:** Trying to add useGSAP or event handlers to Server Components.
**Why bad:** Server Components cannot use hooks or browser APIs. Build will fail.
**Instead:** Wrap Server Component content in a thin Client Component animation wrapper. Pass content as children.

### Anti-Pattern 2: Loading HubSpot Forms via Embed Script
**What:** Using HubSpot's `hbspt.forms.create()` or the next-hubspot package.
**Why bad:** Injects unstyled iframe/DOM (~200KB), breaks design system, React 19 incompatible, causes hydration mismatches.
**Instead:** Custom shadcn/ui forms + Server Action -> @hubspot/api-client.

### Anti-Pattern 3: Using ISR for a Site This Size
**What:** Configuring `revalidate` on pages for incremental static regeneration.
**Why bad:** Adds complexity (stale content, cache invalidation edge cases) with no benefit for <50 pages. A full rebuild takes <30 seconds on Vercel.
**Instead:** Pure static generation. Rebuild on deploy. Simple and predictable.

### Anti-Pattern 4: Client-Side MDX Compilation
**What:** Using next-mdx-remote on the client or compiling MDX at runtime.
**Why bad:** Slow, increases bundle size, reduces SEO effectiveness.
**Instead:** All MDX compiled at build time via @next/mdx. Static HTML served from edge.

### Anti-Pattern 5: Over-Animating
**What:** Animating every element, long durations, complex sequences on every scroll.
**Why bad:** "High-performance minimalist" means restraint. Too much motion is the opposite of minimalist. Hurts performance and accessibility.
**Instead:** Animation budget: max 3-4 animated elements per viewport. Hero gets the most animation. Interior sections get subtle fade-ups. One signature motion per page. Respect prefers-reduced-motion.

### Anti-Pattern 6: Animating Layout Properties
**What:** Animating `width`, `height`, `top`, `left`, `margin`, `padding` with GSAP.
**Why bad:** Triggers layout recalculation on every frame. Drops to 15-30fps on mobile. Destroys CLS score.
**Instead:** Only animate `transform` (translate, rotate, scale) and `opacity`. These are GPU-composited and maintain 60fps. Use `will-change: transform` sparingly.

### Anti-Pattern 7: Making Entire Sections Client Components for Animation
**What:** Adding `'use client'` to page-level or section-level components.
**Why bad:** Ships all child components as client JS. Defeats server-rendering. Inflates bundle.
**Instead:** Create thin `'use client'` wrapper components (AnimatedSection, FloatingElement) and pass server-rendered content as children.

## Scalability Considerations

| Concern | Current (launch, ~15 pages) | At 50 pages | At 200+ pages |
|---------|---------------------------|-------------|---------------|
| Build time | <15s | <30s | <60s, may need route groups |
| Content management | MDX in repo | Still fine | Consider headless CMS if non-dev authors needed |
| Image optimization | Vercel auto | Vercel auto | May need external CDN (Cloudinary) |
| Animation performance | GSAP handles | GSAP handles | Ensure ScrollTrigger cleanup on unmount |
| HubSpot API limits | Minimal | Fine | Review HubSpot plan tier |
| SEO | Manual + generated | Auto-generated from MDX | Same pattern scales |

For a consultancy website, 200+ pages is unlikely. This architecture comfortably handles the expected scale.

## Sources

- [Next.js App Router Architecture](https://nextjs.org/docs/app)
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx)
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms)
- [GSAP React Best Practices](https://gsap.com/resources/React/)
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- [HubSpot Forms API](https://developers.hubspot.com/docs/api/client-libraries)
- [Vercel Deployment](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld)
