import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animation/blur-fade'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Major Club Redevelopments in NSW',
  description:
    'A directory of major club redevelopment projects across NSW. RSL, Leagues, Workers, Diggers, Bowling and Golf club projects — tracking activity across the industry.',
  path: '/nsw-club-redevelopments',
})

type Project = {
  club: string
  location: string
  value: string
  type: string
  status: string
  architect?: string
  builder?: string
}

const majorProjects: Project[] = [
  {
    club: 'Castle Hill RSL',
    location: 'Castle Hill',
    value: '$340M',
    type: 'Seniors Living + Memorial',
    status: 'Planning',
    architect: 'TBC',
  },
  {
    club: 'Club Burwood RSL',
    location: 'Burwood',
    value: '$209M',
    type: 'Mixed-Use Club + Basement',
    status: 'DA Approved',
  },
  {
    club: 'Harbord Diggers',
    location: 'Freshwater',
    value: '$200M',
    type: 'Mixed-Use + Seniors Living',
    status: 'Stage 1 Complete',
  },
  {
    club: 'Chatswood RSL',
    location: 'Chatswood',
    value: '$160-200M',
    type: 'Tower + Club',
    status: 'DA Approved — Seeking JV',
    architect: 'Nettleton Tribe',
  },
  {
    club: 'Canterbury League Club',
    location: 'Belmore',
    value: '$106M',
    type: 'Full Redevelopment',
    status: 'Completed',
    architect: 'Altis Architecture',
  },
  {
    club: 'Bankstown RSL',
    location: 'Bankstown',
    value: '$100M+',
    type: 'Club + Hotel (240 rooms)',
    status: 'Completed',
    architect: 'Altis Architecture',
  },
  {
    club: 'Revesby Workers Club',
    location: 'Revesby',
    value: '$96.7M',
    type: 'Retail + Medical + Entertainment',
    status: 'Completed',
  },
  {
    club: 'Kogarah RSL (Veridian)',
    location: 'Kogarah',
    value: '$80M',
    type: 'Residential Development',
    status: 'Completed',
  },
  {
    club: 'Forestville RSL',
    location: 'Forestville',
    value: '$77M',
    type: 'New Club + 39 Seniors ILUs',
    status: 'DA Lodged',
    architect: 'Quattro Architecture',
  },
  {
    club: 'Dee Why RSL (Stage 5)',
    location: 'Dee Why',
    value: '$55M',
    type: 'Major Refurbishment',
    status: 'Completed',
  },
  {
    club: 'Gosford RSL',
    location: 'West Gosford',
    value: '$50M',
    type: 'Full Redevelopment',
    status: 'Completed 2024',
    architect: 'WMK Architecture',
  },
  {
    club: 'Balmain Leagues (Rozelle Village)',
    location: 'Rozelle',
    value: '~$500M GRV',
    type: '147 Apartments + Retail + Club',
    status: 'Under Construction',
    architect: 'Scott Carver',
  },
  {
    club: 'Bondi Junction RSL',
    location: 'Bondi Junction',
    value: 'TBC',
    type: '10 Storey + 78 Apartments + Club',
    status: 'Approved',
  },
  {
    club: 'Petersham RSL',
    location: 'Petersham',
    value: 'TBC',
    type: '357 Apartments + 3,500sqm Club',
    status: 'Under Construction',
  },
  {
    club: 'Cessnock Leagues Club',
    location: 'Cessnock',
    value: 'TBC',
    type: 'Full Redevelopment',
    status: 'Under Construction',
    architect: 'Altis Architecture',
  },
  {
    club: 'Pittwater RSL',
    location: 'Mona Vale',
    value: '$7.5M',
    type: 'Staged Refurbishment',
    status: 'In Progress',
  },
  {
    club: 'Westport Club',
    location: 'Port Macquarie',
    value: '$10M',
    type: 'Refurbishment',
    status: 'Completed',
  },
  {
    club: 'Granville Diggers Club',
    location: 'Granville',
    value: '$4-5M',
    type: 'Heritage Refurbishment',
    status: 'Tender / Pre-Construction',
    architect: 'GeriesPayne',
  },
]

const marketStats = [
  { label: 'Licensed Clubs in NSW', value: '1,200+' },
  { label: 'Redevelopments Per Year', value: '170-275' },
  { label: 'Annual Capital Expenditure', value: '$2-4B' },
  { label: 'Industry Revenue', value: '$7B' },
]

export default function NSWClubRedevelopmentsPage() {
  return (
    <>
      <PageHeader
        title="Major Club Redevelopments in NSW"
        subtitle="Tracking significant club redevelopment projects across New South Wales — RSL, Leagues, Workers, Diggers, Bowling and Golf clubs."
        breadcrumbs={[{ label: 'NSW Club Redevelopments' }]}
      />

      {/* Market stats */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              The NSW Club Industry
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {marketStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border-2 border-primary/20 bg-primary/5 p-5 text-center"
                >
                  <p className="text-2xl font-bold text-primary md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Sources: ClubsNSW, Clubs Australia, Club Management Magazine.
              Estimates based on industry reporting and publicly available data.
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* Projects table */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Notable Projects
            </h2>
            <p className="mt-2 text-muted-foreground">
              Major club redevelopment projects across NSW. This list is not
              exhaustive — it represents publicly reported projects.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 pr-4">Club</th>
                    <th className="pb-3 pr-4">Location</th>
                    <th className="pb-3 pr-4">Value</th>
                    <th className="hidden pb-3 pr-4 md:table-cell">Type</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="hidden pb-3 lg:table-cell">Architect</th>
                  </tr>
                </thead>
                <tbody>
                  {majorProjects.map((project) => (
                    <tr
                      key={`${project.club}-${project.location}`}
                      className="border-b border-border/50 transition-colors hover:bg-primary/5"
                    >
                      <td className="py-3 pr-4 font-medium">
                        {project.club}
                        {project.club === 'Granville Diggers Club' && (
                          <Link
                            href="/case-studies/granville-diggers-club-development"
                            className="ml-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            Our project
                            <ExternalLink className="size-3" />
                          </Link>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {project.location}
                      </td>
                      <td className="py-3 pr-4 font-medium">{project.value}</td>
                      <td className="hidden py-3 pr-4 text-muted-foreground md:table-cell">
                        {project.type}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            project.status.includes('Completed')
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : project.status.includes('Construction') ||
                                  project.status.includes('Progress')
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : project.status.includes('Approved') ||
                                    project.status.includes('Tender')
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                                  : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="hidden py-3 text-muted-foreground lg:table-cell">
                        {project.architect ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Industry context */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Industry Trends Driving Redevelopment
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                The NSW club industry is undergoing significant transformation.
                While the total number of clubs is slowly declining through
                consolidation, the remaining clubs are investing heavily in
                redevelopment — driven by aging facilities, diversification away
                from gaming revenue dependence, and growing demand for
                hospitality-quality dining and entertainment.
              </p>
              <p>
                Major regulatory changes including the NSW Government&apos;s
                cashless gaming reforms (mandated by December 2028), reduced
                gaming machine entitlements, and enhanced harm minimisation
                requirements are accelerating the shift toward mixed-use
                developments that combine club facilities with seniors living,
                retail, medical, and residential components.
              </p>
              <p>
                For club boards, this means redevelopment decisions are becoming
                more complex and consequential. The projects are larger, the
                regulatory requirements are tighter, and the financial stakes are
                higher. Independent advisory has never been more important.
              </p>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Key architects */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Key Architecture Firms in the Sector
            </h2>
            <p className="mt-2 text-muted-foreground">
              These firms are frequently involved in club redevelopment projects
              across NSW.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  name: 'Altis Architecture',
                  note: '26+ years specialising in club design. Canterbury Leagues, Bankstown RSL, Cessnock Leagues.',
                },
                {
                  name: 'WMK Architecture',
                  note: 'Hospitality and destination design. Gosford RSL ($50M redevelopment).',
                },
                {
                  name: 'Bergstrom Architects',
                  note: 'Hotels, hospitality, clubs. Listed on ClubsNSW Business Directory.',
                },
                {
                  name: 'BSPN Architecture',
                  note: '35+ years hospitality experience. ClubsNSW listed.',
                },
                {
                  name: 'Red Design Group',
                  note: 'Retail and hospitality interiors. Earlwood BP RSL, Club Mulwala.',
                },
                {
                  name: 'GroupGSA',
                  note: 'Integrated design practice. Hospitality and large-scale venue projects.',
                },
              ].map((firm) => (
                <div
                  key={firm.name}
                  className="rounded-lg border bg-background p-4"
                >
                  <h3 className="font-semibold">{firm.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {firm.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
              Is Your Club Planning a Redevelopment?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              We provide independent advisory for club redevelopments at every
              stage. Book a free consultation to discuss your project.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-neutral-400 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/for-club-boards">Advice for Club Boards</Link>
              </Button>
            </div>
          </div>
        </BlurFade>
      </Section>
    </>
  )
}
