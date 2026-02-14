import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

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
    ...components,
  }
}
