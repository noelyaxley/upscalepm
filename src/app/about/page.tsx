import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { TeamGrid } from '@/components/sections/team-grid'
import { Testimonials } from '@/components/sections/testimonials'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { localBusinessSchema } from '@/components/seo/schemas'

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description:
    'Upscale Project Management delivers client-side project management for property and construction. Founded on architectural insight and a commitment to protecting client interests.',
  path: '/about',
})

const values = [
  {
    title: 'Client-First Advocacy',
    description:
      'We represent your interests exclusively. Every decision, recommendation, and action is driven by what is best for you as the project owner -- not the contractor, not the consultant team.',
  },
  {
    title: 'Design-Informed Decisions',
    description:
      'Our architectural background means we understand how buildings function. We bring design literacy to project management, ensuring quality is maintained from concept through to completion.',
  },
  {
    title: 'Transparent Communication',
    description:
      'Honest advice, structured decision-making, and clear reporting. We keep you informed at every stage so you can make confident decisions about your project.',
  },
  {
    title: 'Practical Delivery',
    description:
      'We focus on outcomes, not process for its own sake. Our approach is grounded, pragmatic, and tailored to the realities of your project -- whether it is a heritage renovation or a new-build laboratory.',
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHeader
        title="About Upscale Project Management"
        subtitle="Design-led. Delivery-focused. Purpose-driven project management for complex builds."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Company Story */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Built on Architectural Insight
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Upscale began with a vision: to bridge the gap between
                thoughtful design and effective delivery. Noel Yaxley&apos;s
                early career as a designer at award-winning architecture firm
                FJMT gave him deep insight into how buildings function,
                particularly in tertiary education and laboratory environments.
                That foundation evolved into a focus on project management,
                where Noel led delivery on some of New South Wales&apos; most
                dynamic developments through roles at Root Partnerships,
                Property NSW, and Sydney Water.
              </p>
              <p>
                After seeing too many property owners left without expert
                representation during their builds, Noel created Upscale to
                provide dedicated client-side project management -- ensuring
                developers, owners, and investors have someone in their corner
                from feasibility through to handover.
              </p>
              <p>
                Based in Sydney and Newcastle, Upscale works across residential,
                commercial, health, education, and infrastructure sectors,
                managing technically demanding projects where stakeholder
                coordination, regulatory navigation, and design integrity are
                essential.
              </p>
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/shared/about-upscale.png"
              alt="Noel Yaxley, Founder of Upscale Project Management"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </Section>

      {/* Specialisations & Services */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Comprehensive Project Leadership
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              We provide comprehensive project leadership across all phases of
              development. This includes early feasibility analysis, design brief
              development, consultant coordination, planning and approval
              processes, tendering, construction oversight, and final handover.
              Our expertise also extends to workplace strategy, building
              upgrades, and complex fit-outs -- often delivered within occupied
              sites or constrained urban environments.
            </p>
            <p>
              Our portfolio includes more than $40 million in specialist
              infrastructure and facilities, including large-scale laboratories
              for Sydney Water, significant school infrastructure upgrades,
              student accommodation initiatives, and high-density residential
              and hospitality developments.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Our Values
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            The principles that guide every project we deliver.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 h-1 w-10 rounded-full bg-primary-500" />
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Our Philosophy
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              We believe that design and delivery should never exist in
              isolation. At Upscale, we bring a holistic perspective that
              considers not just construction milestones but user needs,
              long-term performance, and the cultural value of the built
              environment. Our work is grounded in purpose, shaped by
              collaboration, and defined by our commitment to quality -- whether
              the brief is a public health facility, a heritage venue, or a
              state-of-the-art laboratory.
            </p>
            <p>
              Every client has unique drivers -- whether it is operational
              efficiency, user experience, financial performance, or long-term
              flexibility. We tailor our process to suit each client&apos;s
              needs, providing honest advice, transparent communication, and
              structured decision-making that supports their goals.
            </p>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section>
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Experienced professionals dedicated to delivering your project with
            precision and care.
          </p>
        </div>
        <div className="mt-12">
          <TeamGrid />
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="muted">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Trusted by developers, government agencies, and industry
            professionals.
          </p>
        </div>
        <div className="mt-12">
          <Testimonials />
        </div>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Work With Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
            Whether you need project-based support or an ongoing advisory
            retainer, we tailor our engagement to your project&apos;s needs.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
