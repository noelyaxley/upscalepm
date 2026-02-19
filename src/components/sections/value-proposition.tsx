import Image from 'next/image'
import { Section } from '@/components/layout/section'
import { Eye, ShieldCheck, Users } from 'lucide-react'

const propositions = [
  {
    title: 'Catch Issues Before They Cost You',
    description:
      'Our architectural background means we see problems in drawings that most PMs miss. We catch coordination issues, buildability problems, and compliance gaps before they become expensive site variations.',
    image: '/images/home/catch-issues.jpg',
    Icon: Eye,
  },
  {
    title: 'Someone in Your Corner',
    description:
      'We represent you, not the contractor. Every progress claim reviewed, every variation challenged, every decision made with your investment protected.',
    image: '/images/home/your-corner.jpg',
    Icon: ShieldCheck,
  },
  {
    title: 'One Team, Start to Finish',
    description:
      'From feasibility and DA through tender, construction, and handover. No handoffs, no lost context, no starting over with someone new.',
    image: '/images/home/one-team.jpg',
    Icon: Users,
  },
]

export function ValueProposition() {
  return (
    <Section background="muted" className="section-diagonal-top">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          What You Get With a Client-Side PM
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We run the project for you using UpScale Delivery&#8482; for faster
          decisions, tighter control, and better outcomes &mdash; driving
          momentum with consultants and contractors from day one.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {propositions.map((prop) => (
          <div
            key={prop.title}
            className="group relative flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
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
        ))}
      </div>
    </Section>
  )
}
