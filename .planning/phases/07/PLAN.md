# Phase 7: Programmatic SEO & Launch

## Overview

5 prompts that create the location data module and types, build the location-specific service page template with generateStaticParams, add dynamic OG images and social sharing optimization, perform the DNS cutover from WordPress to Vercel, and run a final launch verification audit. After this phase, 10 location pages are live (5 services x 2 cities), the site is publicly accessible at upscalepm.com.au with SSL, all old WordPress URLs redirect correctly, and social sharing previews work across LinkedIn, Twitter/X, and Facebook.

**Requirements covered:** PSEO-01, PSEO-02, PSEO-03, PSEO-04, DEPL-02, DEPL-03

**Estimated effort:** ~3-4 hours Claude execution time across all prompts.

**Must-Haves (Goal-Backward Derivation):**

Goal: "Location-based service pages are live for Sydney and Newcastle, DNS is cut over from WordPress to Vercel, and the site is publicly accessible at upscalepm.com.au with all redirects working."

Observable truths:
1. Visiting `/services/feasibility-advisory/sydney` (and all 9 other combinations) renders a page with localised content, relevant case studies from that city, and a location-specific CTA -- not a thin template with only the city name swapped
2. Each location page has unique metadata (title, description, canonical URL), a dynamic OG image with service name and city, and location-specific JSON-LD structured data (Service + LocalBusiness with areaServed)
3. Visiting `https://upscalepm.com.au` in a browser loads the new Next.js site with valid SSL (DNS pointed to Vercel)
4. Every old WordPress URL (61 entries in redirects.json) returns a 301 redirect to the correct new page -- no 404s for previously indexed URLs
5. Sharing any page URL on LinkedIn, Twitter/X, or Facebook shows the correct OG image, title, and description in the link preview
6. The sitemap at `/sitemap.xml` includes all 10 new location page URLs and has been submitted to Google Search Console

Required artifacts:
- `src/lib/locations.ts` -- Location data: cities, councils, suburbs, market context, per-service local descriptions, case study mappings, CTAs
- `src/lib/locations.types.ts` -- TypeScript types for location data
- `src/app/services/[slug]/[location]/page.tsx` -- Location-specific service page with generateStaticParams, dynamicParams = false, generateMetadata
- `src/app/services/[slug]/[location]/opengraph-image.tsx` -- Dynamic OG image per location page
- `src/app/services/[slug]/[location]/twitter-image.tsx` -- Dynamic Twitter card per location page
- `src/components/seo/schemas.ts` -- Modified to add locationServiceSchema() generator
- `src/app/sitemap.ts` -- Modified to include location page URLs

Key links:
- locations.ts -> [location]/page.tsx (if broken: pages 404 or render with no content)
- services.ts -> [location]/page.tsx (if broken: no service data on location pages)
- generateStaticParams -> locations.ts + services.ts (if broken: pages not generated at build time)
- opengraph-image.tsx -> locations.ts + services.ts (if broken: social previews show generic/broken image)
- sitemap.ts -> locations.ts (if broken: new pages not discoverable by search engines)
- schemas.ts -> [location]/page.tsx (if broken: no structured data for local SEO)
- DNS A record -> Vercel (if broken: site unreachable at upscalepm.com.au)
- next.config.mjs redirects -> redirects.json (already working -- if broken: old WordPress URLs 404)

---

## Prompt 1: Location Data Module & TypeScript Types

**Requirements:** PSEO-04 (local context, case studies, CTAs -- data layer)
**Dependencies:** None (foundation prompt)
**Wave:** 1
**Files created/modified:**
- `src/lib/locations.types.ts` (create)
- `src/lib/locations.ts` (create)

### Context

This prompt creates the data foundation for all 10 location pages. The data module follows the exact same pattern as `src/lib/services.ts` -- a typed array of objects with helper functions (`getLocationBySlug`, `getAllLocations`, `getAllServiceLocationParams`).

The 5 services (from `src/lib/services.ts`) are:
- `feasibility-advisory` -- Feasibility and Advisory
- `design-management` -- Design Management
- `da-approval` -- DA Approval
- `tender-assessment` -- Tender Assessment
- `construction-superintendent` -- Construction Superintendent

The 2 locations are Sydney and Newcastle. Each location needs:
- City metadata (name, slug, region, councils, key suburbs)
- Market context (1-2 paragraphs about the local property/construction market)
- Per-service context: a localised description, local benefits, case study slugs, and a CTA

**Case study availability (from research):**

Sydney has 10+ case studies covering all services. Newcastle has 1 explicit case study (`project-management-delivery-in-the-final-stretch-newcastle-office-fit-out`). Central Coast (`strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney`) and Regional NSW (`health-project-management-in-regional-emergency-infrastructure`) are nearby. For Newcastle pages, include the Central Coast and Regional case studies as relevant nearby work, and for services with no Newcastle-area projects, show the Sydney case studies as "projects we've delivered across NSW" rather than leaving the section empty.

**Content quality requirement:** Each location's `marketContext` and each `serviceContexts[service].localDescription` must be substantive, unique paragraphs -- not thin templates with city names swapped. Sydney content should reference the competitive Sydney market, Inner West/Western Sydney development corridors, specific council planning frameworks. Newcastle content should reference the Newcastle urban renewal, Hunter region growth, Newcastle council's development strategy, and the city's distinct market dynamics compared to Sydney.

### Actions

**1. Create `src/lib/locations.types.ts`** -- TypeScript types for location data:

```typescript
export interface ServiceLocationContext {
  localDescription: string     // 2-3 sentences about this service in this location
  localBenefits: string[]      // 3-4 location-specific benefits
  relatedCaseStudies: string[] // Case study slugs relevant to this location
  localCta: string             // Location-specific CTA text, e.g. "Discuss your Sydney project"
}

export interface LocationData {
  slug: string                                      // 'sydney' | 'newcastle'
  name: string                                      // 'Sydney' | 'Newcastle'
  region: string                                    // 'Sydney, NSW' | 'Newcastle, NSW'
  councils: string[]                                // Relevant local government areas
  suburbs: string[]                                 // Key suburbs where work is done
  marketContext: string                             // 2-3 paragraphs about the local market
  serviceContexts: Record<string, ServiceLocationContext>  // Keyed by service slug
}
```

**2. Create `src/lib/locations.ts`** -- Location data and helper functions:

Follow the pattern from `src/lib/services.ts`. Import `getAllServices` from `@/lib/services` for `getAllServiceLocationParams`.

Define the `locations` array with 2 entries (Sydney and Newcastle). Each entry must have `serviceContexts` keyed by all 5 service slugs.

**Sydney data specifics:**
- `slug: 'sydney'`
- `name: 'Sydney'`
- `region: 'Sydney, NSW'`
- `councils`: `['City of Sydney', 'Inner West Council', 'Cumberland City Council', 'City of Parramatta', 'Ku-ring-gai Council', 'Hornsby Shire Council']`
- `suburbs`: `['Sydney CBD', 'Surry Hills', 'Darling Harbour', 'Granville', 'Asquith', 'Macquarie Park', 'Parramatta']`
- `marketContext`: Write 2-3 paragraphs covering Sydney's position as Australia's largest property market, the high competition for sites and approvals, the complexity of navigating multiple council jurisdictions across Greater Sydney, and the trend toward medium-density infill development in established suburbs. Reference the regulatory complexity of development in NSW (Environmental Planning and Assessment Act, various DCPs and LEPs), and the value of experienced client-side PM in managing consultant teams, council negotiations, and construction delivery in a market where projects routinely face cost escalation and program delays.
- `serviceContexts`: For each of the 5 services, write a `localDescription` (2-3 sentences connecting the service specifically to the Sydney context), `localBenefits` (3-4 bullets about why this service matters in Sydney), `relatedCaseStudies` (explicit slug arrays -- see mapping below), and `localCta`.

Sydney case study mappings by service:
- `feasibility-advisory`: `['granville-diggers-club-development', 'crosslife-church-asquith-development', 'strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney']`
- `design-management`: `['crosslife-church-asquith-development', 'delivering-modern-government-workspaces-at-231-elizabeth-street', 'expanding-government-tenancy-at-glass-house-macquarie-park']`
- `da-approval`: `['strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney', 'calibre-cooper-street-residential-apartments-surry-hills', 'granville-diggers-club-development']`
- `tender-assessment`: `['navigating-encumbrance-vibe-hotel-darling-harbour', 'granville-diggers-club-development', 'structured-for-success-delivering-granville-diggers-club-via-as4902-and-separable-portions']`
- `construction-superintendent`: `['navigating-encumbrance-vibe-hotel-darling-harbour', 'major-laboratory-relocation-future-proofing-sydney-waters-filtration-capabilities', 'calibre-cooper-street-residential-apartments-surry-hills']`

**Newcastle data specifics:**
- `slug: 'newcastle'`
- `name: 'Newcastle'`
- `region: 'Newcastle, NSW'`
- `councils`: `['City of Newcastle', 'Lake Macquarie City Council', 'Cessnock City Council', 'Maitland City Council']`
- `suburbs`: `['Newcastle CBD', 'Newcastle West', 'Honeysuckle', 'Merewether', 'Charlestown', 'Maitland']`
- `marketContext`: Write 2-3 paragraphs covering Newcastle's urban renewal and growth as NSW's second-largest city, the Hunter region development boom driven by diversification from mining into health, education, and residential sectors, the relatively lower land costs compared to Sydney attracting new development, and the Newcastle council's proactive approach to development applications. Reference the specific opportunities and challenges of building in Newcastle -- the mix of heritage conservation areas, waterfront development zones, and greenfield growth areas in the Hunter Valley.
- `serviceContexts`: For each of the 5 services, write a `localDescription` connecting the service to Newcastle's market, `localBenefits` specific to the Hunter region, case study mappings, and a `localCta`.

Newcastle case study mappings by service (use the Newcastle project plus relevant nearby/regional work):
- `feasibility-advisory`: `['strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney', 'granville-diggers-club-development']`
- `design-management`: `['project-management-delivery-in-the-final-stretch-newcastle-office-fit-out', 'health-project-management-in-regional-emergency-infrastructure']`
- `da-approval`: `['strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney', 'granville-diggers-club-development']`
- `tender-assessment`: `['project-management-delivery-in-the-final-stretch-newcastle-office-fit-out', 'navigating-encumbrance-vibe-hotel-darling-harbour']`
- `construction-superintendent`: `['project-management-delivery-in-the-final-stretch-newcastle-office-fit-out', 'health-project-management-in-regional-emergency-infrastructure']`

**Helper functions to export:**

```typescript
import { getAllServices } from '@/lib/services'

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

**Content tone:** Match the existing service page copy -- professional, direct, industry-specific. No marketing fluff. Use real council names, real suburb names, real market dynamics. This is for an audience of property developers who know these markets.

### Acceptance Criteria

- [ ] `src/lib/locations.types.ts` exports `LocationData` and `ServiceLocationContext` interfaces
- [ ] `src/lib/locations.ts` exports `locations` array with Sydney and Newcastle entries, each containing `serviceContexts` for all 5 service slugs
- [ ] `getLocationBySlug('sydney')` returns the Sydney data, `getLocationBySlug('newcastle')` returns Newcastle
- [ ] `getAllServiceLocationParams()` returns exactly 10 entries (5 services x 2 locations)
- [ ] Sydney `marketContext` is substantive (minimum 3 sentences), references real councils, suburbs, and market dynamics
- [ ] Newcastle `marketContext` is substantive (minimum 3 sentences), references real councils, suburbs, and Hunter region dynamics
- [ ] Each `localDescription` across all 10 service-location combinations is unique -- not template text with city names swapped
- [ ] Case study slugs in `relatedCaseStudies` arrays all match actual case study filenames in `content/case-studies/`
- [ ] `npm run build` succeeds (types compile correctly)

---

## Prompt 2: Location Service Page Template & Static Generation

**Requirements:** PSEO-01, PSEO-02, PSEO-03, PSEO-04 (page template, Sydney pages, Newcastle pages, local content)
**Dependencies:** Prompt 1 (locations.ts must exist)
**Wave:** 2
**Files created/modified:**
- `src/app/services/[slug]/[location]/page.tsx` (create)
- `src/components/seo/schemas.ts` (modify -- add `locationServiceSchema`)
- `src/app/sitemap.ts` (modify -- add location page URLs)

### Context

This prompt builds the actual location service pages. The route structure is `src/app/services/[slug]/[location]/page.tsx` -- a nested dynamic route under the existing service pages. The existing `src/app/services/[slug]/page.tsx` continues working unchanged.

The page template combines data from two sources:
1. **Service data** from `src/lib/services.ts` via `getServiceBySlug(slug)` -- provides service title, description, sections, benefits
2. **Location data** from `src/lib/locations.ts` via `getLocationBySlug(location)` -- provides city context, local descriptions, case studies, CTAs

The page layout should follow the existing service page structure but with location-specific modifications:
- Breadcrumbs: Services > [Service Name] > [City Name]
- Hero with location in title: "[Service Name] in [City Name]"
- Local context section (from `locationData.marketContext`)
- Service description localised (from `serviceContexts[slug].localDescription`)
- Local benefits (from `serviceContexts[slug].localBenefits`)
- Related case studies filtered to this location (from `serviceContexts[slug].relatedCaseStudies`)
- Location-specific CTA (from `serviceContexts[slug].localCta`)
- Internal link back to the parent service page
- JSON-LD structured data with location-specific `areaServed`

The page uses `generateStaticParams` with `dynamicParams = false` to generate exactly 10 pages at build time. Any URL not matching a valid service+location combination returns 404.

The existing `RelatedCaseStudies` component (`src/components/sections/related-case-studies.tsx`) accepts a `slugs` array and renders case study cards. It can be reused directly.

The existing `ServiceCta` component (`src/components/sections/service-cta.tsx`) renders a dark CTA section. It can be reused with the location-specific CTA text.

### Actions

**1. Create `src/app/services/[slug]/[location]/page.tsx`** -- Location-specific service page:

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getServiceBySlug, getAllServices } from '@/lib/services'
import { getLocationBySlug, getAllServiceLocationParams } from '@/lib/locations'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { RelatedCaseStudies } from '@/components/sections/related-case-studies'
import { ServiceCta } from '@/components/sections/service-cta'
import { JsonLd } from '@/components/seo/json-ld'
import { locationServiceSchema } from '@/components/seo/schemas'
```

Interface and static generation:
```typescript
interface PageProps {
  params: Promise<{ slug: string; location: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllServiceLocationParams()
}
```

Metadata generation -- each page gets a unique title, description, and canonical:
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, location } = await params
  const service = getServiceBySlug(slug)
  const loc = getLocationBySlug(location)
  if (!service || !loc) return { title: 'Not Found' }

  const locationContext = loc.serviceContexts[slug]
  return generatePageMetadata({
    title: `${service.title} ${loc.name}`,
    description: `${service.title} services in ${loc.name}. ${locationContext?.localDescription ?? service.description}`,
    path: `/services/${slug}/${location}`,
  })
}
```

Page component:
```typescript
export default async function LocationServicePage({ params }: PageProps) {
  const { slug, location } = await params
  const service = getServiceBySlug(slug)
  const loc = getLocationBySlug(location)
  if (!service || !loc) notFound()

  const locationContext = loc.serviceContexts[slug]
  if (!locationContext) notFound()

  // ... render page
}
```

The page JSX should render in this order:

a) **JSON-LD** -- Location-specific structured data (uses the new `locationServiceSchema` function):
```tsx
<JsonLd data={locationServiceSchema({
  title: service.title,
  description: locationContext.localDescription,
  slug: service.slug,
  location: { name: loc.name, region: loc.region },
})} />
```

b) **PageHeader** -- with location-specific title and breadcrumbs:
```tsx
<PageHeader
  title={`${service.title} in ${loc.name}`}
  subtitle={`${service.subtitle} across ${loc.region}`}
  breadcrumbs={[
    { label: 'Services', href: '/services' },
    { label: service.title, href: `/services/${slug}` },
    { label: loc.name },
  ]}
/>
```

c) **Local Context Section** -- the location's market context:
```tsx
<Section background="muted">
  <div className="mx-auto max-w-3xl">
    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
      {service.title} in {loc.name}
    </h2>
    <div className="mt-6 space-y-4 text-muted-foreground">
      {locationContext.localDescription.split('\n\n').map((paragraph, index) => (
        <p key={index} className="leading-relaxed">{paragraph}</p>
      ))}
    </div>
  </div>
</Section>
```

d) **Local Market Context Section**:
```tsx
<Section>
  <div className="mx-auto max-w-3xl">
    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
      The {loc.name} Property Market
    </h2>
    <div className="mt-6 space-y-4 text-muted-foreground">
      {loc.marketContext.split('\n\n').map((paragraph, index) => (
        <p key={index} className="leading-relaxed">{paragraph}</p>
      ))}
    </div>
  </div>
</Section>
```

e) **Local Benefits Section**:
```tsx
<Section background="muted">
  <div className="mx-auto max-w-3xl">
    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
      Why Choose Upscale for {service.title} in {loc.name}?
    </h2>
    <ul className="mt-8 space-y-4">
      {locationContext.localBenefits.map((benefit, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {index + 1}
          </span>
          <span className="text-muted-foreground leading-relaxed">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
</Section>
```

f) **Parent service link** -- link back to the main service page:
```tsx
<Section spacing="compact">
  <div className="mx-auto max-w-3xl text-center">
    <p className="text-muted-foreground">
      Learn more about our{' '}
      <Link href={`/services/${slug}`} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
        {service.title}
      </Link>{' '}
      services across all locations.
    </p>
  </div>
</Section>
```

g) **Location-specific CTA**:
```tsx
<ServiceCta
  heading={locationContext.localCta}
  description={`Get practical advice on your ${loc.name} project from an experienced client-side PM.`}
  buttonText="Send an Enquiry"
  showBooking={true}
  bookingText="Book a Call"
/>
```

h) **Related case studies** (location-filtered):
```tsx
<RelatedCaseStudies slugs={locationContext.relatedCaseStudies} />
```

**2. Modify `src/components/seo/schemas.ts`** -- Add `locationServiceSchema` function:

Add the import for `Service` type (already imported). Add a new exported function:

```typescript
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

**3. Modify `src/app/sitemap.ts`** -- Add location page URLs:

Add import:
```typescript
import { getAllServiceLocationParams } from '@/lib/locations'
```

Add location pages array before the return statement:
```typescript
const locationPages: MetadataRoute.Sitemap = getAllServiceLocationParams().map((p) => ({
  url: `${SITE_URL}/services/${p.slug}/${p.location}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}))
```

Update the return to include location pages:
```typescript
return [...staticPages, ...servicePages, ...locationPages, ...caseStudyPages, ...insightPages]
```

### Acceptance Criteria

- [ ] `src/app/services/[slug]/[location]/page.tsx` exists with `generateStaticParams`, `dynamicParams = false`, and `generateMetadata`
- [ ] `npm run build` succeeds and generates exactly 10 location pages (check build output for `/services/*/sydney` and `/services/*/newcastle`)
- [ ] Each location page renders: PageHeader with breadcrumbs, local context section, market context section, local benefits, parent service link, CTA, and related case studies
- [ ] Visiting `/services/feasibility-advisory/sydney` in dev shows Sydney-specific content, case studies, and CTA
- [ ] Visiting `/services/feasibility-advisory/newcastle` shows Newcastle-specific content (different from Sydney)
- [ ] Visiting `/services/feasibility-advisory/melbourne` returns 404 (dynamicParams = false)
- [ ] `src/components/seo/schemas.ts` exports `locationServiceSchema` with location-specific `areaServed`
- [ ] Each location page includes `<script type="application/ld+json">` with Service schema containing `areaServed: { @type: 'City', name: '[city]' }`
- [ ] `localhost:3000/sitemap.xml` includes all 10 location page URLs
- [ ] Each location page metadata has unique title (`"[Service] [City] | UpScalePM"`), unique description, and canonical URL

---

## Prompt 3: Dynamic OG Images & Social Sharing Optimization

**Requirements:** DEPL-03 (OG images, Twitter cards, LinkedIn preview)
**Dependencies:** Prompt 2 (location pages must exist for OG images to reference)
**Wave:** 3
**Files created/modified:**
- `src/app/services/[slug]/[location]/opengraph-image.tsx` (create)
- `src/app/services/[slug]/[location]/twitter-image.tsx` (create)

### Context

The root `src/app/opengraph-image.tsx` generates a branded OG image with a dark gradient background, orange accent, and white text using `ImageResponse` from `next/og`. Each location page needs its own OG image showing the service name and city name so that when shared on LinkedIn, Twitter/X, or Facebook, the preview is contextually specific.

Next.js file-based OG image convention: placing `opengraph-image.tsx` inside a route segment directory makes it the OG image for that route. The `[location]` directory is the correct location -- this means each of the 10 location pages gets its own dynamically generated OG image.

For Twitter, a separate `twitter-image.tsx` should be provided. While Twitter can fall back to the OG image, having a dedicated Twitter card image ensures correct rendering and the `twitter:image` meta tag is explicitly set.

The OG image needs `generateStaticParams` too -- it must generate images for all 10 combinations at build time.

The visual design should match the root OG image: dark gradient background (neutral-950 to orange), white text, orange accent. The layout:
- Top: "UpScalePM" in orange (brand identifier)
- Middle: "[Service Title]" in large white text
- Below: "[City Name], NSW" in grey
- Bottom: tagline or service description in lighter grey

### Actions

**1. Create `src/app/services/[slug]/[location]/opengraph-image.tsx`** -- Dynamic OG image per location page:

```typescript
import { ImageResponse } from 'next/og'
import { getServiceBySlug } from '@/lib/services'
import { getLocationBySlug, getAllServiceLocationParams } from '@/lib/locations'

export const alt = 'UpScalePM Service'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllServiceLocationParams()
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; location: string }>
}) {
  const { slug, location } = await params
  const service = getServiceBySlug(slug)
  const loc = getLocationBySlug(location)

  const serviceName = service?.title ?? 'Service'
  const cityName = loc?.name ?? 'Location'
  const regionName = loc?.region ?? 'NSW'

  return new ImageResponse(
    (
      <div
        style={{
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #c2410c 100%)',
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
        <div
          style={{
            color: '#c2410c',
            fontSize: 28,
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          UpScalePM
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: '80%',
          }}
        >
          {serviceName}
        </div>
        <div
          style={{
            color: '#d4d4d4',
            fontSize: 36,
            marginTop: 16,
            fontWeight: 500,
          }}
        >
          {cityName}, NSW
        </div>
        <div
          style={{
            color: '#a3a3a3',
            fontSize: 22,
            marginTop: 24,
            maxWidth: '70%',
          }}
        >
          Client-side project management for property and construction
        </div>
      </div>
    ),
    { ...size }
  )
}
```

**2. Create `src/app/services/[slug]/[location]/twitter-image.tsx`** -- Dynamic Twitter card:

This file is nearly identical to the OG image but uses the Twitter image alt and exports. In practice, Twitter supports the same dimensions (1200x630 for summary_large_image), so the same visual design works:

```typescript
import { ImageResponse } from 'next/og'
import { getServiceBySlug } from '@/lib/services'
import { getLocationBySlug, getAllServiceLocationParams } from '@/lib/locations'

export const alt = 'UpScalePM Service'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllServiceLocationParams()
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; location: string }>
}) {
  const { slug, location } = await params
  const service = getServiceBySlug(slug)
  const loc = getLocationBySlug(location)

  const serviceName = service?.title ?? 'Service'
  const cityName = loc?.name ?? 'Location'

  return new ImageResponse(
    (
      <div
        style={{
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #c2410c 100%)',
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
        <div
          style={{
            color: '#c2410c',
            fontSize: 28,
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          UpScalePM
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: '80%',
          }}
        >
          {serviceName}
        </div>
        <div
          style={{
            color: '#d4d4d4',
            fontSize: 36,
            marginTop: 16,
            fontWeight: 500,
          }}
        >
          {cityName}, NSW
        </div>
        <div
          style={{
            color: '#a3a3a3',
            fontSize: 22,
            marginTop: 24,
            maxWidth: '70%',
          }}
        >
          Client-side project management for property and construction
        </div>
      </div>
    ),
    { ...size }
  )
}
```

### Acceptance Criteria

- [ ] `src/app/services/[slug]/[location]/opengraph-image.tsx` exists with `generateStaticParams` returning all 10 combinations
- [ ] `src/app/services/[slug]/[location]/twitter-image.tsx` exists with `generateStaticParams` returning all 10 combinations
- [ ] `npm run build` succeeds -- OG images are generated at build time for all 10 pages
- [ ] Viewing page source of `/services/feasibility-advisory/sydney` shows `<meta property="og:image" content="...">` with a valid URL pointing to the generated image
- [ ] Viewing page source shows `<meta name="twitter:image" content="...">` with a valid URL
- [ ] The OG image URL when accessed directly renders an image showing "Feasibility and Advisory" and "Sydney, NSW" on a dark gradient background
- [ ] The visual style matches the root OG image (dark gradient, orange accent, white text)

---

## Prompt 4: DNS Cutover from WordPress to Vercel

**Requirements:** DEPL-02 (DNS pointed to Vercel)
**Dependencies:** Prompts 1-3 (all location pages and OG images must be built and working)
**Wave:** 4
**Autonomous:** false (checkpoint:human-action -- requires registrar access)
**Files created/modified:**
- None (operational task, no code changes)

### Context

This is the DNS cutover from the existing WordPress hosting to Vercel. The domain is `upscalepm.com.au`. The `vercel.json` already has the correct `X-Robots-Tag: noindex` header for non-production domains. The redirect map (61 entries in `content/migration/redirects.json`) is already loaded by `next.config.mjs`.

This prompt is a checkpoint that requires human action because:
1. Domain registrar credentials are not accessible to Claude
2. DNS record changes must be made in the registrar's dashboard
3. SSL provisioning timing requires monitoring

### Actions

**Pre-Cutover (Claude can automate):**

**1. Verify the production build is clean:**
```bash
npm run build
```
Confirm zero errors and check the build output shows all 10 location pages plus the existing ~50 pages.

**2. Add the custom domain in Vercel (if not already done):**

Check if `upscalepm.com.au` is already added:
```bash
npx vercel domains ls
```

If not added:
```bash
npx vercel domains add upscalepm.com.au
```

Vercel will show the required DNS records (A record for apex, CNAME for www). Note these values for the user.

**3. Verify the Vercel deployment URL works:**

Check the current Vercel deployment URL and verify key pages load correctly:
- Homepage
- All 5 service pages
- All 10 location pages (spot-check 3-4)
- Contact page
- A case study page
- Verify 3-4 redirects from `content/migration/redirects.json` work on the Vercel URL

**4. Present DNS cutover instructions to user:**

CHECKPOINT: The following steps require the user to log into their domain registrar.

---

**DNS Cutover Steps (User performs these):**

Before starting, lower the TTL on existing DNS records to 60 seconds at the registrar. Wait 24 hours for the old TTL to expire before proceeding with the actual cutover.

When ready to cut over:

1. Log into your domain registrar for `upscalepm.com.au`
2. Update DNS records:
   - **Apex domain** (`upscalepm.com.au`): Set A record to `76.76.21.21`
   - **www subdomain** (`www.upscalepm.com.au`): Set CNAME to `cname.vercel-dns.com`
3. IMPORTANT: Do NOT delete MX records (email) or any other non-web DNS records
4. Save the DNS changes
5. Wait for Vercel dashboard to show the domain as "Valid Configuration" (typically 1-15 minutes)
6. Vercel will automatically provision an SSL certificate via Let's Encrypt (1-5 minutes after DNS resolves)

Keep the WordPress site running until DNS propagation is confirmed (up to 48 hours, typically much faster with low TTL).

---

**Post-Cutover Verification (Claude can automate after user confirms DNS is changed):**

Once the user confirms DNS records have been updated:

1. Check DNS resolution:
```bash
dig upscalepm.com.au +short
# Should return 76.76.21.21

dig www.upscalepm.com.au +short
# Should return cname.vercel-dns.com (or similar)
```

2. Check HTTPS works:
```bash
curl -I https://upscalepm.com.au
# Should return 200

curl -I https://www.upscalepm.com.au
# Should redirect to apex (301 or 308)
```

3. Spot-check redirects (test 5-10 from the 61 entries):
```bash
curl -I https://upscalepm.com.au/city-of-sydney-da-explained-challenges-delays-and-solutions/
# Should return 301 to /insights/city-of-sydney-da-explained-challenges-delays-and-solutions
```

4. Browse key pages in an incognito window:
   - Homepage, contact, services, about
   - 2-3 location pages
   - 2-3 case studies

### Acceptance Criteria

- [ ] `npm run build` succeeds with zero errors
- [ ] Vercel deployment URL serves all pages correctly (spot-checked)
- [ ] `upscalepm.com.au` is added as a custom domain in Vercel
- [ ] DNS records updated: A record to `76.76.21.21`, CNAME for www to `cname.vercel-dns.com`
- [ ] `curl -I https://upscalepm.com.au` returns 200 with valid SSL certificate
- [ ] `curl -I https://www.upscalepm.com.au` redirects to apex domain
- [ ] 5+ redirects from `content/migration/redirects.json` verified working via `curl -I`
- [ ] No MX records or other non-web DNS records were affected

---

## Prompt 5: Launch Verification & Search Console Submission

**Requirements:** DEPL-03 (social sharing verification), DEPL-02 (redirect verification)
**Dependencies:** Prompt 4 (DNS must be live)
**Wave:** 5
**Autonomous:** false (checkpoint:human-verify -- requires manual social sharing testing and Search Console access)
**Files created/modified:**
- None expected (verification-only prompt; minor fixes if issues found)

### Context

This is the final verification pass after DNS cutover. The site is live at `upscalepm.com.au`. This prompt verifies three things:

1. **Social sharing** -- OG images, titles, and descriptions render correctly when sharing URLs on LinkedIn, Twitter/X, and Facebook
2. **Redirect completeness** -- All 61 WordPress redirects work on the production domain
3. **Google Search Console** -- Sitemap submitted, key pages requested for indexing

Social sharing testing requires using platform-specific tools:
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter/X Card Validator: https://cards-dev.twitter.com/validator
- Multi-platform: https://www.opengraph.xyz/

### Actions

**1. Verify all 61 redirects on production domain:**

Run a comprehensive redirect check. For each entry in `content/migration/redirects.json`, verify the redirect works:

```bash
# Read each redirect and check the HTTP status
node -e "
const redirects = require('./content/migration/redirects.json');
const https = require('https');
let passed = 0, failed = 0;
for (const r of redirects.slice(0, 10)) {
  // Spot check first 10
  console.log('Testing:', r.source);
}
console.log('Total redirects:', redirects.length);
"
```

Use `curl -I` to spot-check a representative sample (at least 10) covering different URL patterns:
- Insight article URLs
- Case study URLs
- Service page URLs
- Category/archive URLs

Report any 404s or incorrect redirect destinations.

**2. Verify OG meta tags on key pages:**

Check the HTML source of these pages for correct `og:title`, `og:description`, `og:image`, and `twitter:image` meta tags:

```bash
curl -s https://upscalepm.com.au | grep -E 'og:|twitter:'
curl -s https://upscalepm.com.au/services/feasibility-advisory/sydney | grep -E 'og:|twitter:'
curl -s https://upscalepm.com.au/contact | grep -E 'og:|twitter:'
```

Verify:
- `og:title` contains the page-specific title
- `og:description` is not empty and is page-specific
- `og:image` points to a valid URL (not 404)
- `twitter:image` points to a valid URL
- `og:url` matches the canonical URL

**3. Test OG image URLs directly:**

Fetch the OG image URLs found in step 2 and verify they return a valid PNG image:
```bash
curl -I [og:image URL]
# Should return 200 with Content-Type: image/png
```

**4. Present social sharing testing instructions:**

CHECKPOINT: The following steps require the user to test in a browser.

---

**Social Sharing Verification (User performs these):**

Test these pages across all platforms:
- Homepage: `https://upscalepm.com.au`
- A location page: `https://upscalepm.com.au/services/feasibility-advisory/sydney`
- Contact page: `https://upscalepm.com.au/contact`
- A case study: pick any from the site

For each page, verify in:

1. **LinkedIn Post Inspector** (https://www.linkedin.com/post-inspector/)
   - Enter the URL
   - Verify: correct title, description, and image render
   - If stale: click "Fetch" to refresh

2. **Facebook Sharing Debugger** (https://developers.facebook.com/tools/debug/)
   - Enter the URL
   - Verify: correct title, description, and image render
   - If stale: click "Scrape Again"

3. **OpenGraph.xyz** (https://www.opengraph.xyz/)
   - Enter the URL
   - Verify the preview shows correctly for all platforms

Report any issues with missing images, wrong titles, or broken previews.

---

**5. Google Search Console submission:**

CHECKPOINT: Requires user access to Google Search Console.

---

**Google Search Console Steps (User performs these):**

1. Go to https://search.google.com/search-console/
2. Verify ownership of `upscalepm.com.au` (may already be verified if property existed for the WordPress site)
3. Submit the sitemap:
   - Go to Sitemaps in the left sidebar
   - Enter: `https://upscalepm.com.au/sitemap.xml`
   - Click Submit
4. Request indexing for high-priority pages:
   - Use the URL Inspection tool (top search bar)
   - Enter: `https://upscalepm.com.au`
   - Click "Request Indexing"
   - Repeat for: `/services/feasibility-advisory/sydney`, `/contact`, `/services`

---

**6. Final status check:**

After all verification:
- Confirm the build page count matches expected (existing ~50 pages + 10 location pages = ~60 pages)
- Verify no console errors on key pages (browser DevTools)
- Check that `prefers-reduced-motion: reduce` still works with location pages (they inherit scroll reveal from Section component)

### Acceptance Criteria

- [ ] All 61 redirects verified working on `https://upscalepm.com.au` (spot-check minimum 10, report any failures)
- [ ] `og:title`, `og:description`, `og:image` present and correct on homepage, a location page, contact page, and a case study
- [ ] OG image URLs return 200 with `Content-Type: image/png`
- [ ] LinkedIn Post Inspector shows correct preview for at least 2 pages
- [ ] Facebook Sharing Debugger shows correct preview for at least 2 pages
- [ ] Sitemap submitted to Google Search Console
- [ ] At least 3 priority pages requested for indexing in Search Console
- [ ] No broken pages, missing images, or console errors on production site

---

## Execution Order

Prompts 1 is the data foundation. Prompt 2 builds the pages (needs Prompt 1). Prompt 3 adds OG images (needs Prompt 2). Prompt 4 is DNS cutover (needs everything built). Prompt 5 is final verification (needs DNS live).

```
Prompt 1: Location Data Module
  |
  v
Prompt 2: Location Service Pages + Sitemap + Schema
  |
  v
Prompt 3: Dynamic OG Images & Twitter Cards
  |
  v
Prompt 4: DNS Cutover (CHECKPOINT -- human action)
  |
  v
Prompt 5: Launch Verification & Search Console (CHECKPOINT -- human verify)
```

Wave assignment:
- **Wave 1:** Prompt 1 (location data foundation)
- **Wave 2:** Prompt 2 (location pages -- depends on Prompt 1)
- **Wave 3:** Prompt 3 (OG images -- depends on Prompt 2)
- **Wave 4:** Prompt 4 (DNS cutover -- depends on all code being ready)
- **Wave 5:** Prompt 5 (launch verification -- depends on DNS being live)

NOTE: Prompts 1-3 are fully sequential because each depends on the previous. This is unavoidable -- the location data must exist before pages can be built, and pages must exist before OG images can reference them. Prompts 4-5 are checkpoints requiring human interaction.

## Verification Criteria (Phase-Level)

After all 5 prompts are complete, the following must be true:

1. **PSEO-01 (Service + location template):** A single page template at `src/app/services/[slug]/[location]/page.tsx` generates all 10 location pages using `generateStaticParams`. The template combines service data and location data to produce unique pages.

2. **PSEO-02 (Sydney location pages):** 5 pages exist at `/services/*/sydney`, each with Sydney-specific market context, relevant Sydney case studies, Sydney councils/suburbs, and CTAs mentioning Sydney.

3. **PSEO-03 (Newcastle location pages):** 5 pages exist at `/services/*/newcastle`, each with Newcastle-specific market context, Hunter region details, the Newcastle case study plus relevant nearby work, and CTAs mentioning Newcastle.

4. **PSEO-04 (Local context, case studies, CTAs):** Each of the 10 location pages has: at least 2 paragraphs of unique local market context, 2-3 relevant case studies from that location (or nearby), and a CTA that includes the city name. The content is substantive -- not thin template text with city names swapped.

5. **DEPL-02 (DNS to Vercel):** `https://upscalepm.com.au` loads the Next.js site. SSL is active. `www` redirects to apex. All 61 WordPress redirects return 301.

6. **DEPL-03 (Social sharing):** Sharing any page URL on LinkedIn, Twitter/X, or Facebook shows the correct page title, description, and OG image. Location pages show service-and-city-specific OG images.
