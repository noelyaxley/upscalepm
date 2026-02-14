import Image from 'next/image'
import { Section } from '@/components/layout/section'

const logos = [
  {
    src: '/images/shared/logos/sydney-water.webp',
    alt: 'Sydney Water',
    width: 300,
    height: 116,
  },
  {
    src: '/images/shared/logos/health-infrastructure.webp',
    alt: 'Health Infrastructure',
    width: 300,
    height: 102,
  },
  {
    src: '/images/shared/logos/blacktown-city-council.webp',
    alt: 'Blacktown City Council',
    width: 300,
    height: 144,
  },
  {
    src: '/images/shared/logos/school-infrastructure.webp',
    alt: 'School Infrastructure',
    width: 300,
    height: 97,
  },
  {
    src: '/images/shared/logos/nsw-ambulance.webp',
    alt: 'NSW Ambulance',
    width: 150,
    height: 150,
  },
]

interface ClientLogosProps {
  heading?: string
}

export function ClientLogos({
  heading = 'Trusted by leading organisations',
}: ClientLogosProps) {
  return (
    <Section spacing="compact" background="muted">
      {heading && (
        <p className="mb-8 text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {heading}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo) => (
          <div key={logo.alt} className="flex items-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-10 w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-12"
            />
          </div>
        ))}
      </div>
    </Section>
  )
}
