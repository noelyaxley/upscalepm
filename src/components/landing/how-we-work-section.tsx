'use client'

import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'

const processSteps = [
  {
    step: 1,
    title: 'Free Consultation',
    description: 'We listen to your goals and assess if we can help.',
    result: 'Clear options — no obligation.',
  },
  {
    step: 2,
    title: 'Feasibility & Planning',
    description: 'Honest picture of costs, timelines, and risks before you commit.',
    result: 'Real numbers, not assumptions.',
  },
  {
    step: 3,
    title: 'Design Management',
    description: 'Coordinating design so it\u2019s buildable and compliant.',
    result: 'No expensive redesigns mid-build.',
  },
  {
    step: 4,
    title: 'Approvals & Procurement',
    description: 'DA process, tenders, and contractor selection.',
    result: 'Faster approvals. Competitive pricing.',
  },
  {
    step: 5,
    title: 'Construction Delivery',
    description: 'Overseeing the build. Verifying every claim and variation.',
    result: 'On budget. On schedule. Built to spec.',
  },
  {
    step: 6,
    title: 'Handover & Close-out',
    description: 'Defects, final inspections, and practical completion.',
    result: 'Done right. Documented. Defects resolved.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
}

const circleVariants = {
  hidden: { scale: 0 },
  visible: (i: number) => ({
    scale: 1,
    transition: {
      delay: i * 0.1 + 0.15,
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  }),
}

export function HowWeWorkSection() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our proven process
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
            How We Work
          </h2>
          <p className="mt-3 text-muted-foreground">
            From first conversation to project completion — one team, no handoffs.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  custom={index}
                  variants={circleVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
                >
                  {step.step}
                </motion.div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {step.description}
              </p>
              <div className="mt-3 flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-sm font-medium text-primary">{step.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
