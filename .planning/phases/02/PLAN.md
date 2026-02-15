# Phase 2: Content Infrastructure & Migration

## Overview

8 sequential prompts that build the MDX content pipeline, create templates, migrate all WordPress content, and extract service page copy. Each prompt is self-contained with exact file paths, code patterns, and acceptance criteria.

**Requirements covered:** CONT-01, CONT-02, CONT-03, CONT-05, CONT-06, CONT-08, MIG-02, MIG-03, MIG-04, MIG-05

**Estimated effort:** ~4-6 hours Claude execution time across all prompts.

---

## Prompt 1: MDX Pipeline Setup

**Requirements:** CONT-01
**Files created/modified:**
- `next.config.mjs` (modify)
- `src/lib/content.ts` (create)
- `src/lib/content.types.ts` (create)
- `mdx-components.tsx` (modify)
- `tsconfig.json` (modify)
- `content/case-studies/example.mdx` (create -- temporary test file)

### Context

The project already has `@next/mdx` configured in `next.config.mjs` with empty plugin arrays, `gray-matter` installed, `remark-gfm` installed, and `mdx-components.tsx` at the project root with a passthrough `useMDXComponents`. The `@tailwindcss/typography` plugin is installed and loaded via `@plugin` in the CSS.

### Actions

**1. Install new packages:**
```bash
npm install remark-frontmatter@5.0.0 remark-mdx-frontmatter@5.2.0 rehype-slug@6.0.0 reading-time@1.5.0
```

**2. Update `next.config.mjs`** to add remark/rehype plugins:
```javascript
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

**3. Add content path alias to `tsconfig.json`** -- add `"@content/*": ["./content/*"]` to the `paths` object. Also add `"content/**/*.mdx"` to the `include` array so TypeScript recognises MDX files in the content directory.

**4. Create `src/lib/content.types.ts`** with the frontmatter type interfaces:

```typescript
export interface CaseStudyFrontmatter {
  title: string
  excerpt: string
  category: 'residential' | 'commercial' | 'fitout' | 'infrastructure' | 'hotel' | 'development' | 'planning-proposal'
  projectType: string
  location: string
  client?: string
  architect?: string
  heroImage: string
  images?: Array<{
    src: string
    alt: string
  }>
  services?: string[]
  order: number
  draft: boolean
}

export interface InsightFrontmatter {
  title: string
  excerpt: string
  date: string
  updated?: string
  author: string
  category: 'quick-bites' | 'articles'
  tags: string[]
  heroImage: string
  draft: boolean
}

export interface ContentItem<T> {
  slug: string
  frontmatter: T
  content: string
  readingTime: number
}
```

**5. Create `src/lib/content.ts`** -- the content utility library:

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { CaseStudyFrontmatter, InsightFrontmatter, ContentItem } from './content.types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function getMDXFiles(directory: string): string[] {
  const dir = path.join(CONTENT_DIR, directory)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
}

function parseMDXFile<T>(directory: string, filename: string): ContentItem<T> {
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

// Case studies
export function getAllCaseStudies(): ContentItem<CaseStudyFrontmatter>[] {
  return getMDXFiles('case-studies')
    .map((file) => parseMDXFile<CaseStudyFrontmatter>('case-studies', file))
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99))
}

export function getCaseStudyBySlug(slug: string): ContentItem<CaseStudyFrontmatter> | null {
  const filename = `${slug}.mdx`
  const filePath = path.join(CONTENT_DIR, 'case-studies', filename)
  if (!fs.existsSync(filePath)) return null
  return parseMDXFile<CaseStudyFrontmatter>('case-studies', filename)
}

export function getCaseStudySlugs(): string[] {
  return getMDXFiles('case-studies').map((file) => file.replace('.mdx', ''))
}

// Insights
export function getAllInsights(): ContentItem<InsightFrontmatter>[] {
  return getMDXFiles('insights')
    .map((file) => parseMDXFile<InsightFrontmatter>('insights', file))
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
}

export function getInsightBySlug(slug: string): ContentItem<InsightFrontmatter> | null {
  const filename = `${slug}.mdx`
  const filePath = path.join(CONTENT_DIR, 'insights', filename)
  if (!fs.existsSync(filePath)) return null
  return parseMDXFile<InsightFrontmatter>('insights', filename)
}

export function getInsightSlugs(): string[] {
  return getMDXFiles('insights').map((file) => file.replace('.mdx', ''))
}
```

**6. Update `mdx-components.tsx`** to override `img` with `next/image` and `a` with `next/link` for internal links. Keep it minimal for now -- custom MDX components (Callout, ProjectStats, etc.) will be added in Prompt 4.

```typescript
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        src={props.src as string}
        alt={props.alt || ''}
        width={1200}
        height={630}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
        className="rounded-lg"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/')) {
        return <Link href={href} {...props}>{children}</Link>
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    },
    ...components,
  }
}
```

Note: The `img` override uses explicit `width={1200} height={630}` with `style={{ width: '100%', height: 'auto' }}` because Markdown `![alt](src)` syntax does not provide dimensions. The `width`/`height` tell Next.js the intrinsic size for aspect ratio calculation, while the CSS ensures responsive scaling. For precise dimensions, use `<Image>` directly in MDX instead of Markdown image syntax.

**7. Create a test MDX file** at `content/case-studies/example.mdx` with YAML frontmatter to verify the pipeline works end-to-end. Include a title, excerpt, category, heroImage (use a placeholder path like `/images/case-studies/example/hero.jpg`), order: 99, and draft: true. Add a few paragraphs of placeholder body text with a heading, a list, and an image reference.

### Acceptance Criteria

- `npm run dev` starts without errors
- `getAllCaseStudies()` returns an empty array (example is draft:true)
- Setting draft:false on the example and calling `getAllCaseStudies()` returns 1 item with correct frontmatter types
- No YAML frontmatter text rendered as visible content on the page (remark-frontmatter is working)
- The `frontmatter` export is available from the MDX dynamic import (remark-mdx-frontmatter is working)
- `npm run build` completes without TypeScript errors

---

## Prompt 2: Case Study Template & Dynamic Route

**Requirements:** CONT-02
**Files created/modified:**
- `src/app/case-studies/[slug]/page.tsx` (create)
- `src/app/case-studies/page.tsx` (create)
- `src/components/case-study-header.tsx` (create)

### Context

The content utility library (`src/lib/content.ts`) and types (`src/lib/content.types.ts`) exist from Prompt 1. The existing `src/lib/metadata.ts` has a `generatePageMetadata()` helper that accepts `{ title, description, path, ogImage }`. Layout primitives available: `Container` (`@/components/layout/container`), `Section` (`@/components/layout/section`), `PageHeader` (`@/components/layout/page-header`).

### Actions

**1. Create `src/app/case-studies/[slug]/page.tsx`** -- the dynamic route for individual case studies:

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import { CaseStudyHeader } from '@/components/case-study-header'
import { Container } from '@/components/layout/container'

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

  const { default: MDXContent } = await import(
    `@content/case-studies/${slug}.mdx`
  )

  return (
    <article>
      <CaseStudyHeader frontmatter={study.frontmatter} />
      <Container>
        <div className="prose prose-lg prose-neutral mx-auto max-w-3xl
          prose-headings:font-display prose-headings:tracking-tight
          prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-img:shadow-md
          py-12 md:py-16">
          <MDXContent />
        </div>
      </Container>
    </article>
  )
}
```

Important: The dynamic import uses `@content/case-studies/${slug}.mdx` with the path alias added in Prompt 1. If the `@content` alias causes issues with dynamic imports (webpack needs to resolve the glob pattern), fall back to a relative path: `` await import(`../../../content/case-studies/${slug}.mdx`) `` or use `@/../../content/case-studies/${slug}.mdx`. Test and use whichever resolves correctly.

**2. Create `src/components/case-study-header.tsx`** -- a header component displaying project metadata above the prose content. It should render:
- Breadcrumbs: Home > Case Studies > {title} (use the existing PageHeader pattern or build custom)
- Hero image (full-width, using `next/image` with `fill` and `priority`)
- Title (h1, using font-display)
- Project metadata grid: projectType, location, client (if present), architect (if present), services (as tags/badges)
- Excerpt as a lead paragraph

Style with the existing design system: oklch orange palette, Inter body text, Playfair Display for display headings. Use `Container` and `Section` from `@/components/layout`.

**3. Create `src/app/case-studies/page.tsx`** -- the case studies listing/index page:
- Use `PageHeader` with title "Case Studies" and subtitle about project portfolio
- Call `getAllCaseStudies()` to get all non-draft case studies
- Render as a responsive grid of cards (1 col mobile, 2 cols md, 3 cols lg)
- Each card shows: hero image (aspect-[4/3]), category badge, title, excerpt, link to `/case-studies/{slug}`
- Use `generatePageMetadata` for the page metadata
- If no case studies exist yet, show a placeholder message (this is temporary until migration in Prompt 6)

**4. Remove the test file** `content/case-studies/example.mdx` created in Prompt 1. It was only for pipeline verification.

### Acceptance Criteria

- Visiting `/case-studies` shows the listing page with correct layout, metadata, and breadcrumbs
- When case study MDX files exist (after Prompt 6), visiting `/case-studies/{slug}` renders the full case study with header, metadata grid, hero image, and prose content
- `npm run build` succeeds with zero TypeScript errors
- `generateStaticParams` correctly discovers all non-draft MDX files in `content/case-studies/`
- Page metadata (title, description, OG tags) is set correctly from frontmatter

---

## Prompt 3: Insights Template & Dynamic Route

**Requirements:** CONT-05
**Files created/modified:**
- `src/app/insights/[slug]/page.tsx` (create)
- `src/app/insights/page.tsx` (create)
- `src/components/insight-header.tsx` (create)

### Context

Same content utilities from Prompt 1. The pattern is identical to case studies but with different frontmatter fields (date, author, category, tags, readingTime). The insights listing page needs category filtering (quick-bites vs articles).

### Actions

**1. Create `src/app/insights/[slug]/page.tsx`** -- dynamic route for individual articles:

Follow the exact same pattern as the case study page route, but:
- Import `getAllInsights`, `getInsightBySlug` from `@/lib/content`
- Display `InsightHeader` (see below) instead of `CaseStudyHeader`
- Include reading time display (from `ContentItem.readingTime`)
- Use `type: 'article'` in the OpenGraph metadata

```typescript
// Key differences from case study page:
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) return { title: 'Not Found' }

  return {
    ...generatePageMetadata({
      title: insight.frontmatter.title,
      description: insight.frontmatter.excerpt,
      path: `/insights/${slug}`,
      ogImage: insight.frontmatter.heroImage,
    }),
    openGraph: {
      type: 'article',
      publishedTime: insight.frontmatter.date,
      modifiedTime: insight.frontmatter.updated,
      authors: [insight.frontmatter.author],
      tags: insight.frontmatter.tags,
    },
  }
}
```

**2. Create `src/components/insight-header.tsx`**:
- Breadcrumbs: Home > Insights > {title}
- Category badge (styled differently for quick-bites vs articles)
- Title (h1, font-display)
- Author name, published date (formatted as "14 February 2026"), reading time (e.g., "5 min read")
- Hero image (if present)
- Tags displayed as small inline badges below the meta line

**3. Create `src/app/insights/page.tsx`** -- insights listing page:
- PageHeader with title "Insights" and subtitle
- `getAllInsights()` for the article list
- Category filter tabs at top: "All", "Quick Bites", "Articles" -- these should be client-side filtering (mark the filter component as `'use client'`; the page itself stays as server component that passes data down)
- Each article card: hero image, category badge, title, excerpt, author, date, reading time, link
- Responsive grid: 1 col mobile, 2 cols md, 3 cols lg
- Sorted by date descending (already handled by `getAllInsights()`)

### Acceptance Criteria

- `/insights` page renders with category filter tabs, correct layout, and responsive grid
- `/insights/{slug}` renders full article with header, author, date, reading time, tags, and prose content
- Category filter switches between All/Quick Bites/Articles without page reload
- Article OpenGraph metadata includes `type: 'article'`, `publishedTime`, and `authors`
- `npm run build` succeeds

---

## Prompt 4: Interactive MDX Components

**Requirements:** CONT-08
**Files created/modified:**
- `src/components/mdx/callout.tsx` (create)
- `src/components/mdx/project-stats.tsx` (create)
- `src/components/mdx/image-gallery.tsx` (create)
- `src/components/mdx/timeline.tsx` (create)
- `src/components/mdx/stat-card.tsx` (create)
- `src/components/mdx/before-after.tsx` (create)
- `src/components/mdx/index.ts` (create)
- `mdx-components.tsx` (modify -- add custom components)

### Context

These components are used inside MDX files via import statements. They must work within the `prose` context (use `not-prose` class to break out of typography styles where needed). All styling uses the existing design system tokens: oklch orange primary, Inter body, Playfair Display for headings.

### Actions

**1. Create each MDX component** following the patterns from RESEARCH.md:

**`src/components/mdx/callout.tsx`** -- Alert/highlight boxes with types: info, warning, tip, important. Border-left-4 style with colour-coded backgrounds. Uses `not-prose` to avoid typography conflicts.

**`src/components/mdx/project-stats.tsx`** -- Grid of key-value stat pairs for case study metadata (type, location, client, architect, engagement, value). Renders as a bordered card with 2-3 column grid. Uses `not-prose`.

**`src/components/mdx/image-gallery.tsx`** -- Responsive image grid using `next/image` with `fill` and `object-cover`. Accepts `images` array of `{src, alt}` objects and optional `columns` prop (2 or 3). Each image has `aspect-[4/3]` container with `overflow-hidden rounded-lg`.

**`src/components/mdx/timeline.tsx`** -- Vertical timeline component for project milestones. Two exports: `Timeline` (wrapper with vertical line) and `TimelineItem` (individual milestone with dot, title, date, description children). Uses `not-prose`.

**`src/components/mdx/stat-card.tsx`** -- Single stat display (value + label). Primary-600 large value text, muted-foreground label. Used for standalone metrics inline.

**`src/components/mdx/before-after.tsx`** -- Side-by-side image comparison. Two `next/image` components in a flex/grid layout with "Before" and "After" labels. Responsive: stacks on mobile, side-by-side on md+. Uses `not-prose`.

**`src/components/mdx/index.ts`** -- Barrel export of all components.

**2. Update `mdx-components.tsx`** to register all custom components in the `useMDXComponents` return object. This makes them globally available in all MDX files without per-file imports:

```typescript
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { Callout } from '@/components/mdx/callout'
import { ProjectStats } from '@/components/mdx/project-stats'
import { ImageGallery } from '@/components/mdx/image-gallery'
import { Timeline, TimelineItem } from '@/components/mdx/timeline'
import { StatCard } from '@/components/mdx/stat-card'
import { BeforeAfter } from '@/components/mdx/before-after'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        src={props.src as string}
        alt={props.alt || ''}
        width={1200}
        height={630}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
        className="rounded-lg"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/')) {
        return <Link href={href} {...props}>{children}</Link>
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    },
    Callout,
    ProjectStats,
    ImageGallery,
    Timeline,
    TimelineItem,
    StatCard,
    BeforeAfter,
    ...components,
  }
}
```

**3. Create a test MDX file** at `content/case-studies/_test-components.mdx` (draft: true) that uses every custom component to verify they render correctly. Include one of each component type with realistic placeholder content. Verify each component renders in the dev server by temporarily setting draft: false and visiting the page.

**4. Delete the test file** after verification.

### Acceptance Criteria

- All 6 custom components render correctly inside MDX prose content
- `not-prose` classes prevent typography conflicts for block-level components
- `ImageGallery` renders responsive grid with `next/image` and correct `sizes` attribute
- `Timeline` renders vertical line with connected milestone dots
- `BeforeAfter` stacks on mobile, side-by-side on desktop
- Components are globally available in MDX files via `mdx-components.tsx` registration (no per-file imports needed for registered components)
- `npm run build` succeeds

---

## Prompt 5: Image Migration & Organization

**Requirements:** MIG-05
**Files created/modified:**
- `scripts/migrate-images.ts` (create)
- `public/images/case-studies/` (create directory tree with images)
- `public/images/insights/` (create directory tree with images)
- `public/images/services/` (create directory with images)
- `public/images/shared/` (create directory with images)

### Context

118 images exist in `content/migration/images/`. Many are WordPress-generated duplicates at different resolutions (e.g., `Vibe-Encumbrance-11.jpg` and `Vibe-Encumbrance-11-1024x683.jpg`). The rule: keep only the highest-resolution original (no dimension suffixes like `-1024x576`, `-768x432`). Do NOT pre-convert to WebP -- `next/image` handles format negotiation via the already-configured `sharp`.

### Actions

**1. Create `scripts/migrate-images.ts`** -- a Node.js script that:
- Reads all files from `content/migration/images/`
- Deduplicates: groups images by base name (strip dimension suffixes and format variants), keeps only the highest-resolution original
- Copies (not moves -- keep originals as backup) to organized `public/images/` structure
- Uses `sharp` to read image dimensions for logging/verification
- Maps images to case studies and insights by filename prefix:

**Image-to-project mapping** (derive from filenames):
```
Case Studies:
  GP_DIGEERS_*, Granville-Diggers-* → case-studies/granville-diggers/
  Calibre-*, Calibre-Cooper-* → case-studies/calibre-cooper/
  Vibe-*, Vibe-Encumbrance-* → case-studies/vibe-hotel/
  sydney-water-filtration-* → case-studies/sydney-water/
  Health-Project-Management-* → case-studies/health-infrastructure/
  231-elizabeth-*, 231-Elizabeth-*, 06_231_Elizabeth_* → case-studies/231-elizabeth-street/
  Mac-Park-* → case-studies/glass-house-macquarie-park/
  Project-Management-Delivery-Newcastle-* → case-studies/newcastle-fit-out/
  Strategic-Rezoning-Planning-Proposal-Pete-Island-* → case-studies/pete-island/
  Construction-Project-Management-* → case-studies/construction-pm/ (generic project shots)

Insights:
  balance-vs-purpose* → insights/beyond-balance/
  Boutique-Residential-Development-* → insights/boutique-residential/
  Passion-for-Delivering-Projects* → insights/passion-for-delivering/
  Ground-anchors-* → insights/ground-anchors/
  inside-mba-bc3-contract* → insights/mba-bc3-contract/
  client-side-project-management* → insights/client-side-pm/
  Property-Built-environment* → insights/beyond-projects/
  Granville-Diggers-Commencement* → insights/granville-diggers-commencement/ (for the origin/structured articles)

Shared:
  NathanMacCullum* → shared/team/
  AboutUpscale* → shared/
  Upscale-Project-Management-Logo* → shared/
  kenny-gunawan* → shared/team/
  cropped-Gemini_Generated_Image* → shared/ (current WordPress favicon/logo)
  Resi-Const-* → shared/ (generic residential construction)

Services:
  02-Commercial-Work-for-Government-Agencies* → services/

Logos (client logos):
  64f6f8fe37dca985ad02285b_sydney-water-logo* → shared/logos/
  64fa3bf4cff2ce1546242c71_Health-Infrastructure* → shared/logos/
  64fa3d35deed167eba9e32df_Blacktown-city-council* → shared/logos/
  64fbbb01c0f28079cb9b2eeb_School_Infrastructure_logo* → shared/logos/
  64fbbb2319ae7b46214f2a45_NSW-Ambulance_logo* → shared/logos/

Unknown (numbered files 11-17):
  11.jpg, 12.jpg, 14.jpg, 15.jpg, 16.jpg, 17.jpg → These are likely Crosslife Church photos (from the Sept 2025 upload batch). Map to case-studies/crosslife-church/
  image-14.png → shared/ (unknown, keep for manual review)
```

**2. Run the migration script:**
```bash
npx tsx scripts/migrate-images.ts
```

**3. Verify all images copied correctly** -- check file counts per directory, spot-check dimensions, confirm no broken/zero-byte files.

**4. Rename images within each project directory** to follow the naming convention:
- `hero.jpg` for the primary/hero image of each case study
- `gallery-01.jpg`, `gallery-02.jpg` etc. for additional gallery images
- `detail-{descriptive-name}.jpg` for specific named shots

This can be done within the script or as a manual step after the initial copy.

### Acceptance Criteria

- `public/images/case-studies/` contains subdirectories for each case study with deduplicated, high-resolution originals
- `public/images/insights/` contains subdirectories for articles with hero images
- `public/images/shared/` contains team photos, logos, and shared assets
- No WordPress thumbnail variants (files with `-1024x576`, `-768x432` etc. in the name) in the output
- All images are accessible via `http://localhost:3000/images/{path}` in the dev server
- `next/image` correctly serves AVIF/WebP versions when requested (check Response headers in browser dev tools)
- Original files still exist in `content/migration/images/` (not moved, copied)
- Total unique images in `public/images/` is roughly 60-70 (after deduplication of the 118 source files)

---

## Prompt 6: Case Study Content Migration

**Requirements:** CONT-03, MIG-03
**Files created/modified:**
- `content/case-studies/granville-diggers-club-development.mdx` (create)
- `content/case-studies/granville-diggers-club-development-origin.mdx` (create)
- `content/case-studies/structured-for-success-delivering-granville-diggers-club-via-as4902-and-separable-portions.mdx` (create)
- `content/case-studies/crosslife-church-asquith-development.mdx` (create)
- `content/case-studies/calibre-cooper-street-residential-apartments-surry-hills.mdx` (create)
- `content/case-studies/navigating-encumbrance-vibe-hotel-darling-harbour.mdx` (create)
- `content/case-studies/major-laboratory-relocation-future-proofing-sydney-waters-filtration-capabilities.mdx` (create)
- `content/case-studies/health-project-management-in-regional-emergency-infrastructure.mdx` (create)
- `content/case-studies/delivering-modern-government-workspaces-at-231-elizabeth-street.mdx` (create)
- `content/case-studies/expanding-government-tenancy-at-glass-house-macquarie-park.mdx` (create)
- `content/case-studies/project-management-delivery-in-the-final-stretch-newcastle-office-fit-out.mdx` (create)
- `content/case-studies/strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney.mdx` (create)
- `content/case-studies/private-architectural-practice-combining-design-vision-and-construction-project-management.mdx` (create)
- `content/case-studies/delivering-complexity-with-clarity.mdx` (create)

### Context

The WordPress crawl data is at `content/migration/crawl-data.json`. The live WordPress site at `upscalepm.com.au` has the full content for each case study. Images have been organized in `public/images/case-studies/` by Prompt 5. The `CaseStudyHeader` component and dynamic route from Prompt 2 are ready. Interactive MDX components from Prompt 4 are available.

### Actions

**For each of the 14 case studies, create an MDX file by:**

1. **Fetching the content** from the live WordPress page at `upscalepm.com.au/{old-slug}/`
2. **Writing YAML frontmatter** following the `CaseStudyFrontmatter` schema. Use the metadata from `crawl-data.json` (title, metaDescription) and supplement with details visible on the page (location, category, projectType, services, architect, client). Set `heroImage` to the primary image path in `public/images/case-studies/{project-slug}/hero.jpg`. Set `order` based on display priority (Granville Diggers 1-3, then major projects, then smaller ones). Set `draft: false`.
3. **Converting the body content** to clean Markdown. Remove all WordPress/Elementor markup. Convert headings, paragraphs, lists, and images to standard Markdown syntax. Update all image references to point to `public/images/case-studies/{project-slug}/` paths.
4. **Adding MDX components** where appropriate:
   - `<ProjectStats>` near the top with project metadata
   - `<ImageGallery>` for multi-image sections using `frontmatter.images`
   - `<Callout>` for important notes or highlights
   - `<Timeline>` for projects with clear phase progression
5. **Updating internal links** to point to new URL structure (e.g., `/case-studies/granville-diggers-club-development` not the old WordPress URL)
6. **Ensuring slug in the filename matches the redirect destination** in `content/migration/redirects.json`

**Slug-to-redirect mapping** (filename minus `.mdx` MUST match the slug after `/case-studies/` in redirects.json):
```
granville-diggers-club-development.mdx
granville-diggers-club-development-origin.mdx
structured-for-success-delivering-granville-diggers-club-via-as4902-and-separable-portions.mdx
crosslife-church-asquith-development.mdx
calibre-cooper-street-residential-apartments-surry-hills.mdx
navigating-encumbrance-vibe-hotel-darling-harbour.mdx
major-laboratory-relocation-future-proofing-sydney-waters-filtration-capabilities.mdx
health-project-management-in-regional-emergency-infrastructure.mdx
delivering-modern-government-workspaces-at-231-elizabeth-street.mdx
expanding-government-tenancy-at-glass-house-macquarie-park.mdx
project-management-delivery-in-the-final-stretch-newcastle-office-fit-out.mdx
strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney.mdx
private-architectural-practice-combining-design-vision-and-construction-project-management.mdx
delivering-complexity-with-clarity.mdx
```

Check `content/migration/redirects.json` for the exact destination slugs. The filename (minus `.mdx`) MUST match the slug after `/case-studies/` in the redirect destination.

**Image reference pattern in MDX:**
```mdx
![Granville Diggers Club exterior](/images/case-studies/granville-diggers/hero.jpg)
```

Or for gallery sections:
```mdx
<ImageGallery images={[
  { src: "/images/case-studies/granville-diggers/gallery-01.jpg", alt: "Reception area" },
  { src: "/images/case-studies/granville-diggers/gallery-02.jpg", alt: "Bar design" },
]} />
```

### Acceptance Criteria

- All 14 case study MDX files exist in `content/case-studies/` with correct frontmatter
- Each file has `draft: false` and a valid `order` number
- `/case-studies` listing page shows all 14 case studies as cards with titles, excerpts, and hero images
- Clicking any card navigates to `/case-studies/{slug}` and renders the full case study
- No broken image references (all `<img>` and `next/image` sources resolve to files in `public/images/`)
- No internal links pointing to old WordPress URLs
- `<ProjectStats>`, `<ImageGallery>`, and other MDX components render correctly within case study content
- `npm run build` succeeds (all slugs generate static pages)
- Redirects from old WordPress URLs (`/granville-diggers-club-development/`) correctly 301 to new URLs (`/case-studies/granville-diggers-club-development`)

---

## Prompt 7: Insights Content Migration

**Requirements:** CONT-06, MIG-04
**Files created/modified:**
- `content/insights/city-of-sydney-da-explained-challenges-delays-and-solutions.mdx` (create)
- `content/insights/tender-evaluation-how-we-choose-the-right-contractor.mdx` (create)
- `content/insights/commercial-tenant-fit-out-who-pays-for-upgrades-and-compliance.mdx` (create)
- `content/insights/construction-contracts-for-your-refurbishment-project.mdx` (create)
- `content/insights/construction-variations-and-design-freeze.mdx` (create)
- `content/insights/insights-into-floor-space-ratio.mdx` (create)
- `content/insights/from-architect-to-project-manager-first-project.mdx` (create)
- `content/insights/inside-the-mba-bc3-contract.mdx` (create)
- `content/insights/ground-anchors-and-license-access-deeds.mdx` (create)
- `content/insights/client-side-project-management-sydney.mdx` (create)
- `content/insights/boutique-residential-development-lessons-from-the-rushcutters-sydney.mdx` (create)
- `content/insights/passion-for-delivering-projects.mdx` (create)
- `content/insights/beyond-balance-finding-meaning-in-the-demands-of-project-delivery.mdx` (create)
- `content/insights/beyond-projects-building-for-health-community-and-change.mdx` (create)

### Context

Same approach as case study migration. The WordPress crawl data and live site have the source content. Images organized in `public/images/insights/`. The `InsightHeader` component and dynamic route from Prompt 3 are ready.

### Actions

**For each of the 14 insights articles, create an MDX file by:**

1. **Fetching the content** from `upscalepm.com.au/{old-slug}/`
2. **Writing YAML frontmatter** following the `InsightFrontmatter` schema:
   - `title`: from the page h1/title
   - `excerpt`: from meta description or first paragraph
   - `date`: publication date (check WordPress page source or crawl data)
   - `author`: "Noel Yaxley" (all articles are by the founder)
   - `category`: "quick-bites" for the 10 Quick Bites articles, "articles" for the 4 longer pieces (boutique-residential, passion-for-delivering, beyond-balance, beyond-projects)
   - `tags`: relevant topic tags (e.g., ["tendering", "procurement"], ["contracts", "construction"])
   - `heroImage`: path to hero image in `public/images/insights/{article-slug}/hero.jpg`
   - `draft: false`
3. **Converting body content** to clean Markdown
4. **Adding MDX components** where helpful -- `<Callout>` for key takeaways, `<StatCard>` for metrics, links to related case studies
5. **Updating all internal links** to new URL structure
6. **Ensuring filenames match redirect slugs** from `content/migration/redirects.json`

### Acceptance Criteria

- All 14 insight MDX files exist in `content/insights/` with correct frontmatter
- `/insights` listing page shows all 14 articles with correct category badges, dates, and reading times
- Category filter tabs correctly separate Quick Bites (10) from Articles (4)
- Clicking any article card navigates to `/insights/{slug}` and renders the full article
- Author is "Noel Yaxley" on all articles
- Reading time is calculated and displayed (e.g., "3 min read")
- No broken images or internal links
- `npm run build` succeeds
- Old WordPress URLs redirect correctly via 301

---

## Prompt 8: Service Page Copy Extraction

**Requirements:** MIG-02
**Files created/modified:**
- `src/lib/services.ts` (create)
- `src/lib/services.types.ts` (create)

### Context

Service pages are NOT MDX -- they will be React components built in Phase 3. This prompt extracts the copy/content from the 5 WordPress service pages and stores it as structured TypeScript data that Phase 3 can consume directly.

The 5 service pages and their old URLs:
1. Feasibility and Advisory -- `/feasibility-and-advisory/`
2. Design Management -- `/design-management/`
3. Design Approval (DA Approval) -- `/da-approval/`
4. Tender Assessment -- `/tender-assessment/`
5. Construction Superintendent -- `/construction-superintendent/`

### Actions

**1. Create `src/lib/services.types.ts`** with the service data type:

```typescript
export interface ServicePage {
  slug: string
  title: string
  subtitle: string
  description: string  // SEO meta description
  heroImage: string
  sections: Array<{
    heading: string
    body: string        // Can contain simple HTML (paragraphs, lists)
    image?: string
  }>
  benefits: Array<{
    title: string
    description: string
  }>
  ctaText: string
  ctaDescription: string
  relatedCaseStudies: string[]  // slugs of related case studies
}
```

**2. Create `src/lib/services.ts`** -- a data file exporting all 5 service pages:

```typescript
import type { ServicePage } from './services.types'

export const services: ServicePage[] = [
  {
    slug: 'feasibility-advisory',
    title: 'Feasibility and Advisory',
    subtitle: '...',
    // ... full content extracted from WordPress
  },
  // ... 4 more services
]

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug)
}

export function getAllServices(): ServicePage[] {
  return services
}
```

**3. For each service page**, visit the WordPress page at `upscalepm.com.au/{old-slug}/` and extract:
- Page title and subtitle/tagline
- Meta description
- All content sections (heading + body text)
- Benefit/feature lists
- CTA text
- Any mentioned case studies that relate to the service

Preserve the meaning and structure of the content. Clean up any WordPress/Elementor artifacts. Write as clean TypeScript string literals.

**4. Map related case studies** to each service:
```
feasibility-advisory → granville-diggers-club-development, pete-island-rezoning, boutique-residential
design-management → crosslife-church-asquith, 231-elizabeth-street, glass-house-macquarie-park
da-approval → pete-island-rezoning, calibre-cooper-street
tender-assessment → vibe-hotel-darling-harbour, newcastle-office-fit-out
construction-superintendent → vibe-hotel-darling-harbour, sydney-water-filtration, health-emergency-infrastructure
```

(These are educated guesses based on project types. Verify against the actual WordPress content and adjust.)

### Acceptance Criteria

- `src/lib/services.ts` exports data for all 5 service pages
- `getServiceBySlug('feasibility-advisory')` returns the full service data
- `getAllServices()` returns all 5 services
- All content is clean text (no WordPress HTML artifacts, no Elementor classes)
- Each service has at least 2 content sections, 3 benefits, and 1+ related case study
- TypeScript compiles without errors
- This data is ready for Phase 3 to consume when building the actual service page components

---

## Verification Checklist

After all 8 prompts are complete, verify the phase success criteria:

1. **MDX pipeline works end-to-end:** Create a new `.mdx` file in `content/case-studies/` or `content/insights/` with valid frontmatter. Run `npm run dev`. The file should automatically appear in the listing page and be accessible at its slug URL with correct typography, layout, and metadata. Delete the test file afterward.

2. **All case studies migrated:** Visit `/case-studies` -- should show 14 project cards. Click each one -- should render full case study with hero image, project stats, prose content, and gallery images. No broken images.

3. **All insights migrated:** Visit `/insights` -- should show 14 articles. Category filters should show 10 Quick Bites and 4 Articles. Each article should have author, date, reading time, and tags. No broken images.

4. **Interactive MDX components work:** At least 2-3 case studies should use `<ProjectStats>`, `<ImageGallery>`, and/or `<Timeline>` components. These should render as styled, interactive elements within the prose content.

5. **Images optimized:** Open browser dev tools on any case study or article page. Check the Network tab for image requests -- `next/image` should be serving images with `Content-Type: image/avif` or `image/webp` (depending on browser support). No 404s on image requests.

6. **Build passes:** `npm run build` should complete with zero errors. All static pages should be generated.

7. **Redirects work:** Test a few old WordPress URLs (e.g., `/granville-diggers-club-development/`, `/tender-evaluation-how-we-choose-the-right-contractor/`) -- should 301 redirect to the new URL structure.

8. **Service copy ready:** `import { services } from '@/lib/services'` should provide all 5 service page data objects for Phase 3 consumption.
