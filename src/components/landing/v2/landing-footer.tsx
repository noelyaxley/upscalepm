import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/container'

const PHONE_NUMBER = '+61290904480'
const PHONE_DISPLAY = '02 9090 4480'

const sectors = [
  'Residential',
  'Commercial',
  'Mixed-Use',
  'Hospitality',
  'Community & Government',
  'First-Time Developers',
]

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0404] pt-16 pb-24 text-white md:pb-8">
      <Container>
        {/* ─── Top row: brand + sectors + contact ─── */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/shared/logo/logo-64.png"
                alt="UpScale Project Management"
                width={28}
                height={28}
              />
              <span className="font-display text-lg font-bold">
                UpScale Project Management
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              Client-side project management for property developers who want
              independent oversight — not another contractor marking their own
              homework.
            </p>
            <a
              href="#survey-form"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Get a free consultation
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          {/* Sectors we work across */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Sectors We Work Across
            </p>
            <ul className="mt-4 space-y-2.5">
              {sectors.map((sector) => (
                <li key={sector} className="flex items-center gap-2 text-sm text-neutral-300">
                  <span className="size-1 rounded-full bg-primary/60" />
                  {sector}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Get In Touch
            </p>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-2.5 text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  <Phone className="size-4 text-primary" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href="mailto:noel@upscalepm.com.au"
                  className="flex items-center gap-2.5 text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  <Mail className="size-4 text-primary" />
                  noel@upscalepm.com.au
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    Level 2 / 89 Macquarie St
                    <br />
                    Sydney NSW 2000
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Divider ─── */}
        <div className="mt-12 border-t border-white/10" />

        {/* ─── Bottom bar ─── */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-neutral-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} UpScale Project Management. ABN 14
            670 459 163.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-neutral-300">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-neutral-300">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
