'use client'

import { Check, Shield, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Badge } from '@/components/ui/badge'
import { StripeOverlay } from './stripe-overlay'
import { BlurFade } from './blur-fade'

const tiers = [
  {
    name: 'Growth',
    subtitle: 'Projects $3M – $9M',
    price: '7,990',
    description: 'Full-service project management for mid-scale developments.',
    features: [
      'Dedicated Project Manager',
      'Weekly site inspections',
      'Progress claim reviews',
      'Variation management',
      'Programme monitoring',
      'Monthly reporting',
      'Direct phone access',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Scale',
    subtitle: 'Projects $9M+',
    price: '10,990',
    description: 'Premium oversight for complex, high-value developments.',
    features: [
      'Everything in Growth, plus:',
      'Twice-weekly site inspections',
      'Contract administration',
      'Stakeholder coordination',
      'Risk & issue registers',
      'Cashflow forecasting',
      'Priority response guarantee',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
]

export function PricingCards() {
  return (
    <section className="relative bg-[#0a0404] py-20 text-white md:py-28">
      <StripeOverlay />

      <Container>
        <div className="relative z-10">
          <BlurFade>
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="border-primary/40 bg-primary/10 text-primary"
              >
                Subscription Model
              </Badge>
              <h2 className="mt-4 font-display text-[3.25rem] font-bold tracking-tight leading-[0.95] sm:text-5xl md:text-7xl">
                One Subscription.<br className="hidden sm:block" />
                <span className="italic">Total Oversight.</span>
              </h2>
              <p className="mt-4 text-neutral-400">
                Predictable monthly fee. Pause or cancel anytime. No lock-in contracts.
              </p>
            </div>
          </BlurFade>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {tiers.map((tier, i) => (
              <BlurFade key={tier.name} delay={0.1 + i * 0.15}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-2xl md:p-10 ${
                    tier.highlighted
                      ? 'border-primary/60 bg-white/10 shadow-lg shadow-primary/5'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 right-8">
                      <Badge className="bg-primary text-white hover:bg-primary">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                      {tier.name}
                    </p>
                    <p className="mt-1 text-sm text-neutral-400">{tier.subtitle}</p>
                  </div>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                      ${tier.price}
                    </span>
                    <span className="text-sm text-neutral-400">/mo</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">ex GST</p>

                  <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                    {tier.description}
                  </p>

                  <div className="mt-8 flex-1">
                    <div className="space-y-3">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span className="text-sm text-neutral-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#survey-form"
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold transition-all ${
                      tier.highlighted
                        ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90'
                        : 'bg-white text-neutral-950 hover:bg-neutral-200'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.4}>
            <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Shield className="size-4 text-primary" />
                Cancel anytime. No lock-in. First month satisfaction guarantee.
              </div>
              <p className="text-sm text-neutral-500">
                Need a one-off engagement?{' '}
                <a href="#survey-form" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Talk to us about project-based pricing
                </a>
              </p>
            </div>
          </BlurFade>
        </div>
      </Container>
    </section>
  )
}
