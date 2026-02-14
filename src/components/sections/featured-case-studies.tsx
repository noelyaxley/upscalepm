import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import type { ContentItem } from '@/lib/content.types'
import type { CaseStudyFrontmatter } from '@/lib/content.types'

interface FeaturedCaseStudiesProps {
  caseStudies: ContentItem<CaseStudyFrontmatter>[]
}

export function FeaturedCaseStudies({
  caseStudies,
}: FeaturedCaseStudiesProps) {
  if (caseStudies.length === 0) return null

  return (
    <Section background="muted">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Featured Projects
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Real results from real projects. See how we have delivered for our
          clients across diverse sectors.
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={cs.frontmatter.heroImage}
                alt={cs.frontmatter.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {cs.frontmatter.category.replace('-', ' ')}
              </span>
              <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary">
                {cs.frontmatter.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {cs.frontmatter.excerpt}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-primary">
                View project &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/case-studies"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All Case Studies &rarr;
        </Link>
      </div>
    </Section>
  )
}
