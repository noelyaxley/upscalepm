'use client'

import { useState } from 'react'
import { z } from 'zod'

const emailSchema = z.string().email()

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const result = emailSchema.safeParse(email)
    if (!result.success) {
      setError('Enter a valid email')
      return
    }

    // Store email for the SurveyForm to pick up
    sessionStorage.setItem('captured_email', email)

    // Smooth scroll to the survey form
    const form = document.getElementById('survey-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-neutral-400 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        autoComplete="email"
      />
      <button
        type="submit"
        className="rounded-md bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
      >
        Do It
      </button>
      {error && (
        <p className="absolute mt-14 text-xs text-red-400">{error}</p>
      )}
    </form>
  )
}
