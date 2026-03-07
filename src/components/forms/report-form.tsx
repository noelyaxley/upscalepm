'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Phone } from 'lucide-react'
import { submitContactForm } from '@/actions/contact'
import { getStoredUTMParams } from '@/lib/utm'
import { trackFormSubmission, trackFormView, trackFormError } from '@/components/analytics/gtm-event'

const formSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(1, 'Required'),
  propertyAddress: z.string().min(1, 'Required'),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function ReportForm() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      propertyAddress: '',
      notes: '',
    },
  })

  useEffect(() => {
    trackFormView('report_form')
  }, [])

  async function onSubmit(data: FormValues) {
    setStatus('idle')
    const utmParams = getStoredUTMParams()
    const payload: Record<string, string> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: `Property Report Request\n\nAddress: ${data.propertyAddress}${data.notes ? `\n\nNotes: ${data.notes}` : ''}`,
      projectType: 'Property Report',
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
      trackFormSubmission('report_form')
      sessionStorage.setItem('form_submitted', '1')
      router.push('/landing/report/thank-you')
    } else {
      trackFormError('report_form', 'submit_failed')
      setStatus('error')
      setErrorMessage(result.error ?? 'Something went wrong.')
    }
  }

  const inputClass =
    'w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            placeholder="First name *"
            {...register('firstName')}
            className={inputClass}
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
            className={inputClass}
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
          className={inputClass}
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
          className={inputClass}
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Property address *"
          {...register('propertyAddress')}
          className={inputClass}
          autoComplete="street-address"
        />
        {errors.propertyAddress && (
          <p className="mt-1 text-xs text-red-400">{errors.propertyAddress.message}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Additional notes (optional)"
          rows={3}
          {...register('notes')}
          className={inputClass}
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
            Submitting...
          </>
        ) : (
          'Request My Free Report'
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
