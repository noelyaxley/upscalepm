import { Section } from '@/components/layout/section'
import { BlurFade } from '@/components/animation/blur-fade'

interface ServiceBenefitsProps {
  benefits: Array<{
    title: string
    description: string
  }>
}

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  return (
    <Section background="muted">
      <BlurFade>
      <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
        What We Deliver
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Practical outcomes across every stage of your project.
      </p>
      </BlurFade>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, i) => (
          <BlurFade key={benefit.title} delay={0.1 + i * 0.1}>
          <div
            className="h-full rounded-lg border-2 border-primary/20 bg-background p-6 shadow-sm transition-all hover:border-primary/60 hover:shadow-md"
          >
            <div className="mb-4 h-1 w-10 rounded-full bg-primary" />
            <h3 className="text-lg font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </div>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}
