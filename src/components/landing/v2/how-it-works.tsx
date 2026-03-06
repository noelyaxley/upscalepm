'use client'

import Image from 'next/image'
import { Container } from '@/components/layout/container'
import { BlurFade } from './blur-fade'

const steps = [
  {
    number: '01',
    title: 'Subscribe & Brief',
    description:
      'Choose your plan. We assign a dedicated PM and schedule a kickoff within 48 hours.',
    icon: '/images/landing/icons/SubscribeBrief.gif',
  },
  {
    number: '02',
    title: 'We Manage the Build',
    description:
      'Site inspections, claim reviews, variation control, programme tracking — every week, no exceptions.',
    icon: '/images/landing/icons/ManageBuild.gif',
  },
  {
    number: '03',
    title: 'You Stay in Control',
    description:
      'Monthly reports, real-time updates, and direct access to your PM. Pause or cancel anytime.',
    icon: '/images/landing/icons/StayControl.gif',
  },
]

export function HowItWorks() {
  return (
    <section className="border-y bg-neutral-50 py-20 md:py-28">
      <Container>
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How It Works
            </p>
            <h2 className="mt-3 font-display text-[3.25rem] font-bold tracking-tight leading-[0.95] sm:text-5xl md:text-7xl">
              Three Steps.<br className="hidden sm:block" /> Zero Complexity.
            </h2>
          </div>
        </BlurFade>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <BlurFade key={step.number} delay={0.1 + i * 0.15}>
              <div className="relative rounded-xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                {/* Number + Icon row */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-bold text-neutral-100">
                    {step.number}
                  </span>
                  <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
                    <Image
                      src={step.icon}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                    />
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-bold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {step.description}
                </p>

                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-neutral-200 md:block" />
                )}
              </div>
            </BlurFade>
          ))}
        </div>
      </Container>
    </section>
  )
}
