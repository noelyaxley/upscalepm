'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/layout/container'

const images = [
  { src: '/images/case-studies/calibre-cooper/gallery-01.jpg', alt: 'Calibre Cooper residential apartments — Surry Hills' },
  { src: '/images/landing/carousel/elizabeth-st-03.jpg', alt: '231 Elizabeth Street commercial fit-out — Sydney CBD' },
  { src: '/images/landing/carousel/health-pm-01.jpg', alt: 'Health infrastructure project — NSW' },
  { src: '/images/landing/carousel/mac-park-10.jpg', alt: 'Glass House Macquarie Park — commercial interior' },
  { src: '/images/landing/carousel/vibe-hotel-11.jpg', alt: 'Vibe Hotel construction — Darling Harbour' },
  { src: '/images/landing/carousel/calibre-cooper-05.jpg', alt: 'Calibre Cooper architectural detail' },
  { src: '/images/case-studies/health-infrastructure/gallery-01.jpg', alt: 'Rural ambulance station — Health Infrastructure NSW' },
  { src: '/images/landing/carousel/elizabeth-st-07.jpg', alt: '231 Elizabeth Street interior — government office' },
  { src: '/images/landing/carousel/calibre-cooper-02.jpg', alt: 'Calibre Cooper residential facade' },
  { src: '/images/landing/carousel/health-pm-02.jpg', alt: 'Health project management — clinical facility' },
  { src: '/images/landing/carousel/mac-park-12.jpg', alt: 'Macquarie Park office interior' },
  { src: '/images/landing/carousel/vibe-hotel-13.jpg', alt: 'Vibe Hotel completed — Darling Harbour' },
  { src: '/images/landing/carousel/calibre-cooper-07.jpg', alt: 'Calibre Cooper construction detail' },
  { src: '/images/landing/carousel/health-pm-03.jpg', alt: 'Health infrastructure delivery' },
  { src: '/images/landing/carousel/calibre-cooper-11.jpg', alt: 'Calibre Cooper completed interior' },
]

export function ProofCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Number of visible images per breakpoint
  // We use 1 on mobile, 3 on desktop (managed via CSS)
  const visibleDesktop = 3
  const totalPages = Math.ceil(images.length / visibleDesktop)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % totalPages)
  }, [totalPages])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + totalPages) % totalPages)
  }, [totalPages])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  return (
    <section className="bg-neutral-950 py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            Proof, Not Promises
          </h2>
          <p className="mt-3 text-neutral-400">
            A selection of Sydney projects we&apos;ve delivered.
          </p>
        </div>

        <div
          className="relative mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel track */}
          <div className="overflow-hidden">
            {/* Mobile: single image slider */}
            <div
              className="flex transition-transform duration-500 ease-out md:hidden"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {images.map((img) => (
                <div key={img.src} className="w-full shrink-0 px-1">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: 3 images per page */}
            <div
              className="hidden transition-transform duration-500 ease-out md:flex"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {/* Render pages of 3 */}
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="flex w-full shrink-0 gap-4">
                  {images
                    .slice(pageIndex * visibleDesktop, (pageIndex + 1) * visibleDesktop)
                    .map((img) => (
                      <div key={img.src} className="relative aspect-[16/9] flex-1 overflow-hidden rounded-lg">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="33vw"
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            aria-label="Previous images"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            aria-label="Next images"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Dot pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-6 bg-primary' : 'w-2 bg-neutral-600'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
