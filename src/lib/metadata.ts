import { type Metadata } from 'next'

const SITE_URL = 'https://upscalepm.com.au'
const SITE_NAME = 'UpScalePM'
const DEFAULT_DESCRIPTION =
  'Client-side project management for property and construction projects. From feasibility through to handover, we protect your time, budget, and quality.'

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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
