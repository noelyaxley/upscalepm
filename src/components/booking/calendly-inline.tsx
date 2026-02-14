'use client'

import { InlineWidget } from 'react-calendly'

interface CalendlyInlineProps {
  url?: string
  styles?: React.CSSProperties
}

export function CalendlyInline({ url, styles }: CalendlyInlineProps) {
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL

  if (!calendlyUrl || calendlyUrl === 'https://calendly.com/REPLACE_ME') {
    return (
      <div className="flex h-[630px] items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50">
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

  return (
    <InlineWidget
      url={calendlyUrl}
      styles={styles ?? { height: '630px', minWidth: '320px' }}
    />
  )
}
