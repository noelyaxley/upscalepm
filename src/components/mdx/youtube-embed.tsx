interface YouTubeEmbedProps {
  url: string
  title?: string
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/shorts\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function YouTubeEmbed({ url, title = 'YouTube video' }: YouTubeEmbedProps) {
  const videoId = extractVideoId(url)
  if (!videoId) return null

  const isShort = url.includes('/shorts/')

  return (
    <div
      className={`not-prose my-6 overflow-hidden rounded-lg ${isShort ? 'mx-auto max-w-sm' : ''}`}
    >
      <div
        className="relative w-full"
        style={{ paddingBottom: isShort ? '177.78%' : '56.25%' }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      </div>
    </div>
  )
}
