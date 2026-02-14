'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/container'

interface InsightCard {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: 'quick-bites' | 'articles'
  tags: string[]
  heroImage: string
  readingTime: number
}

interface InsightsGridProps {
  insights: InsightCard[]
}

type FilterCategory = 'all' | 'quick-bites' | 'articles'

const filterTabs: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'quick-bites', label: 'Quick Bites' },
  { value: 'articles', label: 'Articles' },
]

const categoryLabels: Record<InsightCard['category'], string> = {
  'quick-bites': 'Quick Bites',
  articles: 'Articles',
}

const categoryStyles: Record<InsightCard['category'], string> = {
  'quick-bites': 'bg-amber-100 text-amber-800',
  articles: 'bg-primary-100 text-primary-800',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function InsightsGrid({ insights }: InsightsGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filtered =
    activeFilter === 'all'
      ? insights
      : insights.filter((insight) => insight.category === activeFilter)

  return (
    <Container className="py-12 md:py-16">
      {/* Filter tabs */}
      <div className="mb-8 flex gap-2" role="tablist" aria-label="Filter insights by category">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeFilter === tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === tab.value
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No insights found in this category.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((insight) => (
            <Link
              key={insight.slug}
              href={`/insights/${insight.slug}`}
              className="group block overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Hero image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                {insight.heroImage && (
                  <Image
                    src={insight.heroImage}
                    alt={insight.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category badge */}
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryStyles[insight.category]}`}
                >
                  {categoryLabels[insight.category]}
                </span>

                {/* Title */}
                <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary-600 transition-colors">
                  {insight.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {insight.excerpt}
                </p>

                {/* Meta line */}
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{insight.author}</span>
                  <span aria-hidden="true" className="text-neutral-300">
                    |
                  </span>
                  <time dateTime={insight.date}>{formatDate(insight.date)}</time>
                  <span aria-hidden="true" className="text-neutral-300">
                    |
                  </span>
                  <span>{insight.readingTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  )
}
