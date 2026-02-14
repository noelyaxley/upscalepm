import createMDX from '@next/mdx'
import { readFileSync } from 'fs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
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
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
