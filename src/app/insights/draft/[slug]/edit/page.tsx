'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { DraftImagePanel } from '@/components/draft/draft-image-panel'

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 items-center justify-center rounded-lg border bg-neutral-50">
      <span className="text-sm text-neutral-400">Loading editor...</span>
    </div>
  ),
})

interface DraftData {
  slug: string
  content: string
  frontmatter: Record<string, unknown>
  fileSha: string
  branch: string
  prNumber: number
  imageFiles: string[]
}

export default function DraftEditPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [draft, setDraft] = useState<DraftData | null>(null)
  const [mdxContent, setMdxContent] = useState('')
  const [currentSha, setCurrentSha] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPublishConfirm, setShowPublishConfirm] = useState(false)

  // Fetch draft content
  useEffect(() => {
    async function fetchDraft() {
      try {
        const res = await fetch(`/api/draft/posts/${slug}`)
        if (!res.ok) throw new Error('Draft not found')
        const data: DraftData = await res.json()
        setDraft(data)
        setMdxContent(data.content)
        setCurrentSha(data.fileSha)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load draft')
      } finally {
        setLoading(false)
      }
    }
    fetchDraft()
  }, [slug])

  // Track unsaved changes
  const handleContentChange = useCallback(
    (value: string | undefined) => {
      if (value === undefined) return
      setMdxContent(value)
      setHasChanges(value !== draft?.content)
    },
    [draft?.content]
  )

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasChanges])

  // Save handler
  async function handleSave() {
    if (!hasChanges) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/draft/posts/${slug}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: mdxContent, sha: currentSha }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Save failed')
      }
      const data = await res.json()
      setCurrentSha(data.newSha)
      setHasChanges(false)
      setLastSaved(new Date())
      if (draft) {
        setDraft({ ...draft, content: mdxContent, fileSha: data.newSha })
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  // Publish handler
  async function handlePublish() {
    setPublishing(true)
    setError(null)
    try {
      // Save first if there are changes
      if (hasChanges) {
        await handleSave()
      }

      const res = await fetch(`/api/draft/posts/${slug}/publish`, {
        method: 'POST',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Publish failed')

      alert(data.message)
      router.push('/insights/draft')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to publish')
    } finally {
      setPublishing(false)
      setShowPublishConfirm(false)
    }
  }

  // Keyboard shortcut: Cmd/Ctrl+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-sm text-neutral-400">Loading editor...</div>
      </div>
    )
  }

  if (error && !draft) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
        <Link
          href="/insights/draft"
          className="text-sm text-amber-600 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="-mx-4 -mt-8 flex h-[calc(100vh-3.5rem)] flex-col sm:-mx-6 lg:-mx-8">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center gap-3">
          <Link
            href={`/insights/draft/${slug}`}
            className="text-sm text-neutral-500 hover:text-neutral-700"
          >
            &larr; Preview
          </Link>
          <span className="text-sm font-medium text-neutral-900">
            {(draft?.frontmatter.title as string) || slug}
          </span>
          {hasChanges && (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
              Unsaved changes
            </span>
          )}
          {lastSaved && !hasChanges && (
            <span className="text-xs text-green-600">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="mr-2 text-xs text-neutral-400">
            PR #{draft?.prNumber}
          </span>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors
              disabled:cursor-not-allowed disabled:opacity-40
              enabled:border-neutral-300 enabled:text-neutral-700 enabled:hover:bg-neutral-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <Link
            href={`/insights/draft/${slug}`}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Preview
          </Link>
          <button
            onClick={() => setShowPublishConfirm(true)}
            disabled={publishing}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-60"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Image panel */}
      {draft && (
        <DraftImagePanel
          slug={slug}
          branch={draft.branch}
          initialImages={draft.imageFiles}
        />
      )}

      {/* MDX Editor */}
      <div className="flex-1 overflow-hidden" data-color-mode="light">
        <MDEditor
          value={mdxContent}
          onChange={handleContentChange}
          height="100%"
          preview="live"
          visibleDragbar={true}
          hideToolbar={false}
        />
      </div>

      {/* Publish confirmation dialog */}
      {showPublishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-neutral-900">
              Publish this post?
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              This will merge PR #{draft?.prNumber} and deploy the blog post
              to the live site. The change will be visible after Vercel
              rebuilds (1-2 minutes).
            </p>
            {hasChanges && (
              <p className="mt-2 text-sm text-amber-600">
                You have unsaved changes. They will be saved before publishing.
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPublishConfirm(false)}
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
    </div>
  )
}
