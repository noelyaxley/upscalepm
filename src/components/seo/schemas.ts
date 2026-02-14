import type {
  WithContext,
  LocalBusiness,
  Service,
  Article,
  FAQPage,
} from 'schema-dts'

const SITE_URL = 'https://upscalepm.com.au'

export function localBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Upscale Project Management',
    description:
      'Client-side project management for property and construction projects in Sydney and Newcastle.',
    url: SITE_URL,
    telephone: '+61299998888',
    email: 'info@upscalepm.com.au',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    areaServed: [
      { '@type': 'City', name: 'Sydney' },
      { '@type': 'City', name: 'Newcastle' },
    ],
    founder: {
      '@type': 'Person',
      name: 'Noel Yaxley',
      jobTitle: 'Founder & Principal',
    },
    image: `${SITE_URL}/images/og-default.jpg`,
    priceRange: '$$',
  }
}

export function serviceSchema(service: {
  title: string
  description: string
  slug: string
}): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Upscale Project Management',
      url: SITE_URL,
    },
    areaServed: [
      { '@type': 'City', name: 'Sydney' },
      { '@type': 'City', name: 'Newcastle' },
    ],
    serviceType: 'Project Management',
  }
}

export function articleSchema(article: {
  title: string
  excerpt: string
  slug: string
  date: string
  updated?: string
  author: string
  heroImage: string
  path: string
}): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}${article.path}`,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Upscale Project Management',
      url: SITE_URL,
    },
    image: article.heroImage.startsWith('http')
      ? article.heroImage
      : `${SITE_URL}${article.heroImage}`,
  }
}

export function faqSchema(
  questions: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question' as const,
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: q.answer,
      },
    })),
  }
}
