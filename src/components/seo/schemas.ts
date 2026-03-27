import type {
  WithContext,
  LocalBusiness,
  Service,
  Article,
  FAQPage,
  BreadcrumbList,
  ItemList,
  WebSite,
} from 'schema-dts'

const SITE_URL = 'https://upscalepm.com.au'
const BRAND_NAME = 'UpScale Project Management'

const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/upscalepm/',
  'https://www.instagram.com/upscale.pm/',
  'https://www.facebook.com/UpScalePM/',
  'https://www.youtube.com/@upscale_pm',
]

export function localBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: `${BRAND_NAME} | Club Development Advisory`,
    description:
      'Independent advisors for club and golf club redevelopments across NSW. Helping club boards and CEOs successfully deliver major capital projects.',
    url: SITE_URL,
    telephone: '+61290904480',
    email: 'noel@upscalepm.com.au',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 2/89 Macquarie St',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.8688,
      longitude: 151.2093,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    areaServed: {
      '@type': 'State',
      name: 'New South Wales',
    },
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}/about#noel-yaxley`,
      name: 'Noel Yaxley',
      jobTitle: 'Director',
      url: `${SITE_URL}/about`,
    },
    image: `${SITE_URL}/images/og-default.jpg`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/shared/logo/logo-64.png`,
    },
    sameAs: SOCIAL_PROFILES,
    knowsAbout: [
      'Club redevelopment project management',
      'RSL club refurbishment',
      'Golf clubhouse development',
      'Hospitality venue redevelopment',
      'Club governance advisory',
    ],
  }
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BRAND_NAME,
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  } as WithContext<WebSite>
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
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND_NAME,
      url: SITE_URL,
    },
    areaServed: [
      { '@type': 'City', name: 'Sydney' },
      { '@type': 'City', name: 'Newcastle' },
      { '@type': 'City', name: 'Wollongong' },
      { '@type': 'City', name: 'Central Coast' },
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
  const imageUrl = article.heroImage.startsWith('http')
    ? article.heroImage
    : `${SITE_URL}${article.heroImage}`

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
      '@id': `${SITE_URL}/about#noel-yaxley`,
      name: article.author,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/shared/logo/logo-64.png`,
      },
    },
    image: imageUrl,
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
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND_NAME,
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

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function itemListSchema(
  name: string,
  items: Array<{ name: string; url: string; position: number }>
): WithContext<ItemList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem' as const,
      position: item.position,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}
