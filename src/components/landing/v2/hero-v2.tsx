'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import { DynamicHeadline } from '@/components/landing/dynamic-headline'
import { EmailCapture } from './email-capture'
import { StarRating } from './star-rating'
import { StripeOverlay } from './stripe-overlay'

export function HeroV2() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/landing/brand/calibre-cooper-facade-night.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Heavy dark overlay */}
      <div className="absolute inset-0 bg-[#0a0404]/80" />

      {/* Diagonal stripe pattern */}
      <StripeOverlay />

      {/* Content — centered */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* Massive headline */}
        <Suspense fallback={<div className="h-24" />}>
          <div className="[&_h1]:text-5xl [&_h1]:sm:text-6xl [&_h1]:md:text-7xl [&_h1]:lg:text-8xl [&_h1]:font-display [&_h1]:font-bold [&_h1]:leading-[0.95] [&_h1]:tracking-tight">
            <DynamicHeadline />
          </div>
        </Suspense>

        {/* Short body */}
        <p className="mx-auto mt-6 max-w-lg text-lg text-neutral-300 md:text-xl">
          Managing a build is hard. We make it predictable.
        </p>

        {/* Email capture */}
        <div className="relative mt-10">
          <EmailCapture />
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-neutral-500">
          We&apos;ll never spam you. That&apos;s a promise.
        </p>

        {/* Star rating */}
        <div className="mt-6 flex justify-center">
          <StarRating className="text-neutral-400" />
        </div>
      </div>
    </section>
  )
}
