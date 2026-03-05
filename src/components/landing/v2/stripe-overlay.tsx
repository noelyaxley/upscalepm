export function StripeOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 10px,
          rgba(255,255,255,${opacity}) 10px,
          rgba(255,255,255,${opacity}) 12px
        )`,
      }}
    />
  )
}
