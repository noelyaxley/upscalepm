'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function ThankYouRedirect() {
  const router = useRouter()
  const [seconds, setSeconds] = useState(5)

  // Fire Google Ads conversion event on mount
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-10851484907/OhIDCJaQifkbEOuJsrYo',
      })
    }
  }, [])

  useEffect(() => {
    if (seconds <= 0) {
      router.push('/')
      return
    }
    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [seconds, router])

  return (
    <p className="mt-4 text-sm text-neutral-500">
      Redirecting to home page in {seconds} second{seconds !== 1 ? 's' : ''}...
    </p>
  )
}
