'use client'

import { useEffect, useState } from 'react'
import { PopupButton } from 'react-calendly'

interface CalendlyPopupProps {
  url?: string
  text?: string
  className?: string
}

export function CalendlyPopup({ url, text, className }: CalendlyPopupProps) {
  const [mounted, setMounted] = useState(false)
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!calendlyUrl || calendlyUrl === 'https://calendly.com/REPLACE_ME') {
    return (
      <a
        href="/contact#booking"
        className={
          className ??
          'inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground'
        }
      >
        {text ?? 'Book a Consultation'}
      </a>
    )
  }

  return (
    <PopupButton
      url={calendlyUrl}
      text={text ?? 'Book a Consultation'}
      className={
        className ??
        'inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground'
      }
      rootElement={document.body}
    />
  )
}
