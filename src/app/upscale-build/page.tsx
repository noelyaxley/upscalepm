import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { BarChart3, FileSpreadsheet, DollarSign, Users, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'UpScale.build - Project Management Software for Property Developers',
  description:
    'UpScale.build is a purpose-built SaaS platform for small property developers. Feasibility analysis, project tracking, cost management, and reporting — all in one place.',
  path: '/upscale-build',
})

const features = [
  {
    icon: <FileSpreadsheet className="size-6" />,
    title: 'Feasibility Analysis',
    description:
      'Model land costs, construction budgets, sales projections, and funding structures. See your project viability instantly.',
  },
  {
    icon: <BarChart3 className="size-6" />,
    title: 'Financial Reporting',
    description:
      'Cash flow projections, equity returns, and debt serviceability — all calculated automatically from your inputs.',
  },
  {
    icon: <DollarSign className="size-6" />,
    title: 'Cost Management',
    description:
      'Track line items, variations, and actuals against budget. Know exactly where your money is going.',
  },
  {
    icon: <Users className="size-6" />,
    title: 'Stakeholder Collaboration',
    description:
      'Share project dashboards with investors, lenders, and partners. Everyone sees the same source of truth.',
  },
  {
    icon: <Shield className="size-6" />,
    title: 'Built for Developers',
    description:
      'Designed by a project manager who has delivered 14+ projects. Every feature solves a real problem.',
  },
  {
    icon: <Zap className="size-6" />,
    title: 'Fast Setup',
    description:
      'No training needed. Start a new feasibility study in minutes, not days. Works on desktop and mobile.',
  },
]

export default function UpScaleBuildPage() {
  return (
    <>
      <div className="border-b bg-muted/50 py-12 md:py-16 lg:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="transition-colors hover:text-foreground">Home</a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <span className="text-foreground">UpScale.build</span>
              </li>
            </ol>
          </nav>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                UpScale.build
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Purpose-built project management software for small property developers.
                From feasibility through to handover — everything in one platform.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="text-sm font-medium text-primary">
                Try UpScale.build for free
              </span>
              <Button asChild>
                <a href="https://upscale.build/" target="_blank" rel="noopener noreferrer">
                  LAUNCH
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Stop Managing Projects in Spreadsheets
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            UpScale.build replaces the patchwork of spreadsheets, emails, and
            guesswork with a single platform purpose-built for property
            developers running $500K&ndash;$5M projects.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border bg-background p-6 shadow-sm"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="dark">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Coming Soon
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            UpScale.build is currently in development. Register your interest
            and be the first to know when we launch.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">Register Interest</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
