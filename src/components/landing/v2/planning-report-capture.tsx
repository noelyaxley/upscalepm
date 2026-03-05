'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Mail, Phone, User, Loader2 } from 'lucide-react'
import { submitPlanningReport } from '@/actions/planning-report'
import { getStoredUTMParams } from '@/lib/utm'
import { trackFormSubmission } from '@/components/analytics/gtm-event'

const inputBase =
  'w-full rounded-md border bg-white/10 py-2.5 pl-8 pr-4 text-sm text-white placeholder:text-neutral-400 backdrop-blur-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

export function PlanningReportCapture() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [siteAddress, setSiteAddress] = useState('')
  const [email, setEmail] = useState('')
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set())
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function clearField(field: string) {
    setInvalidFields((prev) => {
      const next = new Set(prev)
      next.delete(field)
      return next
    })
  }

  function inputClass(field: string) {
    return `${inputBase} ${
      invalidFields.has(field)
        ? 'animate-[shake_0.4s_ease-in-out] border-red-500'
        : 'border-white/20'
    }`
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const missing = new Set<string>()
    if (!name.trim()) missing.add('name')
    if (!phone.trim()) missing.add('phone')
    if (!email.trim() || !email.includes('@')) missing.add('email')

    if (missing.size > 0) {
      setInvalidFields(missing)
      return
    }

    setInvalidFields(new Set())
    setSubmitting(true)

    try {
      const utm = getStoredUTMParams()
      const result = await submitPlanningReport({
        name,
        phone,
        email,
        siteAddress,
        pageUri: window.location.href,
        ...utm,
      })

      if (result.success) {
        trackFormSubmission('planning_report_hero')
        sessionStorage.setItem('form_submitted', '1')

        // Fire n8n planning report webhook if site address provided
        if (siteAddress.trim()) {
          fetch(process.env.NEXT_PUBLIC_N8N_PLANNING_WEBHOOK_URL || '', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clientName: name,
              clientEmail: email,
              clientPhone: phone,
              propertyAddress: siteAddress,
            }),
          }).catch(() => {}) // fire-and-forget
        }

        router.push('/landing/sydney/thank-you')
        return
      } else {
        setError(result.error ?? 'Something went wrong')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <p className="mb-4 text-base font-semibold text-primary">
        Free Planning Report — 24 Hour Turnaround
      </p>
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <User className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); clearField('name') }}
              placeholder="Your name *"
              className={inputClass('name')}
              autoComplete="name"
            />
          </div>
          <div className="relative flex-1">
            <Phone className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); clearField('phone') }}
              placeholder="Phone *"
              className={inputClass('phone')}
              autoComplete="tel"
            />
          </div>
        </div>
        <div className="relative">
          <MapPin className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={siteAddress}
            onChange={(e) => setSiteAddress(e.target.value)}
            placeholder="Site address (optional)"
            className={`${inputBase} border-white/20`}
            autoComplete="street-address"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearField('email') }}
              placeholder="Your email *"
              className={inputClass('email')}
              autoComplete="email"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="whitespace-nowrap rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
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
