# Phase 1: Foundation & Design System

## Overview

Set up the Next.js project from scratch with Tailwind v4, shadcn/ui, custom typography, responsive layout primitives, SEO groundwork, and the WordPress content crawl. After this phase, every subsequent page can be built on a consistent, well-configured foundation.

**Requirements covered:** DSGN-01, DSGN-02, DSGN-03, DSGN-09, SEO-01, SEO-05, DEPL-01, MIG-01

**Success criteria (from ROADMAP.md):**
1. `npm run dev` serves Next.js with Tailwind v4, custom fonts (no FOUT), shadcn/ui rendering
2. Test page demonstrates responsive layout across mobile/tablet/desktop with consistent spacing and typography
3. Favicon in browser tab, default OG image configured
4. WordPress site fully crawled, complete 301 redirect map exists
5. Vercel project created, preview deployments work on push

---

## Prompts

### Prompt 1: Project Scaffolding & Core Dependencies

**Requirements:** DSGN-01 (partial), DEPL-01 (partial)
**Dependencies:** None

Scaffold the Next.js project and install all dependencies. This is the foundation everything else builds on.

**Instructions:**

1. **Initialize Next.js project** in the current `/Users/noelyaxley/upscalepm` directory. Since the directory already exists with `.git` and `.planning`, run the scaffolding into a temp directory and move files:

```bash
cd /tmp && npx create-next-app@latest upscalepm-init --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

Then copy the generated files (excluding `.git`) into `/Users/noelyaxley/upscalepm/`. Preserve the existing `.git` and `.planning` directories.

2. **Install all project dependencies** (only what is needed for Phase 1 right now, plus core packages that every phase needs):

```bash
# Core MDX (needed for next.config.mjs setup even though MDX content is Phase 2)
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx

# MDX plugins
npm install gray-matter remark-gfm

# Typography plugin for MDX prose styling
npm install @tailwindcss/typography

# Animation (install now, configure in Phase 6)
npm install gsap @gsap/react lenis

# HubSpot (install now, use in Phase 4)
npm install @hubspot/api-client

# Forms & validation (install now, use in Phase 4)
npm install react-hook-form zod @hookform/resolvers

# SEO structured data types
npm install schema-dts

# Image optimization for production
npm install sharp

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

3. **Initialize shadcn/ui** with "new-york" style, neutral base color, and CSS variables enabled:

```bash
npx shadcn@latest init
```

When prompted:
- Style: New York
- Base color: Neutral (we will override with orange primary)
- CSS variables: Yes

Then install initial shadcn components we will use in Phase 1:

```bash
npx shadcn@latest add button card
```

4. **Configure `next.config.mjs`** for MDX support and image optimization:

```javascript
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

Note: Use empty arrays for plugins initially. remark-gfm will be added in Phase 2 when MDX content is created. String-based plugin config can cause Turbopack issues -- test with both `next dev` and `next dev --turbopack`.

5. **Create `mdx-components.tsx`** at project root (required by @next/mdx, build fails without it):

```typescript
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

6. **Create `.prettierrc`** at project root:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

7. **Create `.gitignore` additions** (merge with the create-next-app generated one):

Add these entries if not already present:
```
# Environment
.env
.env.local
.env.production

# Vercel
.vercel

# Editor
.vscode/settings.json
```

8. **Create the initial directory structure** for the full project (empty directories with `.gitkeep` where needed):

```
src/
  app/           (already exists from create-next-app)
  components/
    ui/          (already exists from shadcn init)
    layout/
    sections/
    animation/
    geometric/
    forms/
    mdx/
    seo/
    hubspot/
  lib/           (already exists from shadcn init)
  actions/
content/
  case-studies/
  insights/
public/
  images/
```

9. **Verify the setup:**

```bash
npm run dev
# Should start on localhost:3000 without errors
npm run build
# Should complete without errors
```

**Acceptance criteria:**
- [ ] `npm run dev` starts Next.js on localhost:3000 without errors
- [ ] `npm run build` completes without errors
- [ ] shadcn/ui Button and Card components exist in `src/components/ui/`
- [ ] `mdx-components.tsx` exists at project root
- [ ] `next.config.mjs` has MDX and AVIF/WebP config
- [ ] All directories in the structure above exist
- [ ] `.prettierrc` exists with tailwind plugin configured
- [ ] Git commit: `feat(phase-1): scaffold Next.js project with core dependencies`

---

### Prompt 2: Design System -- Colour Palette, Typography & Spacing Tokens

**Requirements:** DSGN-01, DSGN-03
**Dependencies:** Prompt 1

Create the complete design system: colour tokens, typography scale, spacing system, and custom font configuration. This defines the visual language for the entire site.

**Instructions:**

1. **Configure custom font with `next/font`** in `src/app/layout.tsx`.

Use **Inter** as the primary font (clean, professional, excellent readability for consultancy) and **Instrument Serif** or **Playfair Display** as the display/heading font for contrast and premium feel.

```typescript
// src/app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

The `display: 'swap'` strategy shows fallback font immediately, swaps to custom font when loaded. This prevents FOIT (Flash of Invisible Text). Combined with next/font's automatic self-hosting and preloading, there should be no FOUT either.

2. **Set up Tailwind v4 CSS-first design tokens** in `src/app/globals.css`.

Tailwind v4 uses CSS-first configuration. Replace the default globals.css entirely:

```css
@import "tailwindcss";
@import "@tailwindcss/typography";

/*
 * UpScalePM Design System
 * Colour palette, typography, spacing tokens
 */

@theme {
  /* ---- Colour Palette ---- */

  /* Orange primary (consistent with upscale.build SaaS) */
  --color-primary-50: oklch(0.98 0.02 65);
  --color-primary-100: oklch(0.95 0.04 65);
  --color-primary-200: oklch(0.90 0.08 65);
  --color-primary-300: oklch(0.82 0.12 60);
  --color-primary-400: oklch(0.75 0.16 55);
  --color-primary-500: oklch(0.65 0.19 50);   /* Main brand orange */
  --color-primary-600: oklch(0.58 0.18 48);
  --color-primary-700: oklch(0.50 0.16 45);
  --color-primary-800: oklch(0.42 0.13 43);
  --color-primary-900: oklch(0.35 0.10 40);
  --color-primary-950: oklch(0.25 0.07 38);

  /* Neutral greys (warm-tinted to complement orange) */
  --color-neutral-50: oklch(0.985 0.002 80);
  --color-neutral-100: oklch(0.97 0.003 80);
  --color-neutral-200: oklch(0.92 0.004 80);
  --color-neutral-300: oklch(0.87 0.005 80);
  --color-neutral-400: oklch(0.70 0.005 80);
  --color-neutral-500: oklch(0.55 0.005 80);
  --color-neutral-600: oklch(0.45 0.005 80);
  --color-neutral-700: oklch(0.35 0.005 80);
  --color-neutral-800: oklch(0.25 0.005 80);
  --color-neutral-900: oklch(0.18 0.005 80);
  --color-neutral-950: oklch(0.12 0.005 80);

  /* Semantic colours */
  --color-background: var(--color-neutral-50);
  --color-foreground: var(--color-neutral-950);
  --color-muted: var(--color-neutral-100);
  --color-muted-foreground: var(--color-neutral-500);
  --color-border: var(--color-neutral-200);
  --color-ring: var(--color-primary-500);
  --color-accent: var(--color-primary-50);
  --color-accent-foreground: var(--color-primary-900);

  /* ---- Typography ---- */
  /* NOTE: Do NOT redefine --font-sans or --font-display here.
     next/font sets these CSS variables via className on <html>.
     Tailwind v4 picks them up automatically. Redefining them
     here would create a circular reference. */
  --font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace;

  /* Type scale (major third -- 1.25 ratio) */
  --text-xs: 0.75rem;       /* 12px */
  --text-sm: 0.875rem;      /* 14px */
  --text-base: 1rem;        /* 16px */
  --text-lg: 1.125rem;      /* 18px */
  --text-xl: 1.25rem;       /* 20px */
  --text-2xl: 1.5rem;       /* 24px */
  --text-3xl: 1.875rem;     /* 30px */
  --text-4xl: 2.25rem;      /* 36px */
  --text-5xl: 3rem;         /* 48px */
  --text-6xl: 3.75rem;      /* 60px */
  --text-7xl: 4.5rem;       /* 72px */

  /* ---- Spacing ---- */
  /* Using Tailwind defaults (0.25rem increments) plus custom section spacing */
  --spacing-section: 6rem;     /* 96px -- vertical padding between major sections */
  --spacing-section-lg: 8rem;  /* 128px -- generous breathing room */

  /* ---- Layout ---- */
  --width-container: 80rem;    /* 1280px max content width */
  --width-content: 48rem;      /* 768px max prose/article width */

  /* ---- Border Radius ---- */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* ---- Transitions ---- */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-base: 200ms;
  --duration-slow: 500ms;
}

/*
 * shadcn/ui CSS variable overrides.
 * shadcn uses --primary, --primary-foreground, etc.
 * We bridge these to our oklch orange palette so all
 * shadcn components (Button default variant, etc.) use orange.
 */
:root {
  --primary: var(--color-primary-500);
  --primary-foreground: white;
  --secondary: var(--color-neutral-100);
  --secondary-foreground: var(--color-neutral-900);
  --destructive: oklch(0.55 0.2 25);
  --destructive-foreground: white;
  --muted: var(--color-muted);
  --muted-foreground: var(--color-muted-foreground);
  --accent: var(--color-accent);
  --accent-foreground: var(--color-accent-foreground);
  --border: var(--color-border);
  --input: var(--color-border);
  --ring: var(--color-ring);
  --background: var(--color-background);
  --foreground: var(--color-foreground);
  --card: var(--color-background);
  --card-foreground: var(--color-foreground);
  --popover: var(--color-background);
  --popover-foreground: var(--color-foreground);
  --radius: var(--radius-lg);
}

/* ---- Base Styles ---- */
@layer base {
  * {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
  }

  /* Display headings use serif font */
  h1, h2 {
    font-family: var(--font-display);
  }

  /* Smooth focus styles */
  :focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
}
```

3. **Create `src/lib/utils.ts`** with the `cn()` utility (should already exist from shadcn init, verify it contains):

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

4. **Update the shadcn components** if the Button and Card installed in Prompt 1 use hardcoded colour classes that conflict with our custom palette. The shadcn "new-york" style uses CSS variables, so they should work with our custom tokens. Verify Button renders with our primary orange when using `variant="default"`.

5. **Create `src/lib/metadata.ts`** -- shared metadata generation helper for consistent SEO across all pages:

```typescript
import { type Metadata } from 'next'

const SITE_URL = 'https://upscalepm.com.au'
const SITE_NAME = 'UpScalePM'
const DEFAULT_DESCRIPTION = 'Client-side project management for property and construction projects. From feasibility through to handover, we protect your time, budget, and quality.'

export function generatePageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  ogImage,
}: {
  title: string
  description?: string
  path?: string
  ogImage?: string
}): Metadata {
  const url = `${SITE_URL}${path}`
  const image = ogImage ?? `${SITE_URL}/images/og-default.jpg`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
```

6. **Configure root layout metadata** in `src/app/layout.tsx`:

```typescript
import { type Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://upscalepm.com.au'),
  title: {
    default: 'UpScalePM | Client-Side Project Management',
    template: '%s | UpScalePM',
  },
  description: 'Client-side project management for property and construction projects. From feasibility through to handover, we protect your time, budget, and quality.',
  openGraph: {
    siteName: 'UpScalePM',
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

**Acceptance criteria:**
- [ ] Custom fonts load on `localhost:3000` -- body text is Inter, H1/H2 headings are Playfair Display (or the display font chosen)
- [ ] No FOUT or FOIT on initial page load (test with hard refresh / incognito)
- [ ] Orange primary colour is visible when rendering a `<Button>` component
- [ ] Tailwind v4 custom colours work: `bg-primary-500`, `text-neutral-900`, etc.
- [ ] `globals.css` uses `@theme` block (Tailwind v4 CSS-first config), NOT a `tailwind.config.js` theme extension
- [ ] `src/lib/metadata.ts` exports `generatePageMetadata` function
- [ ] Root layout has `metadataBase`, title template, and default description
- [ ] Git commit: `feat(phase-1): design system with colour tokens, typography, and spacing`

---

### Prompt 3: Responsive Layout Primitives & Component Library

**Requirements:** DSGN-02, SEO-01 (partial)
**Dependencies:** Prompt 2

Build the reusable layout components that every page will use: Container, Section, Header, Footer. These enforce consistent responsive behaviour, spacing, and semantic HTML structure.

**Instructions:**

1. **Create `src/components/layout/container.tsx`** -- constrains content to max-width with responsive padding:

```typescript
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'main'
  size?: 'default' | 'narrow' | 'wide' | 'full'
}

export function Container({
  children,
  className,
  as: Component = 'div',
  size = 'default',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        {
          'max-w-5xl': size === 'narrow',   // 1024px -- prose, articles
          'max-w-7xl': size === 'default',  // 1280px -- standard content
          'max-w-[90rem]': size === 'wide', // 1440px -- full-bleed sections
          'max-w-none': size === 'full',    // No constraint
        },
        className,
      )}
    >
      {children}
    </Component>
  )
}
```

2. **Create `src/components/layout/section.tsx`** -- standard page section with vertical spacing:

```typescript
import { cn } from '@/lib/utils'
import { Container } from './container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerSize?: 'narrow' | 'default' | 'wide' | 'full'
  id?: string
  background?: 'default' | 'muted' | 'primary' | 'dark'
  spacing?: 'default' | 'compact' | 'generous'
}

export function Section({
  children,
  className,
  containerSize = 'default',
  id,
  background = 'default',
  spacing = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        {
          'py-16 md:py-20 lg:py-24': spacing === 'default',
          'py-10 md:py-12 lg:py-16': spacing === 'compact',
          'py-24 md:py-32 lg:py-40': spacing === 'generous',
        },
        {
          'bg-background': background === 'default',
          'bg-muted': background === 'muted',
          'bg-primary-500 text-white': background === 'primary',
          'bg-neutral-950 text-white': background === 'dark',
        },
        className,
      )}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  )
}
```

3. **Create `src/components/layout/header.tsx`** -- responsive navigation header. Build a professional header with:
   - Logo (text-based for now, image in Phase 3)
   - Desktop nav links (Services, Case Studies, Insights, About, Contact)
   - Mobile hamburger menu (use shadcn Sheet component for slide-out)
   - CTA button ("Start a Project" or "Get in Touch")

Install shadcn Sheet component for mobile menu:
```bash
npx shadcn@latest add sheet
```

The header should:
- Be sticky (`sticky top-0 z-50`) with backdrop blur on scroll
- Have responsive breakpoints: mobile menu below `lg:`, horizontal nav at `lg:` and above
- Use semantic `<header>` and `<nav>` elements
- Include proper `aria-label` attributes for accessibility

Nav links (these define the SEO-informed URL hierarchy per SEO-01):
```
/                     Home
/services             Services overview (links to individual service pages)
/case-studies         Case studies index
/insights             Insights/articles index
/about                About & team
/contact              Contact
```

4. **Create `src/components/layout/footer.tsx`** -- site footer with:
   - Company name and brief description
   - Navigation links (mirror header nav)
   - Contact information (phone, email, location -- Sydney/Newcastle)
   - ABN or business registration
   - Copyright notice with current year
   - Semantic `<footer>` element

5. **Create `src/components/layout/page-header.tsx`** -- reusable page title section for interior pages:

```typescript
interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
}
```

Include breadcrumb navigation (important for SEO-01 internal linking structure). Use `<nav aria-label="Breadcrumb">` with proper markup.

6. **Wire everything into root layout** (`src/app/layout.tsx`):

```typescript
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

7. **Create an index/barrel export** at `src/components/layout/index.ts`:

```typescript
export { Container } from './container'
export { Section } from './section'
export { Header } from './header'
export { Footer } from './footer'
export { PageHeader } from './page-header'
```

**Acceptance criteria:**
- [ ] Header renders on localhost with logo, navigation links, and CTA button
- [ ] Mobile menu opens/closes on screens below `lg:` breakpoint (test in browser DevTools responsive mode)
- [ ] Footer renders with nav links, contact info, and copyright
- [ ] Container component constrains content to max-width with responsive horizontal padding
- [ ] Section component applies consistent vertical spacing
- [ ] PageHeader renders title, optional subtitle, and breadcrumbs
- [ ] Page structure is: sticky Header > main (flex-1) > Footer (always at bottom even on short pages)
- [ ] All layout components use semantic HTML elements (header, nav, main, footer, section)
- [ ] Git commit: `feat(phase-1): responsive layout primitives -- header, footer, container, section`

---

### Prompt 4: Design System Test Page & Typography Showcase

**Requirements:** DSGN-01 (completion), DSGN-02 (validation), DSGN-03 (validation)
**Dependencies:** Prompt 3

Build a test/showcase page that demonstrates the entire design system working together. This page validates all tokens, typography, responsive layouts, and component rendering. It also serves as a reference during development of subsequent phases.

**Instructions:**

1. **Create `src/app/design-system/page.tsx`** -- a comprehensive showcase page. This is a development-only page (we will exclude it from the sitemap later). It should demonstrate:

**Typography section:**
- Every heading level (H1 through H6) with both font families
- Body text at different sizes (text-sm, text-base, text-lg, text-xl)
- Display heading showing the serif font (font-display) at large sizes
- A prose block using `@tailwindcss/typography` prose classes to preview how MDX content will look

**Colour palette section:**
- All primary-50 through primary-950 swatches
- All neutral-50 through neutral-950 swatches
- Semantic colours (background, foreground, muted, border, ring, accent)

**Spacing section:**
- Visual demonstration of the spacing scale
- Section spacing (default, compact, generous) using the Section component

**Component section:**
- shadcn Button (all variants: default, secondary, outline, ghost, destructive; all sizes: sm, default, lg)
- shadcn Card with content
- Container at different sizes (narrow, default, wide)

**Layout section:**
- A mock page layout showing Section > Container > content grid
- Responsive grid: 1 column on mobile, 2 on tablet (`md:`), 3 on desktop (`lg:`)
- PageHeader with breadcrumbs

2. **Add metadata** to the page:

```typescript
export const metadata = {
  title: 'Design System',
  robots: { index: false }, // Don't index this page
}
```

3. **Test responsive behaviour** by resizing the browser. Verify:
- At mobile widths (<640px): single column, reduced padding, mobile-appropriate text sizes
- At tablet widths (640-1023px): 2-column grids where appropriate
- At desktop widths (1024px+): full multi-column layouts, horizontal nav
- Typography remains readable at all sizes

**Acceptance criteria:**
- [ ] Page renders at `localhost:3000/design-system`
- [ ] Typography: H1-H6 headings visible, H1/H2 use display font (serif), H3-H6 use body font (sans)
- [ ] Colours: Orange primary palette visible in swatches, warm neutral greys visible
- [ ] Components: Button variants render with correct colours (default = orange primary)
- [ ] Layout: 3-column grid on desktop, collapses to 1 column on mobile
- [ ] Prose: A block of body text with `prose` classes looks publication-ready
- [ ] Responsive: No horizontal overflow at any viewport width
- [ ] Page has `robots: { index: false }` metadata
- [ ] Git commit: `feat(phase-1): design system test page with typography, colours, and layout showcase`

---

### Prompt 5: Favicon, OG Images & SEO Infrastructure

**Requirements:** DSGN-09, SEO-01
**Dependencies:** Prompt 3 (not-found.tsx imports Section and Button from earlier prompts)

Set up the favicon, default social sharing images, and core SEO files (sitemap.ts, robots.ts, not-found.tsx).

**Instructions:**

1. **Create favicon files.** Next.js App Router supports favicon via the file convention in `src/app/`:

- `src/app/favicon.ico` -- the classic favicon (32x32 or 48x48)
- `src/app/icon.tsx` -- dynamic icon generation using Next.js ImageResponse (optional, for SVG-quality favicons)
- `src/app/apple-icon.tsx` -- Apple touch icon (180x180)

For now, create a simple SVG-based favicon using Next.js `ImageResponse`. Create `src/app/icon.tsx`:

```typescript
import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#c2410c', // Orange-700
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '4px',
          fontWeight: 700,
        }}
      >
        U
      </div>
    ),
    { ...size }
  )
}
```

Create `src/app/apple-icon.tsx` similarly but at 180x180.

2. **Create default OG image** at `src/app/opengraph-image.tsx` using Next.js ImageResponse:

```typescript
import { ImageResponse } from 'next/og'

export const alt = 'UpScalePM - Client-Side Project Management'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #c2410c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ color: '#c2410c', fontSize: 28, marginBottom: 16, fontWeight: 600 }}>
          UpScalePM
        </div>
        <div style={{ color: 'white', fontSize: 56, fontWeight: 700, lineHeight: 1.2, maxWidth: '80%' }}>
          Client-Side Project Management
        </div>
        <div style={{ color: '#a3a3a3', fontSize: 24, marginTop: 24, maxWidth: '70%' }}>
          Protecting your time, budget, and quality from feasibility through to handover.
        </div>
      </div>
    ),
    { ...size }
  )
}
```

Also create `src/app/twitter-image.tsx` that re-exports or mirrors the OG image.

3. **Create `src/app/sitemap.ts`** -- auto-generated sitemap:

```typescript
import { type MetadataRoute } from 'next'

const SITE_URL = 'https://upscalepm.com.au'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages (expand as pages are built in Phase 3)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
  ]

  // TODO Phase 2: Add case study slugs from content/case-studies/
  // TODO Phase 2: Add insight slugs from content/insights/
  // TODO Phase 7: Add location pages

  return staticPages
}
```

4. **Create `src/app/robots.ts`**:

```typescript
import { type MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/design-system'],
      },
    ],
    sitemap: 'https://upscalepm.com.au/sitemap.xml',
  }
}
```

5. **Create `src/app/not-found.tsx`** -- branded 404 page:

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'

export default function NotFound() {
  return (
    <Section spacing="generous">
      <div className="text-center">
        <p className="text-primary-500 text-lg font-semibold">404</p>
        <h1 className="mt-4 text-5xl font-display font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
```

6. **Verify favicon and OG image generation:**

```bash
npm run dev
# Visit localhost:3000 -- favicon should appear in browser tab
# Visit localhost:3000/opengraph-image -- should render OG image
# Visit localhost:3000/sitemap.xml -- should render XML sitemap
# Visit localhost:3000/robots.txt -- should render robots file
# Visit localhost:3000/anything-nonexistent -- should show 404 page
```

**Acceptance criteria:**
- [ ] Favicon appears in the browser tab when visiting localhost:3000
- [ ] Visiting `/opengraph-image` renders a 1200x630 OG image with UpScalePM branding
- [ ] Visiting `/sitemap.xml` returns valid XML with homepage and static page entries
- [ ] Visiting `/robots.txt` returns robots directives with /design-system disallowed
- [ ] Visiting any non-existent URL shows the branded 404 page with "Go home" and "Contact us" buttons
- [ ] Apple touch icon generates at 180x180
- [ ] Git commit: `feat(phase-1): favicon, OG images, sitemap, robots.txt, and 404 page`

---

### Prompt 6: WordPress Content Crawl & 301 Redirect Map

**Requirements:** MIG-01, SEO-05
**Dependencies:** None (can run in parallel with Prompts 1-5)

Crawl the existing WordPress site at upscalepm.com.au and create a complete content export plus 301 redirect map. This is critical to preserve SEO rankings during migration. Do this NOW before any content work begins.

**Instructions:**

1. **Crawl the existing WordPress site** using `curl` and sitemap parsing. We need to capture:
   - Every URL on the site (pages, posts, categories, tag pages, media)
   - Page titles and meta descriptions
   - H1 headings
   - Internal links between pages
   - Image URLs used on each page
   - Any canonical URL tags

Start by fetching the sitemap:
```bash
curl -s https://upscalepm.com.au/sitemap.xml
# Also try: /sitemap_index.xml, /wp-sitemap.xml (WordPress default)
```

If no sitemap exists, crawl by following links from the homepage. Use recursive `curl` or write a Node.js script that:
- Fetches the homepage
- Extracts all internal links (`<a href="...">` pointing to upscalepm.com.au)
- Recursively fetches each discovered page
- Extracts metadata from each page: `<title>`, `<meta name="description">`, `<h1>`, `<link rel="canonical">`, all `<img>` URLs

2. **Export all content to a structured format.** Create `content/migration/` directory with:

- `content/migration/crawl-data.json` -- structured data for every page:
```json
[
  {
    "url": "https://upscalepm.com.au/services/feasibility-advisory/",
    "title": "Feasibility & Advisory | UpScalePM",
    "metaDescription": "...",
    "h1": "Feasibility & Advisory",
    "bodyTextPreview": "First 500 chars of visible text...",
    "internalLinks": ["/services/", "/contact/", "..."],
    "images": ["https://upscalepm.com.au/wp-content/uploads/..."],
    "canonical": "https://upscalepm.com.au/services/feasibility-advisory/",
    "lastModified": "2025-..."
  }
]
```

- `content/migration/url-inventory.md` -- human-readable list of all URLs found

3. **Download all images** from the WordPress site into `content/migration/images/`. These will be optimised and moved to `public/images/` in Phase 2.

```bash
# For each image URL found in the crawl, download to content/migration/images/
mkdir -p content/migration/images
# curl or wget each image
```

4. **Create the 301 redirect map.** Create `content/migration/redirects.json` mapping every old WordPress URL to its new Next.js equivalent:

```json
[
  {
    "source": "/services/feasibility-advisory/",
    "destination": "/services/feasibility-advisory",
    "statusCode": 301
  },
  {
    "source": "/case-studies/granville-diggers/",
    "destination": "/case-studies/granville-diggers",
    "statusCode": 301
  },
  {
    "source": "/quick-bites/",
    "destination": "/insights",
    "statusCode": 301
  }
]
```

Key mapping rules:
- WordPress URLs typically have trailing slashes; Next.js does not by default. Redirect `/page/` to `/page`.
- WordPress post URLs may be `/yyyy/mm/dd/post-slug/` or `/post-slug/`. Map to new structure.
- WordPress category/tag pages should redirect to the closest equivalent (insights index with category filter, or just insights index).
- `/wp-content/uploads/*` image URLs should redirect to new locations or return 410 (gone) if unused.
- Any WordPress admin URLs (`/wp-admin/`, `/wp-login.php`) should NOT be redirected.
- The WordPress RSS feed (`/feed/`) can redirect to insights index.

5. **Implement the redirect map in Next.js.** Add redirects to `next.config.mjs`:

```javascript
const nextConfig = {
  // ... existing config
  async redirects() {
    // Load from JSON file for maintainability
    const redirects = (await import('./content/migration/redirects.json', { with: { type: 'json' } })).default
    return redirects.map(({ source, destination, statusCode }) => ({
      source,
      destination,
      permanent: statusCode === 301,
    }))
  },
}
```

Alternatively, if there are many redirects, put them in `vercel.json` for edge-level redirects (faster):
```json
{
  "redirects": [
    { "source": "/old-path/", "destination": "/new-path", "statusCode": 301 }
  ]
}
```

Choose the approach based on the number of redirects found. Under 50: next.config.mjs is fine. Over 50: use vercel.json.

6. **Create a redirect verification script.** Write a simple Node.js script at `scripts/verify-redirects.js` that:
- Reads the redirect map
- For each redirect, makes an HTTP request to `localhost:3000{source}`
- Verifies it returns a 301/308 status with the correct `Location` header
- Reports any failures

**Acceptance criteria:**
- [ ] `content/migration/crawl-data.json` exists with structured data for every page on upscalepm.com.au
- [ ] `content/migration/url-inventory.md` lists every URL discovered during the crawl
- [ ] `content/migration/images/` contains downloaded copies of all images from the WordPress site
- [ ] `content/migration/redirects.json` maps every old URL to its new equivalent
- [ ] Redirects are implemented in `next.config.mjs` or `vercel.json`
- [ ] Running `npm run dev` and visiting an old URL path (e.g., a WordPress post URL with trailing slash) returns a 301 redirect to the new path
- [ ] `scripts/verify-redirects.js` exists and can validate all redirects
- [ ] No old URL returns a 404 (except /wp-admin/ and similar admin paths)
- [ ] Git commit: `feat(phase-1): WordPress content crawl, image export, and 301 redirect map`

---

### Prompt 7: Vercel Deployment & GitHub Integration

**Requirements:** DEPL-01
**Dependencies:** Prompt 1 (project must exist and build successfully)

Set up the Vercel project, connect it to the GitHub repository, configure the custom domain, and verify preview deployments work.

**Instructions:**

1. **Ensure the repo is on GitHub.** Check if the remote is set:

```bash
git remote -v
```

If no remote, create the repo and push:
```bash
gh repo create noelyaxley/upscalepm --public --source=. --push
```

If remote exists, ensure all work is pushed:
```bash
git push origin main
```

2. **Install and authenticate Vercel CLI:**

```bash
npm install -g vercel
vercel login
```

3. **Link the project to Vercel:**

```bash
vercel link
```

When prompted:
- Set up project: Yes
- Which scope: (your Vercel account)
- Link to existing project: No (create new)
- Project name: upscalepm
- In which directory is your code: ./
- Override settings: No (Next.js auto-detected)

4. **Deploy to Vercel:**

```bash
vercel --prod
```

This creates the production deployment. Note the URL (e.g., `upscalepm.vercel.app`).

5. **Configure custom domain.** Add `upscalepm.com.au` to the Vercel project:

```bash
vercel domains add upscalepm.com.au
```

This will output DNS configuration instructions. **The actual DNS change (pointing upscalepm.com.au to Vercel) happens in Phase 7 at launch.** For now, just verify the domain is configured in Vercel's dashboard.

Also add `www.upscalepm.com.au` and configure it to redirect to the apex domain:

```bash
vercel domains add www.upscalepm.com.au
```

6. **Configure environment variables** on Vercel for later phases. Set up placeholder variables:

```bash
# These are placeholders -- real values will be set when those phases are implemented
vercel env add NEXT_PUBLIC_HUBSPOT_PORTAL_ID production
# Enter: placeholder
vercel env add HUBSPOT_ACCESS_TOKEN production
# Enter: placeholder
```

7. **Verify preview deployments.** Create a test branch, push, and check that Vercel creates a preview:

```bash
git checkout -b test-preview-deploy
echo "// test" >> src/app/page.tsx
git add src/app/page.tsx && git commit -m "test: verify preview deployment"
git push origin test-preview-deploy
```

Wait for Vercel to build. Check:
```bash
vercel ls
# Should show the preview deployment
```

Then clean up:
```bash
git checkout main
git branch -D test-preview-deploy
git push origin --delete test-preview-deploy
```

8. **Configure Vercel preview deployment headers** to prevent Google from indexing preview URLs. Create `vercel.json` at project root (if it does not already exist from the redirects step):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "(?!upscalepm\\.com\\.au).*"
        }
      ],
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex"
        }
      ]
    }
  ]
}
```

This adds `X-Robots-Tag: noindex` to all preview/branch deployment URLs, preventing Google from indexing them.

**Acceptance criteria:**
- [ ] GitHub repository exists at `noelyaxley/upscalepm` with all code pushed
- [ ] Vercel project `upscalepm` exists and is linked to the GitHub repo
- [ ] Production deployment accessible at `upscalepm.vercel.app` (or similar Vercel URL)
- [ ] Custom domain `upscalepm.com.au` is configured in Vercel (DNS change deferred to Phase 7)
- [ ] Pushing to a branch creates a Vercel preview deployment
- [ ] Preview deployments have `X-Robots-Tag: noindex` header
- [ ] `vercel.json` exists with noindex headers for non-production domains
- [ ] Git commit: `feat(phase-1): Vercel deployment with GitHub integration and domain config`

---

## Execution Order

Prompts can be executed in this order. Prompt 6 (WordPress crawl) is independent and can run in parallel with Prompts 1-5 if desired.

```
Prompt 1: Project Scaffolding
  |
  v
Prompt 2: Design Tokens & Typography
  |
  v
Prompt 3: Layout Primitives
  |
  v
Prompt 4: Test Page & Showcase        Prompt 6: WordPress Crawl (independent)
  |                                      |
  v                                      |
Prompt 5: Favicon, OG, SEO Files        |
  |                                      |
  +--------------------------------------+
  |
  v
Prompt 7: Vercel Deployment (depends on everything being committed and building)
```

## Phase Completion Checklist

When all 7 prompts are done, verify:

- [ ] `npm run dev` starts without errors, serves the app on localhost:3000
- [ ] `npm run build` completes without errors
- [ ] Custom fonts (Inter + display serif) load without FOUT/FOIT
- [ ] Orange primary colour palette renders across Button and custom classes
- [ ] Design system test page (`/design-system`) shows typography, colours, spacing, components
- [ ] Responsive layout works: mobile menu, column collapse, spacing adjustments
- [ ] Favicon visible in browser tab
- [ ] `/opengraph-image` renders the default OG image
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` returns valid robots directives
- [ ] 404 page renders for non-existent URLs
- [ ] WordPress content crawled, all images downloaded
- [ ] 301 redirect map exists and implemented
- [ ] Vercel deployment live, preview deployments work
- [ ] All commits pushed to GitHub
