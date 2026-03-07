import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animation/blur-fade'
import { JsonLd } from '@/components/seo/json-ld'
import { faqSchema } from '@/components/seo/schemas'
import {
  AlertTriangle,
  DollarSign,
  Users,
  ShieldCheck,
  Building2,
  Scale,
} from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Advice for Club Boards Planning a Redevelopment',
  description:
    'What every club board and CEO should know before starting a redevelopment. The biggest risks, why projects go over budget, and how independent advice protects your club.',
  path: '/for-club-boards',
})

const risks = [
  {
    icon: DollarSign,
    title: 'Cost Blowouts',
    description:
      'Most club redevelopments exceed their original budget. The primary cause is not the builder — it is approving a concept design before understanding the true construction cost. Independent feasibility analysis prevents this.',
  },
  {
    icon: Building2,
    title: 'Operational Disruption',
    description:
      'Your club must keep trading throughout construction. Gaming, dining, and entertainment need to continue. Without a proper staging strategy, revenue loss during construction can exceed the cost of the project itself.',
  },
  {
    icon: Users,
    title: 'Member & Governance Pressure',
    description:
      'Elected boards face political pressure from members during disruptive builds. Noise, reduced amenity, and budget concerns can trigger challenges. Transparent communication and structured governance reporting are essential.',
  },
  {
    icon: AlertTriangle,
    title: 'Scope Creep',
    description:
      'Committee-based decision-making often leads to design changes mid-project. Each change cascades through cost, program, and approvals. A structured change management process protects the board from uncontrolled scope growth.',
  },
  {
    icon: Scale,
    title: 'Competing Consultant Interests',
    description:
      'Architects want to build their vision. Builders want to maximise margin. Neither is solely focused on the club\'s best interests. An independent advisor ensures decisions are made for the club, not the consultant team.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Complexity',
    description:
      'Gaming machine thresholds, ILGA requirements, the Registered Clubs Act, heritage constraints, and member approval provisions create a regulatory maze. Getting this wrong can delay your project by years.',
  },
]

const faqItems = [
  {
    question: 'When should we engage an independent advisor?',
    answer:
      'Before you appoint an architect. The most impactful decisions happen in the earliest stages — site capacity, budget reality, staging strategy, and regulatory pathway. Engaging after the architect is appointed means many key decisions have already been locked in.',
  },
  {
    question: 'What is client-side project management?',
    answer:
      'A client-side project manager works exclusively for the club — not the architect, not the builder. We sit on your side of the table, reviewing recommendations, challenging costs, and ensuring every decision is in the board\'s best interest.',
  },
  {
    question: 'How is this different from hiring a project manager through the builder?',
    answer:
      'A builder\'s project manager works for the builder. Their job is to deliver the project profitably for the construction company. Our job is to protect the club\'s budget, quality, and timeline. These are fundamentally different roles.',
  },
  {
    question: 'Do we still need an architect and builder?',
    answer:
      'Yes. We do not replace your design or construction team. We manage the process, coordinate the consultants, and provide independent oversight — ensuring the board has the right information to make confident decisions.',
  },
  {
    question: 'What size projects do you work on?',
    answer:
      'We work on club redevelopments from $2M refurbishments through to $50M+ major redevelopments. The principles of independent oversight apply regardless of project size.',
  },
  {
    question: 'Can you help if our project is already underway?',
    answer:
      'Yes. We can provide construction oversight, variation review, and board reporting on projects already in construction. It is never too late to get independent advice, though earlier engagement delivers better outcomes.',
  },
]

export default function ForClubBoardsPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <PageHeader
        title="Advice for Club Boards Planning a Redevelopment"
        subtitle="What every club director should know before approving major capital works."
        breadcrumbs={[{ label: 'For Club Boards' }]}
      />

      {/* Intro */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Club redevelopments are among the most complex projects a board
              will ever oversee. They involve millions of dollars in member
              funds, years of disruption, and decisions that will shape the
              club&apos;s future for decades. Yet most boards approach their
              first redevelopment without independent advice — relying entirely
              on the architect or builder to guide them.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              This page outlines the biggest risks, the most common mistakes,
              and why independent oversight is critical to protecting your
              club&apos;s interests.
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* Risks */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              The Biggest Risks in Club Redevelopment
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              These are the issues we see on every project. Understanding them
              is the first step to managing them.
            </p>
          </div>
        </BlurFade>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {risks.map((risk, i) => (
            <BlurFade key={risk.title} delay={0.1 + i * 0.05}>
              <div className="flex h-full flex-col rounded-xl border-2 border-primary/20 bg-background p-6 transition-all hover:border-primary/60">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                  <risk.icon className="size-5 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{risk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {risk.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </Section>

      {/* Common mistakes */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              The Most Common Mistakes
            </h2>
            <ol className="mt-8 space-y-6">
              {[
                {
                  title: 'Hiring an architect before understanding the budget',
                  body: 'Architects design to a brief, not a budget. If you commission a concept design before establishing what the club can actually afford to build, you will either overspend or waste months redesigning.',
                },
                {
                  title: 'Not planning for staged construction',
                  body: 'Closing the entire club during construction is rarely an option. But staging adds cost and complexity. If staging is not planned from the outset, the project will face delays, cost overruns, and member frustration.',
                },
                {
                  title: 'Accepting the lowest tender',
                  body: 'The cheapest bid is often the most expensive outcome. Low tenders frequently result in aggressive variation claims, quality shortcuts, and program overruns. Evaluate capability, methodology, and risk — not just price.',
                },
                {
                  title: 'Relying on the builder for cost advice',
                  body: 'Builders price to their advantage. Without independent cost verification, the board has no way to know whether the price is fair, the scope is complete, or the exclusions are reasonable.',
                },
                {
                  title: 'Inadequate board reporting during construction',
                  body: 'Construction is fast-moving. Without structured, independent progress reports, the board only hears about problems after they have become expensive. Regular, honest reporting is essential for governance.',
                },
              ].map((mistake, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{mistake.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {mistake.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </BlurFade>
      </Section>

      {/* Why independent advice */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              Why Independent Advice Matters
            </h2>
            <div className="mt-6 space-y-4 text-left text-muted-foreground">
              <p>
                Every consultant on a club redevelopment has their own
                incentives. Architects want to realise their design vision.
                Builders want to maximise their margin. Quantity surveyors want
                to manage risk conservatively. None of these perspectives are
                wrong — but none are solely focused on the club&apos;s best
                interests.
              </p>
              <p>
                An independent client-side advisor fills this gap. We review
                every recommendation through the lens of the club&apos;s budget,
                program, and long-term strategy. We challenge costs, question
                assumptions, and ensure the board has the information it needs to
                make confident decisions.
              </p>
              <p>
                This is not about adding another consultant to the team. It is
                about having someone at the table whose only job is to protect
                the club.
              </p>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* FAQ */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-center text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 space-y-6">
              {faqItems.map((faq, i) => (
                <div key={i} className="rounded-lg border p-6">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              Ready to Discuss Your Club&apos;s Project?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              Book a free 30-minute consultation. No obligation — just practical
              advice from an experienced club redevelopment advisor.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-neutral-400 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/resources">Download the Risk Checklist</Link>
              </Button>
            </div>
          </div>
        </BlurFade>
      </Section>
    </>
  )
}
