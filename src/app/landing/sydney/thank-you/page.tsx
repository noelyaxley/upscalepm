import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { CheckCircle2, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank You | UpScalePM Sydney',
  description: 'Thank you for your enquiry. We will call you back within 2 hours.',
  robots: { index: false, follow: false },
}

const PHONE_NUMBER = '+61290904480'
const PHONE_DISPLAY = '02 9090 4480'

export default function ThankYouPage() {
  return (
    <>
      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 border-b bg-neutral-950 text-white">
        <Container>
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/shared/logo/logo-64.png"
                alt="UpScalePM"
                width={32}
                height={32}
              />
              <span className="font-display text-lg font-bold">UpScalePM</span>
            </Link>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              <Phone className="size-4" />
              <span className="hidden sm:inline">Call Now: {PHONE_DISPLAY}</span>
              <span className="sm:hidden">Call Now</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Thank you content */}
      <section className="flex min-h-[60vh] items-center bg-neutral-950 text-white">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <CheckCircle2 className="mx-auto size-16 text-green-400" />
            <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl">
              Thank You!
            </h1>
            <p className="mt-4 text-lg text-neutral-300">
              We&apos;ll call you back within 2 hours during business hours.
            </p>
            <p className="mt-2 text-neutral-400">
              One of our Sydney project managers will be in touch to discuss your
              project and how we can help.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                <Phone className="size-4" />
                Call Now: {PHONE_DISPLAY}
              </a>
              <Link
                href="/landing/sydney"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Minimal footer */}
      <footer className="border-t bg-neutral-950 py-6 text-neutral-400">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs sm:flex-row sm:text-left">
            <p>&copy; {new Date().getFullYear()} UpScale Project Management. ABN 14 670 459 163.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </>
  )
}
