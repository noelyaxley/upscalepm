'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

interface DraftPreviewBannerProps {
  slug: string
  prNumber: number
  frontmatter: {
    title?: string
    excerpt?: string
    heroImage?: string
    author?: string
    date?: string
    tags?: string[]
    category?: string
  }
  wordCount: number
}

interface CheckResult {
  label: string
  status: 'pass' | 'warn' | 'fail'
  detail: string
}

function runChecks(
  frontmatter: DraftPreviewBannerProps['frontmatter'],
  wordCount: number
): CheckResult[] {
  const checks: CheckResult[] = []

  // Title
  const title = frontmatter.title || ''
  if (!title) {
    checks.push({ label: 'Title', status: 'fail', detail: 'Missing — required' })
  } else if (title.length > 70) {
    checks.push({ label: 'Title', status: 'warn', detail: `${title.length} chars — may truncate in Google (ideal: 50-60)` })
  } else {
    checks.push({ label: 'Title', status: 'pass', detail: `${title.length} chars` })
  }

  // Excerpt / meta description
  const excerpt = frontmatter.excerpt || ''
  if (!excerpt) {
    checks.push({ label: 'Meta description', status: 'fail', detail: 'Missing — required for SEO' })
  } else if (excerpt.length < 120 || excerpt.length > 170) {
    checks.push({ label: 'Meta description', status: 'warn', detail: `${excerpt.length} chars (ideal: 150-160)` })
  } else {
    checks.push({ label: 'Meta description', status: 'pass', detail: `${excerpt.length} chars` })
  }

  // Hero image
  if (!frontmatter.heroImage) {
    checks.push({ label: 'Hero image', status: 'fail', detail: 'Missing — will show blank header' })
  } else {
    checks.push({ label: 'Hero image', status: 'pass', detail: frontmatter.heroImage.split('/').pop() || '' })
  }

  // Author
  if (!frontmatter.author) {
    checks.push({ label: 'Author', status: 'warn', detail: 'Missing — defaults to "UpScale PM"' })
  } else {
    checks.push({ label: 'Author', status: 'pass', detail: frontmatter.author })
  }

  // Tags
  const tags = frontmatter.tags || []
  if (tags.length === 0) {
    checks.push({ label: 'Tags', status: 'warn', detail: 'No tags — reduces discoverability' })
  } else {
    checks.push({ label: 'Tags', status: 'pass', detail: `${tags.length} tags` })
  }

  // Category
  if (!frontmatter.category) {
    checks.push({ label: 'Category', status: 'warn', detail: 'Missing — defaults to "articles"' })
  } else {
    checks.push({ label: 'Category', status: 'pass', detail: frontmatter.category })
  }

  // Word count
  if (wordCount < 300) {
    checks.push({ label: 'Word count', status: 'fail', detail: `${wordCount} words — too thin (min 500)` })
  } else if (wordCount < 800) {
    checks.push({ label: 'Word count', status: 'warn', detail: `${wordCount} words — consider expanding (ideal: 1,000+)` })
  } else {
    checks.push({ label: 'Word count', status: 'pass', detail: `${wordCount} words` })
  }

  // Date
  if (!frontmatter.date) {
    checks.push({ label: 'Date', status: 'warn', detail: 'Missing — will use today' })
  } else {
    checks.push({ label: 'Date', status: 'pass', detail: frontmatter.date })
  }

  return checks
}

const statusIcon = {
  pass: <CheckCircle2 className="size-4 text-green-600" />,
  warn: <AlertTriangle className="size-4 text-amber-500" />,
  fail: <XCircle className="size-4 text-red-600" />,
}

export function DraftPreviewBanner({ slug, prNumber, frontmatter, wordCount }: DraftPreviewBannerProps) {
  const router = useRouter()
  const [publishing, setPublishing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showChecklist, setShowChecklist] = useState(false)

  const checks = runChecks(frontmatter, wordCount)
  const hasFailures = checks.some((c) => c.status === 'fail')
  const passCount = checks.filter((c) => c.status === 'pass').length
  const warnCount = checks.filter((c) => c.status === 'warn').length
  const failCount = checks.filter((c) => c.status === 'fail').length

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch(`/api/draft/posts/${slug}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = '/insights/draft'
      } else {
        alert(`Delete failed: ${data.error}`)
      }
    } catch {
      alert('Network error during delete')
    } finally {
      setDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  async function handlePublish() {
    setPublishing(true)
    try {
      const res = await fetch(`/api/draft/posts/${slug}/publish`, {
        method: 'POST',
      })
      const data = await res.json()
      if (res.ok) {
        alert(data.message)
        router.push('/insights/draft')
      } else {
        alert(`Publish failed: ${data.error}`)
      }
    } catch {
      alert('Network error during publish')
    } finally {
      setPublishing(false)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <div className="sticky top-14 z-40 border-b border-amber-300 bg-amber-50 px-4 py-2.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
              DRAFT PREVIEW
            </span>
            <button
              onClick={() => setShowChecklist(!showChecklist)}
              className="flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-2.5 py-1 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-100"
            >
              {failCount > 0 ? (
                <XCircle className="size-3.5 text-red-600" />
              ) : warnCount > 0 ? (
                <AlertTriangle className="size-3.5 text-amber-500" />
              ) : (
                <CheckCircle2 className="size-3.5 text-green-600" />
              )}
              {passCount}/{checks.length} checks
              {failCount > 0 && ` (${failCount} blocking)`}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleting}
              className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
            <Link
              href={`/insights/draft/${slug}/edit`}
              className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-100"
            >
              Edit
            </Link>
            <button
              onClick={() => hasFailures ? setShowChecklist(true) : setShowConfirm(true)}
              disabled={publishing}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors disabled:opacity-60 ${
                hasFailures
                  ? 'bg-neutral-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {publishing ? 'Publishing...' : hasFailures ? 'Fix Issues to Publish' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Checklist dropdown */}
        {showChecklist && (
          <div className="mx-auto mt-2 max-w-7xl rounded-lg border border-amber-200 bg-white p-4 shadow-lg">
            <h3 className="text-sm font-semibold text-neutral-900">Pre-Publish Checklist</h3>
            <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {checks.map((check) => (
                <div key={check.label} className="flex items-center gap-2 text-xs">
                  {statusIcon[check.status]}
                  <span className="font-medium text-neutral-700">{check.label}:</span>
                  <span className={
                    check.status === 'fail' ? 'text-red-600' :
                    check.status === 'warn' ? 'text-amber-600' :
                    'text-neutral-500'
                  }>{check.detail}</span>
                </div>
              ))}
            </div>
            {hasFailures && (
              <p className="mt-3 text-xs font-medium text-red-600">
                Fix the failing checks above before publishing. Click Edit to update the article.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-neutral-900">
              Delete this draft?
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              This will close PR #{prNumber} and delete its branch. The draft
              post will be permanently removed. This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Yes, delete it'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish confirmation dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-neutral-900">
              Publish this post?
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              This will merge PR #{prNumber} and deploy the blog post to the
              live site. The change will be visible after Vercel rebuilds
              (1-2 minutes).
            </p>

            {/* SERP Preview */}
            <div className="mt-4 rounded-lg border bg-neutral-50 p-3">
              <p className="text-xs font-medium text-neutral-500 mb-2">Google Preview:</p>
              <p className="text-sm font-medium text-blue-700 leading-snug">
                {frontmatter.title || 'Untitled'} | UpScale PM
              </p>
              <p className="text-xs text-green-700 mt-0.5">
                upscalepm.com.au/insights/{slug}
              </p>
              <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                {frontmatter.excerpt || 'No description set'}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
              >
                {publishing ? 'Publishing...' : 'Yes, publish it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
