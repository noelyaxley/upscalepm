'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Phone, ChevronLeft } from 'lucide-react'
import { submitContactForm } from '@/actions/contact'
import { getStoredUTMParams } from '@/lib/utm'
import { trackFormSubmission, trackFormView, trackFormError } from '@/components/analytics/gtm-event'

// Survey question definitions
type SurveyQuestion = {
  id: string
  question: string
  options: string[]
}

const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'projectType',
    question: 'What best describes your project?',
    options: [
      'New build or extension',
      'Commercial fit-out or refurbishment',
      'DA approval or town planning',
      'Feasibility study',
      'Something else',
    ],
  },
  {
    id: 'propertyType',
    question: 'What type of property is involved?',
    options: [
      'Commercial',
      'Residential',
      'Government or institutional',
      'Health or education',
      'Something else',
    ],
  },
  {
    id: 'projectStage',
    question: 'What stage is your project at?',
    options: [
      'Just exploring options',
      'Ready to start planning',
      'Planning underway',
      'Need construction oversight',
      'Not sure yet',
    ],
  },
  {
    id: 'budget',
    question: "What's your approximate project budget?",
    options: [
      'Under $500K',
      '$500K\u2013$2M',
      '$2M\u2013$5M',
      'Over $5M',
      'Not sure yet',
    ],
  },
  {
    id: 'timeline',
    question: 'When do you need to get started?',
    options: [
      'Immediately',
      'Within 3 months',
      'Within 6 months',
      '6+ months',
      'Not sure yet',
    ],
  },
]

const TOTAL_STEPS = surveyQuestions.length + 1 // 5 questions + 1 contact step

const contactSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(1, 'Required'),
})

type ContactValues = z.infer<typeof contactSchema>

export function SurveyForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  })

  useEffect(() => {
    trackFormView('survey_form_sydney')
  }, [])

  const selectOption = useCallback(
    (questionId: string, option: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: option }))
      // Auto-advance after a short delay so user sees their selection
      setTimeout(() => {
        setStep((s) => s + 1)
      }, 250)
    },
    [],
  )

  async function onSubmit(data: ContactValues) {
    setStatus('idle')
    const utmParams = getStoredUTMParams()

    // Build survey summary for the message field
    const surveyLines = surveyQuestions.map(
      (q) => `${q.question} ${answers[q.id] || 'Not answered'}`,
    )
    const surveyMessage = surveyLines.join(' | ')

    const payload: Record<string, string> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: surveyMessage,
      projectType: answers.projectType || '',
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
      trackFormSubmission('survey_form_sydney')
      sessionStorage.setItem('form_submitted', '1')
      router.push('/landing/sydney/thank-you')
    } else {
      trackFormError('survey_form_sydney', 'submit_failed')
      setStatus('error')
      setErrorMessage(result.error ?? 'Something went wrong.')
    }
  }

  const isContactStep = step >= surveyQuestions.length
  const currentQuestion = surveyQuestions[step]

  const inputClass =
    'w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

  return (
    <div className="space-y-4">
      {/* Progress dots */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < step
                  ? 'w-6 bg-primary'
                  : i === step
                    ? 'w-6 bg-primary/70'
                    : 'w-4 bg-neutral-700'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-neutral-500">
          {step === 0 ? 'Takes under a minute' : `Step ${step + 1} of ${TOTAL_STEPS}`}
        </span>
      </div>

      {/* Survey questions */}
      {!isContactStep && currentQuestion && (
        <div>
          <h3 className="text-base font-semibold text-white">
            {currentQuestion.question}
          </h3>
          <div className="mt-3 space-y-2">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectOption(currentQuestion.id, option)}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/15 text-white'
                      : 'border-neutral-700 bg-neutral-800/60 text-neutral-300 hover:border-neutral-500 hover:bg-neutral-800'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-3 flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-300"
            >
              <ChevronLeft className="size-3" />
              Back
            </button>
          )}
        </div>
      )}

      {/* Contact fields */}
      {isContactStep && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <h3 className="text-base font-semibold text-white">
            Almost done — how do we reach you?
          </h3>
          <p className="text-sm text-neutral-400">
            We&apos;ll call you within 2 hours during business hours.
          </p>

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
              'Get My Free Consultation'
            )}
          </button>

          {status === 'error' && (
            <p className="text-center text-sm text-red-400">{errorMessage}</p>
          )}

          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex w-full items-center justify-center gap-1 text-xs text-neutral-500 hover:text-neutral-300"
          >
            <ChevronLeft className="size-3" />
            Back
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <Phone className="size-3" />
            <span>
              Or call{' '}
              <a href="tel:+61290904480" className="text-primary underline">
                02 9090 4480
              </a>
            </span>
          </div>
        </form>
      )}
    </div>
  )
}
