import Link from 'next/link'
import { getAllServices } from '@/lib/services'
import { getAllCaseStudies } from '@/lib/content'
import { Hero } from '@/components/sections/hero'
import { ClientLogos } from '@/components/sections/client-logos'
import { ValueProposition } from '@/components/sections/value-proposition'
import { ServicesOverview } from '@/components/sections/services-overview'
import { FeaturedCaseStudies } from '@/components/sections/featured-case-studies'
import { HomepageCta } from '@/components/sections/homepage-cta'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { localBusinessSchema } from '@/components/seo/schemas'

export default function Home() {
  const services = getAllServices()
  const caseStudies = getAllCaseStudies().slice(0, 3)

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <ClientLogos />
      <ValueProposition />
      <ServicesOverview services={services} />

      {/* Mid-page CTA (CRO-05: CTA at every scroll depth) */}
      <Section background="dark">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Not Sure What You Need?
          </h2>
          <p className="mt-3 text-neutral-300">
            Tell us about your project and we will recommend the right level of
            support.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/contact">Get Free Advice</Link>
            </Button>
          </div>
        </div>
      </Section>

      <FeaturedCaseStudies caseStudies={caseStudies} />
      <HomepageCta />
    </>
  )
}
