export const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

export type UTMParams = Partial<Record<(typeof UTM_PARAMS)[number], string>>

const STORAGE_KEY = 'utm_params'

/**
 * Captures UTM parameters from the URL and stores them in sessionStorage.
 * Uses first-touch attribution: only stores if no UTMs are already saved.
 */
export function captureUTMParams(searchParams: URLSearchParams): void {
  if (typeof window === 'undefined') return

  // Check if any UTM params exist in the URL
  const utmValues: UTMParams = {}
  let hasUtm = false

  for (const param of UTM_PARAMS) {
    const value = searchParams.get(param)
    if (value) {
      utmValues[param] = value
      hasUtm = true
    }
  }

  if (!hasUtm) return

  // First-touch attribution: only store if nothing is already saved
  const existing = sessionStorage.getItem(STORAGE_KEY)
  if (existing) return

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmValues))
}

/**
 * Retrieves stored UTM parameters from sessionStorage.
 */
export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null

  const stored = sessionStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as UTMParams
  } catch {
    return null
  }
}

/**
 * Clears stored UTM parameters from sessionStorage.
 * Useful after form submission if desired.
 */
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(STORAGE_KEY)
}
