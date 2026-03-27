import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllInsights, getInsightBySlug } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import { InsightHeader } from '@/components/insight-header'
import { Container } from '@/components/layout/container'
import { JsonLd } from '@/components/seo/json-ld'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/components/seo/schemas'
import { AuthorBio } from '@/components/author-bio'

interface PageProps {
  params: Promise<{ slug: string }>
}

/** Extract FAQ Q&A pairs from MDX content by parsing ### headings after ## FAQ heading */
function extractFaqs(content: string): Array<{ question: string; answer: string }> {
  const faqMatch = content.match(/## (?:Frequently Asked Questions|FAQ)\s*\n([\s\S]*?)(?=\n## |\n---|\n\*UpScale|$)/)
  if (!faqMatch) return []
  const faqSection = faqMatch[1]
  const faqs: Array<{ question: string; answer: string }> = []
  const parts = faqSection.split(/\n### /).filter(Boolean)
  for (const part of parts) {
    const lines = part.trim().split('\n')
    const question = lines[0]?.replace(/\*\*/g, '').replace(/\??\s*$/, '?').trim()
    const answer = lines.slice(1).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
    if (question && answer) faqs.push({ question, answer })
  }
  return faqs
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

  const faqs = extractFaqs(insight.content)

  const { default: MDXContent } = await import(
    `../../../../content/insights/${slug}.mdx`
  )

  return (
    <article>
      <JsonLd data={articleSchema({
        title: insight.frontmatter.title,
        excerpt: insight.frontmatter.excerpt,
        slug: insight.slug,
        date: insight.frontmatter.date,
        updated: insight.frontmatter.updated,
        author: insight.frontmatter.author,
        heroImage: insight.frontmatter.heroImage,
        path: `/insights/${insight.slug}`,
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Insights', url: '/insights' },
        { name: insight.frontmatter.title, url: `/insights/${insight.slug}` },
      ])} />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
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
        <div className="mx-auto max-w-3xl pb-12 md:pb-16">
          <AuthorBio />
        </div>
      </Container>
    </article>
  )
}
