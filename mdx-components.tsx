import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { Callout } from '@/components/mdx/callout'
import { ProjectStats } from '@/components/mdx/project-stats'
import { ImageGallery } from '@/components/mdx/image-gallery'
import { Timeline, TimelineItem } from '@/components/mdx/timeline'
import { StatCard } from '@/components/mdx/stat-card'
import { BeforeAfter } from '@/components/mdx/before-after'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        src={props.src as string}
        alt={props.alt || ''}
        width={1200}
        height={630}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
        className="rounded-lg"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
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
    ...components,
  }
}
