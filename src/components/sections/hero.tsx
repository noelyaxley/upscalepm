'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { SplitHeading } from '@/components/animation/split-heading'
import { gsap, useGSAP } from '@/lib/gsap'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // Subtitle and CTA fade-in animations
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-subtitle', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.6,
          ease: 'power2.out',
        })
        gsap.from('.hero-ctas', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.8,
          ease: 'power2.out',
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-950 text-white"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-30"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-neutral-950/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      </div>

      <Container className="relative">
        <div className="py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <SplitHeading className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl lg:text-7xl">
              Independent Advisors for Club &amp; Golf Club Redevelopments
            </SplitHeading>
            <p className="hero-subtitle mt-8 max-w-2xl text-lg leading-relaxed text-neutral-300 md:text-xl">
              Helping club boards and CEOs successfully deliver major capital
              projects — from feasibility to opening night.
            </p>
            <div className="hero-ctas mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Book a Project Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-neutral-400 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/resources">Download the Club Redevelopment Checklist</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
