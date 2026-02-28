import type { Metadata } from 'next'
import { DraftNav } from '@/components/draft/draft-nav'

export const metadata: Metadata = {
  title: {
    default: 'Draft Admin | UpScale PM',
    template: '%s | Draft Admin',
  },
  robots: { index: false, follow: false },
}

export default function DraftLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <DraftNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
