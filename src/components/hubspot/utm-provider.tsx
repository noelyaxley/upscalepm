'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { captureUTMParams } from '@/lib/utm'

/**
 * Inner component that reads search params and captures UTMs.
 * Must be wrapped in Suspense because useSearchParams() without Suspense
 * de-opts the entire page from static generation.
 */
function UTMCaptureInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    captureUTMParams(searchParams)
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
