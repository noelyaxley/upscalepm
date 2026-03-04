'use client'

import { Building2, Landmark, Heart, GraduationCap, Home, Hotel } from 'lucide-react'
import { Phone } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SurveyForm } from '@/components/forms/survey-form'
import { StarRating } from './star-rating'
import { StripeOverlay } from './stripe-overlay'

const floatingIcons = [
  { Icon: Building2, className: 'top-[10%] left-[5%] animate-[geo-float_25s_ease-in-out_infinite]' },
  { Icon: Landmark, className: 'top-[15%] right-[8%] animate-[geo-float_30s_ease-in-out_infinite_2s]' },
  { Icon: Heart, className: 'top-[60%] left-[3%] animate-[geo-float_28s_ease-in-out_infinite_4s]' },
  { Icon: GraduationCap, className: 'bottom-[20%] right-[5%] animate-[geo-float_35s_ease-in-out_infinite_1s]' },
  { Icon: Home, className: 'top-[40%] left-[8%] animate-[geo-float_32s_ease-in-out_infinite_3s]' },
  { Icon: Hotel, className: 'bottom-[30%] right-[10%] animate-[geo-float_27s_ease-in-out_infinite_5s]' },
]

export function FinalCTA() {
  return (
    <section id="survey-form" className="relative scroll-mt-20 bg-[#0a0404] py-20 text-white md:py-28">
      <StripeOverlay />

      {/* Floating sector icons */}
      {floatingIcons.map(({ Icon, className }, i) => (
        <div key={i} className={`absolute hidden opacity-10 lg:block ${className}`}>
          <Icon className="size-10 text-primary" />
        </div>
      ))}

      <Container>
        <div className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[3.25rem] font-bold tracking-tight leading-[0.95] sm:text-5xl md:text-7xl lg:text-8xl">
              Let&apos;s Talk About Your Build.
            </h2>
            <p className="mt-4 text-neutral-400">
              Free 30-minute consultation. 2-hour callback guarantee.
            </p>
          </div>

          {/* Phone CTA */}
          <div className="mt-8 flex justify-center">
            <a
              href="tel:+61290904480"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition-colors hover:bg-neutral-200"
            >
              <Phone className="size-4" />
              Call Now: 02 9090 4480
            </a>
          </div>

          {/* Survey form */}
          <div className="mx-auto mt-10 max-w-lg">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <h3 className="font-display text-lg font-bold text-white">
                Tell Us About Your Project
              </h3>
              <div className="mt-6">
                <SurveyForm thankYouPath="/landing/sydney-v2/thank-you" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <StarRating className="text-neutral-500" />
          </div>
        </div>
      </Container>
    </section>
  )
}
