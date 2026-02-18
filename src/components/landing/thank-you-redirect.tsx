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
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  return (
    <p className="mt-4 text-sm text-neutral-500">
      Redirecting to home page in {seconds} second{seconds !== 1 ? 's' : ''}...
    </p>
  )
}
