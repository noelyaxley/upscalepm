import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/content'
import { generatePageMetadata } from '@/lib/metadata'
import { CaseStudyHeader } from '@/components/case-study-header'
import { Container } from '@/components/layout/container'
import { JsonLd } from '@/components/seo/json-ld'
import { articleSchema, breadcrumbSchema } from '@/components/seo/schemas'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies()
  return studies.map((study) => ({ slug: study.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return { title: 'Not Found' }

  const base = generatePageMetadata({
    title: study.frontmatter.title,
    description: study.frontmatter.excerpt,
    path: `/projects/${slug}`,
    ogImage: study.frontmatter.heroImage,
  })

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  const { default: MDXContent } = await import(
    `../../../../content/projects/${slug}.mdx`
  )

  return (
    <article>
      <JsonLd data={articleSchema({
        title: study.frontmatter.title,
        excerpt: study.frontmatter.excerpt,
        slug: study.slug,
        date: study.frontmatter.date ?? '2024-06-15',
        author: 'Noel Yaxley',
        heroImage: study.frontmatter.heroImage,
        path: `/projects/${study.slug}`,
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Projects', url: '/projects' },
        { name: study.frontmatter.title, url: `/projects/${study.slug}` },
      ])} />
      <CaseStudyHeader frontmatter={study.frontmatter} />
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
