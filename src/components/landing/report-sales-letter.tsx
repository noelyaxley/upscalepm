'use client'

import { Container } from '@/components/layout/container'

export function ReportSalesLetter() {
  const today = new Date().toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="bg-neutral-100 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="text-base font-semibold text-muted-foreground">
            Updated: {today}
          </p>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-700 md:text-xl">
            <p className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              Dear property owner,
            </p>

            <p>
              You&apos;ve got a site. Maybe you&apos;ve owned it for years. Maybe
              you just bought it. Either way, the same question keeps coming up:
            </p>

            <p className="italic text-neutral-500">
              &ldquo;What can I actually build here?&rdquo;
            </p>

            <p>
              You could spend $5,000&ndash;$10,000 on a town planner to tell you.
              Or you could spend an afternoon calling council and get put on hold
              three times before someone gives you a half-answer about &ldquo;merit
              assessment.&rdquo;
            </p>

            <p>
              <strong className="text-neutral-900">
                Or you could start here.
              </strong>
            </p>

            <p>
              We&apos;ll pull together the key planning controls for your site
              &mdash; zoning, FSR, height limits, heritage, flood, lot size,
              and anything else that matters &mdash; and send you a clear,
              structured report you can actually use.
            </p>

            <p>
              No jargon. No sales pitch. Just the information you need to decide
              whether it&apos;s worth going further.
            </p>

            <p>
              <strong className="text-neutral-900">
                It&apos;s free. It takes 3 business days. And it might save you
                thousands.
              </strong>
            </p>

            <p className="text-base text-neutral-500">
              &mdash; Noel Yaxley, Director
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
