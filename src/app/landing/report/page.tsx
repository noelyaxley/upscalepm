import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Star, FileText, MapPin, BarChart3, Shield, Layers, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ReportForm } from '@/components/forms/report-form'
import { ReportFAQ } from '@/components/landing/report-faq'
import { ReportSalesLetter } from '@/components/landing/report-sales-letter'
import { LogoMarquee } from '@/components/landing/logo-marquee'
import { CaseStudySlider } from '@/components/landing/case-study-slider'
import { StatsSection } from '@/components/landing/stats-section'

export const metadata: Metadata = {
  title: 'Free Property Development Report | UpScale Project Management',
  description:
    'Request a free property development report for your site. Planning controls, development potential, zoning, FSR, height limits, and key constraints — delivered to your inbox.',
  robots: { index: false, follow: false },
}

const PHONE_NUMBER = '+61290904480'
const PHONE_DISPLAY = '02 9090 4480'

export default function ReportLandingPage() {
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
                alt="UpScale PM"
                width={32}
                height={32}
              />
              <span className="font-display text-lg font-bold">UpScale PM</span>
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
          SECTION 1: HERO — Dark, full-bleed, headline + form
      ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[600px] text-white md:min-h-[700px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/landing/brand/calibre-cooper-facade-night.jpg"
            alt=""
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
            {/* Left — Headline */}
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
                Free Property Development Report
              </h1>
              <p className="mt-4 text-lg text-neutral-300">
                Know what you can build <strong className="text-white">before</strong> you spend a cent on consultants.
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

            {/* Right — Form */}
            <div id="form" className="scroll-mt-20">
              <div className="rounded-xl border border-white/15 bg-neutral-900/80 p-6 backdrop-blur-xl md:p-8">
                <h2 className="font-display text-xl font-bold text-white">
                  Request Your Free Report
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Enter the property address and we&apos;ll do the rest.
                </p>
                <div className="mt-6">
                  <ReportForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 2: LOGO MARQUEE — Pure visual trust
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-6">
        <LogoMarquee />
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 3: SALES LETTER — "Dear property owner"
      ─────────────────────────────────────────────────────────── */}
      <ReportSalesLetter />

      {/* ───────────────────────────────────────────────────────────
          SECTION 4: WHAT'S IN THE REPORT — 4 cards
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-neutral-900 py-16 text-white md:py-24">
        <Container>
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-primary">
            What You Get
          </p>
          <h2 className="mt-2 text-center font-display text-2xl font-bold tracking-tight md:text-3xl">
            Your Report Includes
          </h2>

          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {[
              {
                icon: MapPin,
                title: 'Zoning & Planning Controls',
                description:
                  'Land zoning, permitted uses, floor space ratio, height limits, minimum lot size, and key LEP provisions for your site.',
              },
              {
                icon: BarChart3,
                title: 'Development Potential',
                description:
                  'Buildable area, gross floor area calculations, indicative yield analysis, and what the planning controls actually allow.',
              },
              {
                icon: Shield,
                title: 'Key Constraints',
                description:
                  'Heritage listings, flood mapping, bushfire, contamination, easements, and other encumbrances that affect development.',
              },
              {
                icon: Layers,
                title: 'Regulatory Overview',
                description:
                  'Relevant LEP and DCP provisions, state environmental planning policies, and authority requirements affecting the site.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20">
                  <item.icon className="size-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#form"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Request My Free Report
            </a>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 5: STATS — Count-up numbers + hero image
      ─────────────────────────────────────────────────────────── */}
      <StatsSection />

      {/* ───────────────────────────────────────────────────────────
          SECTION 6: HOW IT WORKS — 3 steps
      ─────────────────────────────────────────────────────────── */}
      <section className="border-y bg-white py-16 md:py-24">
        <Container>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Simple Process
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Three Steps to Your Report
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Submit Your Address',
                description: 'Fill out the form with the property address you want us to analyse.',
              },
              {
                step: '02',
                title: 'We Analyse the Site',
                description: 'We research planning controls, zoning, constraints, and development potential.',
              },
              {
                step: '03',
                title: 'Report Delivered',
                description: 'You receive a detailed PDF report via email within 3 business days.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white shadow-lg shadow-primary/30">
                  {item.step}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 7: CASE STUDIES — Horizontal slider
      ─────────────────────────────────────────────────────────── */}
      <CaseStudySlider />

      {/* ───────────────────────────────────────────────────────────
          SECTION 8: AUTHORITY — Calibre Cooper interior + CTA
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-neutral-100 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Independent. Experienced. Practical.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;ve delivered $85M+ in project value across 6 sectors.
              This report is built on the same due diligence we apply to
              every project we advise on.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl">
            <Image
              src="/images/landing/brand/calibre-cooper-balcony.jpg"
              alt="Calibre Cooper Street — completed residential interior, Surry Hills"
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
              Get Your Free Report
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
          SECTION 10: DEEP SELL — "Why Is It Free?" + Vibe Hotel
      ─────────────────────────────────────────────────────────── */}
      <section className="bg-neutral-900 py-16 text-white md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-primary">
              No strings attached
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Why Is It Free?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
              We believe better information leads to better projects. Most
              property owners spend thousands on consultants before they even
              understand their site&apos;s basic planning controls. That&apos;s
              backwards.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
              This report gives you the fundamentals &mdash; so when you&apos;re
              ready to move forward, you&apos;re making decisions from a
              position of knowledge, not guesswork.
            </p>
          </div>

          {/* Image break */}
          <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl">
            <Image
              src="/images/landing/brand/vibe-hotel-entrance.jpg"
              alt="Vibe Hotel Sydney — project delivered by UpScale PM"
              width={1200}
              height={600}
              className="h-72 w-full object-cover brightness-75 md:h-96"
            />
          </div>

          {/* Trust signals */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-neutral-400">
            {[
              'No cost',
              'No obligation',
              'No follow-up pressure',
              'Just useful information',
            ].map((signal) => (
              <div key={signal} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span>{signal}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#form-bottom"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Request My Free Report
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
          SECTION 11: ABOUT FOUNDER
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
              <p className="mt-4 text-muted-foreground">
                Every report is prepared with the same rigour we apply to our
                paid advisory engagements &mdash; because your first impression
                of us matters.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 12: SECTORS
      ─────────────────────────────────────────────────────────── */}
      <section className="border-y bg-white py-12">
        <Container>
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            We Report on Properties Across All Sectors
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {['Residential', 'Commercial', 'Industrial', 'Mixed-Use', 'Retail', 'Hospitality'].map(
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
          SECTION 13: FAQ ACCORDION
      ─────────────────────────────────────────────────────────── */}
      <ReportFAQ />

      {/* ───────────────────────────────────────────────────────────
          SECTION 14: FINAL CTA — Dark, form + buttons
      ─────────────────────────────────────────────────────────── */}
      <section id="form-bottom" className="bg-neutral-950 py-16 text-white md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Get your free report.
            </h2>
            <p className="mt-3 text-neutral-400">
              Enter the property address below. Report delivered within 3 business days.
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
                Back to Top
              </a>
            </div>
          </div>

          {/* Inline form */}
          <div className="mx-auto mt-10 max-w-lg">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <ReportForm />
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
            <FileText className="size-4" />
            Get Report
          </a>
        </div>
      </div>
    </>
  )
}
