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
      'Most builders and contractors manage projects in their own interest — not yours. An independent PM sits on your side of the table, reviewing costs, challenging claims, and ensuring quality.',
    result:
      'You avoid costly mistakes, overpayments, and delays that erode your return.',
  },
  {
    question: 'How long does the DA approval process take in Sydney?',
    shortAnswer:
      'Timelines vary from 3 to 12+ months depending on the council, project complexity, and whether neighbours object. City of Sydney and Inner West are particularly demanding.',
    result:
      'We streamline your application, coordinate consultants, and manage council requirements to minimise delays.',
  },
  {
    question: 'What does construction management actually involve?',
    shortAnswer:
      'We oversee the builder on your behalf — verifying progress claims, managing variations, reviewing the construction programme, and enforcing quality standards on site.',
    result:
      'Your project stays on budget and on schedule, with independent eyes on every dollar spent.',
  },
  {
    question: 'How much does project management cost?',
    shortAnswer:
      'Fees typically range from 3–8% of construction cost, depending on the scope and complexity. For most projects, a single prevented variation pays for the entire engagement.',
    result:
      'You invest a fraction of your build cost to protect the full investment.',
  },
  {
    question: 'Can you help if my project is already underway?',
    shortAnswer:
      'Yes. We regularly step into projects mid-stream — stabilising delivery, re-establishing governance, and getting things back on track.',
    result:
      'Improved outcomes without starting again. The sooner we step in, the more we can protect.',
  },
  {
    question: 'What if my council application gets rejected?',
    shortAnswer:
      'We manage resubmissions, design modifications, and Section 4.55 amendments. Most rejections are recoverable with the right response strategy.',
    result:
      'Your project keeps moving. We handle the back-and-forth with council so you don\u2019t have to.',
  },
  {
    question: 'Do you handle residential projects or only commercial?',
    shortAnswer:
      'Both. We manage everything from boutique residential builds to large commercial fit-outs, government facilities, and health infrastructure.',
    result:
      'The same rigorous, independent oversight — regardless of project type or scale.',
  },
  {
    question: 'How do you charge — fixed fee or percentage?',
    shortAnswer:
      'We offer both options depending on the scope. Feasibility studies and DA management are typically fixed-fee. Construction management can be either fixed or percentage-based.',
    result:
      'Transparent pricing with no surprises. We\u2019ll recommend the best structure for your situation.',
  },
  {
    question: 'What areas of Sydney do you cover?',
    shortAnswer:
      'All of Greater Sydney and surrounding regions — from the CBD and Inner West to Western Sydney, Northern Beaches, and the Shire. We also work in regional NSW.',
    result:
      'No travel surcharges or location restrictions. We go where the project is.',
  },
  {
    question: 'How quickly can you start?',
    shortAnswer:
      'Typically within 1–2 weeks of engagement. For urgent situations, we can mobilise within days.',
    result:
      'Fast engagement when you need it most — no lengthy onboarding or procurement delays.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-y bg-neutral-50 py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Still not sure?
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Frequently Asked Questions
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
