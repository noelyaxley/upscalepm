'use client'

import { useState } from 'react'

const ARTICLES = [
  {
    slug: 'bankstown-rsl-club-masterplan',
    title: 'Bankstown RSL',
    images: ['hero', 'body-1'],
    ext: 'jpg',
  },
  {
    slug: 'belmont-16s-sailing-club-redevelopment',
    title: 'Belmont 16s Sailing Club',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'cabravale-club-resort-redevelopment',
    title: 'Cabravale Club Resort',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'canterbury-league-club-redevelopment',
    title: 'Canterbury League Club',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'central-coast-leagues-club-redevelopment',
    title: 'Central Coast Leagues Club',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'concord-community-club-redevelopment',
    title: 'Concord Community Club',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'dee-why-rsl-redevelopment',
    title: 'Dee Why RSL',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'gosford-rsl-redevelopment',
    title: 'Gosford RSL',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'penrith-rsl-club-redevelopment',
    title: 'Penrith RSL Club',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'seven-hills-rsl-redevelopment',
    title: 'Seven Hills RSL',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'sharks-leagues-club-redevelopment-reopening',
    title: 'Sharks Leagues Club',
    images: ['hero', 'body-1'],
    ext: 'png',
  },
  {
    slug: 'shellharbour-club-redevelopment',
    title: 'Shellharbour Club',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
  {
    slug: 'st-george-leagues-club-redevelopment',
    title: 'St George Leagues Club',
    images: ['hero', 'body-1', 'body-2', 'body-3'],
    ext: 'jpg',
  },
]

type Verdict = 'pending' | 'keep' | 'remove' | 'redo'

interface ClipState {
  key: string
  verdict: Verdict
  videoExists: boolean
}

export default function ReviewClipsPage() {
  const [clips, setClips] = useState<Record<string, ClipState>>({})
  const [filter, setFilter] = useState<'all' | Verdict>('all')

  function getKey(slug: string, img: string) {
    return `${slug}/${img}`
  }

  function setVerdict(key: string, verdict: Verdict) {
    setClips((prev) => ({
      ...prev,
      [key]: { ...prev[key], key, verdict, videoExists: prev[key]?.videoExists ?? true },
    }))
  }

  function handleVideoError(key: string) {
    setClips((prev) => ({
      ...prev,
      [key]: { key, verdict: 'pending', videoExists: false },
    }))
  }

  const allClips = ARTICLES.flatMap((a) =>
    a.images.map((img) => ({ ...a, img, key: getKey(a.slug, img) }))
  )

  const filtered = filter === 'all'
    ? allClips
    : allClips.filter((c) => (clips[c.key]?.verdict || 'pending') === filter)

  const counts = {
    total: allClips.length,
    keep: allClips.filter((c) => clips[c.key]?.verdict === 'keep').length,
    remove: allClips.filter((c) => clips[c.key]?.verdict === 'remove').length,
    redo: allClips.filter((c) => clips[c.key]?.verdict === 'redo').length,
    pending: allClips.filter((c) => !clips[c.key]?.verdict || clips[c.key]?.verdict === 'pending').length,
    missing: allClips.filter((c) => clips[c.key]?.videoExists === false).length,
  }

  function exportResults() {
    const results = {
      keep: allClips.filter((c) => clips[c.key]?.verdict === 'keep').map((c) => c.key),
      remove: allClips.filter((c) => clips[c.key]?.verdict === 'remove').map((c) => c.key),
      redo: allClips.filter((c) => clips[c.key]?.verdict === 'redo').map((c) => c.key),
    }
    navigator.clipboard.writeText(JSON.stringify(results, null, 2))
    alert('Copied to clipboard')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Clip Review Dashboard</h1>
        <p className="text-neutral-400 mb-6">
          Review all {counts.total} generated clips. Mark each as Keep, Remove, or Redo.
          Videos that haven&apos;t been generated yet will show a &quot;Not generated&quot; label.
        </p>

        {/* Stats bar */}
        <div className="flex gap-4 mb-6 text-sm">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded ${filter === 'all' ? 'bg-white text-black' : 'bg-neutral-800'}`}
          >
            All ({counts.total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded ${filter === 'pending' ? 'bg-yellow-600 text-black' : 'bg-neutral-800'}`}
          >
            Pending ({counts.pending})
          </button>
          <button
            onClick={() => setFilter('keep')}
            className={`px-3 py-1.5 rounded ${filter === 'keep' ? 'bg-green-600 text-black' : 'bg-neutral-800'}`}
          >
            Keep ({counts.keep})
          </button>
          <button
            onClick={() => setFilter('remove')}
            className={`px-3 py-1.5 rounded ${filter === 'remove' ? 'bg-red-600 text-black' : 'bg-neutral-800'}`}
          >
            Remove ({counts.remove})
          </button>
          <button
            onClick={() => setFilter('redo')}
            className={`px-3 py-1.5 rounded ${filter === 'redo' ? 'bg-orange-600 text-black' : 'bg-neutral-800'}`}
          >
            Redo ({counts.redo})
          </button>
          <div className="ml-auto">
            <button
              onClick={exportResults}
              className="px-4 py-1.5 rounded bg-primary-600 text-white text-sm font-medium hover:bg-primary-700"
            >
              Export Results
            </button>
          </div>
        </div>

        {/* Clips grid */}
        <div className="space-y-12">
          {ARTICLES.map((article) => {
            const articleClips = article.images
              .map((img) => ({ img, key: getKey(article.slug, img) }))
              .filter((c) => {
                if (filter === 'all') return true
                return (clips[c.key]?.verdict || 'pending') === filter
              })

            if (articleClips.length === 0) return null

            return (
              <div key={article.slug}>
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                  {article.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {articleClips.map(({ img, key }) => {
                    const verdict = clips[key]?.verdict || 'pending'
                    const videoExists = clips[key]?.videoExists !== false
                    const videoSrc = `/images/insights/${article.slug}/${img}.mp4`
                    const imgExt = img === 'hero' && article.slug === 'sharks-leagues-club-redevelopment-reopening'
                      ? 'png'
                      : img === 'body-1' && article.slug === 'sharks-leagues-club-redevelopment-reopening'
                        ? 'jpeg'
                        : 'jpg'
                    const imgSrc = `/images/insights/${article.slug}/${img}.${imgExt}`

                    const borderColor = {
                      pending: 'border-neutral-700',
                      keep: 'border-green-500',
                      remove: 'border-red-500',
                      redo: 'border-orange-500',
                    }[verdict]

                    return (
                      <div key={key} className={`rounded-lg border-2 ${borderColor} overflow-hidden bg-neutral-900`}>
                        <div className="relative aspect-video bg-black">
                          {videoExists ? (
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                              onError={() => handleVideoError(key)}
                            >
                              <source src={videoSrc} type="video/mp4" />
                            </video>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <img src={imgSrc} alt="" className="w-full h-full object-cover opacity-40" />
                              <span className="absolute text-sm text-neutral-400 bg-black/60 px-2 py-1 rounded">
                                Not generated yet
                              </span>
                            </div>
                          )}
                          <div className="absolute top-2 left-2 bg-black/70 text-xs px-2 py-0.5 rounded">
                            {img}
                          </div>
                        </div>
                        <div className="p-3 flex gap-2">
                          <button
                            onClick={() => setVerdict(key, 'keep')}
                            className={`flex-1 py-1.5 rounded text-xs font-medium ${
                              verdict === 'keep' ? 'bg-green-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                            }`}
                          >
                            Keep
                          </button>
                          <button
                            onClick={() => setVerdict(key, 'remove')}
                            className={`flex-1 py-1.5 rounded text-xs font-medium ${
                              verdict === 'remove' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                            }`}
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => setVerdict(key, 'redo')}
                            className={`flex-1 py-1.5 rounded text-xs font-medium ${
                              verdict === 'redo' ? 'bg-orange-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                            }`}
                          >
                            Redo
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
