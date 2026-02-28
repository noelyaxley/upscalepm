import { notFound } from 'next/navigation'
import { getDraftContent, buildRawImageUrl } from '@/lib/github'
import { DraftPreviewBanner } from '@/components/draft/draft-preview-banner'
import { DraftMDXRenderer } from '@/components/draft/draft-mdx-renderer'
import { InsightHeader } from '@/components/insight-header'
import { Container } from '@/components/layout/container'
import type { InsightFrontmatter } from '@/lib/content.types'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DraftPreviewPage({ params }: PageProps) {
  const { slug } = await params

  const draft = await getDraftContent(slug)
  if (!draft) notFound()

  // Build frontmatter for InsightHeader
  const frontmatter: InsightFrontmatter = {
    title: (draft.frontmatter.title as string) || 'Untitled',
    excerpt: (draft.frontmatter.excerpt as string) || '',
    date: (draft.frontmatter.date as string) || new Date().toISOString(),
    updated: draft.frontmatter.updated as string | undefined,
    author: (draft.frontmatter.author as string) || 'UpScale PM',
    category: (draft.frontmatter.category as 'quick-bites' | 'articles') || 'articles',
    tags: (draft.frontmatter.tags as string[]) || [],
    heroImage: (draft.frontmatter.heroImage as string) || '',
    draft: true,
  }

  // Rewrite local image paths to raw GitHub URLs on the PR branch
  // /images/insights/slug/hero.jpg → raw.githubusercontent.com URL
  let mdxBody = draft.content
  // Remove frontmatter block for rendering
  mdxBody = mdxBody.replace(/^---[\s\S]*?---\n*/, '')

  // Rewrite image paths in MDX body
  mdxBody = mdxBody.replace(
    /(?:!\[([^\]]*)\]\()(\/images\/insights\/[^)]+)(\))/g,
    (_match, alt, path, closing) => {
      const fullPath = `public${path}`
      const rawUrl = buildRawImageUrl(draft.branch, fullPath)
      return `![${alt}](${rawUrl})${closing ? '' : ''}`
    }
  )

  // Also rewrite the heroImage for the header
  let heroImageUrl = frontmatter.heroImage
  if (heroImageUrl.startsWith('/images/insights/')) {
    heroImageUrl = buildRawImageUrl(draft.branch, `public${heroImageUrl}`)
  }

  // Calculate reading time
  const wordCount = mdxBody.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="-mx-4 -mt-8 sm:-mx-6 lg:-mx-8">
      <DraftPreviewBanner slug={slug} prNumber={draft.prNumber} />

      {/* Render using same components as live site */}
      <article>
        <InsightHeader
          frontmatter={{ ...frontmatter, heroImage: heroImageUrl }}
          readingTime={readingTime}
        />
        <Container>
          <div
            className="prose prose-lg prose-neutral mx-auto max-w-3xl
              prose-headings:font-display prose-headings:tracking-tight
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:shadow-md
              py-12 md:py-16"
          >
            <DraftMDXRenderer source={mdxBody} />
          </div>
        </Container>
      </article>
    </div>
  )
}
