import Image from 'next/image'
import Link from 'next/link'
import { getCaseStudyBySlug } from '@/lib/content'
import { Section } from '@/components/layout/section'
import { BlurFade } from '@/components/animation/blur-fade'

interface RelatedCaseStudiesProps {
  slugs: string[]
}

export function RelatedCaseStudies({ slugs }: RelatedCaseStudiesProps) {
  const caseStudies = slugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter(Boolean)

  if (caseStudies.length === 0) return null

  return (
    <Section>
      <BlurFade>
      <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
        Related Projects
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        See how we have delivered results on similar projects.
      </p>
      </BlurFade>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs) => {
          if (!cs) return null
          return (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group overflow-hidden rounded-xl border-2 border-primary/20 bg-background shadow-sm transition-all hover:border-primary/60 hover:shadow-md"
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
          )
        })}
      </div>
    </Section>
  )
}
