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
    question: 'What exactly is in the report?',
    shortAnswer:
      'Zoning, floor space ratio, height limits, minimum lot size, heritage listings, flood mapping, key DCP provisions, and a summary of development potential for your site.',
    result:
      'A clear picture of what the planning controls allow — before you spend money on consultants.',
  },
  {
    question: 'Is it really free?',
    shortAnswer:
      'Yes. No cost, no obligation, no follow-up pressure. We offer this because better-informed property owners make better clients when they are ready to move forward.',
    result:
      'A genuine free resource. No hidden catches.',
  },
  {
    question: 'How long does it take?',
    shortAnswer:
      'Typically 3 business days from submission. If the address is unclear or we need more information, we will be in touch.',
    result:
      'Fast turnaround — useful information in your inbox within the week.',
  },
  {
    question: 'What properties can you report on?',
    shortAnswer:
      'Any property in NSW. Residential, commercial, industrial, mixed-use — if it has a lot number and a council, we can report on it.',
    result:
      'Coverage across all of NSW, not just metro Sydney.',
  },
  {
    question: 'Is this a feasibility study?',
    shortAnswer:
      'No. This report covers planning controls and constraints — the regulatory framework. A feasibility study adds financial modelling, construction cost estimates, and market analysis. We offer that as a separate service.',
    result:
      'Think of this as step one. If the planning controls look promising, we can help with the next steps.',
  },
  {
    question: 'What happens after I get the report?',
    shortAnswer:
      'Nothing, unless you want it to. The report is yours to use however you like. If you want to discuss the results or explore development advisory, we are here to help.',
    result:
      'No pressure. No automatic follow-up calls. You reach out if and when you are ready.',
  },
]

export function ReportFAQ() {
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
