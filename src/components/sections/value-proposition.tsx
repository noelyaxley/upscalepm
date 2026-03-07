import Image from 'next/image'
import { BlurFade } from '@/components/animation/blur-fade'
import { Section } from '@/components/layout/section'
import { ShieldCheck, Building2, Users } from 'lucide-react'

const propositions = [
  {
    title: 'Independent Advice, Not Competing Interests',
    description:
      'Architects and builders have their own incentives. We represent your club exclusively — every recommendation is made in the board\'s best interest, not the consultant team\'s.',
    image: '/images/home/your-corner.jpg',
    Icon: ShieldCheck,
  },
  {
    title: 'We Understand Club Operations',
    description:
      'Gaming compliance, member expectations, staged construction that keeps you trading, board governance — we know the challenges unique to club redevelopments.',
    image: '/images/home/catch-issues.jpg',
    Icon: Building2,
  },
  {
    title: 'From Feasibility to Opening Night',
    description:
      'One advisor across every phase: masterplanning, approvals, procurement, construction oversight, and venue launch. No handoffs, no lost context.',
    image: '/images/home/one-team.jpg',
    Icon: Users,
  },
]

export function ValueProposition() {
  return (
    <Section background="muted" className="section-diagonal-top">
      <BlurFade>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
          Why Clubs Choose an Independent Advisor
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Club redevelopments are complex projects involving governance,
          financial risk, and operational disruption. Independent oversight is
          critical to protecting your club&apos;s long-term success.
        </p>
      </div>
      </BlurFade>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {propositions.map((prop, i) => (
          <BlurFade key={prop.title} delay={0.1 + i * 0.1}>
          <div
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-primary/20 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={prop.image}
                alt={prop.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
                  <prop.Icon
                    className="size-5 text-white"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="text-lg font-bold tracking-tight transition-colors duration-200 group-hover:text-primary">
                  {prop.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {prop.description}
              </p>
            </div>

            {/* Bottom accent bar */}
            <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </div>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}
