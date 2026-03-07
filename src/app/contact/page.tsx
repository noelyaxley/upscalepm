import type { Metadata } from 'next'
import { ClientLogos } from '@/components/sections/client-logos'
import { generatePageMetadata } from '@/lib/metadata'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { ContactForm } from '@/components/forms/contact-form'
import { CalendlyInlineDynamic } from '@/components/booking/calendly-inline-dynamic'
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { JsonLd } from '@/components/seo/json-ld'
import { localBusinessSchema } from '@/components/seo/schemas'
import { BlurFade } from '@/components/animation/blur-fade'
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Free 30-minute consultation for club boards and CEOs planning a redevelopment. Independent advice on feasibility, procurement, and construction oversight for RSL, Leagues, and Golf clubs across NSW.',
  path: '/contact',
})

const trustPoints = [
  'Independent advice — we represent the club, not the builder',
  'Architectural insight meets hands-on delivery experience',
  'Specialist in club governance, staging, and gaming compliance',
  'Trusted by clubs and government organisations across NSW',
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <Container className="relative">
          <div className="py-16 md:py-20">
            <nav className="mb-6 text-sm text-neutral-400">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Contact</span>
            </nav>
            <h1 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl lg:text-7xl">
              Let&apos;s Discuss Your Club&apos;s Project
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
              Free 30-minute consultation with an experienced club redevelopment
              advisor. No obligation — just practical advice for your project.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left column -- Form (60%) */}
          <BlurFade>
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
                  Tell Us About Your Club Project
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Takes under 2 minutes. We respond within 1 business day.
                </p>
              </div>

              <ContactForm />
            </div>
          </BlurFade>

          {/* Right column -- Trust signals (40%) */}
          <BlurFade delay={0.2}>
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Club types */}
                <div className="rounded-lg border-2 border-primary/20 bg-muted/50 p-5">
                  <p className="text-sm font-medium">
                    We work with RSL, Leagues, Workers, Diggers, Bowling &amp;
                    Golf clubs across NSW.
                  </p>
                </div>

                {/* Why choose Upscale */}
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    Why choose UpScale?
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {trustPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-600" />
                        <span className="text-sm text-muted-foreground">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Response time commitment */}
                <div className="rounded-lg border-2 border-primary/20 bg-muted/50 p-5">
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-primary-600" />
                    <p className="text-sm font-medium">
                      We respond within 1 business day
                    </p>
                  </div>
                </div>

                {/* Book directly link */}
                <div className="rounded-lg border bg-primary/5 p-5">
                  <p className="text-sm font-medium">
                    Prefer to book directly?{' '}
                    <a href="#booking" className="text-primary underline">
                      Schedule a free consultation
                    </a>
                  </p>
                </div>

                {/* Contact details */}
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    Contact details
                  </h3>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Phone className="size-4 shrink-0 text-primary-600" />
                      <a
                        href="tel:+61290904480"
                        className="transition-colors hover:text-foreground"
                      >
                        02 9090 4480
                      </a>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Mail className="size-4 shrink-0 text-primary-600" />
                      <a
                        href="mailto:noel@upscalepm.com.au"
                        className="transition-colors hover:text-foreground"
                      >
                        noel@upscalepm.com.au
                      </a>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-primary-600" />
                      <span>Level 2/89 Macquarie St, Sydney NSW 2000</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </Section>

      <ClientLogos />

      {/* Booking section */}
      <Section background="muted" id="booking">
        <BlurFade>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Prefer to Book Directly?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Skip the form and schedule a free 30-minute consultation at a time
              that suits you.
            </p>
          </div>
        </BlurFade>
        <div className="mx-auto mt-8 max-w-3xl">
          <CalendlyInlineDynamic />
        </div>
      </Section>
    </>
  )
}
