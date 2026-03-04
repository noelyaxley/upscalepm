'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/layout/container'
import { StarRating } from './star-rating'
import { StripeOverlay } from './stripe-overlay'

const stats = [
  { value: 85, prefix: '$', suffix: 'M+', label: 'Project Value Delivered' },
  { value: 30, prefix: '', suffix: '+', label: 'Sydney Projects Completed' },
  { value: 15, prefix: '', suffix: '+', label: 'Years In The Trenches' },
  { value: 6, prefix: '', suffix: '', label: 'Industry Sectors' },
]

function CountUp({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const start = performance.now()

          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="font-display text-5xl font-bold tracking-tight md:text-6xl">
      {prefix}{count}{suffix}
    </div>
  )
}

export function StatsV2() {
  return (
    <section className="relative bg-[#0a0404] py-20 text-white md:py-28">
      <StripeOverlay />

      <Container>
        <div className="relative z-10">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl md:text-7xl">
              $85M+ In Project Value.<br className="hidden sm:block" /> Zero Guesswork.
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="mt-2 text-sm font-medium text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 overflow-hidden rounded-xl">
            <Image
              src="/images/landing/brand/mac-park-lobby.jpg"
              alt="Macquarie Park commercial lobby"
              width={1200}
              height={500}
              quality={90}
              className="h-64 w-full object-cover md:h-96"
              sizes="(max-width: 768px) 95vw, 1100px"
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <a
              href="#survey-form"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Talk To Us
            </a>
            <StarRating className="text-neutral-500" />
          </div>
        </div>
      </Container>
    </section>
  )
}
