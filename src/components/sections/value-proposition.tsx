import { Section } from '@/components/layout/section'

const propositions = [
  {
    title: 'Architectural Insight',
    description:
      'Our background in architecture brings a design-informed perspective to project management. We understand how buildings come together, so we catch issues before they become costly problems.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
      >
        <path d="M2 20h20" />
        <path d="M5 20V8l7-5 7 5v12" />
        <path d="M9 20v-6h6v6" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    title: 'Client-Side Focus',
    description:
      'We represent your interests, not the contractor\'s. As your dedicated advocate, we ensure every decision protects your investment, timeline, and project vision.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'End-to-End Coverage',
    description:
      'From initial feasibility and DA approval through tender, construction, and handover. One team, one relationship, complete project continuity from start to finish.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
]

export function ValueProposition() {
  return (
    <Section background="muted">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Why Choose Upscale
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We bring a unique combination of architectural knowledge, client-side
          advocacy, and full-lifecycle project management.
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {propositions.map((prop) => (
          <div
            key={prop.title}
            className="rounded-lg border bg-background p-6 shadow-sm"
          >
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {prop.icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{prop.title}</h3>
            <p className="mt-2 text-muted-foreground">{prop.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
