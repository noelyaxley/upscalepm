import Image from 'next/image'
import Link from 'next/link'
import {
  BarChart3,
  Compass,
  FileCheck,
  Scale,
  HardHat,
  ArrowRight,
} from 'lucide-react'
import { Section } from '@/components/layout/section'
import type { ServicePage } from '@/lib/services.types'

interface ServicesOverviewProps {
  services: ServicePage[]
}

const serviceIcons: Record<string, typeof BarChart3> = {
  'feasibility-advisory': BarChart3,
  'design-management': Compass,
  'da-approval': FileCheck,
  'tender-assessment': Scale,
  'construction-superintendent': HardHat,
}

const serviceCardImages: Record<string, string> = {
  'feasibility-advisory': '/images/services/feasibility-advisory-card.jpg',
  'design-management': '/images/services/design-management-card.jpg',
  'da-approval': '/images/services/da-approval-card.jpg',
  'tender-assessment': '/images/services/tender-assessment-card.jpg',
  'construction-superintendent': '/images/services/construction-superintendent-card.jpg',
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

      {/* Top row: 3 cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 3).map((service) => {
          const Icon = serviceIcons[service.slug] ?? BarChart3
          return (
            <ServiceCard key={service.slug} service={service} Icon={Icon} />
          )
        })}
      </div>

      {/* Bottom row: 2 cards centered */}
      {services.length > 3 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%+0.75rem)] lg:grid-cols-2">
          {services.slice(3).map((service) => {
            const Icon = serviceIcons[service.slug] ?? BarChart3
            return (
              <ServiceCard key={service.slug} service={service} Icon={Icon} />
            )
          })}
        </div>
      )}

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

function ServiceCard({
  service,
  Icon,
}: {
  service: ServicePage
  Icon: typeof BarChart3
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Image with zoom on hover */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={serviceCardImages[service.slug] ?? service.heroImage}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
            <Icon className="size-5 text-white" strokeWidth={1.75} />
          </div>
          <h3 className="text-lg font-bold tracking-tight transition-colors duration-200 group-hover:text-primary">
            {service.title}
          </h3>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {service.subtitle}
        </p>
        <div className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
          <span>Learn more</span>
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Bottom accent bar — grows on hover */}
      <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}
