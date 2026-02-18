'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ServicePage } from '@/lib/services.types'

interface ServiceAccordionProps {
  services: ServicePage[]
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

export function ServiceAccordion({ services }: ServiceAccordionProps) {
  const isDesktop = useIsDesktop()
  const allSlugs = services.map((s) => s.slug)
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(new Set())

  // When viewport changes, reset: desktop = all open, mobile = all closed
  useEffect(() => {
    setOpenSlugs(isDesktop ? new Set(allSlugs) : new Set())
  }, [isDesktop]) // eslint-disable-line react-hooks/exhaustive-deps

  function toggle(slug: string) {
    setOpenSlugs((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }

  return (
    <div className="divide-y border-y">
      {services.map((service) => {
        const isOpen = openSlugs.has(service.slug)

        return (
          <div key={service.slug}>
            <button
              onClick={() => toggle(service.slug)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:bg-muted/50"
              aria-expanded={isOpen}
            >
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  {service.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-primary">
                  {service.subtitle}
                </p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                {isOpen ? (
                  <Minus className="size-5" />
                ) : (
                  <Plus className="size-5" />
                )}
              </div>
            </button>

            {isOpen && (
              <div className="pb-8">
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  {service.sections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="mb-2 text-base font-semibold text-foreground">
                        {section.heading}
                      </h3>
                      {section.body.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Button asChild>
                    <Link href="/contact">Start Now</Link>
                  </Button>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Learn more &rarr;
                  </Link>
                </div>

                {service.benefits.length > 0 && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {service.benefits.map((benefit) => (
                      <div
                        key={benefit.title}
                        className="rounded-lg border bg-muted/30 p-4"
                      >
                        <p className="text-sm font-semibold">
                          {benefit.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
