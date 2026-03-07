import { type Metadata } from 'next'

const SITE_URL = 'https://upscalepm.com.au'
const SITE_NAME = 'UpScale PM | Club Development Advisory'
const DEFAULT_DESCRIPTION =
  'Independent advisors for club and golf club redevelopments across NSW. Helping club boards and CEOs successfully deliver major capital projects — from feasibility to opening night.'

export function generatePageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  ogImage,
}: {
  title: string
  description?: string
  path?: string
  ogImage?: string
}): Metadata {
  const url = `${SITE_URL}${path}`
  const image = ogImage ?? `${SITE_URL}/images/og-default.jpg`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
  }
}
