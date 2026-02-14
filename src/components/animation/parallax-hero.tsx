'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

interface ParallaxHeroProps {
  children: React.ReactNode
  className?: string
  speed?: number
  triggerRef: React.RefObject<HTMLElement | null>
}

/**
 * Parallax wrapper for hero background elements.
 *
 * Uses ScrollTrigger with scrub to move children upward at a slower rate
 * than normal scroll, creating a depth/parallax effect.
 *
 * Desktop-only via gsap.matchMedia() -- on mobile, parallax is often janky
 * due to touch scroll physics and address bar height changes.
 *
 * Also respects prefers-reduced-motion: no-preference via matchMedia conditions.
 * When either condition fails (mobile or reduced motion), the parallax
 * auto-reverts and children render in their natural position.
 */
export function ParallaxHero({
  children,
  className,
  speed = 0.3,
  triggerRef,
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !triggerRef.current) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          prefersMotion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { isDesktop, prefersMotion } = context.conditions!
          if (!isDesktop || !prefersMotion) return

          gsap.to(containerRef.current, {
            y: () => -100 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        },
      )
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
