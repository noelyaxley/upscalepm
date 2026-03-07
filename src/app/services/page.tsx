import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllServices } from '@/lib/services'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { localBusinessSchema } from '@/components/seo/schemas'
import { ServiceAccordion } from '@/components/sections/service-accordion'
import { BlurFade } from '@/components/animation/blur-fade'

export const metadata: Metadata = generatePageMetadata({
  title: 'Club Redevelopment Services',
  description:
    'Independent advisory services for club redevelopments: strategic feasibility, development planning, consultant procurement, construction oversight, and venue launch for RSL, Leagues, and Golf clubs across NSW.',
  path: '/services',
})

export default function ServicesPage() {
  const services = getAllServices()

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHeader
        title="Club Redevelopment Services"
        subtitle="Independent advisory for every phase of your club redevelopment. From strategic feasibility through to opening night — we protect your club's interests at every stage."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Service accordion */}
      <Section>
        <ServiceAccordion services={services} />
      </Section>

      {/* Dual service model section (PAGE-12) */}
      <Section background="muted">
        <BlurFade>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
            Two Ways to Work With Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you need project-based support or an ongoing advisory
            retainer, we tailor our engagement to your club&apos;s needs.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <BlurFade delay={0.1}>
            <div className="h-full rounded-lg border-2 border-primary/20 bg-background p-6 text-left transition-all hover:border-primary/60">
              <h3 className="text-lg font-semibold">Full Project Advisory</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                End-to-end independent oversight for your club redevelopment —
                from feasibility through construction to venue launch. One
                advisor, the whole journey.
              </p>
            </div>
            </BlurFade>
            <BlurFade delay={0.2}>
            <div className="h-full rounded-lg border-2 border-primary/20 bg-background p-6 text-left transition-all hover:border-primary/60">
              <h3 className="text-lg font-semibold">Phase-Specific Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Targeted advice for a specific phase — feasibility review,
                tender evaluation, or construction oversight. Ideal for clubs
                that need expert input at a critical stage.
              </p>
            </div>
            </BlurFade>
          </div>
        </div>
        </BlurFade>
      </Section>

      {/* Bottom CTA */}
      <Section background="dark">
        <BlurFade>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
            Planning a Club Redevelopment?
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            Tell us about your club project and we will recommend the right
            level of support. Free 30-minute consultation, no obligation.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
        </BlurFade>
      </Section>
    </>
  )
}
