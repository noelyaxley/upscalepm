import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { Callout } from '@/components/mdx/callout'
import { ProjectStats } from '@/components/mdx/project-stats'
import { ImageGallery } from '@/components/mdx/image-gallery'
import { Timeline, TimelineItem } from '@/components/mdx/timeline'
import { StatCard } from '@/components/mdx/stat-card'
import { BeforeAfter } from '@/components/mdx/before-after'
import { YouTubeEmbed } from '@/components/mdx/youtube-embed'
import { InstagramEmbed } from '@/components/mdx/instagram-embed'
import { AnimatedImage } from '@/components/mdx/animated-image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => {
      const src = props.src as string
      // Derive video path: /images/insights/slug/hero.jpg -> /images/insights/slug/hero.mp4
      const videoSrc = src.replace(/\.(jpg|jpeg|png|webp)$/i, '.mp4')

      return (
        <AnimatedImage
          src={src}
          videoSrc={videoSrc}
          alt={props.alt || ''}
        />
      )
    },
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/')) {
        return <Link href={href} {...props}>{children}</Link>
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    },
    Callout,
    ProjectStats,
    ImageGallery,
    Timeline,
    TimelineItem,
    StatCard,
    BeforeAfter,
    YouTubeEmbed,
    InstagramEmbed,
    ...components,
  }
}
