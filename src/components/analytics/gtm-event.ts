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
 * Track when a form becomes visible to the user.
 */
export function trackFormView(formName: string): void {
  pushToDataLayer('form_view', {
    form_name: formName,
  })
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

/**
 * Track a form submission error (API failure or validation rejection).
 */
export function trackFormError(formName: string, errorType: string): void {
  pushToDataLayer('form_error', {
    form_name: formName,
    error_type: errorType,
  })
}

/**
 * Track a phone call click (tel: link).
 * Fires `phone_click` event for GTM → Google Ads conversion tracking.
 */
export function trackPhoneClick(phoneNumber: string, location: string): void {
  pushToDataLayer('phone_click', {
    phone_number: phoneNumber,
    click_location: location,
  })
}
