# Phase 7: Programmatic SEO & Launch - Research

**Researched:** 2026-02-15
**Domain:** Next.js programmatic page generation, DNS migration, social sharing optimization
**Confidence:** HIGH

## Summary

Phase 7 combines two final deliverables: programmatic generation of location-specific service pages (10 pages total: 5 services x 2 cities), and the DNS cutover from WordPress to the Next.js site on Vercel. The codebase is well-prepared for both -- services are already data-driven via `src/lib/services.ts` with `getAllServices()` and `getServiceBySlug()`, SEO infrastructure (metadata, JSON-LD, sitemap, OG images) was built in Phase 5, and the redirect map at `content/migration/redirects.json` (61 entries) is already loaded in `next.config.mjs`. The location pages follow the same `generateStaticParams` + `dynamicParams = false` pattern already used by the existing service pages at `src/app/services/[slug]/page.tsx`.

The key architectural decision is URL structure. The recommended approach is `/services/[service]/[location]` using Next.js multiple dynamic segments, which keeps location pages hierarchically under their parent service. This lets the existing `services/[slug]` pages continue working unchanged, while adding a nested `[location]` segment below. Content for each location page should be defined in a data file (`src/lib/locations.ts`) containing location-specific context (council names, suburbs, market characteristics, relevant case study slugs) combined with the parent service data.

**Primary recommendation:** Use nested dynamic routes at `src/app/services/[slug]/[location]/page.tsx` with a `locations.ts` data module providing all 10 service-location combinations, fully statically generated at build time with `dynamicParams = false`.

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Framework, static generation, metadata API | Already in use; `generateStaticParams` provides build-time page gen |
| react | 19.2.3 | UI rendering | Already in use |
| schema-dts | 1.1.5 | TypeScript types for JSON-LD schemas | Already in use in `src/components/seo/schemas.ts` |
| gray-matter | 4.0.3 | MDX frontmatter parsing | Already in use for case studies/insights |

### Supporting (Already Installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| sharp | 0.34.5 | Image optimization | Already used by Next.js Image |
| next/og (ImageResponse) | Built into next 16.1.6 | Dynamic OG image generation | For per-page OG images in location pages |

### No New Dependencies Required

This phase requires zero new npm packages. Everything needed is already installed:
- Static page generation: `generateStaticParams` (Next.js built-in)
- Metadata: `generateMetadata` (Next.js built-in)
- OG images: `ImageResponse` from `next/og` (Next.js built-in)
- JSON-LD schemas: `schema-dts` (already installed)
- Sitemap generation: `MetadataRoute.Sitemap` (Next.js built-in)
- Redirect handling: `readFileSync` in `next.config.mjs` (already implemented)

## Architecture Patterns

### Recommended URL Structure

**Decision: Nested under services**
```
/services/feasibility-advisory/sydney
/services/feasibility-advisory/newcastle
/services/design-management/sydney
/services/design-management/newcastle
/services/da-approval/sydney
/services/da-approval/newcastle
/services/tender-assessment/sydney
/services/tender-assessment/newcastle
/services/construction-superintendent/sydney
/services/construction-superintendent/newcastle
```

**Why this over `/locations/sydney/feasibility-advisory`:**
- Services are the primary entity; location is a modifier
- Preserves existing `/services/[slug]` URLs without changes
- Google associates these pages with the parent service category
- Internal linking from service pages to location variants is natural
- Breadcrumbs: Services > Feasibility Advisory > Sydney

### Recommended Project Structure

```
src/
  lib/
    locations.ts              # Location data: cities, context, case study mappings
    locations.types.ts        # TypeScript types for location data
    services.ts               # (existing) Service definitions
    services.types.ts         # (existing) Service type definitions
  app/
    services/
      [slug]/
        page.tsx              # (existing) Service detail page
        [location]/
          page.tsx            # NEW: Location-specific service page
          opengraph-image.tsx  # NEW: Dynamic OG image per location page
          twitter-image.tsx   # NEW: Dynamic Twitter card per location page
    sitemap.ts                # (modify) Add location page URLs
  components/
    seo/
      schemas.ts              # (modify) Add location-specific schema generator
    sections/
      location-hero.tsx       # NEW: Hero with location context
      local-context.tsx       # NEW: Local market/council context section
```

### Pattern 1: Data-Driven Location Content

**What:** Define all location data in a TypeScript module, not in MDX files or a database.
**When to use:** When you have a small, known set of locations (2 cities, 10 total pages).
**Why:** No build pipeline for MDX parsing, no database queries, instant type safety, easy to extend.

```typescript
// src/lib/locations.ts
// Source: Codebase pattern from existing src/lib/services.ts

export interface LocationData {
  slug: string          // 'sydney' | 'newcastle'
  name: string          // 'Sydney' | 'Newcastle'
  region: string        // 'Sydney, NSW' | 'Newcastle, NSW'
  councils: string[]    // Relevant local government areas
  suburbs: string[]     // Key suburbs where work is done
  marketContext: string  // 1-2 paragraphs about the local market
  serviceContexts: Record<string, {
    localDescription: string   // Service-specific local copy
    localBenefits: string[]    // Location-specific benefits/selling points
    relatedCaseStudies: string[] // Slugs of case studies in this location
    localCta: string           // Location-specific CTA text
  }>
}

export const locations: LocationData[] = [
  {
    slug: 'sydney',
    name: 'Sydney',
    region: 'Sydney, NSW',
    councils: ['City of Sydney', 'Inner West Council', 'Parramatta Council'],
    suburbs: ['Surry Hills', 'Darling Harbour', 'Granville', 'Asquith', 'Macquarie Park'],
    marketContext: '...', // Rich local context
    serviceContexts: {
      'feasibility-advisory': {
        localDescription: '...',
        localBenefits: ['...'],
        relatedCaseStudies: [
          'granville-diggers-club-development',
          'crosslife-church-asquith-development',
        ],
        localCta: 'Discuss your Sydney project',
      },
      // ... other services
    },
  },
  {
    slug: 'newcastle',
    name: 'Newcastle',
    // ...
  },
]

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug)
}

export function getAllLocations(): LocationData[] {
  return locations
}

export function getAllServiceLocationParams(): Array<{ slug: string; location: string }> {
  const services = getAllServices()
  return locations.flatMap((loc) =>
    services.map((svc) => ({ slug: svc.slug, location: loc.slug }))
  )
}
```

### Pattern 2: generateStaticParams for Nested Dynamic Routes

**What:** Generate all 10 service+location combinations at build time.
**When to use:** For the `src/app/services/[slug]/[location]/page.tsx` route.

```typescript
// src/app/services/[slug]/[location]/page.tsx
// Source: Next.js 16.1.6 official docs - generateStaticParams

import { getAllServiceLocationParams } from '@/lib/locations'

export const dynamicParams = false  // 404 for any non-generated paths

export function generateStaticParams() {
  return getAllServiceLocationParams()
  // Returns: [
  //   { slug: 'feasibility-advisory', location: 'sydney' },
  //   { slug: 'feasibility-advisory', location: 'newcastle' },
  //   { slug: 'design-management', location: 'sydney' },
  //   ... (10 total)
  // ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, location } = await params
  // Build location-specific title: "Feasibility Advisory Sydney | UpScalePM"
  // Build location-specific description with local context
}

export default async function LocationServicePage({ params }: PageProps) {
  const { slug, location } = await params
  const service = getServiceBySlug(slug)
  const loc = getLocationBySlug(location)
  if (!service || !loc) notFound()
  // Render location-specific service page
}
```

### Pattern 3: Dynamic OG Images per Location Page

**What:** Place `opengraph-image.tsx` inside the `[location]` route segment so each page gets a unique OG image.
**When to use:** For all 10 location pages.

```typescript
// src/app/services/[slug]/[location]/opengraph-image.tsx
// Source: Next.js 16.1.6 official docs - opengraph-image with params

import { ImageResponse } from 'next/og'

export const alt = 'UpScalePM Service'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; location: string }>
}) {
  const { slug, location } = await params
  const service = getServiceBySlug(slug)
  const loc = getLocationBySlug(location)

  return new ImageResponse(
    (
      <div style={{ /* branded layout */ }}>
        <div>{service?.title}</div>
        <div>{loc?.name}</div>
        <div>UpScalePM</div>
      </div>
    ),
    { ...size }
  )
}
```

### Pattern 4: Location-Specific JSON-LD Schema

**What:** Each location page should include both `Service` and `LocalBusiness` JSON-LD with location-specific `areaServed`.
**When to use:** For every location page to maximize local SEO signal.

```typescript
// src/components/seo/schemas.ts (extend existing)
// Source: schema.org LocalBusiness + Service types

export function locationServiceSchema(service: {
  title: string
  description: string
  slug: string
  location: { name: string; region: string }
}): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} ${service.location.name}`,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}/${service.location.name.toLowerCase()}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Upscale Project Management',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: service.location.name,
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
    },
    areaServed: {
      '@type': 'City',
      name: service.location.name,
    },
    serviceType: 'Project Management',
  }
}
```

### Pattern 5: Sitemap Extension

**What:** Add location pages to the existing sitemap.
**When to use:** The existing `src/app/sitemap.ts` needs to include all 10 new URLs.

```typescript
// src/app/sitemap.ts (extend existing)
import { getAllServiceLocationParams } from '@/lib/locations'

// Add to existing sitemap function:
const locationPages: MetadataRoute.Sitemap = getAllServiceLocationParams().map((p) => ({
  url: `${SITE_URL}/services/${p.slug}/${p.location}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}))

return [...staticPages, ...servicePages, ...locationPages, ...caseStudyPages, ...insightPages]
```

### Anti-Patterns to Avoid

- **Thin content pages:** Do NOT generate location pages with only the city name swapped into a template. Each page needs unique local context (council names, suburb names, market description, relevant case studies). Google's helpful content update penalizes thin programmatic pages.
- **Duplicate meta descriptions:** Each location page must have a unique meta description that includes the city name and service-specific value proposition. Do not use the parent service's description.
- **Over-nesting URLs:** Do NOT use `/services/[slug]/locations/[location]` -- the extra "locations" segment adds no SEO value and makes URLs longer. Keep it `/services/[slug]/[location]`.
- **ISR for 10 pages:** Do NOT use Incremental Static Regeneration. With only 10 pages, full static generation at build time is the correct choice. ISR adds complexity with no benefit at this scale.
- **Separate location landing pages:** Do NOT create `/sydney` or `/newcastle` hub pages unless specifically requested. The brief asks for "Service in City" pages, not city landing pages.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Static page generation | Custom build scripts | `generateStaticParams` + `dynamicParams = false` | Next.js handles the build pipeline, caching, and static export |
| OG image generation | Canvas/Puppeteer screenshots | `next/og` `ImageResponse` | Built into Next.js, works at build time, Vercel edge-optimized |
| Social preview testing | Manual screenshot testing | LinkedIn Post Inspector + Facebook Sharing Debugger + opengraph.xyz | Industry-standard free tools that show exactly what each platform renders |
| DNS migration | Manual DNS record editing | Vercel dashboard domain settings | Handles SSL provisioning, verification, and health monitoring automatically |
| Sitemap generation | Manual XML files | Next.js `MetadataRoute.Sitemap` | Already implemented; just extend the existing `sitemap.ts` |
| Redirect map | nginx config / htaccess | `next.config.mjs` `redirects()` | Already implemented; 61 redirects loaded from JSON at build time |
| JSON-LD structured data | Inline script tags | `schema-dts` types + `JsonLd` component | Already implemented; extend with location-specific schema function |

**Key insight:** The codebase already has 90% of the infrastructure needed. The location pages are an extension of existing patterns, not a new system.

## Common Pitfalls

### Pitfall 1: Thin Programmatic Content
**What goes wrong:** Google classifies location pages as "doorway pages" or "unhelpful content" and either doesn't index them or applies a ranking penalty.
**Why it happens:** Simply replacing "Sydney" with "Newcastle" in a template produces near-duplicate pages with no unique value.
**How to avoid:** Each location page MUST include:
  - Location-specific market context (different councils, planning frameworks, market dynamics)
  - Relevant case studies from that location (the codebase already has location data in case study frontmatter)
  - Location-specific CTAs ("Discuss your Sydney project" vs "Discuss your Newcastle project")
  - Unique paragraphs about the firm's work in that specific city
**Warning signs:** If you can't tell the difference between two location pages without reading the city name, the content is too thin.

### Pitfall 2: DNS Cutover Downtime
**What goes wrong:** The site is unreachable for hours or days during the DNS cutover.
**Why it happens:** DNS propagation takes time (up to 48 hours); SSL certificate provisioning can fail if DNS isn't properly configured; old WordPress site is taken down before DNS propagation completes.
**How to avoid:**
  1. Lower TTL on existing DNS records to 60 seconds at least 24 hours BEFORE cutover
  2. Add the domain to Vercel BEFORE changing DNS (Vercel will generate the SSL cert once DNS resolves)
  3. Keep the WordPress site running until DNS propagation is confirmed
  4. Use `dig upscalepm.com.au` and `curl -I https://upscalepm.com.au` to verify propagation
  5. Cut over during low-traffic hours (e.g., Sunday evening AEDT)
**Warning signs:** SSL certificate errors, "DNS not configured" warnings in Vercel dashboard.

### Pitfall 3: Broken Redirects After Cutover
**What goes wrong:** Previously indexed WordPress URLs return 404 after DNS moves to Vercel, losing SEO equity.
**Why it happens:** The redirect map doesn't cover all indexed WordPress URLs, or the redirect format is incompatible with Next.js.
**How to avoid:**
  1. The 61-entry redirect map in `content/migration/redirects.json` is already loaded. Verify it covers ALL indexed URLs.
  2. Use Google Search Console's "Pages" report to identify all currently indexed URLs before cutover.
  3. After cutover, use `curl -I https://upscalepm.com.au/old-url/` to verify each redirect returns 301.
  4. Add any new location page URLs to redirects if the WordPress site had similar pages.
**Warning signs:** 404 errors in Google Search Console after cutover; organic traffic drop.

### Pitfall 4: OG Image Not Rendering on Social Platforms
**What goes wrong:** Sharing a location page URL on LinkedIn/Twitter/Facebook shows a blank or generic preview instead of the page-specific OG image.
**Why it happens:** Social platform crawlers cache aggressively; `opengraph-image.tsx` in dynamic routes has known quirks with static generation; meta tags might reference wrong URLs.
**How to avoid:**
  1. Place `opengraph-image.tsx` inside `[location]/` directory (not in parent `[slug]/`)
  2. Test with LinkedIn Post Inspector (`linkedin.com/post-inspector/`) and Facebook Sharing Debugger
  3. Verify the actual `<meta property="og:image" content="...">` tag in the page source points to a valid URL
  4. After deployment, use "Fetch new scrape" on each platform's debugger to bust the cache
**Warning signs:** `og:image` meta tag content is empty or points to a non-existent URL.

### Pitfall 5: Forgetting to Update Google Search Console
**What goes wrong:** Google continues to crawl the site using old sitemap or doesn't discover new location pages for weeks.
**Why it happens:** The new sitemap isn't submitted; old sitemap in WordPress pointed to old URLs.
**How to avoid:**
  1. After DNS cutover, verify property ownership in Google Search Console
  2. Submit the new sitemap URL: `https://upscalepm.com.au/sitemap.xml`
  3. Use the URL Inspection tool to request indexing of high-priority pages
  4. If the domain was previously verified in GSC, use the "Change of Address" tool (though same domain, platform change may not need this)
**Warning signs:** No new pages appearing in "Coverage" report after 1-2 weeks.

### Pitfall 6: Case Study Location Mismatch
**What goes wrong:** A location page for "DA Approval Newcastle" shows case studies from Sydney because the case study filtering is incorrect.
**Why it happens:** Case study frontmatter uses inconsistent location strings (e.g., "Newcastle, NSW" vs "Granville, Sydney NSW" vs "Sydney CBD, NSW").
**How to avoid:** The location data module should explicitly map case study slugs to each service+location combination rather than attempting fuzzy location matching from frontmatter. The existing `relatedCaseStudies` pattern on service pages is the right model -- explicit slug arrays.
**Warning signs:** Case studies appearing on the wrong location page.

## Code Examples

### Case Study Location Mapping (from existing frontmatter data)

Based on analysis of all 14 case study MDX files:

**Sydney-area case studies:** (10 found)
- `granville-diggers-club-development` -- Granville, Sydney NSW (Feasibility, Design Mgmt)
- `granville-diggers-club-development-origin` -- Granville, Sydney NSW (Feasibility, Design Mgmt)
- `crosslife-church-asquith-development` -- Asquith, Sydney NSW (Feasibility, Design Mgmt, Construction Super)
- `calibre-cooper-street-residential-apartments-surry-hills` -- Surry Hills, Sydney NSW (Design Mgmt, Construction Super)
- `navigating-encumbrance-vibe-hotel-darling-harbour` -- Darling Harbour, Sydney NSW (Design Mgmt, Construction Super)
- `delivering-modern-government-workspaces-at-231-elizabeth-street` -- Sydney CBD, NSW (Design Mgmt, Construction Super)
- `expanding-government-tenancy-at-glass-house-macquarie-park` -- Macquarie Park, Sydney NSW (Design Mgmt, Construction Super)
- `major-laboratory-relocation-future-proofing-sydney-waters-filtration-capabilities` -- Sydney, NSW (Design Mgmt, Construction Super)
- `delivering-complexity-with-clarity` -- Sydney, NSW (Design Mgmt, Construction Super)
- `private-architectural-practice-combining-design-vision-and-construction-project-management` -- Sydney, NSW (Architectural Design, Construction PM)
- `structured-for-success-delivering-granville-diggers-club-via-as4902-and-separable-portions` -- Granville, Sydney NSW (Contract Admin, Construction Super)

**Newcastle-area case studies:** (1 found)
- `project-management-delivery-in-the-final-stretch-newcastle-office-fit-out` -- Newcastle, NSW (Construction Super)

**Other/Regional:** (2 found)
- `strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney` -- Central Coast NSW (Feasibility)
- `health-project-management-in-regional-emergency-infrastructure` -- Regional NSW (Design Mgmt, Construction Super)

**Important:** Newcastle has very few case studies. The Newcastle location pages will need to rely more heavily on local context, market knowledge, and possibly reference the Central Coast/Regional case studies as "Greater Newcastle region" work. This is a content gap that needs attention during implementation.

### Existing Service-to-Case-Study Mappings

From `src/lib/services.ts`, each service already has `relatedCaseStudies` arrays:

| Service | Current Related Case Studies | Sydney? | Newcastle? |
|---------|------------------------------|---------|------------|
| feasibility-advisory | granville-diggers, pete-island, crosslife-church | Yes | No (Central Coast nearby) |
| design-management | crosslife-church, 231-elizabeth, glass-house | Yes | No |
| da-approval | pete-island, cooper-street, granville-diggers | Yes | No |
| tender-assessment | vibe-hotel, newcastle-fit-out, granville-diggers | Yes | Yes |
| construction-superintendent | vibe-hotel, sydney-water, health-regional | Yes | No (Regional) |

### Existing vercel.json Configuration

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "(?!upscalepm\\.com\\.au).*" }],
      "headers": [{ "key": "X-Robots-Tag", "value": "noindex" }]
    }
  ]
}
```
This is already correctly configured: any domain that is NOT `upscalepm.com.au` gets `X-Robots-Tag: noindex`. This prevents Vercel preview deployments from being indexed. No changes needed.

### Existing OG Image Pattern (Root Level)

The root `src/app/opengraph-image.tsx` already generates a branded OG image with `ImageResponse`. The location pages should follow the same visual style (dark gradient background, orange accent, white text) but include the service name and city name.

### Redirect Verification Script Example

```bash
# After DNS cutover, verify all 61 redirects
while IFS= read -r line; do
  source=$(echo "$line" | jq -r '.source')
  dest=$(echo "$line" | jq -r '.destination')
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://upscalepm.com.au${source}")
  echo "${status} ${source} -> ${dest}"
done < content/migration/redirects.json
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `getStaticPaths` (Pages Router) | `generateStaticParams` (App Router) | Next.js 13+ | Simpler API, async support, params as Promise in v16 |
| Separate OG image API routes | `opengraph-image.tsx` file convention | Next.js 13.3+ | No need for `/api/og` route handler; auto-discovery by Next.js |
| `next-sitemap` package | Built-in `MetadataRoute.Sitemap` | Next.js 13.3+ | No extra dependency; direct TypeScript sitemap export |
| `params` as direct object | `params` as `Promise` (must `await`) | Next.js 16.0.0 | Breaking change -- all `params` access needs `await params` |
| `next-seo` package | Built-in `Metadata` API | Next.js 13.2+ | No extra dependency; `generateMetadata` handles dynamic metadata |

**Already current in this codebase:**
- Uses `await params` pattern (Next.js 16 compatible) in existing service pages
- Uses `MetadataRoute.Sitemap` (no `next-sitemap` dependency)
- Uses `opengraph-image.tsx` file convention at root level
- Uses `generateMetadata` for dynamic metadata
- Uses `schema-dts` for typed JSON-LD

## DNS Cutover Checklist

This is specific procedural guidance for the Vercel deployment:

### Pre-Cutover (Do 24-48 hours before)
1. Lower TTL on existing DNS A/CNAME records to 60 seconds at the domain registrar
2. Add `upscalepm.com.au` as a custom domain in Vercel project settings
3. Vercel will show "DNS not configured" -- this is expected
4. Note the A record IP (76.76.21.21) or CNAME value Vercel provides
5. Verify the full site works on the Vercel `.vercel.app` URL
6. Test all 61 redirects against the Vercel preview URL
7. Test OG images on all key pages using opengraph.xyz

### Cutover
1. At the domain registrar, update DNS:
   - For apex domain (`upscalepm.com.au`): Set A record to `76.76.21.21`
   - For www subdomain: Set CNAME to Vercel's provided value
2. Wait for Vercel dashboard to show domain as "Valid Configuration"
3. Vercel will automatically provision SSL certificate (Let's Encrypt)
4. SSL provisioning typically takes 1-5 minutes after DNS resolves

### Post-Cutover Verification
1. `curl -I https://upscalepm.com.au` -- verify 200 status and correct content
2. `curl -I https://www.upscalepm.com.au` -- verify redirect to apex
3. Test 5-10 redirects from the redirect map with `curl -I`
4. Check SSL certificate: valid, issued by Let's Encrypt, covers both apex and www
5. Browse all key pages in an incognito window
6. Submit sitemap in Google Search Console: `https://upscalepm.com.au/sitemap.xml`
7. Use URL Inspection tool on homepage and 2-3 key pages
8. Test OG images on LinkedIn Post Inspector, Facebook Sharing Debugger

## Social Sharing Testing Tools

| Platform | Tool | URL |
|----------|------|-----|
| LinkedIn | Post Inspector | https://www.linkedin.com/post-inspector/ |
| Facebook | Sharing Debugger | https://developers.facebook.com/tools/debug/ |
| Twitter/X | Card Validator | https://cards-dev.twitter.com/validator |
| Multi-platform | OpenGraph.xyz | https://www.opengraph.xyz/ |

**Process for each page:**
1. Deploy to production
2. Enter page URL in each tool
3. Verify: correct title, description, and OG image render
4. If stale data, use "Fetch new scrape" / "Scrape Again" to refresh cache

## Open Questions

1. **Newcastle content depth**
   - What we know: Only 1 case study is explicitly in Newcastle (the office fit-out). Central Coast case study (Pete Island) is nearby.
   - What's unclear: Whether the client wants to include Central Coast and Regional NSW case studies as "Greater Newcastle" work, or leave Newcastle pages with fewer case studies.
   - Recommendation: Include Central Coast and Regional NSW case studies on Newcastle pages as relevant nearby work. Write Newcastle-specific market context that stands on its own merit.

2. **WordPress site coordination**
   - What we know: DNS cutover means the WordPress site becomes inaccessible at `upscalepm.com.au`.
   - What's unclear: Who manages the domain registrar? Is there anything on the WordPress site (email, subdomains) that needs to be preserved?
   - Recommendation: Before DNS cutover, confirm with the client that: (a) they have registrar access, (b) no email MX records will be affected, (c) no other subdomains point to the WordPress hosting.

3. **Location page internal linking**
   - What we know: The 10 new location pages need to be discoverable by users and search engines.
   - What's unclear: Whether location pages should appear in the main navigation, footer, or only be linked from their parent service pages.
   - Recommendation: Add location links to the parent service page (e.g., "We offer Feasibility Advisory in Sydney and Newcastle") and to the footer. Do NOT add to main navigation -- 10 extra links would clutter it.

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 official docs - `generateStaticParams` (verified via WebFetch, docs dated 2026-02-11)
- Next.js 16.1.6 official docs - `opengraph-image.tsx` file convention (verified via WebFetch, docs dated 2026-02-11)
- Vercel official docs - Adding & Configuring a Custom Domain (verified via WebFetch)
- Existing codebase: `src/lib/services.ts`, `src/app/services/[slug]/page.tsx`, `src/app/sitemap.ts`, `src/components/seo/schemas.ts`, `content/migration/redirects.json`, `next.config.mjs` (all read directly)

### Secondary (MEDIUM confidence)
- Google Search Central - Site Moves and Migrations: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- Google Search Central - 301 Redirects: https://developers.google.com/search/docs/crawling-indexing/301-redirects
- Google Search Console - Change of Address tool: https://support.google.com/webmasters/answer/9370220
- schema.org LocalBusiness type: https://schema.org/LocalBusiness
- Practical Programmatic SEO in Next.js: https://practicalprogrammatic.com/blog/programmatic-seo-in-nextjs

### Tertiary (LOW confidence)
- Social sharing testing tools URLs (may change): LinkedIn Post Inspector, Facebook Sharing Debugger, OpenGraph.xyz

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies; extends existing patterns verified in codebase
- Architecture: HIGH -- URL structure and `generateStaticParams` patterns verified against Next.js 16.1.6 official docs
- Programmatic SEO content: HIGH -- Patterns verified against official docs and community best practices
- DNS cutover: MEDIUM -- Process is well-documented by Vercel but domain-registrar specifics unknown
- Social sharing: MEDIUM -- Tools and process are standard but platform-specific quirks may require debugging
- Pitfalls: HIGH -- Based on common migration failures documented by Google and verified in multiple sources

**Research date:** 2026-02-15
**Valid until:** 2026-03-15 (stable domain -- Next.js 16 and Vercel DNS are not fast-moving)
