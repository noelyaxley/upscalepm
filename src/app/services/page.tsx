import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllServices } from '@/lib/services'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = generatePageMetadata({
  title: 'Services',
  description:
    'Client-side project management services: feasibility advisory, design management, DA approval, tender assessment, and construction superintendent.',
  path: '/services',
})

export default function ServicesPage() {
  const services = getAllServices()

  return (
    <>
      <PageHeader
        title="Services"
        subtitle="Comprehensive client-side project management from feasibility through to handover. We protect your time, budget, and quality at every stage."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Service cards grid */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const excerpt =
              service.sections[0]?.body.slice(0, 120).replace(/\n/g, ' ') +
              '...'

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-lg border bg-background p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <h2 className="text-xl font-semibold tracking-tight group-hover:text-primary">
                  {service.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-primary/80">
                  {service.subtitle}
                </p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* Dual service model section (PAGE-12) */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Two Ways to Work With Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you need project-based support or an ongoing advisory
            retainer, we tailor our engagement to your project&apos;s needs. Our
            flexible model means you get the right level of involvement at the
            right time.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border bg-background p-6 text-left">
              <h3 className="text-lg font-semibold">Project Engagement</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Dedicated project management for a specific development --
                scoped to your timeline, budget, and deliverables from start to
                finish.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6 text-left">
              <h3 className="text-lg font-semibold">Advisory Retainer</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Ongoing expert guidance across your portfolio. Ideal for
                developers managing multiple projects who need consistent
                strategic oversight.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section background="dark">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Discuss Your Project?
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            Tell us about your project and we will explain how client-side
            project management can protect your investment.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
