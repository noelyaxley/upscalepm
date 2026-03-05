import { Star } from 'lucide-react'

export function StarRating({
  rating = '5.0',
  reviews = '6 client reviews',
  className = '',
}: {
  rating?: string
  reviews?: string
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="size-4 fill-primary text-primary" />
        ))}
      </div>
      <span className="text-sm opacity-60">
        {rating} from {reviews}
      </span>
    </div>
  )
}
