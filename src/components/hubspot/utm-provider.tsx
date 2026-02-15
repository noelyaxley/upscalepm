'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { captureUTMParams, getStoredUTMParams } from '@/lib/utm'
import { pushToDataLayer } from '@/components/analytics/gtm-event'

/**
 * Inner component that reads search params and captures UTMs.
 * Must be wrapped in Suspense because useSearchParams() without Suspense
 * de-opts the entire page from static generation.
 */
function UTMCaptureInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    captureUTMParams(searchParams)

    // Push UTM params to GTM dataLayer for GA4 attribution
    const stored = getStoredUTMParams()
    if (stored) {
      pushToDataLayer('utm_params', stored)
    }
  }, [searchParams])

  return null
}

/**
 * UTM capture provider. Wraps UTMCaptureInner in a Suspense boundary
 * to prevent static generation de-optimization. Renders nothing visible --
 * purely a side-effect component.
 */
export function UTMProvider() {
  return (
    <Suspense fallback={null}>
      <UTMCaptureInner />
    </Suspense>
  )
}
