import { NextResponse } from 'next/server'
import {
  findPRBySlug,
  getFileFromBranch,
  updateFile,
  mergePR,
} from '@/lib/github'
import { getSessionFromCookies } from '@/lib/draft-auth'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function POST(_request: Request, { params }: RouteParams) {
  const session = await getSessionFromCookies()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params

  try {
    const pr = await findPRBySlug(slug)
    if (!pr) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      )
    }

    // Step 1: Fetch current MDX content from PR branch
    const filePath = `content/insights/${slug}.mdx`
    const { content, sha } = await getFileFromBranch(pr.branch, filePath)

    // Step 2: Update frontmatter draft: true → draft: false
    const updatedContent = content.replace(
      /^(---\n[\s\S]*?)draft:\s*true([\s\S]*?\n---)/,
      '$1draft: false$2'
    )

    if (updatedContent !== content) {
      // Commit the draft: false change
      await updateFile(
        pr.branch,
        filePath,
        updatedContent,
        sha,
        `Publish: set draft to false for ${slug}`
      )
    }

    // Step 3: Merge the PR
    const mergeResult = await mergePR(
      pr.prNumber,
      `Publish: ${slug}`
    )

    const liveUrl = `https://upscalepm.com.au/insights/${slug}`

    return NextResponse.json({
      success: true,
      merged: mergeResult.merged,
      liveUrl,
      message: `Blog post published! It will be live at ${liveUrl} after Vercel rebuilds (1-2 minutes).`,
    })
  } catch (error) {
    console.error(`Error publishing draft "${slug}":`, error)
    return NextResponse.json(
      { error: 'Failed to publish draft' },
      { status: 500 }
    )
  }
}
