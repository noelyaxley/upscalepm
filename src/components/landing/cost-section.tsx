import { Container } from '@/components/layout/container'

const costs = [
  {
    amount: '$50,000+',
    label: 'A single mismanaged variation',
    description:
      'Variations without independent review routinely blow budgets. One unchallenged claim can cost more than a year of PM fees.',
  },
  {
    amount: '$90,000+',
    label: 'A 3-month programme delay',
    description:
      'Holding costs, extended prelims, finance charges \u2014 delays compound fast on a $2M+ build.',
  },
  {
    amount: '$30,000+',
    label: 'An overpaid progress claim',
    description:
      'Without independent verification, you\u2019re trusting the builder to honestly assess their own work.',
  },
]

export function CostSection() {
  return (
    <section className="border-y bg-white py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            What Poor Project Management Actually Costs You
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
          {costs.map((cost) => (
            <div
              key={cost.label}
              className="rounded-lg border border-red-200 bg-red-50 p-6 text-center"
            >
              <p className="font-display text-3xl font-bold text-red-600 md:text-4xl">
                {cost.amount}
              </p>
              <p className="mt-2 text-sm font-semibold text-neutral-900">
                {cost.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {cost.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-lg font-bold text-neutral-900">
            An independent PM costs a fraction of one mistake.
          </p>
          <a
            href="#form-bottom"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Talk Through My Project
          </a>
        </div>
      </Container>
    </section>
  )
}
