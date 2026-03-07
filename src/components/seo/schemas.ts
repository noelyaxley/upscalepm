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
    name: 'UpScale Project Management | Club Development Advisory',
    description:
      'Independent advisors for club and golf club redevelopments across NSW. Helping club boards and CEOs successfully deliver major capital projects.',
    url: SITE_URL,
    email: 'noel@upscalepm.com.au',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 2/89 Macquarie St',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'AU',
    },
    areaServed: {
      '@type': 'State',
      name: 'New South Wales',
    },
    founder: {
      '@type': 'Person',
      name: 'Noel Yaxley',
      jobTitle: 'Director',
    },
    image: `${SITE_URL}/images/og-default.jpg`,
    priceRange: '$$',
    knowsAbout: [
      'Club redevelopment project management',
      'RSL club refurbishment',
      'Golf clubhouse development',
      'Hospitality venue redevelopment',
      'Club governance advisory',
    ],
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
    serviceType: 'Club Redevelopment Advisory',
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

export function locationServiceSchema(service: {
  title: string
  description: string
  slug: string
  location: { name: string; region: string }
}): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} ${service.location.name}`,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}/${service.location.name.toLowerCase()}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Upscale Project Management',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: service.location.name,
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
    },
    areaServed: {
      '@type': 'City',
      name: service.location.name,
    },
    serviceType: 'Project Management',
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
