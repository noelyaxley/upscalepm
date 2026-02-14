import { getAllServices } from '@/lib/services'
import { getAllCaseStudies } from '@/lib/content'
import { Hero } from '@/components/sections/hero'
import { ClientLogos } from '@/components/sections/client-logos'
import { ValueProposition } from '@/components/sections/value-proposition'
import { ServicesOverview } from '@/components/sections/services-overview'
import { FeaturedCaseStudies } from '@/components/sections/featured-case-studies'
import { HomepageCta } from '@/components/sections/homepage-cta'

export default function Home() {
  const services = getAllServices()
  const caseStudies = getAllCaseStudies().slice(0, 3)

  return (
    <>
      <Hero />
      <ClientLogos />
      <ValueProposition />
      <ServicesOverview services={services} />
      <FeaturedCaseStudies caseStudies={caseStudies} />
      <HomepageCta />
    </>
  )
}
