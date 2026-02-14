import Link from 'next/link'
import { Section } from '@/components/layout/section'
import type { ServicePage } from '@/lib/services.types'

interface ServicesOverviewProps {
  services: ServicePage[]
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Our Services
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Comprehensive client-side project management, from early feasibility
          through construction delivery.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group rounded-lg border bg-background p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold group-hover:text-primary">
              {service.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {service.subtitle}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-primary">
              Learn more &rarr;
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All Services &rarr;
        </Link>
      </div>
    </Section>
  )
}
