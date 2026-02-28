import { NextResponse } from 'next/server'
import { findPRBySlug, updateFile } from '@/lib/github'
import { getSessionFromCookies } from '@/lib/draft-auth'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getSessionFromCookies()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params

  try {
    const body = await request.json()
    const { content, sha } = body

    if (!content || !sha) {
      return NextResponse.json(
        { error: 'content and sha are required' },
        { status: 400 }
      )
    }

    const pr = await findPRBySlug(slug)
    if (!pr) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      )
    }

    const filePath = `content/insights/${slug}.mdx`
    const result = await updateFile(
      pr.branch,
      filePath,
      content,
      sha,
      `Update draft: ${slug}`
    )

    return NextResponse.json({ success: true, newSha: result.sha })
  } catch (error) {
    console.error(`Error updating draft "${slug}":`, error)
    return NextResponse.json(
      { error: 'Failed to update draft' },
      { status: 500 }
    )
  }
}
