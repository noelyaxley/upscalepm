'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Container } from '@/components/layout/container'

const testimonials = [
  {
    quote: 'Unwavering commitment to our projects. An indispensable partner.',
    name: 'Nathan McCullum',
    role: 'Director',
    company: 'McCullum Advisory',
    image: '/images/shared/testimonials/nathan-mccullum.jpg',
  },
  {
    quote: 'Dedication and professionalism define everything Upscale delivers.',
    name: 'Kenny Gunawan',
    role: 'Construction Manager',
    company: 'SHAPE',
    image: '/images/shared/testimonials/kenny-gunawan.jpg',
  },
  {
    quote: 'Resilience and focus under pressure. Excellent projects for NSW Government.',
    name: 'Michael Russel',
    role: 'Project Director',
    company: 'NSW Govt. Public Works',
    image: '/images/shared/testimonials/michael-russel.jpg',
  },
  {
    quote: 'Experienced, collaborative leadership. Exceptional delivery outcomes.',
    name: 'Steven Latham',
    role: 'Commercial Manager',
    company: 'SHAPE Australia',
    image: '/images/shared/testimonials/steven-latham.jpg',
  },
  {
    quote: 'Instrumental in turning our vision into reality. Complete confidence throughout.',
    name: 'Steve Rodriguez',
    role: 'CEO',
    company: 'Granville Diggers Club',
    image: '/images/shared/testimonials/steve-rodriguez.jpg',
  },
  {
    quote: 'Collaborative approach and attention to detail. Smooth delivery across all stakeholders.',
    name: 'Marcus Blanco',
    role: 'Project Director',
    company: 'Intermain Construction',
    image: '/images/shared/testimonials/marcus-blanco.jpg',
  },
]

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const t = testimonials[current]

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {/* Stars */}
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-5 fill-primary text-primary" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="mt-6 font-display text-xl font-bold leading-relaxed tracking-tight md:text-2xl">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <Image
              src={t.image}
              alt={t.name}
              width={48}
              height={48}
              className="size-12 rounded-full object-cover object-top"
            />
            <div className="text-left">
              <p className="text-sm font-bold">{t.name}</p>
              <p className="text-xs text-muted-foreground">
                {t.role}, {t.company}
              </p>
            </div>
          </div>

          {/* Nav */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-neutral-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`size-2.5 rounded-full transition-colors ${
                    i === current ? 'bg-primary' : 'bg-neutral-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-neutral-100"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
