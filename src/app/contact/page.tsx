import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { ContactForm } from '@/components/forms/contact-form'
import { CalendlyInlineDynamic } from '@/components/booking/calendly-inline-dynamic'
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Free 30-minute consultation with an experienced client-side project manager. No obligation — just practical advice for your property or construction project.',
  path: '/contact',
})

const trustPoints = [
  'Your interests represented, not the contractor\'s',
  'Architectural insight meets hands-on delivery',
  '14+ projects delivered across health, education & commercial',
  'Trusted by Sydney Water, NSW Ambulance & government clients',
]

const clientLogos = [
  {
    src: '/images/shared/logos/sydney-water.webp',
    alt: 'Sydney Water',
  },
  {
    src: '/images/shared/logos/health-infrastructure.webp',
    alt: 'Health Infrastructure',
  },
  {
    src: '/images/shared/logos/blacktown-city-council.webp',
    alt: 'Blacktown City Council',
  },
  {
    src: '/images/shared/logos/school-infrastructure.webp',
    alt: 'School Infrastructure',
  },
  {
    src: '/images/shared/logos/nsw-ambulance.webp',
    alt: 'NSW Ambulance',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Benefit-driven hero (CRO-01) */}
      <section className="border-b bg-neutral-950 text-white">
        <Container>
          <div className="py-12 md:py-16">
            <nav className="mb-6 text-sm text-neutral-400">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Contact</span>
            </nav>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Protect Your Next Project
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-300">
              Free 30-minute consultation with an experienced client-side
              project manager. No obligation, no sales pitch — just practical
              advice for your project.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left column -- Form (60%) */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Tell Us About Your Project
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Takes under 2 minutes. We respond within 1 business day.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* Right column -- Trust signals (40%) */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Metrics bar */}
              <div className="grid grid-cols-2 gap-4 rounded-lg border bg-muted/50 p-5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">14+</p>
                  <p className="text-xs text-muted-foreground">
                    Projects Delivered
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">5</p>
                  <p className="text-xs text-muted-foreground">
                    Sectors Served
                  </p>
                </div>
              </div>

              {/* Why choose Upscale */}
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Why choose Upscale?
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
              <div className="rounded-lg border bg-muted/50 p-5">
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
                      href="tel:+61299998888"
                      className="transition-colors hover:text-foreground"
                    >
                      (02) 9999 8888
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="size-4 shrink-0 text-primary-600" />
                    <a
                      href="mailto:info@upscalepm.com.au"
                      className="transition-colors hover:text-foreground"
                    >
                      info@upscalepm.com.au
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary-600" />
                    <span>Sydney &amp; Newcastle, NSW</span>
                  </li>
                </ul>
              </div>

              {/* Client logos */}
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Trusted by
                </p>
                <div className="grid grid-cols-3 items-center gap-4">
                  {clientLogos.map((logo) => (
                    <div
                      key={logo.alt}
                      className="flex items-center justify-center"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={100}
                        height={40}
                        className="h-8 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Booking section */}
      <Section background="muted" id="booking">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Prefer to Book Directly?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Skip the form and schedule a free 30-minute consultation at a time
            that suits you.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <CalendlyInlineDynamic />
        </div>
      </Section>
    </>
  )
}
