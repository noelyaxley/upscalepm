'use client'

import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'

interface SplitHeadingProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

/**
 * Animated heading with SplitText character reveal.
 *
 * Uses gsap.from() so the heading is VISIBLE by default in the DOM.
 * The animation runs FROM an offset/transparent state TO the natural position.
 * If GSAP fails to load, the heading remains fully visible (no opacity: 0 in CSS).
 *
 * SplitText.create() with autoSplit: true handles font-load re-splitting
 * automatically -- when Playfair Display finishes loading via display: "swap",
 * SplitText re-splits and re-runs the animation.
 *
 * All animation is wrapped in gsap.matchMedia() so it auto-reverts for
 * prefers-reduced-motion: reduce users.
 */
export function SplitHeading({
  children,
  className,
  as = 'h1',
}: SplitHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!headingRef.current) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        SplitText.create(headingRef.current!, {
          type: 'chars, words',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.chars, {
              y: 30,
              opacity: 0,
              duration: 0.5,
              stagger: 0.02,
              ease: 'power2.out',
              delay: 0.2,
            })
          },
        })
      })
    },
    { scope: headingRef },
  )

  const Tag = as
  return (
    <Tag ref={headingRef} className={className}>
      {children}
    </Tag>
  )
}
