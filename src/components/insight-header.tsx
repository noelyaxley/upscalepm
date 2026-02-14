import Image from 'next/image'
import Link from 'next/link'
import type { InsightFrontmatter } from '@/lib/content.types'
import { Container } from '@/components/layout/container'

interface InsightHeaderProps {
  frontmatter: InsightFrontmatter
  readingTime: number
}

const categoryLabels: Record<InsightFrontmatter['category'], string> = {
  'quick-bites': 'Quick Bites',
  articles: 'Articles',
}

const categoryStyles: Record<InsightFrontmatter['category'], string> = {
  'quick-bites':
    'bg-amber-100 text-amber-800',
  articles:
    'bg-primary-100 text-primary-800',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function InsightHeader({ frontmatter, readingTime }: InsightHeaderProps) {
  const {
    title,
    category,
    author,
    date,
    heroImage,
    tags,
  } = frontmatter

  return (
    <header>
      {/* Breadcrumbs and title section */}
      <div className="border-b bg-muted/50 py-12 md:py-16 lg:py-20">
        <Container>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
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
                  href="/insights"
                  className="transition-colors hover:text-foreground"
                >
                  Insights
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <span className="text-foreground">{title}</span>
              </li>
            </ol>
          </nav>

          {/* Category badge */}
          <span
            className={`mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium ${categoryStyles[category]}`}
          >
            {categoryLabels[category]}
          </span>

          {/* Title */}
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Meta line: author, date, reading time */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{author}</span>
            <span aria-hidden="true" className="text-neutral-300">
              |
            </span>
            <time dateTime={date}>{formatDate(date)}</time>
            <span aria-hidden="true" className="text-neutral-300">
              |
            </span>
            <span>{readingTime} min read</span>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Container>
      </div>

      {/* Hero image */}
      {heroImage && (
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-neutral-200">
          <Image
            src={heroImage}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
    </header>
  )
}
