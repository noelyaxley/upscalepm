import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllInsights, getInsightBySlug } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import { InsightHeader } from '@/components/insight-header'
import { Container } from '@/components/layout/container'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const insights = getAllInsights()
  return insights.map((insight) => ({ slug: insight.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) return { title: 'Not Found' }

  const baseMetadata = generatePageMetadata({
    title: insight.frontmatter.title,
    description: insight.frontmatter.excerpt,
    path: `/insights/${slug}`,
    ogImage: insight.frontmatter.heroImage,
  })

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: insight.frontmatter.date,
      modifiedTime: insight.frontmatter.updated,
      authors: [insight.frontmatter.author],
      tags: insight.frontmatter.tags,
    },
  }
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) notFound()

  const { default: MDXContent } = await import(
    `../../../../content/insights/${slug}.mdx`
  )

  return (
    <article>
      <InsightHeader
        frontmatter={insight.frontmatter}
        readingTime={insight.readingTime}
      />
      <Container>
        <div className="prose prose-lg prose-neutral mx-auto max-w-3xl
          prose-headings:font-display prose-headings:tracking-tight
          prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-img:shadow-md
          py-12 md:py-16">
          <MDXContent />
        </div>
      </Container>
    </article>
  )
}
