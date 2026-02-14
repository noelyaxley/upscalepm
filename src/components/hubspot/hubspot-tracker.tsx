'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    _hsq?: Array<[string, ...unknown[]]>
  }
}

/**
 * HubSpot tracking script with SPA route change detection.
 *
 * - Loads the HubSpot tracking script via next/script (afterInteractive)
 * - Tracks client-side route changes by pushing setPath + trackPageView to _hsq
 * - Skips the first useEffect call to avoid double-counting the initial page view
 *   (HubSpot script automatically fires trackPageView on initial load)
 * - Gracefully degrades when NEXT_PUBLIC_HUBSPOT_PORTAL_ID is not set
 */
export function HubSpotTracker() {
  const pathname = usePathname()
  const isFirstLoad = useRef(true)

  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID

  useEffect(() => {
    // Skip the first call -- HubSpot script fires trackPageView on initial load
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    // Track SPA route changes
    window._hsq = window._hsq || []
    window._hsq.push(['setPath', pathname])
    window._hsq.push(['trackPageView'])
  }, [pathname])

  // Graceful degradation: render nothing if portal ID is not configured
  if (!portalId || portalId === 'REPLACE_ME') {
    return null
  }

  return (
    <Script
      id="hs-script-loader"
      src={`//js.hs-scripts.com/${portalId}.js`}
      strategy="afterInteractive"
    />
  )
}
