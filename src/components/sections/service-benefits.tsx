import { Section } from '@/components/layout/section'

interface ServiceBenefitsProps {
  benefits: Array<{
    title: string
    description: string
  }>
}

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  return (
    <Section background="muted">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        What We Deliver
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Practical outcomes across every stage of your project.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 h-1 w-10 rounded-full bg-primary" />
            <h3 className="text-lg font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
