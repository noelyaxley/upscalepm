import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animation/blur-fade'
import {
  FileCheck,
  Calculator,
  HelpCircle,
  Clock,
  ClipboardList,
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
      'The most common risks that derail club redevelopments — and how to manage them. Essential reading for any board considering capital works.',
    status: 'available' as const,
  },
  {
    icon: Calculator,
    title: 'Club Capital Works Budget Template',
    description:
      'A practical budget framework for club redevelopments, covering design fees, construction costs, staging allowances, FF&E, and contingency.',
    status: 'coming-soon' as const,
  },
  {
    icon: HelpCircle,
    title: 'Questions Every Director Should Ask Before Approving a Project',
    description:
      'A governance checklist for board members. The 15 critical questions to ask before voting on major capital expenditure.',
    status: 'coming-soon' as const,
  },
  {
    icon: Clock,
    title: 'Club Redevelopment Timeline Guide',
    description:
      'Realistic timelines for club redevelopments from feasibility through to opening. How long each phase takes and what drives delays.',
    status: 'coming-soon' as const,
  },
  {
    icon: ClipboardList,
    title: 'Builder Tender Evaluation Template',
    description:
      'A structured evaluation framework for assessing construction tenders. Covers price, program, methodology, capability, and risk.',
    status: 'coming-soon' as const,
  },
]

export default function ResourcesPage() {
  return (
    <>
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
              <div className="flex gap-5 rounded-xl border-2 border-primary/20 bg-background p-6 transition-all hover:border-primary/60">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                  <resource.icon
                    className="size-6 text-white"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{resource.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {resource.description}
                  </p>
                  <div className="mt-4">
                    {resource.status === 'available' ? (
                      <Button asChild size="sm">
                        <Link href="/contact?resource=risk-checklist">
                          Request Download
                        </Link>
                      </Button>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
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
