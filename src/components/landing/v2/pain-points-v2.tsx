import { AlertTriangle } from 'lucide-react'
import { Container } from '@/components/layout/container'

const painPoints = [
  'Builder says \'on track.\' No update in three weeks.',
  'Approving variations you don\'t fully understand.',
  '$3M contract and no independent eyes on it.',
  'Progress claim doesn\'t match what you saw on site.',
]

export function PainPointsV2() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            Does This Sound Familiar?
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {painPoints.map((point) => (
            <div
              key={point}
              className="flex items-start gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-6"
            >
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm font-medium leading-relaxed text-neutral-700">
                {point}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#survey-form"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            Stop Hoping. Start Here.
          </a>
        </div>
      </Container>
    </section>
  )
}
