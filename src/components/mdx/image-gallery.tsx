import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3
}

export function ImageGallery({ images, columns = 2 }: ImageGalleryProps) {
  const gridCols = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'

  return (
    <div className={`not-prose my-8 grid grid-cols-1 gap-4 ${gridCols}`}>
      {images.map((image) => (
        <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={
              columns === 3
                ? '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px'
            }
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}
