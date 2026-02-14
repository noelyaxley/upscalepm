import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCaseStudies } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import type { CaseStudyFrontmatter } from '@/lib/content.types'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = generatePageMetadata({
  title: 'Case Studies',
  description:
    'Explore our portfolio of property and construction projects across Sydney. From residential developments to commercial fit-outs, see how client-side project management delivers results.',
  path: '/case-studies',
})

const CATEGORY_LABELS: Record<CaseStudyFrontmatter['category'], string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  fitout: 'Fit-Out',
  infrastructure: 'Infrastructure',
  hotel: 'Hotel',
  development: 'Development',
  'planning-proposal': 'Planning Proposal',
}

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies()

  return (
    <main>
      <PageHeader
        title="Case Studies"
        subtitle="Real projects. Real outcomes. See how experienced client-side project management protects your time, budget, and quality."
        breadcrumbs={[{ label: 'Case Studies' }]}
      />

      <section className="py-16 md:py-20">
        <Container>
          {studies.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {studies.map((study) => (
                <CaseStudyCard
                  key={study.slug}
                  slug={study.slug}
                  frontmatter={study.frontmatter}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                Case studies are being migrated. Check back soon to explore our
                project portfolio.
              </p>
            </div>
          )}
        </Container>
      </section>
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
  const categoryLabel = CATEGORY_LABELS[frontmatter.category] ?? frontmatter.category

  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group block overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Card image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <Image
          src={frontmatter.heroImage}
          alt={frontmatter.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Card content */}
      <div className="p-5">
        {/* Category badge */}
        <span className="mb-2 inline-block rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700">
          {categoryLabel}
        </span>

        {/* Title */}
        <h2 className="font-display text-lg font-bold tracking-tight group-hover:text-primary-600">
          {frontmatter.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {frontmatter.excerpt}
        </p>

        {/* Read more indicator */}
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
