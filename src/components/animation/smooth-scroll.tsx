'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * Inner component that syncs Lenis scroll with GSAP's ticker.
 * Must be rendered inside <ReactLenis> to access the Lenis instance via useLenis().
 */
function LenisGSAPSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    // Connect Lenis scroll events to ScrollTrigger position updates
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker (single RAF loop)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)

    // Disable lag smoothing so Lenis and ScrollTrigger stay perfectly in sync
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(tickerCallback)
    }
  }, [lenis])

  return null
}

/**
 * SmoothScroll provider that wraps page content with Lenis smooth scrolling.
 *
 * - Uses <ReactLenis root> to scroll the <html> element (no wrapper divs)
 * - Syncs Lenis with GSAP's ticker for a single RAF loop
 * - Disables Lenis entirely when prefers-reduced-motion: reduce is active
 * - autoRaf is explicitly false — GSAP ticker drives Lenis, not its own RAF
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const isLandingPage = pathname.startsWith('/landing/')

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)

    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mql.addEventListener('change', onChange)

    return () => {
      mql.removeEventListener('change', onChange)
    }
  }, [])

  // Skip smooth scroll on landing pages (saves ~400KB GSAP+Lenis payload)
  // and when reduced motion is preferred
  if (isLandingPage || prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}
    >
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  )
}
