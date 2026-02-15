export interface ServicePage {
  slug: string
  title: string
  subtitle: string
  description: string // SEO meta description
  heroImage: string
  sections: Array<{
    heading: string
    body: string // Can contain simple HTML (paragraphs, lists)
    image?: string
    imagePosition?: 'left' | 'right'
  }>
  benefits: Array<{
    title: string
    description: string
  }>
  ctaText: string
  ctaDescription: string
  relatedCaseStudies: string[] // slugs of related case studies
}
