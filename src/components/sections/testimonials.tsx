'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  image?: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'We only trust Upscale Project Management. Their unwavering commitment to our projects has made them an indispensable partner.',
    name: 'Nathan McCullum',
    role: 'Director',
    company: 'McCullum Advisory & Society Real Estate',
    image: '/images/shared/testimonials/nathan-mccullum.jpg',
  },
  {
    quote:
      'Dedication and professionalism define everything Upscale delivers. They bring a level of care and rigour that sets them apart.',
    name: 'Kenny Gunawan',
    role: 'Construction Manager',
    company: 'SHAPE',
    image: '/images/shared/testimonials/kenny-gunawan.jpg',
  },
  {
    quote:
      'Resilience and focus under pressure. Upscale delivered excellent projects for NSW Government, navigating complexity with clarity.',
    name: 'Michael Russel',
    role: 'Project Director',
    company: 'NSW Govt. Public Works',
    image: '/images/shared/testimonials/michael-russel.jpg',
  },
  {
    quote:
      'Noel brings experienced, collaborative leadership to every project. His ability to coordinate across stakeholders and drive delivery outcomes is exceptional.',
    name: 'Steven Latham',
    role: 'Commercial Manager',
    company: 'SHAPE Australia',
    image: '/images/shared/testimonials/steven-latham.jpg',
  },
  {
    quote:
      'Noel has been instrumental in turning our vision into reality. His hands-on approach and deep understanding of construction delivery gave our board complete confidence throughout the redevelopment.',
    name: 'Steve Rodriguez',
    role: 'CEO',
    company: 'Granville Diggers Club',
    image: '/images/shared/testimonials/steve-rodriguez.jpg',
  },
  {
    quote:
      'It was a pleasure working with Noel on Sydney Water\'s new admin building in Quakers Hill. His collaborative approach and attention to detail made for a smooth delivery across all stakeholders.',
    name: 'Marcus Blanco',
    role: 'Project Director',
    company: 'Intermain Construction',
    image: '/images/shared/testimonials/marcus-blanco.jpg',
  },
]

function Avatar({ name, image }: { name: string; image?: string }) {
  const [failed, setFailed] = useState(false)
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')

  if (!image || failed) {
    return (
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
        {initials}
      </div>
    )
  }

  return (
    <div className="size-12 shrink-0 overflow-hidden rounded-full">
      <Image
        src={image}
        alt={name}
        width={48}
        height={48}
        className="size-full object-cover object-top"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export function Testimonials() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.name}
          className="rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="flex gap-4">
            <div className="pt-1">
              <Avatar name={testimonial.name} image={testimonial.image} />
            </div>
            <blockquote className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="text-sm font-semibold">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[340px] shrink-0 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex gap-4">
        <div className="pt-1">
          <Avatar name={testimonial.name} image={testimonial.image} />
        </div>
        <blockquote className="text-sm leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>
      <div className="mt-4 border-t pt-4">
        <p className="text-sm font-semibold">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">
          {testimonial.role}, {testimonial.company}
        </p>
      </div>
    </div>
  )
}

export function TestimonialsMarquee() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.name}
          className="rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="flex gap-4">
            <div className="pt-1">
              <Avatar name={testimonial.name} image={testimonial.image} />
            </div>
            <blockquote className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="text-sm font-semibold">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
