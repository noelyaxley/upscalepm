'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/layout/container'

const caseStudies = [
  { name: '231 Elizabeth Street', sector: 'Commercial', image: '/images/landing/brand/elizabeth-st-fitout.jpg' },
  { name: 'Calibre Cooper', sector: 'Residential', image: '/images/landing/brand/calibre-cooper-facade-night.jpg' },
  { name: 'Sydney Water HQ', sector: 'Government', image: '/images/landing/brand/sydney-water-collab.jpg' },
  { name: 'Vibe Hotel', sector: 'Hospitality', image: '/images/landing/brand/vibe-hotel-rooftop-pool.jpg' },
  { name: 'Granville Diggers', sector: 'Community', image: '/images/landing/brand/granville-diggers-bar.jpg' },
  { name: 'TfNSW Glasshouse', sector: 'Government', image: '/images/landing/brand/tfnsw-atrium.jpg' },
  { name: 'Macquarie Park', sector: 'Commercial', image: '/images/landing/brand/mac-park-lobby.jpg' },
  { name: 'Newcastle Delivery', sector: 'Commercial', image: '/images/landing/brand/newcastle-timber-staircase.jpg' },
  { name: 'NSW Ambulance', sector: 'Health', image: '/images/landing/brand/ambulance-station-bay.jpg' },
  { name: 'Kyeemagh PS', sector: 'Education', image: '/images/landing/brand/kyeemagh-school.jpg' },
  { name: 'Calibre Interiors', sector: 'Residential', image: '/images/landing/brand/calibre-cooper-balcony.jpg' },
  { name: 'Vibe Hotel Lobby', sector: 'Hospitality', image: '/images/landing/brand/vibe-hotel-lobby.jpg' },
  { name: 'Sydney Water', sector: 'Government', image: '/images/landing/brand/sydney-water-filtration.jpg' },
  { name: 'Parramatta PS', sector: 'Education', image: '/images/landing/brand/parramatta-school.jpg' },
  { name: 'Health Infrastructure', sector: 'Health', image: '/images/landing/brand/health-ambulance-interior.jpg' },
  { name: 'TfNSW Workspace', sector: 'Government', image: '/images/landing/brand/tfnsw-workspace.jpg' },
]

export function CaseStudiesV2() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.6
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-5xl font-bold tracking-tight text-neutral-900 md:text-7xl">
            Become Our Next<br className="hidden sm:block" /> Success Story.
          </h2>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="flex size-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="flex size-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={scrollRef}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8"
        style={{ scrollbarWidth: 'none' }}
      >
        {caseStudies.map((cs) => (
          <div
            key={cs.name}
            className="group relative w-72 shrink-0 snap-start overflow-hidden rounded-lg sm:w-80 lg:w-96"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={cs.image}
                alt={cs.name}
                fill
                quality={90}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold">
                  {cs.sector}
                </span>
                <p className="mt-2 text-base font-bold">{cs.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Container>
        <div className="mt-10 text-center">
          <a
            href="#survey-form"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            Talk To Us
          </a>
        </div>
      </Container>
    </section>
  )
}
