import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animation/blur-fade'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/components/seo/schemas'
import {
  FileCheck,
  Calculator,
  HelpCircle,
  Clock,
  ClipboardList,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Club Redevelopment Resources',
  description:
    'Free guides, checklists, and templates for club boards planning a redevelopment. Download the Club Redevelopment Risk Checklist, Budget Template, and more.',
  path: '/resources',
})

const resources = [
  {
    icon: FileCheck,
    title: 'Club Redevelopment Risk Checklist',
    description:
      'The top 25 risks that derail club redevelopments — and how to manage them. Covering financial, governance, construction, planning, and operational risks.',
    slug: 'risk-checklist',
  },
  {
    icon: Calculator,
    title: 'Club Capital Works Budget Template',
    description:
      'A comprehensive budget framework with 50+ line items across 9 categories. Includes cost ranges for a $12M project and adjustments for different project sizes.',
    slug: 'budget-template',
  },
  {
    icon: HelpCircle,
    title: '15 Questions Every Director Should Ask',
    description:
      'A governance checklist for board members. The 15 critical questions to ask before voting on major capital expenditure — with red flags to watch for.',
    slug: 'director-questions',
  },
  {
    icon: Clock,
    title: 'Club Redevelopment Timeline Guide',
    description:
      'Realistic timelines for each phase from feasibility to opening night. Includes durations for $5M, $10M, and $20M+ projects and common delay causes.',
    slug: 'timeline-guide',
  },
  {
    icon: ClipboardList,
    title: 'Builder Tender Evaluation Template',
    description:
      'A structured scoring framework for evaluating construction tenders. Covers price, program, methodology, capability, risk, and references with recommended weightings.',
    slug: 'tender-evaluation',
  },
]

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
      ])} />
      <PageHeader
        title="Club Redevelopment Resources"
        subtitle="Free guides, checklists, and templates to help club boards make better decisions on capital projects."
        breadcrumbs={[{ label: 'Resources' }]}
      />

      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg text-muted-foreground">
              We believe club boards should have access to practical, unbiased
              advice — not just from consultants trying to win the project.
              These resources are drawn from our experience advising clubs on
              redevelopments across NSW.
            </p>
          </div>
        </BlurFade>

        <div className="mx-auto mt-12 max-w-3xl space-y-6">
          {resources.map((resource, i) => (
            <BlurFade key={resource.title} delay={0.1 + i * 0.05}>
              <Link
                href={`/resources/${resource.slug}`}
                className="group flex gap-5 rounded-xl border-2 border-primary/20 bg-background p-6 transition-all hover:border-primary/60 hover:shadow-md"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                  <resource.icon
                    className="size-6 text-white"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {resource.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                    Read Guide & Download PDF
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Need Advice Specific to Your Club?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              These resources cover general principles. For advice tailored to
              your club&apos;s specific project, book a free consultation.
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
