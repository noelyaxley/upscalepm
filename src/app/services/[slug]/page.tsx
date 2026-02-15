import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getServiceBySlug, getAllServices } from '@/lib/services'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { ServiceBenefits } from '@/components/sections/service-benefits'
import { ServiceCta } from '@/components/sections/service-cta'
import { RelatedCaseStudies } from '@/components/sections/related-case-studies'
import { JsonLd } from '@/components/seo/json-ld'
import { serviceSchema } from '@/components/seo/schemas'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Not Found' }
  return generatePageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
  })
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      <JsonLd data={serviceSchema({ title: service.title, description: service.description, slug: service.slug })} />
      {/* Hero with background image */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover opacity-15"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>
        <div className="relative">
          <PageHeader
            title={service.title}
            subtitle={service.subtitle}
            breadcrumbs={[
              { label: 'Services', href: '/services' },
              { label: service.title },
            ]}
          />
        </div>
      </div>

      {/* Content sections with alternating backgrounds */}
      {service.sections.map((section, index) => (
        <Section
          key={section.heading}
          background={index % 2 === 0 ? 'default' : 'muted'}
        >
          {section.image ? (
            <div className={`mx-auto flex max-w-6xl flex-col items-center gap-8 md:gap-12 lg:flex-row ${section.imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg lg:w-1/2">
                <Image
                  src={section.image}
                  alt={section.heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  {section.body.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                {section.body.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </Section>
      ))}

      {/* Mid-page CTA (CRO-05) */}
      <Section background="dark">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Ready to Discuss {service.title}?
          </h2>
          <p className="mt-3 text-neutral-300">
            Get practical advice on your project from an experienced client-side
            PM.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Benefits grid */}
      <ServiceBenefits benefits={service.benefits} />

      {/* Dual service model callout (PAGE-12) */}
      <Section background="default" spacing="compact">
        <div className="mx-auto max-w-3xl rounded-lg border-l-4 border-primary bg-muted/50 p-6 md:p-8">
          <h3 className="text-lg font-semibold">
            Flexible Engagement Models
          </h3>
          <p className="mt-2 text-muted-foreground">
            Available as a project engagement or as part of our ongoing advisory
            retainer. Contact us to discuss the right model for your project.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <ServiceCta
        heading={service.ctaText}
        description={service.ctaDescription}
        buttonText="Send an Enquiry"
        showBooking={true}
        bookingText="Book a Call"
      />

      {/* Related case studies */}
      <RelatedCaseStudies slugs={service.relatedCaseStudies} />
    </>
  )
}
