'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import { Phone, CheckCircle2 } from 'lucide-react'
import { DynamicHeadline } from './dynamic-headline'
import { SurveyForm } from '@/components/forms/survey-form'

const PHONE_NUMBER = '+61290904480'
const PHONE_DISPLAY = '02 9090 4480'

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] text-white md:min-h-[680px]">
      {/* Layer 1: Static hero image */}
      <div className="absolute inset-0">
        <Image
          src="/images/case-studies/231-elizabeth-street/hero.jpg"
          alt="231 Elizabeth Street commercial fit-out — managed by UpScalePM"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Layer 2: Gradient overlay — dark left (text), moderate right (form has frosted glass) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: [
            'linear-gradient(to right, oklch(0.12 0.01 250 / 0.92) 0%, oklch(0.12 0.01 250 / 0.78) 45%, oklch(0.12 0.01 250 / 0.55) 100%)',
            'linear-gradient(to top, oklch(0.12 0.01 250 / 0.85) 0%, transparent 25%)',
          ].join(', '),
        }}
      />

      {/* Layer 3: Content */}
      <div className="relative z-30 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 md:py-16 lg:grid-cols-2 lg:gap-12">
          {/* Left — Value proposition */}
          <div className="flex flex-col justify-center">
            <Suspense fallback={<div className="h-20" />}>
              <DynamicHeadline />
            </Suspense>
            <p className="mt-4 text-lg text-neutral-200">
              Most project managers work for the builder. We work for{' '}
              <strong className="text-white">you</strong>. One independent team
              from feasibility to handover — no conflicts, no surprises.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                '30+ projects delivered across Sydney',
                'Project management, construction management & DA approval',
                'Trusted by Sydney Water, NSW Ambulance & government',
                'Feasibility studies to de-risk your investment',
                'Free 30-minute consultation — no obligation',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-neutral-200">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
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

          {/* Right — Frosted glass form card */}
          <div id="form" className="scroll-mt-20">
            <div className="rounded-xl border border-white/15 bg-neutral-900/80 p-6 backdrop-blur-xl md:p-8">
              <h2 className="font-display text-xl font-bold text-white">
                Tell Us About Your Project
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Answer 5 quick questions — we&apos;ll match you with the right expert.
              </p>
              <div className="mt-6">
                <SurveyForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
