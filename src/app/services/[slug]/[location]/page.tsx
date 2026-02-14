import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getServiceBySlug } from '@/lib/services'
import { getLocationBySlug, getAllServiceLocationParams } from '@/lib/locations'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { RelatedCaseStudies } from '@/components/sections/related-case-studies'
import { ServiceCta } from '@/components/sections/service-cta'
import { JsonLd } from '@/components/seo/json-ld'
import { locationServiceSchema } from '@/components/seo/schemas'

interface PageProps {
  params: Promise<{ slug: string; location: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllServiceLocationParams()
}

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

export default async function LocationServicePage({ params }: PageProps) {
  const { slug, location } = await params
  const service = getServiceBySlug(slug)
  const loc = getLocationBySlug(location)
  if (!service || !loc) notFound()

  const locationContext = loc.serviceContexts[slug]
  if (!locationContext) notFound()

  return (
    <>
      <JsonLd
        data={locationServiceSchema({
          title: service.title,
          description: locationContext.localDescription,
          slug: service.slug,
          location: { name: loc.name, region: loc.region },
        })}
      />

      <PageHeader
        title={`${service.title} in ${loc.name}`}
        subtitle={`${service.subtitle} across ${loc.region}`}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${slug}` },
          { label: loc.name },
        ]}
      />

      {/* Local service description */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {service.title} in {loc.name}
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            {locationContext.localDescription
              .split('\n\n')
              .map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </Section>

      {/* Local market context */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            The {loc.name} Property Market
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            {loc.marketContext.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Local benefits */}
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
                <span className="leading-relaxed text-muted-foreground">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Parent service link */}
      <Section spacing="compact">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-muted-foreground">
            Learn more about our{' '}
            <Link
              href={`/services/${slug}`}
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              {service.title}
            </Link>{' '}
            services across all locations.
          </p>
        </div>
      </Section>

      {/* Location-specific CTA */}
      <ServiceCta
        heading={locationContext.localCta}
        description={`Get practical advice on your ${loc.name} project from an experienced client-side PM.`}
        buttonText="Send an Enquiry"
        showBooking={true}
        bookingText="Book a Call"
      />

      {/* Related case studies for this location */}
      <RelatedCaseStudies slugs={locationContext.relatedCaseStudies} />
    </>
  )
}
