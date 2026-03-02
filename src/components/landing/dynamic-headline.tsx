'use client'

import { useSearchParams } from 'next/navigation'

/**
 * Dynamic headline component for Google Ads landing pages.
 *
 * Reads ?service= from the URL client-side via useSearchParams(),
 * keeping the parent page statically generated for fast TTFB.
 *
 * Usage in Google Ads Final URLs:
 *   /landing/sydney?service=construction
 *   /landing/sydney?service=townplanner
 *   /landing/sydney?service=commercial
 *   /landing/sydney?service=feasibility
 *   /landing/sydney?service=development
 *   /landing/sydney?service=contracts
 *   /landing/sydney?service=sitemanager
 *   /landing/sydney  (default — broad project management)
 */

const headlines: Record<string, { title: string; subtitle?: string }> = {
  construction: {
    title: 'Your PM Should Work for You.',
  },
  townplanner: {
    title: 'Don\u2019t Let Council Kill Your Project.',
  },
  commercial: {
    title: 'Your Fit-Out Shouldn\u2019t Cost More.',
  },
  feasibility: {
    title: 'Know the Real Numbers First.',
  },
  development: {
    title: 'Too Important for Your Inbox.',
  },
  contracts: {
    title: 'Stop Signing Blind.',
  },
  sitemanager: {
    title: 'Your Site. Your Leader.',
  },
  superintendent: {
    title: 'Your Site. Your Leader.',
  },
  property: {
    title: 'Protect Your Investment.',
  },
}

const defaultHeadline = {
  title: 'Independent Eyes on Your Build.',
}

export function DynamicHeadline() {
  const searchParams = useSearchParams()
  const service = searchParams.get('service')
  const headline = (service && headlines[service]) || defaultHeadline

  return (
    <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
      {headline.title}
    </h1>
  )
}
