import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { LandingForm } from '@/components/forms/landing-form'

export const metadata: Metadata = {
  title: 'Independent Club Redevelopment Advisory | UpScale Project Management',
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
    description: 'Know what you can afford before you engage an architect.',
  },
  {
    stage: '02',
    title: 'Development Planning',
    description: 'DA, heritage, staging strategy, and member approvals.',
  },
  {
    stage: '03',
    title: 'Procurement',
    description: 'Select the right architect and builder — not just the cheapest.',
  },
  {
    stage: '04',
    title: 'Construction Oversight',
    description: 'Independent budget monitoring, variation review, and board reporting.',
  },
  {
    stage: '05',
    title: 'Venue Launch',
    description: 'Defects, fitout, gaming compliance, and opening night.',
  },
]

export default function ClubsLandingPage() {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-neutral-950 text-white">
        <Container>
          <div className="flex items-center justify-between border-b border-white/10 py-3">
            <Link href="/" className="flex items-center gap-2">
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
            </Link>
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
      <section className="relative overflow-hidden bg-neutral-950 text-white">
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
              <h2 className="text-xl font-bold">
                Book a Free Consultation
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                30 minutes. No obligation. Just practical advice.
              </p>
              <div className="mt-6">
                <LandingForm variant="dark" />
              </div>
            </div>
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
                <span className="mt-0.5 text-lg text-destructive">&#10007;</span>
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-lg font-medium">
            These problems are preventable. They just need independent oversight.
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

      {/* Why us */}
      <Section>
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

      {/* Quote */}
      <Section background="dark">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-2xl font-bold italic leading-relaxed md:text-3xl">
            &ldquo;Club redevelopments are complex projects involving governance,
            financial risk, and operational disruption. Independent oversight is
            critical to ensuring the club&apos;s long-term success.&rdquo;
          </blockquote>
          <p className="mt-4 text-neutral-400">
            — Noel Yaxley, Director, UpScale Project Management
          </p>
        </div>
      </Section>

      {/* Niche */}
      <Section>
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

      {/* Minimal footer */}
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
        </Container>
      </footer>
    </>
  )
}
