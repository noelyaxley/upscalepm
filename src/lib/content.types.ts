export interface CaseStudyFrontmatter {
  title: string
  excerpt: string
  category: 'residential' | 'commercial' | 'fitout' | 'infrastructure' | 'hotel' | 'development' | 'planning-proposal'
  projectType: string
  location: string
  client?: string
  architect?: string
  heroImage: string
  images?: Array<{
    src: string
    alt: string
  }>
  services?: string[]
  date?: string
  order: number
  draft: boolean
}

export interface InsightFrontmatter {
  title: string
  excerpt: string
  date: string
  updated?: string
  author: string
  category: 'quick-bites' | 'articles'
  tags: string[]
  heroImage: string
  draft: boolean
}

export interface ContentItem<T> {
  slug: string
  frontmatter: T
  content: string
  readingTime: number
}
