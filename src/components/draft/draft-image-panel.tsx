'use client'

import { useState, useRef, useCallback } from 'react'

interface DraftImagePanelProps {
  slug: string
  branch: string
  initialImages: string[]
}

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/noelyaxley/upscalepm'

export function DraftImagePanel({
  slug,
  branch,
  initialImages,
}: DraftImagePanelProps) {
  const [images, setImages] = useState<string[]>(initialImages)
  const [expanded, setExpanded] = useState(initialImages.length > 0)
  const [uploading, setUploading] = useState(false)
  const [deletingFile, setDeletingFile] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [cacheBust, setCacheBust] = useState(Date.now())
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function refreshImages() {
    try {
      const res = await fetch(`/api/draft/posts/${slug}/images`)
      if (res.ok) {
        const data = await res.json()
        setImages(data.images)
        setCacheBust(Date.now())
      }
    } catch {
      // silently fail refresh
    }
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(',')[1])
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleUpload(files: FileList | File[]) {
    setUploading(true)
    setError(null)
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          setError(`Skipped ${file.name}: not an image file`)
          continue
        }
        if (file.size > 10 * 1024 * 1024) {
          setError(`Skipped ${file.name}: exceeds 10MB limit`)
          continue
        }

        const base64 = await fileToBase64(file)
        const res = await fetch(`/api/draft/posts/${slug}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, base64 }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || `Upload failed for ${file.name}`)
        }
      }
      await refreshImages()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(filePath: string) {
    const filename = filePath.split('/').pop()!
    setDeletingFile(filePath)
    setShowDeleteConfirm(null)
    try {
      const res = await fetch(`/api/draft/posts/${slug}/images`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Delete failed')
      }
      await refreshImages()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeletingFile(null)
    }
  }

  function copyMarkdown(filePath: string) {
    const mdPath = filePath.replace(/^public/, '')
    const filename = filePath.split('/').pop()?.replace(/\.[^.]+$/, '') || 'image'
    const markdown = `![${filename}](${mdPath})`
    navigator.clipboard.writeText(markdown)
    setCopied(filePath)
    setTimeout(() => setCopied(null), 2000)
  }

  function getRawUrl(filePath: string) {
    return `${GITHUB_RAW_BASE}/${branch}/${filePath}?v=${cacheBust}`
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        handleUpload(e.dataTransfer.files)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slug]
  )

  return (
    <div className="border-b bg-neutral-50">
      {/* Header toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-neutral-100"
      >
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4 text-neutral-500"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-xs font-medium text-neutral-700">
            Images ({images.length})
          </span>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`h-4 w-4 text-neutral-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-3">
          {/* Error */}
          {error && (
            <div className="mb-3 flex items-center justify-between rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-2 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Upload zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`mb-3 flex items-center justify-center rounded-lg border-2 border-dashed px-4 py-4 transition-colors ${
              dragOver
                ? 'border-amber-400 bg-amber-50'
                : 'border-neutral-300 bg-white'
            }`}
          >
            {uploading ? (
              <span className="text-xs text-neutral-500">Uploading...</span>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5 text-neutral-400"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span className="text-xs text-neutral-500">
                  Drag & drop images or{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="font-medium text-amber-600 hover:underline"
                  >
                    browse
                  </button>
                </span>
                <span className="text-[10px] text-neutral-400">
                  JPG, PNG, WebP, SVG, GIF, AVIF — max 10MB
                </span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleUpload(e.target.files)
                  e.target.value = ''
                }
              }}
            />
          </div>

          {/* Image grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((filePath) => {
                const filename = filePath.split('/').pop()!
                const isDeleting = deletingFile === filePath

                return (
                  <div
                    key={filePath}
                    className={`group relative overflow-hidden rounded-lg border bg-white ${
                      isDeleting ? 'opacity-50' : ''
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video overflow-hidden bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getRawUrl(filePath)}
                        alt={filename}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Filename */}
                    <div className="px-2 py-1.5">
                      <p
                        className="truncate text-[10px] text-neutral-600"
                        title={filename}
                      >
                        {filename}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex border-t">
                      <button
                        onClick={() => copyMarkdown(filePath)}
                        className="flex flex-1 items-center justify-center gap-1 border-r py-1.5 text-[10px] font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
                        title="Copy markdown"
                      >
                        {copied === filePath ? (
                          <>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              className="h-3 w-3 text-green-600"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span className="text-green-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              className="h-3 w-3"
                            >
                              <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                ry="2"
                              />
                              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                            Copy MD
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(filePath)}
                        disabled={isDeleting}
                        className="flex flex-1 items-center justify-center gap-1 py-1.5 text-[10px] font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-3 w-3"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {images.length === 0 && (
            <p className="text-center text-xs text-neutral-400">
              No images uploaded yet
            </p>
          )}
        </div>
      )}

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-sm font-semibold text-neutral-900">
              Delete this image?
            </h3>
            <p className="mt-2 text-xs text-neutral-600">
              <strong>{showDeleteConfirm.split('/').pop()}</strong> will be
              permanently removed from this draft. This cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="rounded-lg border px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
