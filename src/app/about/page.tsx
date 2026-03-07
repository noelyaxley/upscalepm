import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { localBusinessSchema } from '@/components/seo/schemas'
import { BlurFade } from '@/components/animation/blur-fade'

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description:
    'UpScale Project Management provides independent client-side advisory for club redevelopments across NSW. Founded by Noel Yaxley, with a background in architecture and project management across government, infrastructure, and commercial sectors.',
  path: '/about',
})

const values = [
  {
    title: 'Club-First Advocacy',
    description:
      'We represent the club exclusively. Every decision, recommendation, and action is driven by what is best for the board and members — not the architect, not the builder.',
  },
  {
    title: 'Design-Informed Oversight',
    description:
      'Our architectural background means we understand how venues function. We bring design literacy to project management, ensuring hospitality quality is maintained from concept through completion.',
  },
  {
    title: 'Governance Transparency',
    description:
      'Club boards need honest advice, structured decision-making, and clear reporting. We keep directors informed at every stage so the board can make confident decisions about capital expenditure.',
  },
  {
    title: 'Practical Delivery',
    description:
      'We focus on outcomes, not process for its own sake. Our approach is grounded, pragmatic, and tailored to the realities of club construction — staged builds, live operations, and member expectations.',
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHeader
        title="About UpScale Project Management"
        subtitle="Independent advisors for club and golf club redevelopments across NSW."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Founder Story */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <BlurFade>
            <div>
              <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
                Built on Architectural Insight
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Noel Yaxley started his career as a designer at award-winning
                  architecture firm FJMT, gaining deep insight into how buildings
                  function — particularly complex, multi-stakeholder
                  environments. That foundation evolved into project management,
                  where Noel led delivery on some of New South Wales&apos; most
                  demanding projects through roles at Root Partnerships, Property
                  NSW, and Sydney Water.
                </p>
                <p>
                  After seeing too many organisations left without expert
                  representation during major capital projects, Noel created
                  UpScale to provide dedicated client-side advisory — ensuring
                  decision-makers have independent oversight from feasibility
                  through to handover.
                </p>
                <p>
                  Today, UpScale specialises exclusively in club redevelopments.
                  We understand the unique challenges club boards face:
                  governance complexity, member expectations, staged construction
                  around live operations, gaming compliance, and the pressure of
                  managing member funds responsibly. This is all we do — and it
                  is what we do best.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/images/shared/about-upscale.png"
                alt="Noel Yaxley, Director of UpScale Project Management"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </BlurFade>
        </div>
      </Section>

      {/* Why Clubs */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              Why We Focus on Clubs
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Club redevelopments are unlike any other construction project.
                They involve elected boards making decisions about member funds,
                venues that must keep trading throughout construction, gaming
                regulations that constrain design options, and members who expect
                both a quality outcome and minimal disruption.
              </p>
              <p>
                Most project management firms treat clubs as just another
                commercial project. We do not. We have built our practice around
                understanding the specific governance, operational, and
                regulatory challenges that clubs face — and providing the
                independent advice that boards need to navigate them
                successfully.
              </p>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Values */}
      <Section>
        <BlurFade>
          <div className="text-center">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              The principles that guide every club project we advise on.
            </p>
          </div>
        </BlurFade>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <BlurFade key={value.title} delay={0.1 + i * 0.1}>
              <div className="h-full rounded-xl border-2 border-primary/20 bg-card p-6 shadow-sm transition-all hover:border-primary/60 hover:shadow-md">
                <div className="mb-4 h-1 w-10 rounded-full bg-primary" />
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              Our Experience
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Our portfolio includes project management and advisory across
                some of NSW&apos;s most complex developments — from $42M
                specialist laboratory relocations for Sydney Water to
                heritage-sensitive club refurbishments, government workplace
                fitouts, and high-density residential projects.
              </p>
              <p>
                This breadth of experience means we bring a level of rigour and
                governance to club projects that goes well beyond typical
                hospitality construction management. We apply the standards of
                government and institutional project delivery to every club
                engagement.
              </p>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <BlurFade>
          <div className="text-center">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight text-white md:text-5xl">
              Work With Us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
              Whether your club is considering a redevelopment or is already
              underway, we can help protect your interests. Book a free
              consultation to discuss your project.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </BlurFade>
      </Section>
    </>
  )
}
