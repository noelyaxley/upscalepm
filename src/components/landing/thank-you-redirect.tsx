'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function ThankYouRedirect({ redirectTo = '/landing/sydney' }: { redirectTo?: string }) {
  const router = useRouter()
  const [seconds, setSeconds] = useState(3)

  // Validate redirect is a relative path (prevent open redirects)
  const safeRedirect = redirectTo.startsWith('/') && !redirectTo.startsWith('//') ? redirectTo : '/landing/sydney'

  // Clear the form_submitted flag (conversion is tracked by GTM)
  useEffect(() => {
    sessionStorage.removeItem('form_submitted')
  }, [])

  useEffect(() => {
    if (seconds <= 0) {
      router.push(safeRedirect)
      return
    }
    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [seconds, router])

  return (
    <p className="mt-4 text-sm text-neutral-500">
      Redirecting in {seconds} second{seconds !== 1 ? 's' : ''}...
    </p>
  )
}
