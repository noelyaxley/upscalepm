'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

export function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.batch('[data-reveal]', {
        interval: 0.1,
        batchMax: 3,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            overwrite: true,
          })
        },
        start: 'top 85%',
      })
    })
  })

  return null
}
