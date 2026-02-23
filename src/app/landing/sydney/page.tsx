import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { LandingForm } from '@/components/forms/landing-form'
import { HeroSection } from '@/components/landing/hero-section'
import {
  Phone,
  CheckCircle2,
  Clock,
  Shield,
  Users,
  Star,
  Building2,
  FileCheck,
  HardHat,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sydney Project & Construction Management | Free Consultation | UpScalePM',
  description:
    'Expert client-side project management, construction management, and DA approval in Sydney. From feasibility through handover, we protect your budget, timeline, and quality. Free 30-min consultation.',
  robots: { index: false, follow: false },
}

const PHONE_NUMBER = '+61290904480'
const PHONE_DISPLAY = '02 9090 4480'

const testimonials = [
  {
    quote:
      'We only trust Upscale Project Management. Their unwavering commitment to our projects has made them an indispensable partner.',
    name: 'Nathan McCullum',
    role: 'Director',
    company: 'McCullum Advisory & Society Real Estate',
    image: '/images/shared/testimonials/nathan-mccullum.jpg',
  },
  {
    quote:
      'Dedication and professionalism define everything Upscale delivers. They bring a level of care and rigour that sets them apart.',
    name: 'Kenny Gunawan',
    role: 'Construction Manager',
    company: 'SHAPE',
    image: '/images/shared/testimonials/kenny-gunawan.jpg',
  },
  {
    quote:
      'Resilience and focus under pressure. Upscale delivered excellent projects for NSW Government, navigating complexity with clarity.',
    name: 'Michael Russel',
    role: 'Project Director',
    company: 'NSW Govt. Public Works',
    image: '/images/shared/testimonials/michael-russel.jpg',
  },
  {
    quote:
      'Noel brings experienced, collaborative leadership to every project. His ability to coordinate across stakeholders and drive delivery outcomes is exceptional.',
    name: 'Steven Latham',
    role: 'Commercial Manager',
    company: 'SHAPE Australia',
    image: '/images/shared/testimonials/steven-latham.jpg',
  },
  {
    quote:
      'Noel has been instrumental in turning our vision into reality. His hands-on approach and deep understanding of construction delivery gave our board complete confidence throughout the redevelopment.',
    name: 'Steve Rodriguez',
    role: 'CEO',
    company: 'Granville Diggers Club',
    image: '/images/shared/testimonials/steve-rodriguez.jpg',
  },
  {
    quote:
      'It was a pleasure working with Noel on Sydney Water\'s new admin building in Quakers Hill. His collaborative approach and attention to detail made for a smooth delivery across all stakeholders.',
    name: 'Marcus Blanco',
    role: 'Project Director',
    company: 'Intermain Construction',
    image: '/images/shared/testimonials/marcus-blanco.jpg',
  },
]

const trustPoints = [
  {
    icon: Shield,
    title: 'We Represent You',
    description:
      'Most developers hire the contractor\'s PM. We sit on your side of the table — protecting your budget and quality across every stage.',
  },
  {
    icon: Users,
    title: 'Architect-Led Team',
    description:
      'Our architectural background means we catch design issues, coordination problems, and compliance gaps before they cost you.',
  },
  {
    icon: HardHat,
    title: 'Construction to Completion',
    description:
      'Experienced construction management and site supervision. We manage contractors, review progress claims, and keep your build on track.',
  },
  {
    icon: FileCheck,
    title: 'DA & Town Planning',
    description:
      'Navigate Sydney\'s complex planning approvals with confidence. We manage the DA process, coordinate consultants, and handle council requirements.',
  },
  {
    icon: Building2,
    title: 'Commercial Fit-Outs',
    description:
      'From 231 Elizabeth Street to government offices — we deliver commercial fit-outs and refurbishments across Sydney\'s CBD and greater metro.',
  },
  {
    icon: Clock,
    title: 'Feasibility to Handover',
    description:
      'Feasibility studies, design management, tender assessment, construction — one team from start to finish. No handoffs, no lost context.',
  },
]

// Services list uses searcher language (matching Google Ads ad groups)
const services = [
  'Project Management',
  'Construction Management',
  'Town Planning & DA Approval',
  'Commercial Fit-Outs',
  'Feasibility Studies',
  'Contract Administration',
  'Site Management & Superintendent',
  'Tender Assessment',
]

export default function SydneyLandingPage() {
  return (
    <>
      {/* Sticky top bar — phone CTA */}
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
              <span className="hidden sm:inline">Call Now: {PHONE_DISPLAY}</span>
              <span className="sm:hidden">Call Now</span>
            </a>
          </div>
        </Container>
      </div>

      {/* 2-HOUR CALLBACK GUARANTEE — Full-width banner */}
      <div className="border-b border-primary/30 bg-primary/10 py-2.5">
        <Container>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Clock className="size-4" />
            <span>2-Hour Callback Guarantee — Speak to a Sydney Expert Today</span>
          </div>
        </Container>
      </div>

      {/* HERO — Carousel background + frosted glass form */}
      <HeroSection />

      {/* Logo bar */}
      <section className="border-b bg-neutral-100 py-6">
        <Container>
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by leading Sydney organisations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { src: '/images/shared/logos/sydney-water.webp', alt: 'Sydney Water', w: 120, h: 46 },
              { src: '/images/shared/logos/health-infrastructure.webp', alt: 'Health Infrastructure', w: 120, h: 40 },
              { src: '/images/shared/logos/school-infrastructure.webp', alt: 'School Infrastructure', w: 120, h: 38 },
              { src: '/images/shared/logos/nsw-ambulance.webp', alt: 'NSW Ambulance', w: 50, h: 50 },
              { src: '/images/shared/logos/tfnsw.png', alt: 'Transport for NSW', w: 120, h: 31 },
              { src: '/images/shared/logos/dpie.png', alt: 'DPIE', w: 120, h: 34 },
            ].map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                className="h-8 w-auto object-contain opacity-60 grayscale md:h-10"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* SOCIAL PROOF — Testimonials (below trust logos) */}
      <section className="border-b bg-neutral-50 py-10 md:py-14">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              100% Client Satisfaction Across Sydney
            </h2>
          </div>
          <div className="relative mt-8">
            {/* Fade edges to create carousel-like appearance */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-neutral-50 to-transparent lg:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-neutral-50 to-transparent lg:w-24" />

            <div className="flex items-center gap-4 overflow-hidden px-4 lg:justify-center lg:px-12">
              {/* Reorder: peripheral cards on edges, featured in center */}
              {(() => {
                const featured = ['Steven Latham', 'Marcus Blanco', 'Steve Rodriguez']
                const peripheral = testimonials.filter((t) => !featured.includes(t.name))
                const center = testimonials.filter((t) => featured.includes(t.name))
                const ordered = [...peripheral.slice(0, 2), ...center, ...peripheral.slice(2)]

                return ordered.map((t) => {
                  const isFeatured = featured.includes(t.name)
                  return (
                    <div
                      key={t.name}
                      className={`shrink-0 rounded-xl border bg-white p-5 shadow-sm transition-all ${
                        isFeatured
                          ? 'w-[280px] opacity-100 lg:w-[300px]'
                          : 'w-[220px] scale-[0.92] opacity-40 lg:w-[240px]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {t.image ? (
                          <Image
                            src={t.image}
                            alt={t.name}
                            width={32}
                            height={32}
                            className="size-8 rounded-full object-cover object-top"
                          />
                        ) : (
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {t.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                        )}
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="size-3.5 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="mt-3 border-t pt-3">
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </div>
        </Container>
      </section>

      {/* WHY UPSCALE — Trust points (now 6 cards covering all ad groups) */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Why Sydney Property Owners Choose UpScale
            </h2>
            <p className="mt-3 text-muted-foreground">
              Most project managers work for the contractor. We work for you.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point.title} className="rounded-lg border border-primary/30 bg-background p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <point.icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{point.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* MID-PAGE CTA — 2-hour guarantee prominent */}
      <section className="bg-primary py-10 md:py-14">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                Got a Sydney Project? Let&apos;s Make It Reality.
              </h2>
              <p className="mt-2 text-primary-100">
                2-hour callback guarantee. Construction management, DA approval, feasibility — we cover it all.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-neutral-100"
              >
                <Phone className="size-4" />
                Call Now
              </a>
              <a
                href="#form"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Request Callback
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* EXPERIENCE SECTION — Image + text */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/landing/elizabeth-street.jpg"
                alt="231 Elizabeth Street Sydney commercial fit-out — managed by UpScalePM"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Experienced Sydney Project & Construction Management
              </h2>
              <p className="mt-4 text-muted-foreground">
                UpScale specialises in managing technically demanding Sydney
                projects — from commercial fit-outs like 231 Elizabeth Street to
                government facilities, heritage venues, and specialist laboratory
                infrastructure.
              </p>
              <p className="mt-3 text-muted-foreground">
                Whether you need construction management, town planning and DA
                approval, contract administration, or a full feasibility study —
                we offer a steady, experienced hand from conception through to
                completion.
              </p>
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Our Sydney Services
                </h3>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {services.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  <Phone className="size-4" />
                  Call Now: {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* REDUCE RISK SECTION */}
      <section className="border-y bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Reduce Risk. Increase Returns. Sydney Delivered.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Greater experience means greater returns. With over 14 projects
                delivered across health, education, commercial, and government
                sectors in Sydney, we know what it takes to deliver on time and
                on budget.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Independent cost and variation review',
                  'Progress claim verification',
                  'Design coordination and compliance checking',
                  'Contract administration and risk management',
                  'Construction management and site supervision',
                  'Town planning and DA approval navigation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                <Phone className="size-4" />
                Call Now: {PHONE_DISPLAY}
              </a>
            </div>
            <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-xl lg:order-2">
              <Image
                src="/images/landing/project-delivery.webp"
                alt="Construction and project management delivery in Sydney"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ABOUT NOEL — Founder hero */}
      <section className="bg-neutral-950 py-14 text-white md:py-20">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-8 px-4 max-lg:flex-col lg:gap-10">
            <div className="relative aspect-[3/4] w-full max-w-xs shrink-0 overflow-hidden rounded-xl lg:w-72">
              <Image
                src="/images/landing/noel-portrait.jpg"
                alt="Noel Yaxley — Founder of UpScale Project Management"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 288px"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                UpScale Team Director
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Noel Yaxley
              </h2>
              <p className="mt-4 text-neutral-300">
                With over 15 years of project delivery experience across
                commercial, government, health, and residential sectors, Noel
                founded UpScale to give property owners what they actually
                need — an independent project manager who sits on their side
                of the table.
              </p>
              <p className="mt-3 text-neutral-300">
                From Sydney Water laboratories to heritage club redevelopments,
                Noel has managed complex builds worth millions, navigating
                council approvals, contract negotiations, and construction
                delivery with a hands-on, no-shortcuts approach.
              </p>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                <Phone className="size-4" />
                Speak to Noel Now
              </a>
            </div>
        </div>
      </section>

      {/* FINAL CTA — Form repeat */}
      <section className="border-t bg-neutral-50 py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Ready to Start Your Sydney Project?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get a free 30-minute consultation with an experienced Sydney
                project manager. Whether it&apos;s construction management, DA
                approval, a feasibility study, or full project delivery — we&apos;re
                here to help.
              </p>
              <div className="mt-6 rounded-lg border border-primary/40 bg-primary/10 p-5">
                <div className="flex items-center gap-3">
                  <Clock className="size-6 text-primary" />
                  <div>
                    <p className="text-base font-bold text-primary">2-Hour Callback Guarantee</p>
                    <p className="text-sm text-neutral-600">
                      Submit your details and we&apos;ll call you back within 2 hours
                      during business hours. Every time.
                    </p>
                  </div>
                </div>
              </div>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
              >
                <Phone className="size-5" />
                Or call now: {PHONE_DISPLAY}
              </a>
            </div>
            <div id="form-bottom">
              <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-md md:p-8">
                <h3 className="font-display text-xl font-bold">
                  Speak to a Sydney Expert
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in your details and we&apos;ll be in touch within 2 hours.
                </p>
                <div className="mt-6">
                  <LandingForm variant="light" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Minimal footer */}
      <footer className="border-t bg-neutral-950 py-6 text-neutral-400">
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

      {/* Mobile sticky CTA bar */}
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
