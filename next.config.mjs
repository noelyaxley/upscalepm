import createMDX from '@next/mdx'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/noelyaxley/upscalepm/**',
      },
    ],
  },
  async headers() {
    // Content-Security-Policy — allows GTM, HubSpot, Calendly, YouTube, Instagram
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://js.hs-scripts.com https://assets.calendly.com https://www.instagram.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://raw.githubusercontent.com https://*.google-analytics.com https://*.googletagmanager.com https://*.instagram.com",
      "font-src 'self'",
      "frame-src https://www.youtube.com https://www.instagram.com https://calendly.com https://www.googletagmanager.com",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://api.calendly.com https://js.hs-scripts.com https://*.hubspot.com https://*.hsforms.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
  async redirects() {
    const hardcoded = [
      {
        source: '/for-club-boards',
        destination: '/club-boards',
        permanent: true,
      },
    ]

    try {
      const data = readFileSync('./content/migration/redirects.json', 'utf-8')
      const redirects = JSON.parse(data)
      return [
        ...redirects.map(({ source, destination, statusCode }) => ({
          source,
          destination,
          permanent: statusCode === 301,
        })),
        ...hardcoded,
      ]
    } catch {
      return hardcoded
    }
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-frontmatter',
      'remark-mdx-frontmatter',
      'remark-gfm',
    ],
    rehypePlugins: [
      'rehype-slug',
    ],
  },
})

export default withMDX(nextConfig)
