import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/layout/section'

const sectors = [
  {
    title: 'Club Development',
    description:
      'Heritage-sensitive club redevelopments balancing community value, DA compliance, and modern amenities.',
    image: '/images/case-studies/granville-diggers/hero.jpg',
    href: '/case-studies/granville-diggers-club-development',
  },
  {
    title: 'Multi Residential',
    description:
      'Luxury apartments and high-density residential projects, from DA through construction delivery.',
    image: '/images/case-studies/calibre-cooper/hero.jpg',
    href: '/case-studies/calibre-cooper-street-residential-apartments-surry-hills',
  },
  {
    title: 'Commercial Fit-out',
    description:
      'Government and corporate office fit-outs delivering modern, flexible workspaces on time and on budget.',
    image: '/images/case-studies/231-elizabeth-street/hero.jpg',
    href: '/case-studies/delivering-modern-government-workspaces-at-231-elizabeth-street',
  },
  {
    title: 'Industrial Warehousing',
    description:
      'Large-scale industrial and warehousing projects requiring precise coordination across complex supply chains.',
    image: '/images/case-studies/newcastle-fit-out/hero.jpg',
    href: '/case-studies/project-management-delivery-in-the-final-stretch-newcastle-office-fit-out',
  },
  {
    title: 'Laboratory',
    description:
      'Sydney Water\'s lab relocation from West Ryde to North Ryde -- lease negotiations, design, procurement, and contract administration. Due for completion August 2026.',
    image: '/images/case-studies/sydney-water/hero.jpg',
    href: '/case-studies/major-laboratory-relocation-future-proofing-sydney-waters-filtration-capabilities',
  },
]

export function FeaturedCaseStudies() {
  return (
    <Section background="muted">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Sectors of Expertise
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Real results from real projects. See how we have delivered for our
          clients across diverse sectors.
        </p>
      </div>
      <div className="mt-12 overflow-hidden">
        <div className="animate-marquee-sectors flex gap-6">
          {[...sectors, ...sectors].map((sector, i) => (
            <Link
              key={`${sector.title}-${i}`}
              href={sector.href}
              className="group w-[320px] shrink-0 overflow-hidden rounded-lg border bg-background shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="320px"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold leading-snug group-hover:text-primary">
                  {sector.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {sector.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-primary">
                  View project &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/case-studies"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All Projects &rarr;
        </Link>
      </div>
    </Section>
  )
}
