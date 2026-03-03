import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Star, Clock } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { LogoMarquee } from '@/components/landing/logo-marquee'
import { HeroV2 } from '@/components/landing/v2/hero-v2'
import { StatsV2 } from '@/components/landing/v2/stats-v2'
import { PainPointsV2 } from '@/components/landing/v2/pain-points-v2'
import { CaseStudiesV2 } from '@/components/landing/v2/case-studies-v2'
import { VideoSection } from '@/components/landing/v2/video-section'
import { FounderV2 } from '@/components/landing/v2/founder-v2'
import { TestimonialsV2 } from '@/components/landing/v2/testimonials-v2'
import { SectorMarquee } from '@/components/landing/v2/sector-marquee'
import { FAQV2 } from '@/components/landing/v2/faq-v2'
import { FinalCTA } from '@/components/landing/v2/final-cta'
import { StripeOverlay } from '@/components/landing/v2/stripe-overlay'
import { StarRating } from '@/components/landing/v2/star-rating'

export const metadata: Metadata = {
  title: 'Sydney Project & Construction Management | Free Consultation | UpScalePM',
  description:
    'Expert client-side project management, construction management, and DA approval in Sydney. From feasibility through handover, we protect your budget, timeline, and quality. Free 30-min consultation.',
  robots: { index: false, follow: false },
}

const PHONE_NUMBER = '+61290904480'
const PHONE_DISPLAY = '02 9090 4480'

export default function SydneyV2LandingPage() {
  return (
    <>
      {/* ─── HEADER — Sticky top bar ─── */}
      <div className="sticky top-0 z-50 bg-[#0a0404] text-white">
        <Container>
          <div className="flex items-center justify-between border-b border-white/10 py-3">
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
        <div className="border-b border-white/10 bg-primary/10 py-1.5">
          <Container>
            <p className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-primary">
              <Clock className="size-3.5" />
              Two-hour call-back guarantee
            </p>
          </Container>
        </div>
      </div>

      {/* ─── S1: HERO — Full-screen, centered, massive headline ─── */}
      <HeroV2 />

      {/* ─── S2: LOGO MARQUEE — Pure visual, 0 words ─── */}
      <section className="bg-white py-6">
        <LogoMarquee />
      </section>

      {/* ─── S3: CASE STUDIES — "Become Our Next Success Story" ─── */}
      <CaseStudiesV2 />

      {/* ─── S4: SERVICE CARDS — "Two Ways We Help" ─── */}
      <section className="relative bg-[#373737] py-20 text-white md:py-28">
        <StripeOverlay />

        <Container>
          <div className="relative z-10">
            <p className="text-center text-base font-semibold uppercase tracking-wider text-primary md:text-lg">
              Two Ways We Help
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
                <p className="mt-4 text-base font-semibold text-primary">
                  We run it for you
                </p>
                <h3 className="mt-1 font-display text-3xl font-bold md:text-4xl">
                  Full Project Delivery
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-400">
                  Managed delivery from feasibility to handover. Construction
                  management, DA approval, contract admin &mdash; one team, no excuses.
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
                  href="#survey-form"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                >
                  Talk To Us
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
                <p className="mt-4 text-base font-semibold text-primary">
                  We check their work
                </p>
                <h3 className="mt-1 font-display text-3xl font-bold md:text-4xl">
                  Independent Oversight
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-400">
                  Already have a builder? We&apos;ll review every progress claim,
                  challenge every variation, and make sure the programme actually means something.
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
                  href="#survey-form"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                >
                  Talk To Us
                </a>
              </div>
            </div>

            {/* Marquee below cards */}
            <div className="mt-14">
              <LogoMarquee reverse />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── S5: STATS — Count-up + image ─── */}
      <StatsV2 />

      {/* ─── S6: PAIN POINTS — "Does This Sound Familiar?" ─── */}
      <PainPointsV2 />

      {/* ─── S7: VIDEO/PROCESS — "The Power Is In The Process" ─── */}
      <VideoSection />

      {/* ─── S9: FOUNDER — "Not Another Faceless Firm" ─── */}
      <FounderV2 />

      {/* ─── S10: TESTIMONIALS — Large quote carousel ─── */}
      <TestimonialsV2 />

      {/* ─── S11: BRAND EXPERIENCE MARQUEE ─── */}
      <section className="bg-white py-8">
        <Container>
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Brand Experience
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

      {/* ─── S12: SECTOR MARQUEE — Scrolling text ─── */}
      <SectorMarquee />

      {/* ─── S13: FAQ ACCORDION ─── */}
      <FAQV2 />

      {/* ─── S14: FINAL CTA — Floating icons + SurveyForm ─── */}
      <FinalCTA />

      {/* ─── FOOTER — Minimal ─── */}
      <footer className="border-t border-white/10 bg-[#0a0404] py-6 text-neutral-400">
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

      {/* ─── MOBILE STICKY CTA BAR ─── */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0a0404] p-3 md:hidden">
        <div className="flex gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white"
          >
            <Phone className="size-4" />
            Call Now
          </a>
          <a
            href="#survey-form"
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-neutral-600 py-3 text-sm font-semibold text-white"
          >
            Get a Callback
          </a>
        </div>
      </div>
    </>
  )
}
