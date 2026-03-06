'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { BlurFade } from './blur-fade'

const steps = [
  {
    number: '01',
    title: 'Subscribe & Brief',
    description:
      'Choose your plan. We assign a dedicated PM and schedule a kickoff within 48 hours.',
    icon: SubscribeIcon,
  },
  {
    number: '02',
    title: 'We Manage the Build',
    description:
      'Site inspections, claim reviews, variation control, programme tracking — every week, no exceptions.',
    icon: ManageBuildIcon,
  },
  {
    number: '03',
    title: 'You Stay in Control',
    description:
      'Monthly reports, real-time updates, and direct access to your PM. Pause or cancel anytime.',
    icon: ControlIcon,
  },
]

/* ── Animated SVG Icons ── */

function SubscribeIcon() {
  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      {/* Person */}
      <motion.circle
        cx="9"
        cy="7"
        r="4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      {/* Plus sign */}
      <motion.path
        d="M19 8v6M16 11h6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
    </motion.svg>
  )
}

function ManageBuildIcon() {
  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      {/* Hard hat / helmet shape */}
      <motion.path
        d="M2 18h20"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M4 18v-2a8 8 0 0 1 16 0v2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      {/* Magnifying glass */}
      <motion.circle
        cx="12"
        cy="11"
        r="3"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M14.5 13.5L17 16"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.9, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
    </motion.svg>
  )
}

function ControlIcon() {
  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      {/* Shield outline */}
      <motion.path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      {/* Checkmark inside */}
      <motion.path
        d="M9 12l2 2 4-4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
    </motion.svg>
  )
}

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
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <BlurFade key={step.number} delay={0.1 + i * 0.15}>
                <div className="relative rounded-xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                  {/* Number + Icon row */}
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-bold text-neutral-100">
                      {step.number}
                    </span>
                    <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
                      <Icon />
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
            )
          })}
        </div>
      </Container>
    </section>
  )
}
