import Link from 'next/link'
import { listDraftPRs } from '@/lib/github'
import type { DraftPR } from '@/lib/github'

export const dynamic = 'force-dynamic'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function timeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateString)
}

export default async function DraftDashboardPage() {
  let drafts: DraftPR[] = []
  let error: string | null = null

  try {
    drafts = await listDraftPRs()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load drafts'
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Draft Posts</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Review, edit, and publish blog posts from the content pipeline.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Empty state */}
      {!error && drafts.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-neutral-300 px-6 py-16 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="mx-auto h-10 w-10 text-neutral-400"
          >
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
          </svg>
          <h3 className="mt-4 text-sm font-medium text-neutral-900">
            No draft posts
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            Run the content pipeline to generate new blog posts.
            <br />
            They&apos;ll appear here as open PRs on GitHub.
          </p>
        </div>
      )}

      {/* Draft cards grid */}
      {drafts.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drafts.map((draft) => (
            <DraftCard key={draft.prNumber} draft={draft} />
          ))}
        </div>
      )}
    </div>
  )
}

function DraftCard({ draft }: { draft: DraftPR }) {
  return (
    <div className="group rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Card header with draft badge */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Draft
          </span>
          <span className="text-xs text-neutral-400">
            PR #{draft.prNumber}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="px-4 py-4">
        <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2">
          {draft.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
          <span>Created {timeAgo(draft.createdAt)}</span>
          <span aria-hidden="true">&#183;</span>
          <span>Updated {timeAgo(draft.updatedAt)}</span>
        </div>
      </div>

      {/* Card actions */}
      <div className="flex border-t">
        <Link
          href={`/insights/draft/${draft.slug}`}
          className="flex flex-1 items-center justify-center gap-1.5 border-r py-2.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3.5 w-3.5"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Preview
        </Link>
        <Link
          href={`/insights/draft/${draft.slug}/edit`}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-50 hover:text-amber-700"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3.5 w-3.5"
          >
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </Link>
      </div>
    </div>
  )
}
