'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/layout/container'

type FAQItem = {
  question: string
  shortAnswer: string
  result: string
}

const faqs: FAQItem[] = [
  {
    question: 'Do I really need an independent project manager?',
    shortAnswer:
      'Most builders manage projects in their own interest — not yours. An independent Project Manager reviews costs, challenges claims, and ensures quality.',
    result:
      'You avoid costly mistakes, overpayments, and delays.',
  },
  {
    question: 'What is the difference between a builder\'s Project Manager and an independent Project Manager?',
    shortAnswer:
      'A builder\'s Project Manager works for the builder. Their job is to protect the builder\'s margin. An independent Project Manager works for you — reviewing every dollar, every claim, every programme update.',
    result:
      'Independent oversight that protects your investment, not the builder\'s profit.',
  },
  {
    question: 'How long does the DA approval process take in Sydney?',
    shortAnswer:
      'Timelines vary from 3 to 12+ months depending on the council, project complexity, and neighbour objections.',
    result:
      'We streamline your application and manage council requirements to minimise delays.',
  },
  {
    question: 'What does construction management actually involve?',
    shortAnswer:
      'We oversee the builder on your behalf — verifying progress claims, managing variations, and enforcing quality on site.',
    result:
      'Independent eyes on every dollar spent.',
  },
  {
    question: 'How much does project management cost?',
    shortAnswer:
      'Fees typically range from 3–8% of construction cost. For most projects, a single prevented variation pays for the entire engagement.',
    result:
      'A fraction of your build cost to protect the full investment.',
  },
  {
    question: 'What types of projects do you work on?',
    shortAnswer:
      'Commercial fit-outs, government infrastructure, health facilities, education, residential developments, and hospitality. We\'ve delivered $85M+ across 6 sectors.',
    result:
      'Sector-agnostic expertise. If it\'s being built, we manage it.',
  },
  {
    question: 'Can you help if my project is already underway?',
    shortAnswer:
      'Yes. We regularly step into projects mid-stream — stabilising delivery and getting things back on track.',
    result:
      'The sooner we step in, the more we can protect.',
  },
  {
    question: 'Do you work with residential property owners or just commercial?',
    shortAnswer:
      'Both. We work with private property owners on residential builds and with corporates on large commercial projects. The process is the same — independent oversight that protects you.',
    result:
      'Whether it\'s a $500K home or a $50M fit-out, we protect the client.',
  },
  {
    question: 'How quickly can you start?',
    shortAnswer:
      'Typically within 1–2 weeks. For urgent situations, we can mobilise within days.',
    result:
      'Fast engagement — no lengthy onboarding or procurement delays.',
  },
]

export function FAQV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-y bg-neutral-50 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
              You&apos;ve Got Questions.<br className="hidden sm:block" /> We&apos;ve Got Answers.
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-lg border bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <h3 className="pr-4 text-base font-semibold text-neutral-900">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`size-5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t px-6 pb-5 pt-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          <span className="font-semibold text-neutral-700">
                            Short answer:{' '}
                          </span>
                          {faq.shortAnswer}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed">
                          <span className="font-semibold text-primary">
                            The result:{' '}
                          </span>
                          {faq.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
