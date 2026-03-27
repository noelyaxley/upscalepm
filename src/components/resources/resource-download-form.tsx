'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Download, Loader2, CheckCircle2 } from 'lucide-react'
import { submitResourceDownload } from '@/actions/resource-download'
import { getStoredUTMParams } from '@/lib/utm'
import { trackFormSubmission } from '@/components/analytics/gtm-event'

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
})

type FormValues = z.infer<typeof schema>

interface ResourceDownloadFormProps {
  resourceSlug: string
  resourceTitle: string
  pdfPath: string
}

export function ResourceDownloadForm({
  resourceSlug,
  resourceTitle,
  pdfPath,
}: ResourceDownloadFormProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormValues) {
    const utmParams = getStoredUTMParams()
    const result = await submitResourceDownload({
      ...data,
      resourceSlug,
      resourceTitle,
      utmSource: utmParams?.utm_source,
      utmMedium: utmParams?.utm_medium,
      utmCampaign: utmParams?.utm_campaign,
      gclid: utmParams?.gclid,
    })

    if (result.success) {
      trackFormSubmission(`resource_download_${resourceSlug}`)
      setStatus('success')
      // Trigger PDF download
      window.open(pdfPath, '_blank')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 text-center">
        <CheckCircle2 className="mx-auto size-10 text-primary" />
        <p className="mt-3 font-semibold">Your download has started.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          If it didn&apos;t open automatically,{' '}
          <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            click here to download
          </a>.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-muted/50 p-6">
      <div className="flex items-center gap-3">
        <Download className="size-6 text-primary" />
        <h3 className="text-lg font-bold">Download as PDF</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your details to download the complete {resourceTitle} as a
        printable PDF.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              placeholder="First name *"
              {...register('firstName')}
              className="w-full rounded-md border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email *"
              {...register('email')}
              className="w-full rounded-md border px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Download className="size-4" />
              Download Free PDF
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-neutral-500">
          No spam. We&apos;ll only email you about club redevelopment resources.
        </p>
      </form>
      {status === 'error' && (
        <p className="mt-3 text-center text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
