declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/**
 * Push a custom event to the GTM dataLayer.
 *
 * Safe to call on the server (no-ops) and when GTM is not loaded
 * (events are queued in dataLayer for when GTM initializes).
 */
export function pushToDataLayer(
  event: string,
  data?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}

/**
 * Track a form submission event in the dataLayer.
 *
 * This fires the `form_submission` event that GTM triggers on
 * for GA4 events, Google Ads conversions, and Meta Pixel Lead events.
 */
export function trackFormSubmission(formName: string): void {
  pushToDataLayer('form_submission', {
    form_name: formName,
    form_destination: 'hubspot',
  })
}
