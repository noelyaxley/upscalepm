'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const slides: { src: string; alt: string; text: string | null; grayscale: boolean }[] = [
  {
    src: '/images/case-studies/231-elizabeth-street/hero.jpg',
    alt: '231 Elizabeth Street commercial fit-out',
    text: 'Commercial fit-outs, delivered.',
    grayscale: false,
  },
  {
    src: '/images/case-studies/vibe-hotel/construction-bw.jpg',
    alt: 'Construction site with workers and brick column',
    text: 'Design to construction, managed.',
    grayscale: false,
  },
  {
    src: '/images/case-studies/glass-house-macquarie-park/hero.jpg',
    alt: 'Glass House Macquarie Park atrium',
    text: 'Architectural excellence, always.',
    grayscale: false,
  },
  {
    src: '/images/case-studies/sydney-water/gallery-02.jpg',
    alt: 'Sydney Water facility exterior',
    text: 'Trusted by government.',
    grayscale: true,
  },
  {
    src: '/images/case-studies/calibre-cooper/hero.jpg',
    alt: 'Calibre Cooper residential development',
    text: 'Residential projects, with wow factor.',
    grayscale: false,
  },
  {
    src: '/images/case-studies/health-infrastructure/gallery-01.jpg',
    alt: 'Health Infrastructure warehouse facility',
    text: 'Industrial and health sectors.',
    grayscale: true,
  },
  {
    src: '/images/landing/mac-park-interior.jpg',
    alt: 'Macquarie Park commercial interior atrium',
    text: 'Precision interiors, every project.',
    grayscale: false,
  },
  {
    src: '/images/insights/granville-diggers-commencement/hero.jpg',
    alt: 'Granville Diggers Club project commencement handshake',
    text: 'Partnerships that deliver results.',
    grayscale: false,
  },
  {
    src: '/images/case-studies/calibre-cooper/gallery-04.jpg',
    alt: 'Calibre Cooper residential balcony and interior',
    text: 'Quality finishes, every detail.',
    grayscale: false,
  },
  {
    src: '/images/insights/passion-for-delivering/hero.jpg',
    alt: 'Noel Yaxley, Founder of UpScale PM',
    text: null,
    grayscale: false,
  },
]

export function ProjectCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 2000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="relative h-80 w-full overflow-hidden md:h-96">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className={`object-cover ${slide.grayscale ? 'grayscale' : ''}`}
            sizes="100vw"
            priority={i === 0}
          />
          {/* Dark overlay + text — only when text exists */}
          {slide.text && (
            <>
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="px-4 text-center font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">
                  {slide.text}
                </p>
              </div>
            </>
          )}
        </div>
      ))}
      {/* Progress dots */}
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`size-2 rounded-full transition-all ${
              i === current ? 'scale-125 bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Hero background variant — fills positioned parent, slower transitions,
 * no text overlays (gradient handled by parent wrapper).
 */
export function HeroCarouselBackground({ interval = 4500 }: { interval?: number }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, interval])

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={`object-cover ${slide.grayscale ? 'grayscale' : ''}`}
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      {/* Progress dots */}
      <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`size-2 rounded-full transition-all ${
              i === current ? 'scale-125 bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </>
  )
}
