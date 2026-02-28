import { NextResponse } from 'next/server'
import { getDraftContent } from '@/lib/github'
import { getSessionFromCookies } from '@/lib/draft-auth'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const session = await getSessionFromCookies()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params

  try {
    const draft = await getDraftContent(slug)
    if (!draft) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(draft)
  } catch (error) {
    console.error(`Error fetching draft "${slug}":`, error)
    return NextResponse.json(
      { error: 'Failed to fetch draft content' },
      { status: 500 }
    )
  }
}
