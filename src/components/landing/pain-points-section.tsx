import { AlertTriangle } from 'lucide-react'
import { Container } from '@/components/layout/container'

const painPoints = [
  {
    text: 'Your builder says it\u2019s \u201Con track\u201D \u2014 but you haven\u2019t seen a programme update in weeks.',
  },
  {
    text: 'You\u2019re approving variations by email with no idea of the cumulative budget impact.',
  },
  {
    text: 'You\u2019re about to start a $3M project and don\u2019t have independent eyes on the contract.',
  },
  {
    text: 'You got a progress claim that doesn\u2019t match what you actually saw on site.',
  },
]

export function PainPointsSection() {
  return (
    <section className="bg-neutral-950 py-14 text-white md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Does This Sound Familiar?
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {painPoints.map((point) => (
            <div
              key={point.text}
              className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-5"
            >
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-neutral-300">
                {point.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-neutral-400">
            You&apos;re not alone. These are the exact problems we solve &mdash;
            every day, across Sydney.
          </p>
          <a
            href="#form"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            See How We Can Help
          </a>
        </div>
      </Container>
    </section>
  )
}
