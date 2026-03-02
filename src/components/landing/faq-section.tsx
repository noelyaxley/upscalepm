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
      'Most builders manage projects in their own interest — not yours. An independent PM reviews costs, challenges claims, and ensures quality.',
    result:
      'You avoid costly mistakes, overpayments, and delays.',
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
    question: 'Can you help if my project is already underway?',
    shortAnswer:
      'Yes. We regularly step into projects mid-stream — stabilising delivery and getting things back on track.',
    result:
      'The sooner we step in, the more we can protect.',
  },
  {
    question: 'How quickly can you start?',
    shortAnswer:
      'Typically within 1–2 weeks. For urgent situations, we can mobilise within days.',
    result:
      'Fast engagement — no lengthy onboarding or procurement delays.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-y bg-neutral-50 py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
              You&apos;ve Got Questions. We&apos;ve Got Answers.
            </h2>
          </div>

          <div className="mt-10 space-y-3">
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
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="pr-4 text-sm font-semibold text-neutral-900">
                      {faq.question}
                    </span>
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
                      <div className="border-t px-5 pb-5 pt-4">
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
