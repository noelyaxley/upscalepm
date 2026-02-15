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
    title: 'Sydney Construction Management You Can Trust',
    subtitle: 'Experienced site supervision, contractor management, and progress claim review.',
  },
  townplanner: {
    title: 'Sydney DA Approval & Town Planning Experts',
    subtitle: 'Navigate council requirements with confidence. We manage the full DA process.',
  },
  commercial: {
    title: 'Sydney Commercial Fit-Out & Project Management',
    subtitle: 'From CBD offices to government facilities — delivered on time and on budget.',
  },
  feasibility: {
    title: 'Sydney Feasibility Studies & Advisory',
    subtitle: 'De-risk your investment with independent feasibility analysis before you commit.',
  },
  development: {
    title: 'Sydney Development Project Management',
    subtitle: 'Expert guidance from concept through to completion for your development project.',
  },
  contracts: {
    title: 'Sydney Contract Administration Experts',
    subtitle: 'Independent contract review, variation management, and progress claim verification.',
  },
  sitemanager: {
    title: 'Sydney Site Management & Superintendent',
    subtitle: 'Experienced on-site leadership ensuring quality, safety, and client-first delivery.',
  },
  superintendent: {
    title: 'Sydney Construction Superintendent',
    subtitle: 'Experienced on-site leadership ensuring quality, safety, and client-first delivery.',
  },
  property: {
    title: 'Sydney Property Project Management',
    subtitle: 'Protect your property investment with independent, client-side project management.',
  },
}

const defaultHeadline = {
  title: 'Sydney Project & Construction Management You Can Trust',
  subtitle: 'Project management, construction management, DA approval — all under one roof.',
}

export function DynamicHeadline() {
  const searchParams = useSearchParams()
  const service = searchParams.get('service')
  const headline = (service && headlines[service]) || defaultHeadline

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {headline.title}
      </h1>
      {headline.subtitle && (
        <p className="mt-2 text-base text-primary">{headline.subtitle}</p>
      )}
    </div>
  )
}
