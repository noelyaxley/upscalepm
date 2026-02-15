'use client'

import { useEffect, useCallback } from 'react'
import { syncCalendlyBooking } from '@/actions/calendly'

interface CalendlyInlineProps {
  url?: string
  styles?: React.CSSProperties
}

export function CalendlyInline({ url, styles }: CalendlyInlineProps) {
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL

  const handleMessage = useCallback((e: MessageEvent) => {
    if (
      e.origin === 'https://calendly.com' &&
      e.data?.event === 'calendly.event_scheduled'
    ) {
      const inviteeUri = e.data?.payload?.invitee?.uri
      if (inviteeUri) {
        syncCalendlyBooking(inviteeUri)
      }
    }
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    window.addEventListener('message', handleMessage)

    return () => {
      document.body.removeChild(script)
      window.removeEventListener('message', handleMessage)
    }
  }, [handleMessage])

  if (!calendlyUrl || calendlyUrl === 'https://calendly.com/REPLACE_ME') {
    return (
      <div className="flex h-[1000px] items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Booking widget not configured
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Set NEXT_PUBLIC_CALENDLY_URL to enable scheduling
          </p>
        </div>
      </div>
    )
  }

  const embedUrl = `${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1`

  return (
    <div
      className="calendly-inline-widget"
      data-url={embedUrl}
      style={styles ?? { minWidth: '320px', height: '1000px' }}
    />
  )
}
