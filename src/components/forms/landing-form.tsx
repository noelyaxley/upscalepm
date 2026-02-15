'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2, Phone } from 'lucide-react'
import { submitContactForm } from '@/actions/contact'
import { getStoredUTMParams } from '@/lib/utm'
import { trackFormSubmission, trackFormView, trackFormError } from '@/components/analytics/gtm-event'

const formSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(1, 'Required'),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function LandingForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  useEffect(() => {
    trackFormView('landing_form_sydney')
  }, [])

  async function onSubmit(data: FormValues) {
    setStatus('idle')
    const utmParams = getStoredUTMParams()
    const payload: Record<string, string> = {
      ...data,
      message: data.message || 'Landing page enquiry — Sydney',
      phone: data.phone ?? '',
      projectType: '',
      pageUri: window.location.href,
      pageName: document.title,
    }
    if (utmParams) {
      if (utmParams.utm_source) payload.utmSource = utmParams.utm_source
      if (utmParams.utm_medium) payload.utmMedium = utmParams.utm_medium
      if (utmParams.utm_campaign) payload.utmCampaign = utmParams.utm_campaign
      if (utmParams.utm_term) payload.utmTerm = utmParams.utm_term
      if (utmParams.utm_content) payload.utmContent = utmParams.utm_content
      if (utmParams.gclid) payload.gclid = utmParams.gclid
    }

    const result = await submitContactForm(payload)
    if (result.success) {
      trackFormSubmission('landing_form_sydney')
      setStatus('success')
      reset()
    } else {
      trackFormError('landing_form_sydney', 'submit_failed')
      setStatus('error')
      setErrorMessage(result.error ?? 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-700 bg-green-950/50 p-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 size-10 text-green-400" />
        <h3 className="text-lg font-semibold text-green-100">
          Thank you! We&apos;ll call you back within 2 hours.
        </h3>
        <p className="mt-2 text-sm text-green-300">
          Or call us now:{' '}
          <a href="tel:+61290904480" className="font-semibold underline">
            02 9090 4480
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            placeholder="First name *"
            {...register('firstName')}
            className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-400">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last name *"
            {...register('lastName')}
            className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-400">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <input
          type="email"
          placeholder="Email *"
          {...register('email')}
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Phone *"
          {...register('phone')}
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Tell us about your project (optional)"
          rows={3}
          {...register('message')}
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Speak to an Expert Now'
        )}
      </button>

      {status === 'error' && (
        <p className="text-center text-sm text-red-400">{errorMessage}</p>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
        <Phone className="size-3" />
        <span>Or call <a href="tel:+61290904480" className="text-primary underline">02 9090 4480</a></span>
      </div>
    </form>
  )
}
