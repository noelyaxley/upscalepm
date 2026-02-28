'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function DraftNav() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/draft/logout', { method: 'POST' })
    router.push('/insights/draft/login')
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/insights/draft"
          className="flex items-center gap-2 text-sm font-semibold text-neutral-900"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5 text-amber-600"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          UpScale PM Drafts
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/insights/draft"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-neutral-500 transition-colors hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
