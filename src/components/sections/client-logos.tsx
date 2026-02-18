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
  {
    src: '/images/shared/logos/tfnsw.png',
    alt: 'Transport for NSW',
    width: 300,
    height: 78,
  },
  {
    src: '/images/shared/logos/dpie.png',
    alt: 'Department of Planning, Industry and Environment',
    width: 300,
    height: 85,
  },
  {
    src: '/images/shared/logos/crosslife-church.png',
    alt: 'CrossLife Church',
    width: 300,
    height: 300,
  },
  {
    src: '/images/shared/logos/granville-diggers.png',
    alt: 'Granville Diggers Club',
    width: 300,
    height: 250,
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
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee items-center gap-12">
          {/* First set */}
          {logos.map((logo) => (
            <div key={logo.alt} className="flex shrink-0 items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-10 w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-12"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo) => (
            <div key={`${logo.alt}-dup`} className="flex shrink-0 items-center">
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
      </div>
    </Section>
  )
}
