'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ServicePage } from '@/lib/services.types'

interface ServiceAccordionProps {
  services: ServicePage[]
}

export function ServiceAccordion({ services }: ServiceAccordionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  return (
    <div className="divide-y border-y">
      {services.map((service) => {
        const isOpen = openSlug === service.slug

        return (
          <div key={service.slug}>
            <button
              onClick={() => setOpenSlug(isOpen ? null : service.slug)}
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

                <div className="mt-6">
                  <Button asChild>
                    <Link href="/contact">Start Now</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
