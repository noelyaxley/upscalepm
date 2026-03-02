'use client'

import { useState } from 'react'
import { MapPin, Mail, Loader2, CheckCircle2 } from 'lucide-react'
import { submitPlanningReport } from '@/actions/planning-report'
import { getStoredUTMParams } from '@/lib/utm'
import { trackFormSubmission } from '@/components/analytics/gtm-event'

export function PlanningReportCapture() {
  const [siteAddress, setSiteAddress] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!siteAddress.trim()) {
      setError('Please enter your site address')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setSubmitting(true)

    try {
      const utm = getStoredUTMParams()
      const result = await submitPlanningReport({
        email,
        siteAddress,
        pageUri: window.location.href,
        ...utm,
      })

      if (result.success) {
        setSubmitted(true)
        trackFormSubmission('planning_report_hero')
      } else {
        setError(result.error ?? 'Something went wrong')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-primary/30 bg-primary/10 p-6 backdrop-blur-sm">
        <CheckCircle2 className="mx-auto size-10 text-primary" />
        <p className="mt-3 text-lg font-bold text-white">
          Your report is on its way.
        </p>
        <p className="mt-1 text-sm text-neutral-300">
          We&apos;ll email your free planning report within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <p className="mb-4 text-base font-semibold text-primary">
        Free Planning Report — 24 Hour Turnaround
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={siteAddress}
            onChange={(e) => setSiteAddress(e.target.value)}
            placeholder="Enter your site address"
            className="w-full rounded-md border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-base text-white placeholder:text-neutral-400 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            autoComplete="street-address"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-md border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-base text-white placeholder:text-neutral-400 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              autoComplete="email"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-primary px-6 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              'Get My Free Report'
            )}
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </form>

      {/* Fallback link */}
      <p className="mt-4 text-sm text-neutral-400">
        Not a planning question?{' '}
        <a
          href="#survey-form"
          className="font-semibold text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
        >
          Tell us what you need &darr;
        </a>
      </p>
    </div>
  )
}
