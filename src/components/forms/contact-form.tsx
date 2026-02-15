'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { submitContactForm } from '@/actions/contact'
import { getStoredUTMParams } from '@/lib/utm'
import { trackFormSubmission, trackFormView, trackFormError } from '@/components/analytics/gtm-event'

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  projectType: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

type FormValues = z.infer<typeof formSchema>

const PROJECT_TYPES = [
  'Feasibility & Advisory',
  'Design Management',
  'DA Approval',
  'Tender Assessment',
  'Construction Superintendent',
  'Not sure yet',
] as const

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
    },
  })

  const projectType = watch('projectType')

  useEffect(() => {
    trackFormView('contact_form')
  }, [])

  async function onSubmit(data: FormValues) {
    setStatus('idle')
    const utmParams = getStoredUTMParams()
    const payload: Record<string, string> = {
      ...data,
      phone: data.phone ?? '',
      projectType: data.projectType ?? '',
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
      trackFormSubmission('contact_form')
      setStatus('success')
      reset()
    } else {
      trackFormError('contact_form', 'submit_failed')
      setStatus('error')
      setErrorMessage(result.error ?? 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950">
        <CheckCircle2 className="mx-auto mb-3 size-10 text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
          Thank you for your enquiry
        </h3>
        <p className="mt-2 text-green-700 dark:text-green-300">
          We&apos;ll be in touch within 1 business day.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setStatus('idle')}
        >
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact-first-name">
            First name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-first-name"
            type="text"
            placeholder="First name"
            {...register('firstName')}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'first-name-error' : undefined}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p id="first-name-error" className="text-sm text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-last-name">
            Last name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-last-name"
            type="text"
            placeholder="Last name"
            {...register('lastName')}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'last-name-error' : undefined}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p id="last-name-error" className="text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="contact-email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="contact-phone">
          Phone <span className="text-destructive">*</span>
        </Label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="04XX XXX XXX"
          {...register('phone')}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          autoComplete="tel"
        />
        {errors.phone && (
          <p id="phone-error" className="text-sm text-destructive">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Project Type */}
      <div className="space-y-2">
        <Label htmlFor="contact-project-type">
          Project type{' '}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Select
          value={projectType}
          onValueChange={(value) => setValue('projectType', value)}
        >
          <SelectTrigger id="contact-project-type" className="w-full">
            <SelectValue placeholder="Select a service (optional)" />
          </SelectTrigger>
          <SelectContent>
            {PROJECT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="contact-message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your project..."
          rows={4}
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Enquiry'
        )}
      </Button>

      {status === 'error' && (
        <p className="text-center text-sm text-destructive">{errorMessage}</p>
      )}

      <p className="text-center text-xs text-muted-foreground">
        No obligation. We respond within 1 business day. Your information is
        only used to respond to your enquiry.
      </p>
    </form>
  )
}
