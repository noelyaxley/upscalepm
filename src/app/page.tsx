import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllServices } from '@/lib/services'
import { generatePageMetadata } from '@/lib/metadata'
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
import { GeometricShapes } from '@/components/animation/geometric-shapes'
import { BlurFade } from '@/components/animation/blur-fade'

export const metadata: Metadata = generatePageMetadata({
  title: 'Club Development Advisory | Independent Advisors for Club Redevelopments',
  description:
    'UpScale Project Management provides independent client-side advisory for RSL, Leagues, Workers, Diggers, Bowling and Golf club redevelopments across NSW. From feasibility to opening night.',
  path: '/',
})

export default function Home() {
  const services = getAllServices()
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <ClientLogos />
      <ValueProposition />

      {/* Niche statement */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              We Specialise In
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                'RSL & Leagues Club Redevelopments',
                'Golf Clubhouse Developments',
                'Bowling Club Upgrades',
                'Diggers & Workers Club Refurbishments',
                'Club Hospitality Venue Redevelopments',
              ].map((niche) => (
                <span
                  key={niche}
                  className="rounded-full border-2 border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground"
                >
                  {niche}
                </span>
              ))}
            </div>
          </div>
        </BlurFade>
      </Section>

      <ServicesOverview services={services} />

      {/* Mid-page CTA */}
      <Section background="dark" className="relative overflow-hidden">
        <GeometricShapes variant="dark" />
        <BlurFade>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
            Not Sure Where to Start?
          </h2>
          <p className="mt-3 text-neutral-300">
            Tell us about your club project and we will recommend the right
            level of support — from a one-off feasibility review to full
            project oversight.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/contact">Get Free Advice</Link>
            </Button>
          </div>
        </div>
        </BlurFade>
      </Section>

      <FeaturedCaseStudies />

      <HomepageCta />
    </>
  )
}
