'use client'

import dynamic from 'next/dynamic'

const CalendlyInlineWidget = dynamic(
  () =>
    import('@/components/booking/calendly-inline').then(
      (mod) => mod.CalendlyInline
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[630px] animate-pulse rounded-lg bg-muted" />
    ),
  }
)

interface CalendlyInlineDynamicProps {
  url?: string
  styles?: React.CSSProperties
}

export function CalendlyInlineDynamic({
  url,
  styles,
}: CalendlyInlineDynamicProps) {
  return <CalendlyInlineWidget url={url} styles={styles} />
}
