import Image from 'next/image'
import Link from 'next/link'
import {
  BarChart3,
  FileCheck,
  Scale,
  HardHat,
  PartyPopper,
  ArrowRight,
} from 'lucide-react'
import { Section } from '@/components/layout/section'
import { BlurFade } from '@/components/animation/blur-fade'
import type { ServicePage } from '@/lib/services.types'

interface ServicesOverviewProps {
  services: ServicePage[]
}

const serviceIcons: Record<string, typeof BarChart3> = {
  'feasibility-masterplanning': BarChart3,
  'development-planning-approvals': FileCheck,
  'consultant-builder-procurement': Scale,
  'construction-oversight': HardHat,
  'venue-launch-completion': PartyPopper,
}

const serviceCardImages: Record<string, string> = {
  'feasibility-masterplanning': '/images/services/feasibility-advisory-card.jpg',
  'development-planning-approvals': '/images/services/da-approval-card.jpg',
  'consultant-builder-procurement': '/images/services/tender-assessment-card.jpg',
  'construction-oversight': '/images/services/construction-superintendent-card.jpg',
  'venue-launch-completion': '/images/services/design-management-card.jpg',
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <Section>
      <BlurFade>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
          The UpScale Club Development Framework
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Five stages of independent advisory — protecting your club from
          feasibility through to opening night.
        </p>
      </div>
      </BlurFade>

      {/* Top row: 3 cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 3).map((service, i) => {
          const Icon = serviceIcons[service.slug] ?? BarChart3
          return (
            <ServiceCard key={service.slug} service={service} Icon={Icon} index={i} />
          )
        })}
      </div>

      {/* Bottom row: 2 cards centered */}
      {services.length > 3 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%+0.75rem)] lg:grid-cols-2">
          {services.slice(3).map((service, i) => {
            const Icon = serviceIcons[service.slug] ?? BarChart3
            return (
              <ServiceCard key={service.slug} service={service} Icon={Icon} index={i + 3} />
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
  index = 0,
}: {
  service: ServicePage
  Icon: typeof BarChart3
  index?: number
}) {
  return (
    <BlurFade delay={0.1 + index * 0.1}>
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-primary/20 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
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
    </BlurFade>
  )
}
