import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Star, Clock } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { LogoMarquee } from '@/components/landing/logo-marquee'
import { HeroV2 } from '@/components/landing/v2/hero-v2'
import { PainPointsV2 } from '@/components/landing/v2/pain-points-v2'
import { StatsV2 } from '@/components/landing/v2/stats-v2'
import { HowItWorks } from '@/components/landing/v2/how-it-works'
import { VideoSection } from '@/components/landing/v2/video-section'
import { FounderV2 } from '@/components/landing/v2/founder-v2'
import { TestimonialsV2 } from '@/components/landing/v2/testimonials-v2'
import { CaseStudiesV2 } from '@/components/landing/v2/case-studies-v2'
import { PricingCards } from '@/components/landing/v2/pricing-cards'
import { FAQV2 } from '@/components/landing/v2/faq-v2'
import { FinalCTA } from '@/components/landing/v2/final-cta'
import { StripeOverlay } from '@/components/landing/v2/stripe-overlay'
import { StarRating } from '@/components/landing/v2/star-rating'
import { LandingFooter } from '@/components/landing/v2/landing-footer'

export const metadata: Metadata = {
  title: 'Sydney Project & Construction Management | Free Consultation | UpScale Project Management',
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
                alt="UpScale Project Management"
                width={32}
                height={32}
              />
              <span className="font-display text-lg font-bold">UpScale Project Management</span>
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

      {/* ─── S1: HERO — Full-screen, centered, massive headline + form ─── */}
      <HeroV2 />

      {/* ─── S2: LOGO MARQUEE — Instant credibility ─── */}
      <section className="bg-white py-6">
        <LogoMarquee />
      </section>

      {/* ─── S3: PAIN POINTS — Problem agitation (moved up) ─── */}
      <PainPointsV2 />

      {/* ─── S4: SERVICE CARDS — "Two Ways We Help" (solution framing) ─── */}
      <section className="relative bg-[#373737] py-20 text-white md:py-28">
        <StripeOverlay />

        <Container>
          <div className="relative z-10">
            <p className="text-center text-base font-semibold uppercase tracking-wider text-primary md:text-lg">
              Two Ways We Help
            </p>

            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
              {/* Card 1 */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/8">
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
                  <span className="text-xs text-neutral-500">&ldquo;5.0&rdquo;</span>
                </div>
                <a
                  href="#survey-form"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                >
                  Talk To Us
                </a>
              </div>

              {/* Card 2 */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/8">
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
                  <span className="text-xs text-neutral-500">&ldquo;5.0&rdquo;</span>
                </div>
                <a
                  href="#survey-form"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                >
                  Talk To Us
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── S5: STATS — Proof of results ─── */}
      <StatsV2 />

      {/* ─── S6: HOW IT WORKS — 3-step process (new) ─── */}
      <HowItWorks />

      {/* ─── S7: PROCESS/VIDEO — "The Power Is In The Process" ─── */}
      <VideoSection />

      {/* ─── S8: FOUNDER — Trust + human connection ─── */}
      <FounderV2 />

      {/* ─── S9: TESTIMONIALS — Social proof ─── */}
      <TestimonialsV2 />

      {/* ─── S10: CASE STUDIES — Visual proof (moved down) ─── */}
      <CaseStudiesV2 />

      {/* ─── S11: PRICING — Subscription model (new) ─── */}
      <PricingCards />

      {/* ─── S12: FAQ ACCORDION ─── */}
      <FAQV2 />

      {/* ─── S13: FINAL CTA — Survey form + call CTA ─── */}
      <FinalCTA />

      {/* ─── FOOTER ─── */}
      <LandingFooter />

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
