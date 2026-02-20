'use client'

import { useEffect, useRef } from 'react'

interface InstagramEmbedProps {
  url: string
}

function extractReelId(url: string): string | null {
  const match = url.match(/instagram\.com\/reel\/([^/?]+)/)
  return match ? match[1] : null
}

export function InstagramEmbed({ url }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const win = window as unknown as Record<string, unknown>
    if (!win.instgrm) {
      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    } else {
      const instgrm = win.instgrm as { Embeds: { process: () => void } }
      instgrm.Embeds.process()
    }
  }, [url])

  const reelId = extractReelId(url)
  if (!reelId) return null

  const cleanUrl = `https://www.instagram.com/reel/${reelId}/`

  return (
    <div className="not-prose my-6 flex justify-center" ref={containerRef}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={cleanUrl}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: '100%',
        }}
      >
        <a href={cleanUrl} target="_blank" rel="noopener noreferrer">
          View this post on Instagram
        </a>
      </blockquote>
    </div>
  )
}
