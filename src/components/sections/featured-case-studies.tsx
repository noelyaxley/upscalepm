import Image from 'next/image'
import Link from 'next/link'
import { BlurFade } from '@/components/animation/blur-fade'
import { Section } from '@/components/layout/section'

const projects = [
  {
    title: 'Granville Diggers Club Redevelopment',
    description:
      'Heritage-sensitive club refurbishment — full lifecycle advisory from feasibility through to construction delivery under AS4902 D&C.',
    image: '/images/case-studies/granville-diggers/hero.jpg',
    href: '/case-studies/granville-diggers-club-development',
  },
  {
    title: 'Granville Diggers: Delivery Structure',
    description:
      'Structuring delivery via AS4902 and separable portions with James Clifford Construction — design certification then staged construction.',
    image: '/images/case-studies/granville-diggers/gallery-01.webp',
    href: '/case-studies/structured-for-success-delivering-granville-diggers-club-via-as4902-and-separable-portions',
  },
  {
    title: 'Granville Diggers: The Origin Story',
    description:
      'How UpScale bridged design ambition and commercial reality on a 1960s heritage club redevelopment in Western Sydney.',
    image: '/images/case-studies/granville-diggers/hero.jpg',
    href: '/case-studies/granville-diggers-club-development-origin',
  },
]

export function FeaturedCaseStudies() {
  return (
    <Section background="muted">
      <BlurFade>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
            Club Redevelopment Projects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how we protect club boards through every stage of the
            redevelopment process.
          </p>
        </div>
      </BlurFade>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <BlurFade key={project.title} delay={0.1 + i * 0.1}>
            <Link
              href={project.href}
              className="group block h-full overflow-hidden rounded-lg border-2 border-primary/20 bg-background shadow-sm transition-all hover:border-primary/60 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold leading-snug group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-primary">
                  View project &rarr;
                </span>
              </div>
            </Link>
          </BlurFade>
        ))}
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
