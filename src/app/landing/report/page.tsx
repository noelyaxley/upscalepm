import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, FileText, CheckCircle2, MapPin, BarChart3, Shield } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ReportForm } from '@/components/forms/report-form'

export const metadata: Metadata = {
  title: 'Free Property Development Report | UpScale Project Management',
  description:
    'Request a free property development report for your site. Planning controls, development potential, zoning, FSR, height limits, and key constraints — delivered to your inbox.',
  robots: { index: false, follow: false },
}

const PHONE_NUMBER = '+61290904480'
const PHONE_DISPLAY = '02 9090 4480'

const reportIncludes = [
  {
    icon: MapPin,
    title: 'Zoning & Planning Controls',
    description: 'Land zoning, permitted uses, floor space ratio, height limits, and minimum lot size.',
  },
  {
    icon: BarChart3,
    title: 'Development Potential',
    description: 'Buildable area, gross floor area calculations, and indicative yield analysis.',
  },
  {
    icon: FileText,
    title: 'Key Constraints',
    description: 'Heritage listings, flood mapping, bushfire, contamination, easements, and other encumbrances.',
  },
  {
    icon: Shield,
    title: 'Regulatory Overview',
    description: 'Relevant LEP and DCP provisions, state policies, and authority requirements affecting the site.',
  },
]

export default function ReportLandingPage() {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-neutral-950 text-white">
        <Container>
          <div className="flex items-center justify-between border-b border-white/10 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/shared/logo/logo-64.png"
                alt="UpScale Project Management"
                width={32}
                height={32}
              />
              <span className="font-display text-lg font-bold">
                UpScale PM
              </span>
            </Link>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              <Phone className="size-4" />
              <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Hero + Form */}
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <Container className="relative">
          <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-2">
            <div>
              <h1 className="font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
                Free Property Development Report
              </h1>
              <p className="mt-6 text-lg text-neutral-300">
                Get a detailed report on your site&apos;s development potential.
                We&apos;ll analyse the planning controls, zoning, constraints, and
                key considerations — and send it straight to your inbox.
              </p>
              <p className="mt-4 text-lg font-medium text-white">
                No obligation. No cost. Just useful information to help you
                make better decisions about your property.
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                <FileText className="size-5 shrink-0 text-primary" />
                <span className="text-sm text-neutral-300">
                  Reports are typically delivered within 3 business days.
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:p-8">
              <h2 className="text-xl font-bold">
                Request Your Free Report
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Enter the property address and we&apos;ll do the rest.
              </p>
              <div className="mt-6">
                <ReportForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section className="border-t border-neutral-800 bg-neutral-950 py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              What&apos;s in the Report
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {reportIncludes.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary">
                    <item.icon className="size-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why we offer this */}
      <section className="border-t border-neutral-800 bg-neutral-950 py-16 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Why Is It Free?
            </h2>
            <p className="mt-4 text-neutral-300">
              We believe better information leads to better projects. This report
              gives you the planning fundamentals for your site — whether you&apos;re
              exploring a redevelopment, acquisition, or just want to understand
              what&apos;s possible.
            </p>
            <p className="mt-4 text-neutral-400">
              If you need help beyond the report — feasibility analysis, development
              advisory, or project management — we&apos;re here to help with that too.
            </p>
          </div>
        </Container>
      </section>

      {/* Trust signals */}
      <section className="border-t border-neutral-800 bg-neutral-950 py-16 text-white">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-neutral-400">
            {[
              'Independent advisory firm',
              'Based in Sydney CBD',
              'Architectural + PM background',
              'No sales pressure',
            ].map((signal) => (
              <div key={signal} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-neutral-950 py-8 text-center text-sm text-neutral-400">
        <Container>
          <p>
            &copy; {new Date().getFullYear()} UpScale Project Management
          </p>
          <p className="mt-2">
            Level 2/89 Macquarie St, Sydney NSW 2000 |{' '}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="text-primary hover:underline"
            >
              {PHONE_DISPLAY}
            </a>{' '}
            |{' '}
            <a
              href="mailto:noel@upscalepm.com.au"
              className="text-primary hover:underline"
            >
              noel@upscalepm.com.au
            </a>
          </p>
        </Container>
      </footer>
    </>
  )
}
