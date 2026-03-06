import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animation/blur-fade'
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
      <div className="relative overflow-hidden border-b bg-neutral-950 py-16 text-white md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-neutral-400">
              <li>
                <a href="/" className="transition-colors hover:text-white">Home</a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <span className="text-white">UpScale.build</span>
              </li>
            </ol>
          </nav>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl lg:text-7xl">
                UpScale.build
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
                Purpose-built project management software for small property developers.
                From feasibility through to handover — everything in one platform.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-3">
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
        <BlurFade>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
            Stop Managing Projects in Spreadsheets
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            UpScale.build replaces the patchwork of spreadsheets, emails, and
            guesswork with a single platform purpose-built for property
            developers running $500K&ndash;$5M projects.
          </p>
        </div>
        </BlurFade>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <BlurFade key={feature.title} delay={0.1 + i * 0.1}>
            <div
              className="h-full rounded-lg border-2 border-primary/20 bg-background p-6 shadow-sm transition-all hover:border-primary/60 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
            </BlurFade>
          ))}
        </div>
      </Section>

      <Section background="dark">
        <BlurFade>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
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
        </BlurFade>
      </Section>
    </>
  )
}
