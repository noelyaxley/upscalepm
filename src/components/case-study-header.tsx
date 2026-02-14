import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudyFrontmatter } from '@/lib/content.types'
import { Container } from '@/components/layout/container'

const CATEGORY_LABELS: Record<CaseStudyFrontmatter['category'], string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  fitout: 'Fit-Out',
  infrastructure: 'Infrastructure',
  hotel: 'Hotel',
  development: 'Development',
  'planning-proposal': 'Planning Proposal',
}

interface CaseStudyHeaderProps {
  frontmatter: CaseStudyFrontmatter
}

export function CaseStudyHeader({ frontmatter }: CaseStudyHeaderProps) {
  const categoryLabel = CATEGORY_LABELS[frontmatter.category] ?? frontmatter.category

  return (
    <header>
      {/* Breadcrumbs */}
      <div className="border-b bg-muted/50">
        <Container>
          <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <Link
                  href="/case-studies"
                  className="transition-colors hover:text-foreground"
                >
                  Case Studies
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <span className="text-foreground">{frontmatter.title}</span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-neutral-200">
        <Image
          src={frontmatter.heroImage}
          alt={frontmatter.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
      </div>

      {/* Title, excerpt, and metadata */}
      <Container>
        <div className="py-10 md:py-14">
          {/* Category badge */}
          <span className="mb-4 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
            {categoryLabel}
          </span>

          {/* Title */}
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {frontmatter.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
            {frontmatter.excerpt}
          </p>

          {/* Metadata grid */}
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <MetadataItem label="Project Type" value={frontmatter.projectType} />
            <MetadataItem label="Location" value={frontmatter.location} />
            {frontmatter.client && (
              <MetadataItem label="Client" value={frontmatter.client} />
            )}
            {frontmatter.architect && (
              <MetadataItem label="Architect" value={frontmatter.architect} />
            )}
            {frontmatter.services && frontmatter.services.length > 0 && (
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-sm font-medium text-muted-foreground">
                  Services
                </dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {frontmatter.services.map((service) => (
                    <span
                      key={service}
                      className="inline-block rounded bg-neutral-100 px-2 py-0.5 text-sm text-neutral-700"
                    >
                      {service}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </Container>
    </header>
  )
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  )
}
