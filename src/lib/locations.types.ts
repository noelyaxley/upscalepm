export interface ServiceLocationContext {
  localDescription: string // 2-3 sentences about this service in this location
  localBenefits: string[] // 3-4 location-specific benefits
  relatedCaseStudies: string[] // Case study slugs relevant to this location
  localCta: string // Location-specific CTA text, e.g. "Discuss your Sydney project"
}

export interface LocationData {
  slug: string // 'sydney' | 'newcastle'
  name: string // 'Sydney' | 'Newcastle'
  region: string // 'Sydney, NSW' | 'Newcastle, NSW'
  councils: string[] // Relevant local government areas
  suburbs: string[] // Key suburbs where work is done
  marketContext: string // 2-3 paragraphs about the local market
  serviceContexts: Record<string, ServiceLocationContext> // Keyed by service slug
}
