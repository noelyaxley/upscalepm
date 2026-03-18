'use client'

import { useState } from 'react'
import Image from 'next/image'

interface AnimatedImageProps {
  src: string
  videoSrc: string
  alt: string
}

export function AnimatedImage({ src, videoSrc, alt }: AnimatedImageProps) {
  const [videoFailed, setVideoFailed] = useState(false)

  if (videoFailed) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={630}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
        className="rounded-lg"
        style={{ width: '100%', height: 'auto' }}
      />
    )
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="rounded-lg w-full"
      onError={() => setVideoFailed(true)}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  )
}
