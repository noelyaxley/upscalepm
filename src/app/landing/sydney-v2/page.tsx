import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Phone, Star, Play } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { LandingForm } from '@/components/forms/landing-form'
import { SurveyForm } from '@/components/forms/survey-form'
import { DynamicHeadline } from '@/components/landing/dynamic-headline'
import { LogoMarquee } from '@/components/landing/logo-marquee'
import { SalesLetter } from '@/components/landing/sales-letter'
import { StatsSection } from '@/components/landing/stats-section'
import { CaseStudySlider } from '@/components/landing/case-study-slider'
import { TestimonialSlider } from '@/components/landing/testimonial-slider'
import { FAQSection } from '@/components/landing/faq-section'

export const metadata: Metadata = {
  title: 'Sydney Project & Construction Management | Free Consultation | UpScalePM',
  description:
    'Expert client-side project management, construction management, and DA approval in Sydney. From feasibility through handover, we protect your budget, timeline, and quality. Free 30-min consultation.',
  robots: { index: false, follow: false },
}

const PHONE_NUMBER = '+61290904480'
const PHONE_DISPLAY = '02 9090 4480'

export default function SydneyLandingPage() {
  return (
    <>
      {/* ───────────────────────────────────────────────────────────
          HEADER — Sticky top bar
      ─────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b bg-neutral-950 text-white">
        <Container>
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/shared/logo/logo-64.png"
                alt="UpScalePM"
                width={32}
                height={32}
              />
              <span className="font-display text-lg font-bold">UpScalePM</span>
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
      </div>

      {/* ───────────────────────────────────────────────────────────
          SECTION 1: HERO — Dark, full-bleed, headline + survey form
      ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[600px] text-white md:min-h-[700px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/landing/brand/calibre-cooper-facade-night.jpg"
            alt="Calibre Cooper Street residential development at night"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: [
              'linear-gradient(to right, oklch(0.10 0.01 250 / 0.95) 0%, oklch(0.10 0.01 250 / 0.80) 45%, oklch(0.10 0.01 250 / 0.60) 100%)',
              'linear-gradient(to top, oklch(0.10 0.01 250 / 0.90) 0%, transparent 30%)',
            ].join(', '),
          }}
        />

        {/* Content */}
        <div className="relative z-30 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16">
            {/* Left — Headline only */}
            <div className="flex flex-col justify-center">
              <Suspense fallback={<div className="h-16" />}>
                <DynamicHeadline />
              </Suspense>
              <p className="mt-4 text-lg text-neutral-300">
                We work for <strong className="text-white">you</strong>. Not the builder.
              </p>

              {/* Star rating */}
              <div className="mt-6 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-neutral-400">5.0 from 6 client reviews</span>
              </div>
            </div>

            {/* Right — Survey form */}
            <div id="form" className="scroll-mt-20">
              <div className="rounded-xl border border-white/15 bg-neutral-900/80 p-6 backdrop-blur-xl md:p-8">
                <h2 className="font-display text-xl font-bold text-white">
                  Tell Us About Your Project
                </h2>
                <div className="mt-6">
                  <SurveyForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 2: LOGO MARQUEE — Pure visual, no text
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-6">
        <LogoMarquee />
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 3: SALES LETTER — "Dear property owner"
      ─────────────────────────────────────────────────────────── */}
      <SalesLetter />

      {/* ───────────────────────────────────────────────────────────
          SECTION 4: OUR OFFERING — "Choose Your Path"
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-neutral-900 py-16 text-white md:py-24">
        <Container>
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-primary">
            Our Services
          </p>

          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Card 1 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20">
                <Image
                  src="/images/shared/logo/logo-64.png"
                  alt=""
                  width={28}
                  height={28}
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-primary">
                We run it for you
              </p>
              <h3 className="mt-1 font-display text-xl font-bold">
                Full Project Delivery
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                Managed delivery from feasibility to handover. Construction
                management, DA approval, contract admin &mdash; one team, no handoffs.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs text-neutral-500">5.0</span>
              </div>
              <a
                href="#form"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                Get Started
              </a>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20">
                <Image
                  src="/images/shared/logo/logo-64.png"
                  alt=""
                  width={28}
                  height={28}
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-primary">
                We check their work
              </p>
              <h3 className="mt-1 font-display text-xl font-bold">
                Independent Oversight
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                Independent oversight on your existing build. Progress claim
                review, variation assessment, programme audits &mdash; eyes on every dollar.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs text-neutral-500">5.0</span>
              </div>
              <a
                href="#form"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                Get Started
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 5: STATS — Count-up numbers + hero image
      ─────────────────────────────────────────────────────────── */}
      <StatsSection />

      {/* ───────────────────────────────────────────────────────────
          SECTION 6: SECTORS — Placeholder for media logos
      ─────────────────────────────────────────────────────────── */}
      <section className="border-y bg-white py-12">
        <Container>
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Sectors We Serve
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {['Commercial', 'Government', 'Health', 'Education', 'Residential', 'Hospitality'].map(
              (sector) => (
                <span
                  key={sector}
                  className="rounded-full border bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700"
                >
                  {sector}
                </span>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 7: CASE STUDIES — Horizontal slider
      ─────────────────────────────────────────────────────────── */}
      <CaseStudySlider />

      {/* ───────────────────────────────────────────────────────────
          SECTION 8: PLATFORM PROOF — Authority + image + CTA
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-neutral-100 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Independent. Experienced. Relentless.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;ve managed $85M+ in project value across 6 sectors.
              Our clients don&apos;t come back because we&apos;re nice.
              They come back because we protect their money.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl">
            <Image
              src="/images/landing/brand/newcastle-timber-staircase.jpg"
              alt="Newcastle project delivery — timber staircase"
              width={1200}
              height={500}
              className="h-64 w-full object-cover md:h-80"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href="#form-bottom"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Talk to Us
            </a>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">5.0 from 6 reviews</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 9: CLIENT LOGOS MARQUEE (reverse)
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <Container>
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Trusted By
          </p>
        </Container>
        <LogoMarquee
          logos={[
            { src: '/images/shared/logos/sydney-water.webp', alt: 'Sydney Water', w: 120, h: 46 },
            { src: '/images/shared/logos/health-infrastructure.webp', alt: 'Health Infrastructure', w: 120, h: 40 },
            { src: '/images/shared/logos/school-infrastructure.webp', alt: 'School Infrastructure', w: 120, h: 38 },
            { src: '/images/shared/logos/nsw-ambulance.webp', alt: 'NSW Ambulance', w: 50, h: 50 },
            { src: '/images/shared/logos/tfnsw.png', alt: 'Transport for NSW', w: 120, h: 31 },
            { src: '/images/shared/logos/dpie.png', alt: 'DPIE', w: 120, h: 34 },
          ]}
          reverse
        />
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 10: DEEP SELL — "The Power Is In The Process"
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-neutral-900 py-16 text-white md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-primary">
              No more hoping for the best
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              The Power Is In The Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
              Most property owners cross their fingers and trust the builder.
              We&apos;ve spent 15 years proving that doesn&apos;t work.
              Independent oversight isn&apos;t an expense &mdash; it&apos;s the
              only thing standing between you and a six-figure mistake.
            </p>
          </div>

          {/* Video placeholder */}
          <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl">
            <Image
              src="/images/landing/brand/vibe-hotel-entrance.jpg"
              alt="Vibe Hotel Sydney — 319 Sussex Street entrance"
              width={1200}
              height={600}
              className="h-72 w-full object-cover brightness-75 md:h-96"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/90 shadow-lg transition-transform hover:scale-110">
                <Play className="size-7 fill-white text-white" />
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="#form-bottom"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Talk to Us
            </a>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-neutral-500">5.0 from 6 reviews</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 11: ABOUT FOUNDER — replaces "Book" section
      ─────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src="/images/landing/noel-portrait.jpg"
                alt="Noel Yaxley — Founder of UpScale Project Management"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Meet Your Project Director
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Noel Yaxley
              </h2>
              <p className="mt-4 text-muted-foreground">
                15+ years. $85M+ in project value. Commercial, government,
                health, residential. Founded UpScale because property owners
                deserve a PM who works for them &mdash; not the builder.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 12: TESTIMONIALS — Single-card slider
      ─────────────────────────────────────────────────────────── */}
      <TestimonialSlider />

      {/* ───────────────────────────────────────────────────────────
          SECTION 13: FAQ ACCORDION
      ─────────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ───────────────────────────────────────────────────────────
          SECTION 14: FINAL CTA — Dark, form + buttons
      ─────────────────────────────────────────────────────────── */}
      <section id="form-bottom" className="bg-neutral-950 py-16 text-white md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Let&apos;s talk about your project.
            </h2>
            <p className="mt-3 text-neutral-400">
              Free 30-minute consultation. 2-hour callback guarantee.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition-colors hover:bg-neutral-200"
              >
                <Phone className="size-4" />
                Call Now: {PHONE_DISPLAY}
              </a>
              <a
                href="#form"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Get a Callback
              </a>
            </div>
          </div>

          {/* Inline form */}
          <div className="mx-auto mt-10 max-w-lg">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <LandingForm variant="dark" />
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────
          FOOTER — Minimal
      ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-neutral-950 py-6 text-neutral-400">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs sm:flex-row sm:text-left">
            <p>&copy; {new Date().getFullYear()} UpScale Project Management. ABN 14 670 459 163.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </Container>
      </footer>

      {/* ───────────────────────────────────────────────────────────
          MOBILE STICKY CTA BAR
      ─────────────────────────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-neutral-950 p-3 md:hidden">
        <div className="flex gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white"
          >
            <Phone className="size-4" />
            Call Now
          </a>
          <a
            href="#form"
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-neutral-600 py-3 text-sm font-semibold text-white"
          >
            Get a Callback
          </a>
        </div>
      </div>
    </>
  )
}
