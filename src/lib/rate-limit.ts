/**
 * In-memory sliding-window rate limiter.
 *
 * For Vercel serverless: each cold-start gets its own Map, so this is
 * best-effort per-instance. For stronger guarantees, swap the store
 * for Upstash Redis — the interface stays the same.
 */

interface RateLimitEntry {
  timestamps: number[]
}

const store = new Map<string, RateLimitEntry>()

// Evict stale keys every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup(windowMs: number) {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  const cutoff = now - windowMs
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff)
    if (entry.timestamps.length === 0) store.delete(key)
  }
}

interface RateLimitOptions {
  /** Time window in milliseconds */
  windowMs: number
  /** Max requests per window */
  max: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetMs: number
}

export function rateLimit(
  key: string,
  { windowMs, max }: RateLimitOptions
): RateLimitResult {
  cleanup(windowMs)

  const now = Date.now()
  const cutoff = now - windowMs
  const entry = store.get(key) ?? { timestamps: [] }

  // Drop timestamps outside window
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff)

  if (entry.timestamps.length >= max) {
    const oldest = entry.timestamps[0]
    return {
      success: false,
      remaining: 0,
      resetMs: oldest + windowMs - now,
    }
  }

  entry.timestamps.push(now)
  store.set(key, entry)

  return {
    success: true,
    remaining: max - entry.timestamps.length,
    resetMs: windowMs,
  }
}

/** Extract a best-effort IP from request headers */
export function getClientIp(request: Request): string {
  const headers = request.headers
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  )
}
