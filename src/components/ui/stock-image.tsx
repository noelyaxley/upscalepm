'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'

interface StockImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc: string
}

/**
 * Image component that falls back to a secondary source if the primary image fails to load.
 * Used during the stock image transition — once all stock images are downloaded, the
 * fallbackSrc can be removed and this can be replaced with a standard Image component.
 */
export function StockImage({ src, fallbackSrc, alt, ...props }: StockImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}
