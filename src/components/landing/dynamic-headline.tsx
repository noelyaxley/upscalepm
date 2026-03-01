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
    title: 'Your Builder Works for Themselves. Your PM Should Work for You.',
    subtitle: 'We don\u2019t just watch the build. We challenge every claim, variation, and programme update.',
  },
  townplanner: {
    title: 'Don\u2019t Let Council Delays Kill Your Sydney Project',
    subtitle: 'We don\u2019t just lodge your DA. We manage the entire approval process so nothing stalls.',
  },
  commercial: {
    title: 'Your Commercial Fit-Out Shouldn\u2019t Cost More Than It Has To',
    subtitle: 'We don\u2019t just manage the fit-out. We protect your budget from day one to handover.',
  },
  feasibility: {
    title: 'Don\u2019t Commit $2M Before You Know the Real Numbers',
    subtitle: 'We don\u2019t just run numbers. We tell you what others won\u2019t \u2014 before you commit.',
  },
  development: {
    title: 'Your Development Is Too Important to Manage From Your Inbox',
    subtitle: 'We don\u2019t just coordinate meetings. We own the delivery from feasibility through handover.',
  },
  contracts: {
    title: 'Stop Signing Contracts You Haven\u2019t Properly Reviewed',
    subtitle: 'We don\u2019t just review paperwork. We make sure every dollar you pay is justified.',
  },
  sitemanager: {
    title: 'Your Site Needs a Leader Who Answers to You \u2014 Not the Builder',
    subtitle: 'We don\u2019t just supervise. We hold contractors accountable on your behalf.',
  },
  superintendent: {
    title: 'Your Site Needs a Leader Who Answers to You \u2014 Not the Builder',
    subtitle: 'We don\u2019t just supervise. We hold contractors accountable on your behalf.',
  },
  property: {
    title: 'Protect Your Property Investment Before It\u2019s Too Late',
    subtitle: 'We don\u2019t just manage your project. We sit on your side of the table.',
  },
}

const defaultHeadline = {
  title: 'We Don\u2019t Just Manage Your Project. We Protect Your Investment.',
  subtitle: 'Client-side oversight that catches costly mistakes before they hit your bottom line.',
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
