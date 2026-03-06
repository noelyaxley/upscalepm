'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { BlurFade } from './blur-fade'

const painPoints = [
  {
    pain: 'Builder says \'on track.\' No update in three weeks.',
    fix: 'We deliver weekly progress reports — no silence.',
    icon: RadioSilenceIcon,
  },
  {
    pain: 'Approving variations you don\'t fully understand.',
    fix: 'We review every variation before you sign.',
    icon: ConfusedDocIcon,
  },
  {
    pain: '$3M contract and no independent eyes on it.',
    fix: 'We scrutinise every claim, every dollar.',
    icon: BlindMoneyIcon,
  },
  {
    pain: 'Progress claim doesn\'t match what you saw on site.',
    fix: 'We verify on-site before you pay.',
    icon: MismatchIcon,
  },
]

/* ── Animated SVG Icons ── */

function RadioSilenceIcon() {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      {/* Phone with no signal */}
      <motion.path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      {/* Strike-through line */}
      <motion.line
        x1="1"
        y1="1"
        x2="23"
        y2="23"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-red-500"
        stroke="currentColor"
        strokeWidth="2"
      />
    </motion.svg>
  )
}

function ConfusedDocIcon() {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      {/* Document */}
      <motion.path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      {/* Question mark */}
      <motion.path
        d="M10 13a2 2 0 0 1 4 0c0 1-2 1.5-2 3"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      <motion.circle
        cx="12"
        cy="19"
        r="0.5"
        fill="currentColor"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.9 }}
        viewport={{ once: true }}
      />
    </motion.svg>
  )
}

function BlindMoneyIcon() {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      {/* Dollar sign */}
      <motion.path
        d="M12 1v22"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      {/* Eye with slash */}
      <motion.line
        x1="2"
        y1="2"
        x2="22"
        y2="22"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-red-500"
        stroke="currentColor"
        strokeWidth="2"
      />
    </motion.svg>
  )
}

function MismatchIcon() {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      {/* Clipboard */}
      <motion.path
        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      <motion.rect
        x="8"
        y="2"
        width="8"
        height="4"
        rx="1"
        ry="1"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        viewport={{ once: true }}
      />
      {/* X mark */}
      <motion.path
        d="M9 12l6 6M15 12l-6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-red-500"
        stroke="currentColor"
        strokeWidth="2"
      />
    </motion.svg>
  )
}

export function PainPointsV2() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <BlurFade>
          <div className="text-center">
            <h2 className="font-display text-[3.25rem] font-bold tracking-tight leading-[0.95] sm:text-5xl md:text-7xl">
              Does This Sound Familiar?
            </h2>
          </div>
        </BlurFade>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {painPoints.map((point, i) => {
            const Icon = point.icon
            return (
              <BlurFade key={point.pain} delay={0.1 + i * 0.1}>
                <div className="group flex h-full flex-col rounded-lg border-2 border-primary/60 bg-neutral-50 p-6 transition-colors hover:border-primary hover:bg-primary/5 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon />
                    </div>
                    <p className="text-base font-bold leading-relaxed text-neutral-700">
                      {point.pain}
                    </p>
                  </div>
                  <p className="mt-3 pl-14 text-sm text-neutral-500 transition-colors group-hover:text-primary">
                    {point.fix}
                  </p>
                </div>
              </BlurFade>
            )
          })}
        </div>

        <BlurFade delay={0.5}>
          <div className="mt-10 text-center">
            <a
              href="#survey-form"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Stop Hoping. Start Here.
            </a>
          </div>
        </BlurFade>
      </Container>
    </section>
  )
}
