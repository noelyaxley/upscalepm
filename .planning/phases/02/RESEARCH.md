# Phase 2: Content Infrastructure & Migration - Research

**Researched:** 2026-02-14
**Domain:** MDX content pipeline, WordPress migration, image optimization
**Confidence:** HIGH

## Summary

Phase 2 builds the content infrastructure for UpScalePM's website rebuild from WordPress/Elementor to Next.js 16.1.6. The project already has @next/mdx configured with `pageExtensions`, gray-matter and remark-gfm installed, @tailwindcss/typography installed, and 118 images plus crawl data captured from the WordPress site.

The recommended approach uses **@next/mdx with remark-frontmatter + remark-mdx-frontmatter** for YAML frontmatter support, combined with **fs-based content utilities** for listing/reading MDX files, and **dynamic imports** for rendering MDX by slug. This is the canonical Next.js pattern documented in official docs and avoids adding `next-mdx-remote` as a dependency (unnecessary since all content is local). Images should be moved to `public/images/` organized by content type and let `next/image` handle WebP/AVIF conversion at serve time -- sharp is already installed and configured in `next.config.mjs` with `formats: ['image/avif', 'image/webp']`.

The WordPress site contains **14 case studies**, **14 insights/quick-bites articles**, and **5 service pages**, all already categorized in `content/migration/redirects.json`. Content extraction from the WordPress HTML will be done manually per-article during migration, with the crawl data serving as a reference inventory rather than an automated conversion source (the content volume is low enough that manual conversion produces higher quality MDX).

**Primary recommendation:** Use `@next/mdx` + `remark-frontmatter` + `remark-mdx-frontmatter` for the pipeline, `fs.readdirSync` + gray-matter for content listing, and `dynamic import('@/content/${slug}.mdx')` for rendering. Do NOT add `next-mdx-remote`.

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @next/mdx | 16.1.6 | MDX compilation in Next.js | Official Next.js MDX integration |
| @mdx-js/loader | 3.1.1 | Webpack MDX loader | Required by @next/mdx |
| @mdx-js/react | 3.1.1 | React MDX provider | Required by @next/mdx |
| gray-matter | 4.0.3 | Frontmatter parsing for content listing | Standard YAML frontmatter parser |
| remark-gfm | 4.0.1 | GitHub Flavored Markdown | Tables, strikethrough, autolinks |
| @tailwindcss/typography | 0.5.19 | Prose styling for rendered MDX | Standard Tailwind content styling |
| sharp | 0.34.5 | Image processing | Already configured for AVIF/WebP |

### To Install
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| remark-frontmatter | 5.0.0 | Parse YAML frontmatter blocks in MDX | Prevents frontmatter from rendering as text |
| remark-mdx-frontmatter | 5.2.0 | Export frontmatter as JS object from MDX | Enables `import { frontmatter } from 'file.mdx'` |
| rehype-slug | 6.0.0 | Add `id` attributes to headings | Enables anchor links in articles |
| reading-time | 1.5.0 | Calculate article reading time | Display "X min read" on insights |

### Not Needed
| Instead of | Why Not | Use Instead |
|------------|---------|-------------|
| next-mdx-remote | All content is local, not remote. Adds unnecessary complexity and a different rendering pipeline. | @next/mdx with dynamic imports |
| contentlayer | Abandoned/unmaintained project. | fs + gray-matter utility functions |
| turndown (HTML-to-MD) | Only ~28 articles total. Manual conversion produces cleaner MDX than automated conversion of WordPress/Elementor HTML (which is full of div wrappers, inline styles, and Elementor classes). | Manual conversion per article |
| Pre-converting images to WebP | next/image already handles format conversion at serve time via sharp. Pre-converting adds build complexity for no benefit. | Let next/image optimize on-demand |

**Installation:**
```bash
npm install remark-frontmatter@5.0.0 remark-mdx-frontmatter@5.2.0 rehype-slug@6.0.0 reading-time@1.5.0
```

## Architecture Patterns

### Recommended Project Structure
```
content/
  case-studies/              # MDX files for case study pages
    granville-diggers-club-development.mdx
    vibe-hotel-darling-harbour.mdx
    ...
  insights/                  # MDX files for insights/articles
    city-of-sydney-da.mdx
    tender-evaluation.mdx
    ...
  migration/                 # Already exists - source data
    crawl-data.json
    images/                  # Raw WordPress images (not served)
    redirects.json
    url-inventory.md
public/
  images/
    case-studies/            # Optimized images for case studies
      granville-diggers/
        hero.jpg
        gallery-01.jpg
      vibe-hotel/
        hero.jpg
    insights/                # Optimized images for insights
      tender-evaluation/
        hero.jpg
    services/                # Images for service pages
    shared/                  # Logo, team photos, etc.
src/
  app/
    case-studies/
      [slug]/
        page.tsx             # Dynamic route for case studies
      page.tsx               # Case studies listing page
      layout.tsx             # Shared prose layout
    insights/
      [slug]/
        page.tsx             # Dynamic route for insights
      page.tsx               # Insights listing page
      layout.tsx             # Shared prose layout
    services/
      feasibility-advisory/
        page.tsx             # Static service pages (not MDX)
      design-management/
        page.tsx
      ...
  lib/
    content.ts               # Content utility functions
    content.types.ts         # TypeScript types for frontmatter
  components/
    mdx/
      index.ts               # MDX component registry (exports useMDXComponents)
      callout.tsx             # Callout/highlight boxes
      project-stats.tsx       # Project stats grid
      image-gallery.tsx       # Image gallery component
      timeline.tsx            # Project timeline/milestones
      stat-card.tsx           # Individual stat display
```

### Pattern 1: Content Utility Library (src/lib/content.ts)
**What:** Centralized functions for reading, parsing, and listing MDX content.
**When to use:** Always -- this is the backbone of the content pipeline.
**Example:**
```typescript
// Source: Verified pattern from Next.js official docs + community best practice
// src/lib/content.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { CaseStudyFrontmatter, InsightFrontmatter } from './content.types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function getMDXFiles(directory: string): string[] {
  const dir = path.join(CONTENT_DIR, directory)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
}

function parseMDXFile<T>(directory: string, filename: string) {
  const filePath = path.join(CONTENT_DIR, directory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const slug = filename.replace('.mdx', '')

  return {
    slug,
    frontmatter: data as T,
    content,
    readingTime: Math.ceil(readingTime(content).minutes),
  }
}

export function getAllCaseStudies() {
  return getMDXFiles('case-studies')
    .map((file) => parseMDXFile<CaseStudyFrontmatter>('case-studies', file))
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99))
}

export function getCaseStudyBySlug(slug: string) {
  const filename = `${slug}.mdx`
  const filePath = path.join(CONTENT_DIR, 'case-studies', filename)
  if (!fs.existsSync(filePath)) return null
  return parseMDXFile<CaseStudyFrontmatter>('case-studies', filename)
}

export function getAllInsights() {
  return getMDXFiles('insights')
    .map((file) => parseMDXFile<InsightFrontmatter>('insights', file))
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
}

export function getInsightBySlug(slug: string) {
  const filename = `${slug}.mdx`
  const filePath = path.join(CONTENT_DIR, 'insights', filename)
  if (!fs.existsSync(filePath)) return null
  return parseMDXFile<InsightFrontmatter>('insights', filename)
}
```

### Pattern 2: Dynamic MDX Route with Frontmatter Metadata
**What:** App Router dynamic route that imports MDX by slug, generates static params, and sets metadata from frontmatter.
**When to use:** For both case study and insight detail pages.
**Example:**
```typescript
// Source: Next.js official docs (nextjs.org/docs/app/building-your-application/configuring/mdx)
// src/app/case-studies/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies()
  return studies.map((study) => ({ slug: study.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return { title: 'Not Found' }

  return generatePageMetadata({
    title: study.frontmatter.title,
    description: study.frontmatter.excerpt,
    path: `/case-studies/${slug}`,
    ogImage: study.frontmatter.heroImage,
  })
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  // Dynamic import of the MDX component for rendering
  const { default: MDXContent, frontmatter } = await import(
    `@/content/case-studies/${slug}.mdx`
  )

  return (
    <article>
      {/* Case study layout wrapping the MDX content */}
      <CaseStudyHeader frontmatter={study.frontmatter} />
      <div className="prose prose-lg mx-auto max-w-3xl">
        <MDXContent />
      </div>
    </article>
  )
}
```

### Pattern 3: MDX Frontmatter with YAML (via remark plugins)
**What:** Use standard YAML frontmatter in MDX files instead of `export const metadata`.
**When to use:** For all MDX content files.
**Why:** YAML frontmatter is the standard content authoring format. Authors can edit content without understanding JS/TS exports.
**Example:**
```mdx
---
title: "Granville Diggers Club Development"
excerpt: "Preserving Heritage, Enhancing Community"
category: development
projectType: Club Development
location: Granville, NSW
architect: GeriesPayne
heroImage: /images/case-studies/granville-diggers/hero.jpg
images:
  - src: /images/case-studies/granville-diggers/reception.jpg
    alt: Granville Diggers Club reception area
  - src: /images/case-studies/granville-diggers/bar.jpg
    alt: Granville Diggers Club bar design
order: 1
draft: false
---

import { ProjectStats } from '@/components/mdx/project-stats'
import { ImageGallery } from '@/components/mdx/image-gallery'

<ProjectStats
  type="Club Development"
  location="Granville, NSW"
  architect="GeriesPayne"
  engagement="Post-DA"
/>

## Preserving Heritage, Enhancing Community

The Granville Diggers Club has operated as a valued part of Sydney's
west since 1964...

<ImageGallery images={frontmatter.images} />
```

### Pattern 4: next.config.mjs with All Plugins
**What:** Complete MDX configuration with remark/rehype plugin chain.
**Example:**
```javascript
// next.config.mjs
import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { readFileSync } from 'fs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    try {
      const data = readFileSync('./content/migration/redirects.json', 'utf-8')
      const redirects = JSON.parse(data)
      return redirects.map(({ source, destination, statusCode }) => ({
        source,
        destination,
        permanent: statusCode === 301,
      }))
    } catch {
      return []
    }
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkGfm,
    ],
    rehypePlugins: [
      rehypeSlug,
    ],
  },
})

export default withMDX(nextConfig)
```

### Pattern 5: Prose Layout with Tailwind Typography
**What:** Shared layout component that wraps MDX content with typography styling.
**When to use:** As a layout.tsx in case-studies/[slug] and insights/[slug].
**Example:**
```typescript
// src/app/insights/[slug]/layout.tsx
export default function InsightLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-lg prose-neutral mx-auto max-w-3xl
      prose-headings:font-display prose-headings:tracking-tight
      prose-h2:text-3xl prose-h3:text-2xl
      prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-lg prose-img:shadow-md
      dark:prose-invert">
      {children}
    </div>
  )
}
```

### Anti-Patterns to Avoid
- **Using `next-mdx-remote` for local content:** Adds a separate compilation step and different API surface. @next/mdx with dynamic imports handles local content natively.
- **Storing images in `content/` directory:** These won't be served by Next.js. Images must go in `public/` to be accessible via URL paths.
- **Using `export const metadata` in MDX files:** Forces content authors to write JavaScript. YAML frontmatter is the standard for content files. Use `remark-frontmatter` + `remark-mdx-frontmatter` instead.
- **Automated HTML-to-MDX conversion:** WordPress/Elementor HTML is deeply nested with `<div>` wrappers, inline styles, and framework-specific classes. Automated conversion produces poor-quality MDX. With only ~28 articles, manual conversion is faster and produces better results.
- **Pre-optimizing images to WebP:** `next/image` with sharp already handles format negotiation (AVIF for supporting browsers, WebP fallback). Pre-converting removes the original quality source and doubles the work.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frontmatter parsing | Custom regex/YAML parser | gray-matter (listing) + remark-mdx-frontmatter (rendering) | Edge cases with multiline values, dates, arrays |
| Reading time calculation | Word count / 200 | reading-time package | Handles code blocks, images, CJK characters correctly |
| Heading anchor links | Manual id generation | rehype-slug | Handles Unicode, duplicates, special characters |
| Prose typography | Custom CSS for every element | @tailwindcss/typography `prose` classes | Handles 50+ HTML elements with consistent spacing |
| Image format negotiation | Manual WebP/AVIF conversion | next/image + sharp (already configured) | Browser capability detection, caching, sizing |
| Content listing/sorting | Inline fs calls in each page | Centralized content.ts utility | DRY, type-safe, testable |

**Key insight:** The content volume (28 articles, 118 images) is small enough that the infrastructure should prioritize simplicity and correctness over automation. The MDX pipeline with @next/mdx is essentially zero-config once the remark plugins are added.

## Common Pitfalls

### Pitfall 1: Frontmatter Rendered as Text
**What goes wrong:** YAML frontmatter block appears as literal text at the top of rendered MDX pages.
**Why it happens:** `@next/mdx` does not parse frontmatter by default. Without `remark-frontmatter`, the `---` delimited block is treated as regular content.
**How to avoid:** Install and configure both `remark-frontmatter` (parses it) AND `remark-mdx-frontmatter` (exports it as JS). Both are required.
**Warning signs:** `---` and YAML key-value pairs visible on rendered pages.

### Pitfall 2: Dynamic Import Path Must Be Partially Static
**What goes wrong:** `await import(slug)` fails or doesn't bundle correctly.
**Why it happens:** Webpack/Turbopack needs a static prefix to know which files to include in the bundle. Fully dynamic paths like `import(variable)` can't be resolved at build time.
**How to avoid:** Always use template literals with a static prefix: `import(\`@/content/case-studies/${slug}.mdx\`)`. The `@/content/` prefix tells the bundler where to look.
**Warning signs:** Build errors about "Cannot find module" or empty pages in production.

### Pitfall 3: Forgetting .mdx Extension in Dynamic Import
**What goes wrong:** Import resolves to undefined or fails.
**Why it happens:** Unlike regular JS imports, MDX dynamic imports require the explicit `.mdx` extension.
**How to avoid:** Always include `.mdx` in the import path: `import(\`@/content/${slug}.mdx\`)`.
**Warning signs:** Module not found errors at build time.

### Pitfall 4: Images in content/ Not Served
**What goes wrong:** Images referenced in MDX return 404.
**Why it happens:** Next.js only serves files from `public/` directory. Files in `content/` are not accessible via HTTP.
**How to avoid:** Store all served images in `public/images/`. Keep `content/migration/images/` only as source reference.
**Warning signs:** Broken images on deployed site, 404s in network tab.

### Pitfall 5: TypeScript Not Recognizing MDX Imports
**What goes wrong:** `Cannot find module '@/content/example.mdx'` TypeScript error.
**Why it happens:** TypeScript doesn't know about `.mdx` files without type declarations.
**How to avoid:** Ensure `@types/mdx` is installed (it is -- v2.0.13) and that `mdx-components.tsx` exists at project root (it does). The `next-env.d.ts` file should include MDX types.
**Warning signs:** Red squiggly lines on MDX import paths in editor.

### Pitfall 6: Missing generateStaticParams Entries
**What goes wrong:** Some MDX pages return 404 in production even though files exist.
**Why it happens:** With `dynamicParams = false`, only slugs returned by `generateStaticParams` are pre-rendered. If the content utility misses a file, that page won't exist.
**How to avoid:** The `getAllCaseStudies()`/`getAllInsights()` functions read the filesystem, so they automatically catch all files. Always test with `next build` before deploying.
**Warning signs:** Pages work in dev but 404 in production.

### Pitfall 7: WordPress Content Has Hidden Complexity
**What goes wrong:** Migrated content looks broken -- missing images, broken links, formatting issues.
**Why it happens:** WordPress/Elementor content contains internal links (e.g., `/granville-diggers-club-development/`), WordPress image URLs, and Elementor-specific formatting that doesn't translate to MDX.
**How to avoid:** During migration, systematically update: (1) all internal links to new URL structure, (2) all image paths to `public/images/` paths, (3) remove WordPress-specific markup.
**Warning signs:** Links pointing to old WordPress URLs, images pointing to `wp-content/uploads/`.

## Content Inventory & Frontmatter Schemas

### Case Studies (14 total)
Based on redirect analysis, these are the case study pages:

| Slug | Title | Category |
|------|-------|----------|
| granville-diggers-club-development | Granville Diggers Club Development | development |
| granville-diggers-club-development-origin | Granville Diggers Club Development Origin | development |
| structured-for-success-...separable-portions | Granville Diggers - James Clifford Construction | development |
| crosslife-church-asquith-development | Crosslife Church Asquith Development | development |
| calibre-cooper-street-residential-apartments-surry-hills | Calibre Cooper Street Apartments | residential |
| navigating-encumbrance-vibe-hotel-darling-harbour | Vibe Hotel Darling Harbour | hotel |
| major-laboratory-relocation-...filtration | Sydney Water Filtration | infrastructure |
| health-project-management-in-regional-emergency-infrastructure | Health Emergency Infrastructure | infrastructure |
| delivering-modern-government-workspaces-at-231-elizabeth-street | 231 Elizabeth Street | fitout |
| expanding-government-tenancy-at-glass-house-macquarie-park | Glass House Macquarie Park | fitout |
| project-management-delivery-...-newcastle-office-fit-out | Newcastle Office Fit-Out | fitout |
| strategic-rezoning-...-pete-island-and-mooney-mooney | Pete Island Rezoning | planning-proposal |
| private-architectural-practice-...project-management | Private Architectural Practice | commercial |
| delivering-complexity-with-clarity | Delivering Complexity with Clarity | commercial |

### Case Study Frontmatter Schema
```typescript
// src/lib/content.types.ts
export interface CaseStudyFrontmatter {
  title: string
  excerpt: string
  category: 'residential' | 'commercial' | 'fitout' | 'infrastructure' | 'hotel' | 'development' | 'planning-proposal'
  projectType: string          // e.g., "Club Development", "Office Fit-Out"
  location: string             // e.g., "Granville, NSW"
  client?: string              // Client name if public
  architect?: string           // e.g., "GeriesPayne"
  heroImage: string            // Path to hero image in public/
  images?: Array<{
    src: string
    alt: string
  }>
  services?: string[]          // e.g., ["Design Management", "Tender Assessment"]
  order: number                // Display order on listing page
  draft: boolean               // Exclude from production
}
```

### Insights/Articles (14 total)
| Slug | Title | Type |
|------|-------|------|
| city-of-sydney-da-explained-... | City of Sydney DA | quick-bite |
| tender-evaluation-how-we-choose-... | Tender Evaluation | quick-bite |
| commercial-tenant-fit-out-... | Commercial Tenant Fit Out | quick-bite |
| construction-contracts-for-... | Construction Contracts | quick-bite |
| construction-variations-and-design-freeze | Variations & Design Freeze | quick-bite |
| insights-into-floor-space-ratio | Floor Space Ratio | quick-bite |
| from-architect-to-project-manager-first-project | Architect to PM | quick-bite |
| inside-the-mba-bc3-contract | MBA BC3 Contract | quick-bite |
| ground-anchors-and-license-access-deeds | Ground Anchors | quick-bite |
| client-side-project-management-sydney | Client-side PM Sydney | quick-bite |
| boutique-residential-development-... | Boutique Residential | article |
| passion-for-delivering-projects | Passion for Delivering | article |
| beyond-balance-finding-meaning-... | Beyond Balance | article |
| beyond-projects-building-for-health-... | Beyond Projects | article |

### Insight Frontmatter Schema
```typescript
export interface InsightFrontmatter {
  title: string
  excerpt: string
  date: string                 // ISO date string, e.g., "2025-10-06"
  updated?: string             // Last updated date
  author: string               // e.g., "Noel Yaxley"
  category: 'quick-bites' | 'articles'
  tags: string[]               // e.g., ["tender", "contracts", "procurement"]
  heroImage: string            // Path to hero image in public/
  draft: boolean
}
```

### Service Pages (5 total -- NOT MDX)
Service pages are better as React pages (not MDX) because they need custom layouts, CTAs, and interactive elements. Their content is relatively static and design-heavy.

| Slug | Title |
|------|-------|
| feasibility-advisory | Feasibility and Advisory |
| design-management | Design Management |
| da-approval | DA Approval |
| tender-assessment | Tender Assessment |
| construction-superintendent | Construction Superintendent |

## Code Examples

### MDX Component Registry (mdx-components.tsx)
```typescript
// mdx-components.tsx (project root -- already exists, needs updating)
import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { Callout } from '@/components/mdx/callout'
import { ProjectStats } from '@/components/mdx/project-stats'
import { ImageGallery } from '@/components/mdx/image-gallery'
import { Timeline, TimelineItem } from '@/components/mdx/timeline'
import { StatCard } from '@/components/mdx/stat-card'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default HTML elements
    img: (props) => (
      <Image
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
        className="rounded-lg"
        {...(props as ImageProps)}
      />
    ),
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/')) {
        return <Link href={href} {...props}>{children}</Link>
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    },
    // Custom MDX components available in all MDX files
    Callout,
    ProjectStats,
    ImageGallery,
    Timeline,
    TimelineItem,
    StatCard,
    ...components,
  }
}
```

### Interactive MDX Components

#### Callout Component
```typescript
// src/components/mdx/callout.tsx
interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'important'
  title?: string
  children: React.ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: 'border-l-4 border-blue-500 bg-blue-50',
    warning: 'border-l-4 border-amber-500 bg-amber-50',
    tip: 'border-l-4 border-green-500 bg-green-50',
    important: 'border-l-4 border-primary-500 bg-primary-50',
  }

  return (
    <div className={`my-6 rounded-r-lg p-4 ${styles[type]} not-prose`}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="text-sm">{children}</div>
    </div>
  )
}
```

#### Project Stats Component
```typescript
// src/components/mdx/project-stats.tsx
interface ProjectStatsProps {
  type: string
  location: string
  client?: string
  architect?: string
  engagement?: string
  value?: string
}

export function ProjectStats(props: ProjectStatsProps) {
  const stats = Object.entries(props).filter(([, v]) => v)

  return (
    <div className="not-prose my-8 grid grid-cols-2 gap-4 rounded-lg border bg-muted/50 p-6 md:grid-cols-3">
      {stats.map(([key, value]) => (
        <div key={key}>
          <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </dt>
          <dd className="mt-1 text-sm font-semibold">{value}</dd>
        </div>
      ))}
    </div>
  )
}
```

#### Image Gallery Component
```typescript
// src/components/mdx/image-gallery.tsx
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3
}

export function ImageGallery({ images, columns = 2 }: ImageGalleryProps) {
  return (
    <div className={`not-prose my-8 grid gap-4 ${
      columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
    }`}>
      {images.map((img, i) => (
        <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes={columns === 3
              ? '(max-width: 768px) 100vw, 33vw'
              : '(max-width: 768px) 100vw, 50vw'
            }
          />
        </div>
      ))}
    </div>
  )
}
```

#### Stat Card Component
```typescript
// src/components/mdx/stat-card.tsx
interface StatCardProps {
  value: string
  label: string
  icon?: React.ReactNode
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="not-prose flex flex-col items-center rounded-lg border p-4 text-center">
      <span className="text-3xl font-bold text-primary-600">{value}</span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
```

### Image Migration Script
```typescript
// scripts/migrate-images.ts
// One-time script to organize migration images into public/
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const SOURCE = path.join(process.cwd(), 'content/migration/images')
const DEST = path.join(process.cwd(), 'public/images')

// Map WordPress filenames to organized structure
const IMAGE_MAP: Record<string, { dest: string; filename: string }> = {
  'GP_DIGEERS_View02_Bar.jpg': {
    dest: 'case-studies/granville-diggers',
    filename: 'bar-render.jpg'
  },
  // ... map each image to its destination
}

async function migrateImages() {
  for (const [source, { dest, filename }] of Object.entries(IMAGE_MAP)) {
    const srcPath = path.join(SOURCE, source)
    const destDir = path.join(DEST, dest)
    const destPath = path.join(destDir, filename)

    if (!fs.existsSync(srcPath)) {
      console.warn(`Missing: ${source}`)
      continue
    }

    fs.mkdirSync(destDir, { recursive: true })

    // Get image metadata for dimension reference
    const metadata = await sharp(srcPath).metadata()
    console.log(`${source} -> ${dest}/${filename} (${metadata.width}x${metadata.height})`)

    // Copy original -- next/image handles format conversion
    fs.copyFileSync(srcPath, destPath)
  }
}

migrateImages()
```

## Image Strategy

### Approach: Keep Originals, Let next/image Optimize

1. **Move images** from `content/migration/images/` to `public/images/` organized by content type
2. **Use original format** (jpg/png) -- do NOT pre-convert to WebP
3. **next/image handles everything**: format negotiation (AVIF > WebP > original), responsive sizing, lazy loading, blur placeholders
4. **Already configured** in `next.config.mjs`: `formats: ['image/avif', 'image/webp']`
5. **sharp already installed** (v0.34.5) -- Next.js uses it for server-side image processing

### Image Deduplication
The 118 crawled images include duplicates at different resolutions (WordPress generates multiple sizes). For example:
- `Vibe-Encumbrance-11.jpg` and `Vibe-Encumbrance-11-1024x683.jpg` are the same image
- `balance-vs-purpose.jpg` and `balance-vs-purpose-1024x576.webp` are the same image

**Rule:** Keep only the highest-resolution original (usually the one without dimension suffixes). Discard WordPress-generated thumbnails (`-1024x576`, `-768x432`, etc.) since next/image generates its own responsive sizes.

### Image Naming Convention
```
public/images/
  case-studies/
    {project-slug}/
      hero.jpg              # Main hero image
      gallery-01.jpg        # Gallery images numbered
      gallery-02.jpg
      detail-{name}.jpg     # Named detail shots
  insights/
    {article-slug}/
      hero.jpg              # Article hero image
      figure-01.jpg         # In-article figures
  services/
    feasibility.jpg         # Service page images
  shared/
    logo.jpg                # Shared assets
    team/
      noel-yaxley.jpg
```

## Content Migration Approach

### Why Manual Over Automated

| Factor | Automated (turndown) | Manual |
|--------|---------------------|--------|
| Content volume | Overkill for 28 articles | Manageable in ~1-2 days |
| WordPress/Elementor HTML | Deeply nested divs, inline styles, Elementor classes -- produces messy markdown | Clean MDX from the start |
| Image references | Points to wp-content/uploads/ URLs | Updated to public/images/ paths |
| Internal links | Old WordPress URLs | Updated to new route structure |
| MDX components | Can't auto-insert `<ProjectStats>` etc. | Naturally added during conversion |
| Quality | Needs manual cleanup anyway | Done right the first time |

### Migration Workflow Per Article
1. Open WordPress page in browser, copy the visible text
2. Create MDX file with frontmatter from crawl-data.json metadata
3. Paste and format content as Markdown
4. Identify and copy relevant images to `public/images/`
5. Update image references to new paths using `next/image`
6. Update internal links to new URL structure
7. Add interactive MDX components where appropriate (stats, callouts)
8. Verify rendering in dev server

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-mdx-remote for all MDX | @next/mdx with dynamic imports | Next.js 14+ (2024) | Simpler, no separate serialization step |
| export const metadata in MDX | remark-frontmatter + remark-mdx-frontmatter | 2024 (plugins matured) | Standard YAML frontmatter, better DX |
| contentlayer for content management | fs + gray-matter utilities | contentlayer abandoned 2023 | No dependency on unmaintained tool |
| Manual WebP conversion scripts | next/image with AVIF/WebP auto-negotiation | Next.js 13+ | Zero-effort image optimization |
| Tailwind @apply for prose | @tailwindcss/typography prose classes | Stable since 2021 | Consistent typography with zero custom CSS |

**Deprecated/outdated:**
- **contentlayer:** Abandoned project, do not use
- **next-mdx-enhanced:** Deprecated in favor of @next/mdx
- **@next/mdx without remark plugins:** Works but loses frontmatter support

## Open Questions

1. **Granville Diggers has 3 separate pages**
   - What we know: There are 3 case study entries for Granville Diggers (development, origin, structured-for-success). The redirects map each to a separate case study slug.
   - What's unclear: Should these be 3 separate case studies or consolidated into one longer case study?
   - Recommendation: Keep as 3 separate case studies since they represent different project phases. The content is distinct enough to warrant separate pages.

2. **Insight categories: quick-bites vs articles**
   - What we know: WordPress had "Quick Bites" as a category. Some articles are shorter educational pieces, others are longer thought-leadership pieces.
   - What's unclear: Should the new site maintain this distinction in the URL structure or just use `/insights/` for all?
   - Recommendation: Use `/insights/` for all, with a `category` frontmatter field that can be used for filtering on the listing page. Simpler URL structure, same discoverability.

3. **Service pages as MDX vs React**
   - What we know: Service pages have custom layouts with CTAs, image sections, and structured content that differs from article flow.
   - What's unclear: Should they use MDX or be hand-crafted React pages?
   - Recommendation: Build as React pages, not MDX. The content is largely static, design-heavy, and benefits from component-level control. MDX is better suited for long-form prose content.

4. **Content path resolution in tsconfig**
   - What we know: Current `paths` has `"@/*": ["./src/*"]`. Content lives in `content/` at project root.
   - What's unclear: Whether `@/content/` alias will work or if we need a separate path alias.
   - Recommendation: Add `"@content/*": ["./content/*"]` path alias to tsconfig, or keep using relative paths in dynamic imports. Test during implementation.

## Sources

### Primary (HIGH confidence)
- [Next.js MDX Configuration Docs](https://nextjs.org/docs/app/building-your-application/configuring/mdx) - Complete MDX setup, dynamic imports, generateStaticParams pattern. Version 16.1.6, dated 2026-02-11.
- [Next.js Image Optimization Docs](https://nextjs.org/docs/app/getting-started/images) - Image component usage, local images, format negotiation. Version 16.1.6.
- Project files: `next.config.mjs`, `package.json`, `tsconfig.json`, `mdx-components.tsx` -- verified current configuration.
- `content/migration/redirects.json` -- verified content categorization (14 case studies, 14 insights, 5 services).
- `content/migration/crawl-data.json` -- verified page inventory and metadata.

### Secondary (MEDIUM confidence)
- [remark-mdx-frontmatter npm](https://www.npmjs.com/package/remark-mdx-frontmatter) - v5.2.0, exports frontmatter as JS variable.
- [Building a Modern Blog with MDX and Next.js 16](https://www.yourtechpilot.com/blog/building-mdx-blog-nextjs) - Content utility pattern with fs + gray-matter.
- [Advanced MDX Layouts - vstollen.me](https://vstollen.me/blog/advanced-mdx-layouts) - Dynamic import + generateMetadata with frontmatter.
- [Building a blog with Next.js and MDX - alexchantastic.com](https://www.alexchantastic.com/building-a-blog-with-next-and-mdx) - Alternative content utility pattern.
- [Frontmatter plugin tutorial - chris.lu](https://chris.lu/web_development/tutorials/next-js-static-mdx-blog/frontmatter-plugin) - remark-frontmatter + remark-mdx-frontmatter config.

### Tertiary (LOW confidence)
- None. All findings verified against official docs or multiple sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All packages verified against npm registry and Next.js docs
- Architecture: HIGH - Dynamic import + generateStaticParams pattern is official Next.js documentation
- Frontmatter handling: HIGH - remark-frontmatter + remark-mdx-frontmatter verified in Next.js docs and multiple tutorials
- Image strategy: HIGH - next/image behavior verified in official docs, sharp already configured
- Content migration: HIGH - Content inventory verified from crawl data and redirects
- Interactive components: MEDIUM - Component designs are custom but follow standard React/Tailwind patterns
- Pitfalls: HIGH - Based on official docs warnings and verified community experience

**Research date:** 2026-02-14
**Valid until:** 2026-03-14 (stable ecosystem, no major changes expected)
