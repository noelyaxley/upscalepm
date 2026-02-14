import { cn } from '@/lib/utils'

interface GeometricShapesProps {
  variant?: 'default' | 'dark'
  className?: string
}

export function GeometricShapes({
  variant = 'default',
  className,
}: GeometricShapesProps) {
  const baseColor =
    variant === 'dark' ? 'border-white/[0.06]' : 'border-neutral-950/[0.06]'

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
      aria-hidden="true"
    >
      {/* Large diamond shape, top-right */}
      <div
        className={cn(
          'geo-shape absolute -right-12 top-1/4 size-48 rotate-45 rounded-lg border-2 md:size-64',
          baseColor,
        )}
      />
      {/* Small square, bottom-left */}
      <div
        className={cn(
          'geo-shape geo-shape-alt absolute -left-6 bottom-1/3 size-24 rotate-12 rounded-sm border-2 md:size-32',
          baseColor,
        )}
      />
      {/* Medium circle, center-right */}
      <div
        className={cn(
          'geo-shape geo-shape-slow absolute right-1/4 top-2/3 size-32 rounded-full border-2 md:size-40',
          baseColor,
        )}
      />
    </div>
  )
}
