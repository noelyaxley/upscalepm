import Link from 'next/link'
import { Container } from './container'

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
            <Link href="/" className="text-xl font-bold tracking-tight">
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
                  href="tel:1300000000"
                  className="transition-colors hover:text-foreground"
                >
                  1300 XXX XXX
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@upscalepm.com.au"
                  className="transition-colors hover:text-foreground"
                >
                  hello@upscalepm.com.au
                </a>
              </li>
              <li>Sydney | Newcastle</li>
            </ul>
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
