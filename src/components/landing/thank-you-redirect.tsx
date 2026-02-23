'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function ThankYouRedirect() {
  const router = useRouter()
  const [seconds, setSeconds] = useState(5)

  // Clear the form_submitted flag (conversion is tracked by GTM)
  useEffect(() => {
    sessionStorage.removeItem('form_submitted')
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
