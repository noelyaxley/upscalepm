import Image from 'next/image'

interface BeforeAfterProps {
  before: {
    src: string
    alt: string
  }
  after: {
    src: string
    alt: string
  }
  beforeLabel?: string
  afterLabel?: string
}

export function BeforeAfter({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterProps) {
  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-center text-sm font-medium text-neutral-500">
          {beforeLabel}
        </p>
      </div>
      <div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={after.src}
            alt={after.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-center text-sm font-medium text-neutral-500">
          {afterLabel}
        </p>
      </div>
    </div>
  )
}
