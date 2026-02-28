import { NextResponse } from 'next/server'
import {
  findPRBySlug,
  getPRFiles,
  createFile,
  deleteFile,
  getFileSha,
} from '@/lib/github'
import { getSessionFromCookies } from '@/lib/draft-auth'

export const dynamic = 'force-dynamic'

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

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
    const pr = await findPRBySlug(slug)
    if (!pr) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
    }

    const files = await getPRFiles(pr.prNumber)
    const images = files
      .filter(
        (f: { filename: string; status?: string }) =>
          f.filename.startsWith(`public/images/insights/${slug}/`) &&
          f.status !== 'removed'
      )
      .map((f: { filename: string }) => f.filename)

    return NextResponse.json({ images, branch: pr.branch })
  } catch (error) {
    console.error('Error listing images:', error)
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  const session = await getSessionFromCookies()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params

  try {
    const body = await request.json()
    const { filename, base64 } = body

    if (!filename || !base64) {
      return NextResponse.json(
        { error: 'filename and base64 are required' },
        { status: 400 }
      )
    }

    // Sanitize filename
    const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase()
    if (!sanitized) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }

    // Validate extension
    const ext = sanitized.substring(sanitized.lastIndexOf('.'))
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: `File type ${ext} not allowed. Use: ${ALLOWED_EXTENSIONS.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate size (base64 is ~33% larger than binary)
    const sizeBytes = Buffer.byteLength(base64, 'base64')
    if (sizeBytes > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    const pr = await findPRBySlug(slug)
    if (!pr) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
    }

    const filePath = `public/images/insights/${slug}/${sanitized}`
    const result = await createFile(
      pr.branch,
      filePath,
      base64,
      `Add image: ${sanitized} for ${slug}`
    )

    return NextResponse.json({
      success: true,
      path: filePath,
      sha: result.sha,
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await getSessionFromCookies()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params

  try {
    const body = await request.json()
    const { filename } = body

    if (!filename) {
      return NextResponse.json(
        { error: 'filename is required' },
        { status: 400 }
      )
    }

    const pr = await findPRBySlug(slug)
    if (!pr) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
    }

    const filePath = `public/images/insights/${slug}/${filename}`
    const sha = await getFileSha(pr.branch, filePath)
    await deleteFile(
      pr.branch,
      filePath,
      sha,
      `Delete image: ${filename} from ${slug}`
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
