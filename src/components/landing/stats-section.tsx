'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/layout/container'

const stats = [
  { value: 85, prefix: '$', suffix: 'M+', label: 'Project Value Delivered' },
  { value: 30, prefix: '', suffix: '+', label: 'Sydney Projects Completed' },
  { value: 15, prefix: '', suffix: '+', label: 'Years Experience' },
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
            // ease-out cubic
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
    <div ref={ref} className="font-display text-4xl font-bold tracking-tight md:text-5xl">
      {prefix}{count}{suffix}
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="bg-neutral-100 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Proven. Not Promised.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Independent project management across Sydney&apos;s most demanding sectors.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white p-6 text-center shadow-sm">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-xl">
          <Image
            src="/images/landing/brand/mac-park-lobby.jpg"
            alt="Macquarie Park commercial lobby delivered by UpScalePM"
            width={1200}
            height={500}
            className="h-64 w-full object-cover md:h-96"
          />
        </div>
      </Container>
    </section>
  )
}
