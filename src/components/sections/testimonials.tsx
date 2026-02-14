import { Quote } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'We only trust Upscale Project Management. Their unwavering commitment to our projects has made them an indispensable partner.',
    name: 'Nathan McCullum',
    role: 'Director',
    company: 'McCullum Advisory & Society Real Estate',
  },
  {
    quote:
      'Dedication and professionalism define everything Upscale delivers. They bring a level of care and rigour that sets them apart.',
    name: 'Kenny Gunawan',
    role: 'Construction Manager',
    company: 'SHAPE',
  },
  {
    quote:
      'Resilience and focus under pressure. Upscale delivered excellent projects for NSW Government, navigating complexity with clarity.',
    name: 'Michael Russel',
    role: 'Project Director',
    company: 'NSW Govt. Public Works',
  },
  {
    quote:
      'Noel brings experienced, collaborative leadership to every project. His ability to coordinate across stakeholders and drive delivery outcomes is exceptional.',
    name: 'Steven Latham',
    role: 'Commercial Manager',
    company: 'SHAPE Australia',
  },
]

export function Testimonials() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.name}
          className="rounded-xl border bg-card p-6 shadow-sm"
        >
          <Quote className="mb-4 size-6 text-primary-500" />
          <blockquote className="text-sm leading-relaxed text-muted-foreground">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
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
