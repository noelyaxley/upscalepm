'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { SplitHeading } from '@/components/animation/split-heading'
import { ParallaxHero } from '@/components/animation/parallax-hero'
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
      {/* Background pattern with parallax */}
      <ParallaxHero
        triggerRef={sectionRef}
        speed={0.3}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      </ParallaxHero>

      <Container className="relative">
        <div className="py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <SplitHeading className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Client-Side Project Management for Property &amp; Construction
            </SplitHeading>
            <p className="hero-subtitle mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
              Stop overpaying contractors and missing critical issues. We sit on
              your side of the table — protecting your budget, timeline, and
              quality from feasibility through to handover.
            </p>
            <div className="hero-ctas mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-neutral-600 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/case-studies">See Our Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
