'use client'

import { useEffect } from 'react'
import { trackPhoneClick } from './gtm-event'

/**
 * Global listener that tracks clicks on any `tel:` link.
 *
 * Pushes `phone_click` to the GTM dataLayer. The Google Ads conversion
 * is fired by the "Click to Call - Landing" tag in GTM.
 *
 * Mount once in the layout — works across all pages.
 */
export function PhoneClickTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="tel:"]'
      )
      if (!anchor) return

      const phoneNumber = anchor.href.replace('tel:', '')
      const section =
        anchor.closest('section')?.querySelector('h2, h3')?.textContent?.trim() ??
        'unknown'

      // GTM dataLayer event — triggers "Click to Call" conversion tag in GTM
      trackPhoneClick(phoneNumber, section)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
