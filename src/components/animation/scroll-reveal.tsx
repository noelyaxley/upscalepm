'use client'

import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

export function ScrollReveal() {
  const pathname = usePathname()

  useGSAP(
    () => {
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

        ScrollTrigger.refresh()
      })
    },
    { dependencies: [pathname] },
  )

  return null
}
