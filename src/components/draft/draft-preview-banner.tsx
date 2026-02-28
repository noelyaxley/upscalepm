'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DraftPreviewBannerProps {
  slug: string
  prNumber: number
}

export function DraftPreviewBanner({ slug, prNumber }: DraftPreviewBannerProps) {
  const router = useRouter()
  const [publishing, setPublishing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

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
            <span className="text-xs text-amber-700">
              PR #{prNumber} &mdash; This is how the post will appear on the live site
            </span>
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
              onClick={() => setShowConfirm(true)}
              disabled={publishing}
              className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-60"
            >
              {publishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
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
