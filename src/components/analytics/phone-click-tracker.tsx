'use client'

import { useEffect } from 'react'
import { trackPhoneClick } from './gtm-event'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void
}

/**
 * Global listener that tracks clicks on any `tel:` link.
 *
 * Fires two things:
 * 1. GTM dataLayer `phone_click` event (for GA4 / GTM triggers)
 * 2. Google Ads conversion via gtag (AW-10851484907/ZE_hCJaxlv0bEOuJsrYo)
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

      // GTM dataLayer event
      trackPhoneClick(phoneNumber, section)

      // Google Ads conversion — "Click to call" conversion action
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-10851484907/ZE_hCJaxlv0bEOuJsrYo',
        })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
