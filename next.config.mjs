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
  async redirects() {
    try {
      const data = readFileSync('./content/migration/redirects.json', 'utf-8')
      const redirects = JSON.parse(data)
      return redirects.map(({ source, destination, statusCode }) => ({
        source,
        destination,
        permanent: statusCode === 301,
      }))
    } catch {
      return []
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
