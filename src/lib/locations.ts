import type { LocationData } from './locations.types'
import { getAllServices } from '@/lib/services'

const locations: LocationData[] = [
  {
    slug: 'sydney',
    name: 'Sydney',
    region: 'Sydney, NSW',
    councils: [
      'City of Sydney',
      'Inner West Council',
      'Cumberland City Council',
      'City of Parramatta',
      'Ku-ring-gai Council',
      'Hornsby Shire Council',
    ],
    suburbs: [
      'Sydney CBD',
      'Surry Hills',
      'Darling Harbour',
      'Granville',
      'Asquith',
      'Macquarie Park',
      'Parramatta',
    ],
    marketContext:
      "Sydney is Australia's largest and most competitive property market, with development activity spanning from high-density towers in the CBD and inner ring to medium-density infill across Western Sydney and the Upper North Shore. Navigating this market means dealing with multiple council jurisdictions -- each with their own Development Control Plans, Local Environmental Plans, and heritage overlays -- under the umbrella of the Environmental Planning and Assessment Act 1979. For developers, the regulatory complexity alone can stall projects for months before a shovel hits the ground.\n\nThe Greater Sydney region is experiencing sustained demand for residential and mixed-use development, driven by population growth, infrastructure investment (Sydney Metro, WestConnex, Western Sydney Airport), and state planning reforms encouraging higher density around transport nodes. Inner West and Western Sydney corridors are seeing particular activity, with councils like Cumberland City and City of Parramatta processing record numbers of development applications. Competition for sites is fierce, construction costs continue to escalate, and program delays are common -- making experienced client-side project management essential for protecting investment returns.\n\nUpscale has delivered projects across Greater Sydney for over a decade, working with private developers, institutional clients, and government agencies. Our hands-on experience with Sydney's planning frameworks, consultant networks, and construction market gives clients a practical advantage -- whether they're acquiring a site in Surry Hills, managing a DA through Inner West Council, or superintending construction on a complex commercial fitout in Macquarie Park.",
    serviceContexts: {
      'feasibility-advisory': {
        localDescription:
          "Sydney's development market rewards those who do their homework before committing capital. With land values among the highest in Australia and planning controls that vary dramatically between council areas, a thorough feasibility assessment is the difference between a profitable project and an expensive lesson. We assess sites across Greater Sydney -- from Inner West terrace conversions to Western Sydney greenfield subdivisions -- evaluating planning constraints, market positioning, and delivery risk before our clients commit.",
        localBenefits: [
          'Deep knowledge of Sydney council planning frameworks, including City of Sydney, Inner West Council, Cumberland City, and City of Parramatta LEPs and DCPs -- so feasibility assessments account for real regulatory constraints, not assumptions.',
          'Market analysis grounded in current Sydney development economics: land acquisition costs, construction cost escalation trends, and achievable sales rates across different submarkets and product types.',
          'Experience with complex site constraints common in Sydney -- heritage overlays, flood mapping, contamination, aircraft noise corridors, and bushfire-prone land -- that can fundamentally change a project\'s viability.',
          'Relationships with Sydney-based planners, quantity surveyors, and legal advisors who can be engaged quickly to validate feasibility findings and progress to acquisition with confidence.',
        ],
        relatedCaseStudies: [
          'granville-diggers-club-development',
          'crosslife-church-asquith-development',
          'strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney',
        ],
        localCta: 'Discuss your Sydney development',
      },
      'design-management': {
        localDescription:
          "Managing design consultants in Sydney requires more than coordination -- it demands an understanding of the local planning environment, construction market, and the specific pressures that Sydney projects face. Our design management services ensure architectural intent is maintained from concept through construction documentation, while keeping the project aligned with council requirements and budget realities. We've managed design teams across sectors in Sydney, from government office fitouts in the CBD to community facility redevelopments in Western Sydney.",
        localBenefits: [
          'Experience coordinating Sydney-based architectural practices, engineering consultants, and specialist subconsultants who understand local construction conditions and council expectations.',
          'Design management that accounts for Sydney-specific constraints: restrictive building envelopes, overshadowing controls, heritage adjacency, and the interplay between State Environmental Planning Policies and local planning instruments.',
          'Proactive management of design documentation to meet the requirements of Sydney certifiers and council assessment officers, reducing requests for additional information and avoiding costly redesign cycles.',
          'Track record of protecting design quality through value engineering and tender negotiations in a Sydney market where construction cost pressures routinely push builders to propose scope reductions.',
        ],
        relatedCaseStudies: [
          'crosslife-church-asquith-development',
          'delivering-modern-government-workspaces-at-231-elizabeth-street',
          'expanding-government-tenancy-at-glass-house-macquarie-park',
        ],
        localCta: 'Discuss your Sydney project',
      },
      'da-approval': {
        localDescription:
          "Securing DA approval in Sydney is a multi-layered process that varies significantly depending on the council, the site, and the scale of the proposal. From City of Sydney's stringent urban design requirements to Inner West Council's heritage and character controls, each jurisdiction has its own priorities and assessment culture. We manage the DA process end-to-end across Greater Sydney, coordinating consultant teams, pre-lodgement meetings, and council negotiations to get projects through the system efficiently.",
        localBenefits: [
          'Hands-on experience with DA processes across Sydney councils -- including City of Sydney, Inner West, Parramatta, Cumberland, and Ku-ring-gai -- with knowledge of each council\'s assessment priorities, common objections, and typical timeframes.',
          'Coordination of planning consultants, traffic engineers, heritage advisors, and environmental specialists required for Sydney DA submissions, ensuring all reports are aligned and support a compelling application.',
          'Strategic approach to pre-lodgement and pre-DA meetings with Sydney councils, identifying potential objections early and addressing them before formal lodgement to avoid unnecessary delays and RFIs.',
          'Experience navigating Sydney-specific planning complexities: State Significant Development thresholds, Design Excellence provisions, Voluntary Planning Agreements, and the interaction between LEPs, DCPs, and SEPPs.',
        ],
        relatedCaseStudies: [
          'strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney',
          'calibre-cooper-street-residential-apartments-surry-hills',
          'granville-diggers-club-development',
        ],
        localCta: 'Discuss your Sydney DA',
      },
      'tender-assessment': {
        localDescription:
          "Sydney's construction market is characterised by high demand for builders, tight labour availability, and significant variation in contractor capability and pricing. Getting the right builder at the right price requires more than opening envelopes -- it requires understanding the current Sydney market, knowing which contractors deliver in specific sectors, and identifying the risks hidden in tender submissions. Our tender assessment service gives Sydney developers and asset owners the independent analysis they need to make confident procurement decisions.",
        localBenefits: [
          'Knowledge of Sydney\'s contractor market across sectors -- residential, commercial, institutional, and heritage -- including which builders have capacity, relevant experience, and a track record of completing projects without disputes.',
          'Tender analysis that accounts for Sydney-specific cost drivers: scaffolding and hoarding in dense urban sites, rock excavation, services diversions, council bond requirements, and the impact of traffic management on construction programs.',
          'Benchmarking tender prices against current Sydney construction cost data, identifying unrealistic allowances, exclusions, and program assumptions that could expose clients to variations and delays.',
          'Independent assessment that protects the client\'s position during contract negotiations, ensuring scope, risk allocation, and commercial terms reflect current Sydney market conditions rather than boilerplate from the last project.',
        ],
        relatedCaseStudies: [
          'navigating-encumbrance-vibe-hotel-darling-harbour',
          'granville-diggers-club-development',
          'structured-for-success-delivering-granville-diggers-club-via-as4902-and-separable-portions',
        ],
        localCta: 'Discuss your Sydney tender',
      },
      'construction-superintendent': {
        localDescription:
          "Construction in Sydney operates under pressures that don't exist in most other Australian markets: constrained sites with zero-lot-line boundaries, live traffic and pedestrian management, stringent council conditions of consent, and a subcontractor market where quality and availability fluctuate constantly. Our superintendent service provides experienced, client-side site leadership that keeps Sydney projects on program, on budget, and built to the standard the design team intended. We've superintended projects from Darling Harbour hotel towers to laboratory relocations for Sydney Water.",
        localBenefits: [
          'Site leadership experienced with Sydney\'s specific construction challenges: working on constrained CBD and inner-city sites, managing dilapidation risks with adjacent properties, and coordinating around live environments including retail, hospitality, and government operations.',
          'Deep understanding of NSW construction legislation, SafeWork requirements, and Sydney council conditions of consent -- ensuring compliance is maintained without creating unnecessary program friction.',
          'Established relationships with Sydney subcontractor networks across structural, mechanical, electrical, hydraulic, and facade trades, enabling fast resolution of quality issues and coordination conflicts on site.',
          'Architectural background that allows us to assess construction quality against design intent, catch non-conformances early, and advocate for the client when builders propose substitutions or scope reductions during delivery.',
        ],
        relatedCaseStudies: [
          'navigating-encumbrance-vibe-hotel-darling-harbour',
          'major-laboratory-relocation-future-proofing-sydney-waters-filtration-capabilities',
          'calibre-cooper-street-residential-apartments-surry-hills',
        ],
        localCta: 'Discuss your Sydney build',
      },
    },
  },
  {
    slug: 'newcastle',
    name: 'Newcastle',
    region: 'Newcastle, NSW',
    councils: [
      'City of Newcastle',
      'Lake Macquarie City Council',
      'Cessnock City Council',
      'Maitland City Council',
    ],
    suburbs: [
      'Newcastle CBD',
      'Newcastle West',
      'Honeysuckle',
      'Merewether',
      'Charlestown',
      'Maitland',
    ],
    marketContext:
      "Newcastle is undergoing one of the most significant urban transformations in regional Australia. The city's $billions-worth renewal program -- anchored by the Honeysuckle precinct, the new light rail corridor, and the repurposing of the former heavy rail line through the city centre -- has repositioned Newcastle from an industrial city to a destination for residential, commercial, and mixed-use development. For developers, Newcastle offers a fundamentally different proposition to Sydney: lower land costs, a more collaborative council planning culture, and a growing population attracted by lifestyle and relative affordability.\n\nThe Hunter region's economy is diversifying rapidly beyond its coal mining heritage into health (John Hunter Hospital precinct), education (University of Newcastle), defence (Williamtown), and advanced manufacturing. This diversification is driving new construction activity across the region -- from medium-density residential in established suburbs like Merewether and Charlestown to greenfield development in growth areas like Maitland and Cessnock. City of Newcastle council has adopted a proactive stance toward development, with streamlined DA processes and clear strategic planning frameworks that contrast with the complexity developers face in metropolitan Sydney.\n\nUpscale brings Sydney-calibre project management expertise to Newcastle and the Hunter region, combined with local market knowledge and relationships. Whether you're delivering a commercial fitout in Newcastle CBD, navigating planning approvals in Lake Macquarie, or managing a health infrastructure project in the Hunter Valley, we provide the same rigorous, client-side representation that protects your investment and keeps your project on track.",
    serviceContexts: {
      'feasibility-advisory': {
        localDescription:
          "Newcastle's development market is maturing rapidly, and getting feasibility right in this market requires understanding its specific dynamics -- not just applying Sydney assumptions with lower numbers. Land values in Newcastle CBD and waterfront precincts have risen sharply, but the broader Hunter region still offers sites at a fraction of Sydney prices, creating opportunities for developers who understand the local planning environment, demand drivers, and construction cost base. We assess feasibility for Newcastle and Hunter region projects with a clear-eyed view of what the market will support.",
        localBenefits: [
          'Understanding of Newcastle and Hunter region market fundamentals -- population growth, infrastructure investment, employment drivers, and achievable price points across different product types and locations.',
          'Knowledge of City of Newcastle and Lake Macquarie planning frameworks, including the Newcastle Local Environmental Plan, development contribution requirements, and the council\'s strategic approach to urban renewal areas.',
          'Assessment of site-specific opportunities and constraints in the Hunter region, including heritage conservation areas in the city centre, waterfront development controls at Honeysuckle, and flood-prone land in the Hunter Valley.',
          'Access to quantity surveyors and planning consultants with Newcastle experience who can provide accurate local cost and regulatory inputs, rather than relying on Sydney benchmarks that don\'t reflect regional construction economics.',
        ],
        relatedCaseStudies: [
          'strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney',
          'granville-diggers-club-development',
        ],
        localCta: 'Discuss your Newcastle development',
      },
      'design-management': {
        localDescription:
          "Design management in Newcastle requires balancing the city's heritage character with contemporary development expectations. Newcastle's urban renewal has attracted a new generation of architectural projects -- adaptive reuse of industrial buildings, waterfront mixed-use, and community facilities that need to respond to the city's evolving identity. We manage design teams working in Newcastle and the Hunter region, ensuring documentation meets local council requirements while maintaining the design quality that distinguishes successful projects in a competitive market.",
        localBenefits: [
          'Experience managing design teams on Newcastle projects, including coordinating local and Sydney-based consultants to ensure documentation reflects local construction conditions and council expectations.',
          'Understanding of Newcastle\'s heritage and character controls, particularly in the city centre and established residential suburbs, where design management must balance conservation requirements with project viability.',
          'Coordination of design documentation for Newcastle council assessment, including compliance with the Newcastle Development Control Plan and specific requirements for development in urban renewal precincts.',
          'Proactive management of design scope and budget in a market where construction costs are lower than Sydney but where specialist subcontractors and materials may need to be sourced from outside the region.',
        ],
        relatedCaseStudies: [
          'project-management-delivery-in-the-final-stretch-newcastle-office-fit-out',
          'health-project-management-in-regional-emergency-infrastructure',
        ],
        localCta: 'Discuss your Newcastle project',
      },
      'da-approval': {
        localDescription:
          "Securing DA approval in Newcastle and the Hunter region is generally more straightforward than in Sydney, but it comes with its own complexities -- particularly around heritage conservation areas, flood-prone land in the Hunter Valley, and the specific requirements of City of Newcastle's urban renewal zones. We manage DA processes across the Hunter region, working with local planning consultants and council officers to move applications through assessment efficiently and without unnecessary conditions.",
        localBenefits: [
          'Working knowledge of City of Newcastle, Lake Macquarie, and Maitland council planning processes, including each council\'s assessment culture, typical timeframes, and preferred approaches to pre-lodgement engagement.',
          'Experience with DA requirements specific to the Hunter region: mine subsidence considerations, flood planning level assessments, heritage impact statements for Newcastle\'s conservation areas, and coastal hazard mapping in Lake Macquarie.',
          'Coordination of planning consultants, environmental assessors, and traffic engineers familiar with Newcastle and Hunter region conditions, ensuring submissions address local issues rather than applying generic metropolitan approaches.',
          'Strategic approach to navigating Newcastle\'s urban renewal planning controls, including bonus floor space provisions, design excellence requirements, and the interaction between State Environmental Planning Policies and the Newcastle LEP.',
        ],
        relatedCaseStudies: [
          'strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney',
          'granville-diggers-club-development',
        ],
        localCta: 'Discuss your Newcastle DA',
      },
      'tender-assessment': {
        localDescription:
          "The Newcastle construction market is smaller and more relationship-driven than Sydney's, which creates both advantages and risks for developers running tender processes. A smaller pool of capable contractors means procurement strategy matters more -- getting the right builder engaged early can make or break a project. Our tender assessment service helps Newcastle and Hunter region clients evaluate contractor submissions with the same rigour we apply to Sydney tenders, while accounting for the regional market dynamics that affect pricing, availability, and delivery capability.",
        localBenefits: [
          'Knowledge of the Newcastle and Hunter region contractor market, including which builders have capacity and experience in specific sectors -- commercial fitout, residential, health, and institutional -- and their track records on recent local projects.',
          'Tender analysis that accounts for regional pricing dynamics: lower labour rates than Sydney offset by higher mobilisation costs for specialist trades, material transport logistics, and the availability of local subcontractors in key trades.',
          'Assessment of program realism for Newcastle projects, factoring in regional construction conditions including weather impacts, local workforce availability, and supply chain dependencies on Sydney-based suppliers and fabricators.',
          'Independent evaluation that helps Newcastle clients negotiate fair commercial terms in a market where builder-client relationships are often long-standing and independent assessment brings discipline to procurement decisions.',
        ],
        relatedCaseStudies: [
          'project-management-delivery-in-the-final-stretch-newcastle-office-fit-out',
          'navigating-encumbrance-vibe-hotel-darling-harbour',
        ],
        localCta: 'Discuss your Newcastle tender',
      },
      'construction-superintendent': {
        localDescription:
          "Superintending construction in Newcastle and the Hunter region demands practical experience with regional construction conditions -- from managing subcontractor availability in a smaller market to coordinating with local councils on conditions of consent that differ from metropolitan Sydney. We provide experienced site leadership for Newcastle projects, bringing Sydney-level rigour to program management, quality control, and client advocacy while understanding the realities of building in a regional market where relationships and local knowledge matter.",
        localBenefits: [
          'Site leadership experienced with Newcastle and Hunter region construction conditions, including managing projects where specialist subcontractors travel from Sydney, coordinating around weather events, and working within regional workforce availability constraints.',
          'Understanding of City of Newcastle construction requirements, including conditions of consent for urban sites, traffic management plans for CBD locations, and environmental management during construction adjacent to the harbour and waterfront.',
          'Quality control that draws on our architectural background to assess construction against design intent -- particularly important in Newcastle where adaptive reuse and heritage-adjacent projects require careful detailing and material selection.',
          'Client representation on Newcastle projects where we act as independent eyes and ears on site, providing the same level of superintendent oversight that developers expect on Sydney projects but adapted to regional construction dynamics.',
        ],
        relatedCaseStudies: [
          'project-management-delivery-in-the-final-stretch-newcastle-office-fit-out',
          'health-project-management-in-regional-emergency-infrastructure',
        ],
        localCta: 'Discuss your Newcastle build',
      },
    },
  },
]

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug)
}

export function getAllLocations(): LocationData[] {
  return locations
}

export function getAllServiceLocationParams(): Array<{
  slug: string
  location: string
}> {
  const services = getAllServices()
  return locations.flatMap((loc) =>
    services.map((svc) => ({ slug: svc.slug, location: loc.slug }))
  )
}
