'use client'

import Image from 'next/image'

type Logo = {
  src: string
  alt: string
  w: number
  h: number
}

const allLogos: Logo[] = [
  { src: '/images/shared/logos/sydney-water.webp', alt: 'Sydney Water', w: 120, h: 46 },
  { src: '/images/shared/logos/health-infrastructure.webp', alt: 'Health Infrastructure', w: 120, h: 40 },
  { src: '/images/shared/logos/school-infrastructure.webp', alt: 'School Infrastructure', w: 120, h: 38 },
  { src: '/images/shared/logos/nsw-ambulance.webp', alt: 'NSW Ambulance', w: 50, h: 50 },
  { src: '/images/shared/logos/tfnsw.png', alt: 'Transport for NSW', w: 120, h: 31 },
  { src: '/images/shared/logos/dpie.png', alt: 'DPIE', w: 120, h: 34 },
  { src: '/images/shared/logos/granville-diggers.png', alt: 'Granville Diggers', w: 120, h: 40 },
  { src: '/images/shared/logos/blacktown-city-council.webp', alt: 'Blacktown City Council', w: 120, h: 40 },
  { src: '/images/shared/logos/crosslife-church.png', alt: 'Crosslife Church', w: 120, h: 40 },
]

export function LogoMarquee({
  logos = allLogos,
  reverse = false,
  className = '',
}: {
  logos?: Logo[]
  reverse?: boolean
  className?: string
}) {
  const direction = reverse ? 'marquee-reverse' : 'marquee'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

      <div className={`flex w-max gap-12 ${direction}`}>
        {/* Render logos twice for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <Image
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={logo.w}
            height={logo.h}
            className="h-10 w-auto shrink-0 object-contain opacity-50 grayscale"
          />
        ))}
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 30s linear infinite;
        }
        .marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
