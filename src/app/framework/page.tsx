import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animation/blur-fade'
import {
  BarChart3,
  FileCheck,
  Scale,
  HardHat,
  PartyPopper,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'The UpScale Club Development Framework',
  description:
    'Our five-stage framework for club redevelopments: Strategic Feasibility, Development Planning, Procurement, Construction Oversight, and Venue Launch. A proven methodology for RSL, Leagues, and Golf club projects.',
  path: '/framework',
})

const stages = [
  {
    number: 1,
    title: 'Strategic Feasibility',
    icon: BarChart3,
    subtitle: 'Know what you are getting into before you commit',
    activities: [
      'Site capacity and development potential analysis',
      'Realistic budget modelling for club-funded projects',
      'Gaming floor compliance and ILGA requirements review',
      'Regulatory pathway assessment (Registered Clubs Act, council)',
      'Staging strategy to maintain trading during construction',
      'Member consultation and board presentation support',
    ],
    outcome:
      'The board has a clear, evidence-based understanding of what is achievable, what it will cost, and what the key risks are — before engaging an architect.',
  },
  {
    number: 2,
    title: 'Development Planning',
    icon: FileCheck,
    subtitle: 'From concept to approved DA',
    activities: [
      'Architect and consultant team selection and brief development',
      'Heritage assessment coordination (critical for RSL clubs)',
      'Council pre-lodgement meetings and authority liaison',
      'DA preparation, lodgement, and determination management',
      'Member approval process guidance (Registered Clubs Act)',
      'Construction staging within the DA framework',
    ],
    outcome:
      'An approved Development Application with conditions that are practical, affordable, and aligned with the club\'s operational requirements.',
  },
  {
    number: 3,
    title: 'Procurement',
    icon: Scale,
    subtitle: 'Selecting the right builder at the right price',
    activities: [
      'Builder prequalification — firms with genuine club experience',
      'Tender documentation that reduces ambiguity and variation risk',
      'Structured tender evaluation (price, program, methodology, risk)',
      'Board-level evaluation reports for confident decision-making',
      'Contract negotiation protecting the club from common risks',
      'Value engineering without compromising hospitality quality',
    ],
    outcome:
      'A construction contract with a capable builder at a fair price, with clear risk allocation and minimal grounds for variation claims.',
  },
  {
    number: 4,
    title: 'Construction Oversight',
    icon: HardHat,
    subtitle: 'Protecting your club during the build',
    activities: [
      'Independent budget monitoring and cost reporting',
      'Variation assessment — reviewing every claim before approval',
      'Construction quality assurance (hospitality-grade finishes)',
      'Program tracking with early warning on delays',
      'Staged construction management around live club operations',
      'Structured board reporting — cost, time, quality, risk',
    ],
    outcome:
      'A project delivered on budget and on program, with quality that meets member expectations and no surprises for the board.',
  },
  {
    number: 5,
    title: 'Venue Launch',
    icon: PartyPopper,
    subtitle: 'From construction site to opening night',
    activities: [
      'Thorough defect identification and rectification management',
      'Fitout, furniture, and equipment coordination',
      'Gaming system installation and ILGA compliance',
      'Operational handover support and staff orientation',
      'Post-occupancy review and warranty management',
      'Board communications for the completed project',
    ],
    outcome:
      'A club that opens on time, on budget, and ready for members — with defects managed, warranties documented, and the board reporting a successful outcome.',
  },
]

export default function FrameworkPage() {
  return (
    <>
      <PageHeader
        title="The UpScale Club Development Framework"
        subtitle="Five stages of independent advisory — protecting your club from feasibility through to opening night."
        breadcrumbs={[{ label: 'Framework' }]}
      />

      {/* Intro */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Club redevelopments fail when key decisions are made without
              independent advice. Our framework ensures the board has expert
              guidance at every critical stage — from the first feasibility
              question through to the ribbon cutting.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              You can engage us for the full framework or for specific stages
              where your club needs support.
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* Stages */}
      {stages.map((stage, i) => (
        <Section key={stage.number} background={i % 2 === 0 ? 'muted' : 'default'}>
          <BlurFade>
            <div className="mx-auto max-w-4xl">
              <div className="flex items-start gap-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
                  <stage.icon className="size-7 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">
                      Stage {stage.number}
                    </span>
                  </div>
                  <h2 className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                    {stage.title}
                  </h2>
                  <p className="mt-2 text-lg text-muted-foreground">
                    {stage.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Key Activities
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {stage.activities.map((activity, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
                        <span className="text-sm leading-relaxed">
                          {activity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Outcome
                  </h3>
                  <p className="mt-4 rounded-lg border-2 border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed">
                    {stage.outcome}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/services/${
                        [
                          'feasibility-masterplanning',
                          'development-planning-approvals',
                          'consultant-builder-procurement',
                          'construction-oversight',
                          'venue-launch-completion',
                        ][i]
                      }`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Learn more about this service &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </Section>
      ))}

      {/* CTA */}
      <Section background="dark">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              Which Stage Is Your Club At?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              Whether you are considering a redevelopment or already in
              construction, we can help. Book a free consultation to discuss
              where your club is and what support you need.
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
