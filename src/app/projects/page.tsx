import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCaseStudies } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import type { CaseStudyFrontmatter } from '@/lib/content.types'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'
import { BlurFade } from '@/components/animation/blur-fade'

export const metadata: Metadata = generatePageMetadata({
  title: 'Club Redevelopment Projects',
  description:
    'Club redevelopment projects managed by UpScale Project Management. Independent client-side advisory for RSL, Leagues, and Golf club projects across NSW.',
  path: '/projects',
})

const PROJECT_SLUGS = [
  'granville-diggers-club-development',
]

const CATEGORY_LABELS: Record<CaseStudyFrontmatter['category'], string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  fitout: 'Fit-Out',
  infrastructure: 'Infrastructure',
  hotel: 'Hotel',
  development: 'Development',
  'planning-proposal': 'Planning Proposal',
}

export default function ProjectsPage() {
  const allStudies = getAllCaseStudies()
  const projects = allStudies.filter((s) => PROJECT_SLUGS.includes(s.slug))
  const caseStudies = allStudies.filter((s) => !PROJECT_SLUGS.includes(s.slug))

  return (
    <main>
      <PageHeader
        title="Club Redevelopment Projects"
        subtitle="Independent advisory for club redevelopments across NSW. See how we protect club boards through every stage of the development process."
        breadcrumbs={[{ label: 'Projects' }]}
      />

      {/* Projects section */}
      {projects.length > 0 && (
        <section className="py-16 md:py-20">
          <Container>
            <BlurFade>
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Current Projects
            </h2>
            <p className="mt-2 text-muted-foreground">
              Active club redevelopment projects we are advising on.
            </p>
            </BlurFade>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((study, i) => (
                <BlurFade key={study.slug} delay={0.1 + i * 0.1}>
                <CaseStudyCard
                  slug={study.slug}
                  frontmatter={study.frontmatter}
                />
                </BlurFade>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Case Studies section */}
      {caseStudies.length > 0 && (
        <section className="border-t py-16 md:py-20">
          <Container>
            <BlurFade>
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Case Studies
            </h2>
            <p className="mt-2 text-muted-foreground">
              Detailed case studies from our club redevelopment advisory work.
            </p>
            </BlurFade>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study, i) => (
                <BlurFade key={study.slug} delay={0.1 + i * 0.1}>
                <CaseStudyCard
                  slug={study.slug}
                  frontmatter={study.frontmatter}
                />
                </BlurFade>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}

function CaseStudyCard({
  slug,
  frontmatter,
}: {
  slug: string
  frontmatter: CaseStudyFrontmatter
}) {
  const categoryLabel =
    CATEGORY_LABELS[frontmatter.category] ?? frontmatter.category

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block h-full overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-sm transition-all hover:border-primary/60 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <Image
          src={frontmatter.heroImage}
          alt={frontmatter.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <span className="mb-2 inline-block rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700">
          {categoryLabel}
        </span>
        <h3 className="font-display text-lg font-bold tracking-tight group-hover:text-primary-600">
          {frontmatter.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {frontmatter.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
          View project
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </div>
    </Link>
  )
}
