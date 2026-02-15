import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react'
import { Container } from './container'

const socialLinks = [
  {
    href: 'https://www.linkedin.com/company/upscalepm/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://www.instagram.com/upscale.pm/',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://www.facebook.com/UpScalePM/',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'https://www.youtube.com/@upscale_pm',
    label: 'YouTube',
    icon: Youtube,
  },
] as const

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted">
      <Container>
        <div className="grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4 md:py-16">
          {/* Company info */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <Image src="/images/shared/logo/logo-64.png" alt="" width={32} height={32} className="size-8" />
              UpScalePM
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Client-side project management for property and construction.
              From feasibility through to handover.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="mt-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </h3>
            <nav aria-label="Legal links">
              <ul className="mt-4 flex flex-col gap-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:+61290904480"
                  className="transition-colors hover:text-foreground"
                >
                  +61 2 9090 4480
                </a>
              </li>
              <li>
                <a
                  href="mailto:noel@upscalepm.com.au"
                  className="transition-colors hover:text-foreground"
                >
                  noel@upscalepm.com.au
                </a>
              </li>
              <li>Level 2/89 Macquarie St, Sydney NSW 2000</li>
            </ul>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center gap-2 border-t py-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} UpScalePM. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
