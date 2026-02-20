'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Container } from './container'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Projects' },
  { href: '/upscale-build', label: 'UpScale.build', highlight: true },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export function Header() {
  const pathname = usePathname()
  if (pathname.startsWith('/landing/')) return null

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <nav aria-label="Main navigation" className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            <Image
              src="/images/shared/logo/logo-64.png"
              alt=""
              width={32}
              height={32}
              className="size-8"
            />
            UpScalePM
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    'highlight' in link && link.highlight
                      ? 'text-sm font-medium text-primary transition-colors hover:text-primary/80'
                      : 'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href="tel:+61290904480"
              aria-label="Call us"
              className="inline-flex size-10 items-center justify-center rounded-md text-primary transition-colors hover:bg-accent"
            >
              <Phone className="size-5" />
            </a>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                    <Image
                      src="/images/shared/logo/logo-64.png"
                      alt=""
                      width={32}
                      height={32}
                      className="size-8"
                    />
                    UpScalePM
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-1 flex-col px-4">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={
                          'highlight' in link && link.highlight
                            ? 'block rounded-md px-3 py-2 text-base font-medium text-primary transition-colors hover:bg-accent'
                            : 'block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 px-3">
                  <Button asChild className="w-full">
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          </div>
        </nav>
      </Container>
    </header>
  )
}
