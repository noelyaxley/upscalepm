import { NextResponse } from 'next/server'
import { listDraftPRs } from '@/lib/github'
import { getSessionFromCookies } from '@/lib/draft-auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Verify auth
  const session = await getSessionFromCookies()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const drafts = await listDraftPRs()
    return NextResponse.json({ drafts })
  } catch (error) {
    console.error('Error listing drafts:', error)
    return NextResponse.json(
      { error: 'Failed to list draft posts' },
      { status: 500 }
    )
  }
}
