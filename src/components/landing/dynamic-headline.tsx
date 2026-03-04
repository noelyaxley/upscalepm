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
    title: 'Your Builder Answers to Us.',
  },
  townplanner: {
    title: 'Don\u2019t Let Council Kill Your Project.',
  },
  commercial: {
    title: 'Fit-Outs That Don\u2019t Blow Out.',
  },
  feasibility: {
    title: 'Know the Real Numbers First.',
  },
  development: {
    title: 'Your Build Deserves Better.',
  },
  contracts: {
    title: 'Stop Signing Blind.',
  },
  sitemanager: {
    title: 'Boots on Ground. Eyes on Budget.',
  },
  superintendent: {
    title: 'We Run the Site. You Run the Business.',
  },
  property: {
    title: 'Don\u2019t Leave Your Build to Chance.',
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
    <h1>
      {headline.title}
    </h1>
  )
}
