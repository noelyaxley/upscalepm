'use client'

import { useState } from 'react'

interface DeleteDraftButtonProps {
  slug: string
  prNumber: number
}

export function DeleteDraftButton({ slug, prNumber }: DeleteDraftButtonProps) {
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch(`/api/draft/posts/${slug}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (res.ok) {
        window.location.reload()
      } else {
        alert(`Delete failed: ${data.error}`)
      }
    } catch {
      alert('Network error during delete')
    } finally {
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={deleting}
        className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-3.5 w-3.5"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
        {deleting ? 'Deleting...' : 'Delete'}
      </button>

      {showConfirm && (
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
                onClick={() => setShowConfirm(false)}
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
    </>
  )
}
