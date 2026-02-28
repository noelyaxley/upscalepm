import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

// Import the same custom MDX components used on the live site
import { Callout } from '@/components/mdx/callout'
import { ProjectStats } from '@/components/mdx/project-stats'
import { ImageGallery } from '@/components/mdx/image-gallery'
import { Timeline, TimelineItem } from '@/components/mdx/timeline'
import { StatCard } from '@/components/mdx/stat-card'
import { BeforeAfter } from '@/components/mdx/before-after'
import { YouTubeEmbed } from '@/components/mdx/youtube-embed'
import { InstagramEmbed } from '@/components/mdx/instagram-embed'

// Custom components matching mdx-components.tsx
const components = {
  img: (props: React.ComponentProps<'img'>) => (
    <Image
      src={props.src as string}
      alt={props.alt || ''}
      width={1200}
      height={630}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
      className="rounded-lg"
      style={{ width: '100%', height: 'auto' }}
      unoptimized // Use unoptimized for external GitHub raw URLs
    />
  ),
  a: ({
    href,
    children,
    ...props
  }: React.ComponentProps<'a'>) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
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
}

interface DraftMDXRendererProps {
  source: string
}

export function DraftMDXRenderer({ source }: DraftMDXRendererProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  )
}
