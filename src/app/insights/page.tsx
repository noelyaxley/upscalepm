import type { Metadata } from 'next'
import { getAllInsights } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { InsightsGrid } from './insights-grid'

export const metadata: Metadata = generatePageMetadata({
  title: 'Club Redevelopment Insights',
  description:
    'Practical insights for club boards planning a redevelopment. Advice on cost management, governance, procurement, and construction oversight for RSL, Leagues, and Golf clubs.',
  path: '/insights',
})

export default function InsightsPage() {
  const insights = getAllInsights()

  if (insights.length === 0) {
    return (
      <>
        <PageHeader
          title="Insights"
          subtitle="Practical advice for club boards and CEOs planning redevelopments. Risk management, cost control, governance, and lessons from real projects."
          breadcrumbs={[{ label: 'Insights' }]}
        />
        <div className="py-24 text-center">
          <p className="text-lg text-muted-foreground">
            Insights are coming soon. Check back shortly.
          </p>
        </div>
      </>
    )
  }

  const serialisedInsights = insights.map((insight) => ({
    slug: insight.slug,
    title: insight.frontmatter.title,
    excerpt: insight.frontmatter.excerpt,
    date: insight.frontmatter.date,
    author: insight.frontmatter.author,
    category: insight.frontmatter.category,
    tags: insight.frontmatter.tags,
    heroImage: insight.frontmatter.heroImage,
    readingTime: insight.readingTime,
  }))

  return (
    <>
      <PageHeader
        title="Insights"
        subtitle="Practical knowledge from the front line of property development and construction project management."
        breadcrumbs={[{ label: 'Insights' }]}
      />
      <InsightsGrid insights={serialisedInsights} />
    </>
  )
}
