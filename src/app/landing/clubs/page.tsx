import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Phone,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Building2,
  TrendingUp,
  Users,
  Calendar,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { LandingForm } from '@/components/forms/landing-form'
import { LogoMarquee } from '@/components/landing/logo-marquee'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title:
    'Independent Club Redevelopment Advisory | UpScale Project Management',
  description:
    'Independent advisory for RSL, Leagues, Workers, Diggers, Bowling and Golf club redevelopments across NSW. Protect your club from cost blowouts and construction risk.',
  robots: { index: false, follow: false },
}

const PHONE_NUMBER = '+61290904480'
const PHONE_DISPLAY = '02 9090 4480'

const painPoints = [
  'Concept designs that cost twice what the club can afford',
  'Builder variations eating through your contingency',
  'Construction disruption devastating gaming and dining revenue',
  'Board pressure from frustrated members during the build',
  'No independent voice at the table reviewing costs and progress',
]

const framework = [
  {
    stage: '01',
    title: 'Strategic Feasibility',
    description:
      'Know what you can afford before you engage an architect. We model costs, staging, revenue impact, and funding capacity.',
  },
  {
    stage: '02',
    title: 'Development Planning',
    description:
      'DA lodgement, heritage, staging strategy, and member approvals. We manage the planning process end-to-end.',
  },
  {
    stage: '03',
    title: 'Procurement',
    description:
      'Select the right architect and builder — not just the cheapest. Structured tender evaluation and contract negotiation.',
  },
  {
    stage: '04',
    title: 'Construction Oversight',
    description:
      'Independent budget monitoring, variation review, quality assurance, and monthly board reporting.',
  },
  {
    stage: '05',
    title: 'Venue Launch',
    description:
      'Defects management, fitout coordination, gaming compliance, and opening night.',
  },
]

const stats = [
  {
    icon: Building2,
    value: '$920M',
    label: 'Annual club capex in NSW',
    source: 'ClubsNSW/Urbis 2022',
  },
  {
    icon: TrendingUp,
    value: '98%',
    label: 'Of projects face delays',
    source: 'Buildern 2026',
  },
  {
    icon: Users,
    value: '1,400',
    label: 'Registered clubs in NSW',
    source: 'ClubsNSW',
  },
  {
    icon: Calendar,
    value: '15+',
    label: 'Years project experience',
    source: '',
  },
]

const faqs = [
  {
    question: 'How much does independent advisory cost?',
    answer:
      'Typically 3-5% of total project cost. For most clubs, a single prevented variation or avoided staging error pays for the entire engagement. We offer flexible engagement models — full lifecycle or specific stages where your board needs support.',
  },
  {
    question: 'When should we engage an advisor?',
    answer:
      'Before you appoint an architect. The most expensive mistakes happen in the earliest decisions — scope, budget, staging strategy, and procurement method. Engaging after construction starts means the biggest risks have already been locked in.',
  },
  {
    question:
      'We already have a quantity surveyor and architect. Do we still need you?',
    answer:
      'QS firms manage cost risk conservatively. Architects design to a brief. Neither is solely focused on the club\'s commercial interests. An independent advisor bridges the gap — reviewing recommendations from all consultants through the lens of what is best for the board and members.',
  },
  {
    question: 'Can you help if our project is already underway?',
    answer:
      'Yes. We regularly step into projects mid-construction to stabilise delivery, review variation claims, and establish independent reporting. The sooner we engage, the more we can protect — but it is never too late to get independent eyes on a project.',
  },
  {
    question: 'Do you work on projects under $5 million?',
    answer:
      'Yes. Many club refurbishments sit in the $2M-$10M range. The governance principles are the same — independent oversight, structured reporting, and cost control. We scale our engagement to match the project.',
  },
  {
    question: 'What types of clubs do you work with?',
    answer:
      'RSL clubs, leagues clubs, workers clubs, diggers clubs, bowling clubs, and golf clubs across NSW. We understand the specific challenges — gaming floor compliance, ILGA requirements, staged construction around live operations, and member communication.',
  },
]

export default function ClubsLandingPage() {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-neutral-950 text-white">
        <Container>
          <div className="flex items-center justify-between border-b border-white/10 py-3">
            <span className="flex items-center gap-2">
              <Image
                src="/images/shared/logo/logo-64.png"
                alt="UpScale Project Management"
                width={32}
                height={32}
              />
              <span className="font-display text-lg font-bold">
                UpScale PM
                <span className="ml-1 hidden text-xs font-normal text-neutral-400 sm:inline">
                  | Club Development Advisory
                </span>
              </span>
            </span>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              <Phone className="size-4" />
              <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </Container>
        <div className="border-b border-white/10 bg-primary/10 py-1.5">
          <Container>
            <p className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-primary">
              <Clock className="size-3.5" />
              Free 30-minute consultation — no obligation
            </p>
          </Container>
        </div>
      </div>

      {/* Hero */}
      <section
        id="top"
        className="relative overflow-hidden bg-neutral-950 text-white"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <Container className="relative">
          <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-2">
            <div>
              <h1 className="font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
                Is Your Club Planning a Redevelopment?
              </h1>
              <p className="mt-6 text-lg text-neutral-300">
                Most club redevelopments go over budget. The board only hears
                about problems after they are expensive. And no one at the table
                is solely focused on protecting the club.
              </p>
              <p className="mt-4 text-lg font-medium text-white">
                We fix that. Independent advisory for club boards — from
                feasibility to opening night.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                <span className="text-sm text-neutral-300">
                  We represent the club. Not the architect. Not the builder.
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:p-8">
              <h2 className="text-xl font-bold">Book a Free Consultation</h2>
              <p className="mt-1 text-sm text-neutral-400">
                30 minutes. No obligation. Just practical advice.
              </p>
              <div className="mt-6">
                <LandingForm variant="dark" formName="landing_form_clubs" thankYouPath="/landing/sydney/thank-you" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Client logos */}
      <section className="bg-white py-6">
        <LogoMarquee />
      </section>

      {/* Stats bar */}
      <section className="border-y bg-neutral-50 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto size-6 text-primary" />
                <p className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
                {stat.source && (
                  <p className="mt-0.5 text-[10px] text-neutral-400">
                    {stat.source}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pain points */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
            Sound Familiar?
          </h2>
          <ul className="mt-8 space-y-4">
            {painPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-lg border-2 border-destructive/20 bg-destructive/5 p-4"
              >
                <span className="mt-0.5 text-lg text-destructive">
                  &#10007;
                </span>
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-lg font-medium">
            These problems are preventable. They just need independent
            oversight.
          </p>
        </div>
      </Section>

      {/* Framework */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
            The UpScale Club Development Framework
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            Five stages of independent advisory. Engage us for all five or just
            the stages where your club needs support.
          </p>
          <div className="mt-10 space-y-4">
            {framework.map((step) => (
              <div
                key={step.stage}
                className="flex items-start gap-4 rounded-lg border bg-background p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                  {step.stage}
                </span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Case study: Granville Diggers */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
            Club Projects We Deliver
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-200">
              <Image
                src="/images/case-studies/granville-diggers/reception.jpg"
                alt="Granville Diggers Club reception foyer render"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Featured Project
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold">
                Granville Diggers Club
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Granville, Sydney NSW
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Full lifecycle project management for a heritage-sensitive RSL
                club redevelopment. From initial feasibility through DA
                lodgement, procurement under AS4902, and construction oversight
                — protecting a venue that has served its community since 1964.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  'Heritage items I72 & I73 — design around memorial significance',
                  'Staged construction to maintain club operations',
                  'AS4902 Design & Construct contract',
                  'Independent board reporting throughout',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Why us */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
            Why Clubs Choose UpScale
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              'Independent — we represent the club, not the builder',
              'Architectural background — we understand how venues function',
              'Governance-ready — structured reporting for board meetings',
              'Club-specialist — gaming compliance, staging, member expectations',
              'Full lifecycle — feasibility through to opening night',
              'NSW-focused — we know the regulatory landscape',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Founder */}
      <Section>
        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <Image
              src="/images/landing/noel-portrait.jpg"
              alt="Noel Yaxley, Director of UpScale Project Management"
              fill
              quality={90}
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Not Another Faceless Firm.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">Noel Yaxley.</strong> 15+
                years in project management across government, commercial,
                health, and hospitality. Architect-turned-PM who founded UpScale
                because club boards deserve someone in their corner.
              </p>
              <p>
                When you call UpScale, you get Noel. Not a junior associate.
                Not a call centre. The person who will sit in your board
                meetings, review every variation, and make sure your project
                delivers what your members were promised.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Club types */}
      <Section background="dark">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
            We Work With
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              'RSL Clubs',
              'Leagues Clubs',
              'Workers Clubs',
              'Diggers Clubs',
              'Bowling Clubs',
              'Golf Clubs',
            ].map((type) => (
              <span
                key={type}
                className="rounded-full border-2 border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <section className="border-y bg-neutral-50 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="mt-10 space-y-3"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="rounded-lg border bg-white px-6 data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-neutral-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <Section background="dark">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
            Ready to Protect Your Club?
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            Book a free 30-minute consultation. No obligation — just practical
            advice from an experienced club redevelopment advisor.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <a href={`tel:${PHONE_NUMBER}`}>
                <Phone className="mr-2 size-4" />
                Call {PHONE_DISPLAY}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-neutral-400 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#top">Fill Out the Form</a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t bg-neutral-950 py-8 text-center text-sm text-neutral-400">
        <Container>
          <p>
            &copy; {new Date().getFullYear()} UpScale Project Management | Club
            Development Advisory
          </p>
          <p className="mt-2">
            Level 2/89 Macquarie St, Sydney NSW 2000 |{' '}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="text-primary hover:underline"
            >
              {PHONE_DISPLAY}
            </a>{' '}
            |{' '}
            <a
              href="mailto:noel@upscalepm.com.au"
              className="text-primary hover:underline"
            >
              noel@upscalepm.com.au
            </a>
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            ABN 48 655 894 286 |{' '}
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>{' '}|{' '}
            <a href="/terms-and-conditions" className="hover:underline">Terms</a>
          </p>
        </Container>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-neutral-950 p-3 md:hidden">
        <div className="flex gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white"
          >
            <Phone className="size-4" />
            Call Now
          </a>
          <a
            href="#top"
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-neutral-600 py-3 text-sm font-semibold text-white"
          >
            Get a Callback
          </a>
        </div>
      </div>
    </>
  )
}
