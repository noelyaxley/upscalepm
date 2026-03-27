import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { BlurFade } from '@/components/animation/blur-fade'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/components/seo/schemas'
import { ResourceDownloadForm } from '@/components/resources/resource-download-form'
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Club Redevelopment Risk Checklist — Top 25 Risks',
  description:
    'The top 25 risks that derail club redevelopments in NSW — and how to manage them. Covering financial, governance, construction, planning, and operational risks specific to registered clubs.',
  path: '/resources/risk-checklist',
})

const financialRisks = [
  {
    number: 1,
    title: 'Construction Cost Blowouts',
    description:
      'Variations and unforeseen site conditions typically add 10-25% to base costs. Common triggers: underground utilities discovery, contaminated soil, structural defects, design changes, scope creep, labour cost escalation.',
    mitigation: [
      'Detailed site investigations (Phase 2 ESA, geotechnical, asbestos surveys)',
      'Fixed-price contracts with clear variation procedures',
      'Provisional sum discipline',
    ],
  },
  {
    number: 2,
    title: 'Revenue Loss During Construction',
    description:
      'Gaming machine revenue, venue hire, and food & beverage income disrupted during construction phases. Major clubs see 30-60% revenue decline during key phases.',
    mitigation: [
      'Staging strategy that maintains operational areas',
      'Temporary gaming venues',
      'Phased closure planning and member communication campaign',
      'Alternative revenue streams',
    ],
  },
  {
    number: 3,
    title: 'Funding Gap / Shortfall',
    description:
      'Insufficient capital available when needed. Common triggers: construction delays extending facility loan periods, cost overruns depleting reserves, revenue underperformance, bank refinancing delays.',
    mitigation: [
      '20-30% contingency reserve',
      'Pre-approved credit lines',
      'Staged funding tied to milestones',
      'Quarterly reforecasting',
    ],
  },
  {
    number: 4,
    title: 'Financing Costs Escalation',
    description:
      'Interest rates rise during extended construction periods (typical 24-36 months). Each 1% rate increase adds ~$500K-$1.2M interest on a $20M project.',
    mitigation: [
      'Fixed-rate facility loans',
      'Interest rate hedging',
      'Accelerated completion incentives',
      'Construction program buffer',
    ],
  },
  {
    number: 5,
    title: 'Member Lending Restrictions',
    description:
      'Registered Clubs Act (s.29) restricts member loans and guarantees. Legacy member loans may be called or renegotiated.',
    mitigation: [
      'Review member finance agreements 12+ months pre-project',
      'Secure bank financing not reliant on member support',
      'Legal review of ILGA (Registered Clubs) Regulation 2009 restrictions',
    ],
  },
  {
    number: 6,
    title: 'Asset Devaluation Risk',
    description:
      'If the project stalls or a market downturn occurs, the club\'s security position weakens and asset-backed lending becomes problematic. Market changes in hospitality impact valuation.',
    mitigation: [
      'Staged asset security releases from lenders',
      'Completion guarantees',
      'Market risk analysis before commitment',
    ],
  },
]

const governanceRisks = [
  {
    number: 7,
    title: 'Board Turnover Mid-Project',
    description:
      'Key directors with project knowledge depart; replacement directors question decisions, lack context, slow approvals. Particularly risky with annual elections.',
    mitigation: [
      'Formal project governance structure',
      'Project steering committee separated from general board',
      'Documented decision rationale and director onboarding process',
      'Succession planning for project leadership',
    ],
  },
  {
    number: 8,
    title: 'Member Opposition',
    description:
      'Member base (50-2,000+ members) votes down project at AGM or special general meeting. Common triggers: perceived cost, concern about gaming floor disruption, disagreement with scope/design, inadequate consultation, fear of membership fee increases.',
    mitigation: [
      'Comprehensive member consultation (surveys, forums, newsletters)',
      'Transparent financial modelling',
      'Staged approval process',
      'Member benefits clearly articulated',
    ],
  },
  {
    number: 9,
    title: 'Inadequate Project Reporting',
    description:
      'Board receives insufficient or untimely information to make informed decisions. Monthly reports missing financial variance analysis, schedule variance, risk updates.',
    mitigation: [
      'Formal project dashboard (monthly P&L, budget vs. actual, schedule status, top 10 risks)',
      'Independent project monitor engaged by board',
      'Quarterly independent cost certification',
    ],
  },
  {
    number: 10,
    title: 'Conflicted Director Decisions',
    description:
      'Director has undisclosed interest (tenant, supplier, developer relationship, competitive business). Registered Clubs Act s.56 requires disclosure. Mishandled conflicts damage board credibility and expose the club to liability.',
    mitigation: [
      'Formal conflict register maintained',
      'External legal review of interests',
      'Recusal protocols clearly documented',
      'Board observer arrangements',
    ],
  },
  {
    number: 11,
    title: 'Inadequate Insurance Advice',
    description:
      'Board approves project without clear understanding of insurance implications. Professional indemnity of the design team, public liability limits, contractors\' insurance, defects liability insurance gaps.',
    mitigation: [
      'Insurance broker engaged at feasibility stage',
      'Insurance memorandum to board',
      'Risk transfer strategy documented',
      'Professional indemnity requirements in all consultant agreements',
    ],
  },
]

const constructionRisks = [
  {
    number: 12,
    title: 'Builder Insolvency',
    description:
      'Contractor becomes insolvent mid-construction; works cease, retention funds trapped, disputes over defects. Industry insolvency rate ~5-8% for mid-size builders during extended projects.',
    mitigation: [
      'Financial capacity assessment (audited financials, bank references, ASIC search)',
      'Bank guarantee (5-10% of contract value)',
      'Staged payment tied to independent certification',
      'Performance insurance policy',
    ],
  },
  {
    number: 13,
    title: 'Persistent Defects & Rework Costs',
    description:
      'Building defects discovered post-handover requiring costly remediation (roof leaks, waterproofing, mechanical systems, gaming machine infrastructure, liquor service compliance). Defects liability period (12 months typical) may not capture latent issues.',
    mitigation: [
      'Defects liability bond (10% contract value, extended 18-24 months)',
      'Independent defects inspector',
      'Mandatory rectification timelines with penalties',
      'Retention fund management (don\'t release final 5-10% until month 12 of operation)',
    ],
  },
  {
    number: 14,
    title: 'Variations Management Failure',
    description:
      'Uncontrolled variations blow out costs. Typical: design changes requested by the club, site conditions uncovered, specification upgrades. Variations can add 15-30% to the final cost if unmanaged.',
    mitigation: [
      'Formal variation procedure in contract (documented request, cost impact analysis, board approval threshold)',
      'Monthly variation report to board',
      'Design freeze date specified',
      'Contingency reserve clearly separated from variation budget',
    ],
  },
  {
    number: 15,
    title: 'Construction Program Delays',
    description:
      'Project exceeds programmed duration; extended financing costs, prolonged revenue loss, member dissatisfaction. Causes: weather, site logistics, material delays, design decisions, safety issues, coordination failures.',
    mitigation: [
      'Detailed critical path schedule with float analysis',
      'Weekly site meetings',
      'Performance incentives/disincentives (bonus for early completion, liquidated damages for delay)',
      'Risk contingency in program (10-15% float on critical activities)',
    ],
  },
  {
    number: 16,
    title: 'Staging Complexity Failure',
    description:
      'Multi-phase project inadequately sequenced; operational areas remain closed longer than planned, gaming floor revenue inaccessible, member facilities disrupted, safety risks from concurrent operations.',
    mitigation: [
      'Separate staging study (dedicated deliverable)',
      'Phasing strategy reviewed by independent operational consultant',
      'Temporary facilities cost budgeted upfront',
      'Member impact assessment for each phase',
    ],
  },
]

const planningRisks = [
  {
    number: 17,
    title: 'Development Approval Refusal or Costly Conditions',
    description:
      'Local Council refuses DA or imposes costly conditions (car parking upgrades, traffic improvements, community benefits, heritage modifications) derailing financial viability. Causes: heritage significance, neighbour objections, inadequate EIS, traffic/parking concerns.',
    mitigation: [
      'Pre-lodgement consultation (architect meets council planners, heritage advisor)',
      'Targeted community engagement',
      'Preliminary merit assessment by planning counsel',
      'EIS peer review before lodgement and appeal contingency budgeted',
    ],
  },
  {
    number: 18,
    title: 'Heritage Constraint Emergence',
    description:
      'Site listed on heritage register or located in conservation area; heritage approval adds cost and time. Registered Clubs Act s.8 specifies requirements for heritage matters.',
    mitigation: [
      'Heritage assessment at feasibility stage (NSW Heritage Office consultation)',
      'Heritage advisor engaged early',
      'Design budget includes heritage compliance costs',
      'Approval timeline includes heritage assessment period (6-12 weeks)',
    ],
  },
  {
    number: 19,
    title: 'Neighbour Objections & Litigation',
    description:
      'Neighbouring properties object to DA; objections lodged at council, potential legal challenge to development consent, project delayed 6-18 months. Causes: perceived loss of amenity, noise concerns, parking, privacy.',
    mitigation: [
      'Proactive neighbour consultation',
      'Impact assessment (noise, traffic)',
      'Community liaison committee',
      'Legal reserve for potential dispute and timeline contingency',
    ],
  },
  {
    number: 20,
    title: 'Regulatory Approval Delays',
    description:
      'Approvals cascade (DA, CDC, long service levy, s.7.11/7.12 contributions). Delays in any stage cascade. Typical: DA determination 3-6 months, CDC up to 3 months, contributions assessment 4-8 weeks.',
    mitigation: [
      'Parallel approval path planning',
      'Early engagement with consent authorities',
      'Documented approval tracking',
      'Contingency timeline (add 4-8 weeks to each stage)',
    ],
  },
]

const operationalRisks = [
  {
    number: 21,
    title: 'Gaming Floor Compliance Failure',
    description:
      'Gaming machine venue compliance disrupted during construction; liquor and gaming licence conditions breached; regulatory enforcement action (fine, suspension, licence conditions tightened). Common issues: machine removal/reinstallation requiring Liquor & Gaming NSW approval, venue capacity compliance during partial closure.',
    mitigation: [
      'Liquor & Gaming NSW pre-approval for construction methodology',
      'Gaming compliance review during design phase',
      'Temporary gaming venue approval obtained before closure',
      'Compliance audit at each operational phase transition',
    ],
  },
  {
    number: 22,
    title: 'Liquor Licence Impact',
    description:
      'Premises licence conditions (e.g., maximum occupancy, trading hours, patron profile restrictions) not updated to reflect new facilities; compliance issues post-opening. Licence renewal may impose new conditions.',
    mitigation: [
      'Liquor licence review with Liquor & Gaming NSW during design phase',
      'Licence modification application lodged pre-construction',
      'Renewal timing coordinated with opening date',
      'Compliance training for staff on new licence conditions',
    ],
  },
  {
    number: 23,
    title: 'Member Satisfaction & Retention Loss',
    description:
      'Members dissatisfied with disruption, venue closures, noise, temporary conditions; membership lapses increase, reducing post-project revenue forecast. Typical 5-15% member attrition during major redevelopment.',
    mitigation: [
      'Comprehensive member communication plan',
      'Temporary member benefits (discounts at other venues, event credits)',
      'Operational continuity priorities identified',
      'Regular member satisfaction surveys during construction',
    ],
  },
  {
    number: 24,
    title: 'Defects Discovered During Commissioning',
    description:
      'Building defects, systems failures, non-compliant work discovered during opening/commissioning phase. Requires rework under urgency; contractor disputes liability; defects liability period not yet running.',
    mitigation: [
      'Comprehensive pre-practical completion inspection (defects protocol in contract)',
      'Commissioning testing scheduled pre-opening (mechanical, electrical, gaming systems, kitchen, bar)',
      'Punch list management with contractor',
      'Retention fund protection until defects rectified',
    ],
  },
  {
    number: 25,
    title: 'Project Team Dysfunction',
    description:
      'Architect, builder, QS, PM fail to coordinate; communication breakdowns, finger-pointing on issues, poor decision-making, scope ambiguity. Typical in 24-36 month projects.',
    mitigation: [
      'Formal project governance structure',
      'Single point of authority (Project Director or Principal\'s Representative)',
      'Weekly coordination meetings (documented)',
      'Contract roles/responsibilities crystal clear with escalation protocol to board',
    ],
  },
]

interface Risk {
  number: number
  title: string
  description: string
  mitigation: string[]
}

function RiskCard({ risk }: { risk: Risk }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background p-6">
      <h3 className="text-lg font-bold">
        <span className="mr-2 text-primary">{risk.number}.</span>
        {risk.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {risk.description}
      </p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-foreground">Mitigation:</p>
        <ul className="mt-2 space-y-1">
          {risk.mitigation.map((step, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function CategorySection({
  icon: Icon,
  title,
  subtitle,
  risks,
  delay = 0,
}: {
  icon: typeof AlertTriangle
  title: string
  subtitle: string
  risks: Risk[]
  delay?: number
}) {
  return (
    <BlurFade delay={delay}>
      <div className="mt-16 first:mt-0">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
            <Icon className="size-5 text-white" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="space-y-4">
          {risks.map((risk) => (
            <RiskCard key={risk.number} risk={risk} />
          ))}
        </div>
      </div>
    </BlurFade>
  )
}

export default function RiskChecklistPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Resources', url: '/resources' },
          {
            name: 'Club Redevelopment Risk Checklist',
            url: '/resources/risk-checklist',
          },
        ])}
      />

      <PageHeader
        title="Club Redevelopment Risk Checklist"
        subtitle="The top 25 risks that derail club redevelopments in NSW — and how to manage every one of them."
        breadcrumbs={[
          { label: 'Resources', href: '/resources' },
          { label: 'Risk Checklist' },
        ]}
      />

      {/* Introduction + Download Form */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <BlurFade>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Club redevelopments in NSW are high-stakes capital projects.
                Boards are committing $5M-$30M+ of members&apos; funds over
                24-36 months, often while maintaining daily operations. The
                margin for error is thin.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                This checklist distils the risks we see repeatedly across club
                projects — the ones that blow budgets, stall timelines, and
                fracture boards. Each risk includes specific mitigation steps
                drawn from real project experience.
              </p>
              <p className="mt-4 font-semibold text-foreground">
                25 risks. 5 categories. Every one of them preventable with the
                right governance and advice.
              </p>
            </BlurFade>

            <BlurFade delay={0.1}>
              <div className="mt-10">
                <ResourceDownloadForm
                  resourceSlug="risk-checklist"
                  resourceTitle="Club Redevelopment Risk Checklist"
                  pdfPath="/resources/pdfs/club-redevelopment-risk-checklist.pdf"
                />
              </div>
            </BlurFade>
          </div>
        </Container>
      </Section>

      {/* Risk Categories */}
      <Section background="muted">
        <Container>
          <div className="mx-auto max-w-3xl">
            <CategorySection
              icon={AlertTriangle}
              title="Financial Risks"
              subtitle="6 risks — Budget blowouts, revenue disruption, and funding gaps"
              risks={financialRisks}
              delay={0.1}
            />

            <CategorySection
              icon={ShieldAlert}
              title="Governance Risks"
              subtitle="5 risks — Board turnover, member opposition, and reporting failures"
              risks={governanceRisks}
              delay={0.15}
            />

            <CategorySection
              icon={AlertTriangle}
              title="Construction Risks"
              subtitle="5 risks — Builder insolvency, defects, variations, and delays"
              risks={constructionRisks}
              delay={0.2}
            />

            <CategorySection
              icon={ShieldAlert}
              title="Planning & Approvals Risks"
              subtitle="4 risks — DA refusal, heritage constraints, and regulatory delays"
              risks={planningRisks}
              delay={0.25}
            />

            <CategorySection
              icon={CheckCircle2}
              title="Operational Risks"
              subtitle="5 risks — Gaming compliance, liquor licensing, and member retention"
              risks={operationalRisks}
              delay={0.3}
            />
          </div>
        </Container>
      </Section>

      {/* Bottom Download Form */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <BlurFade>
              <h2 className="text-center text-2xl font-bold tracking-tight">
                Download the Full Checklist as PDF
              </h2>
              <p className="mt-3 text-center text-muted-foreground">
                Keep this on hand for your next board meeting. Print it, share it
                with your directors, and use it to pressure-test your project
                plan.
              </p>
            </BlurFade>
            <BlurFade delay={0.1}>
              <div className="mt-8">
                <ResourceDownloadForm
                  resourceSlug="risk-checklist"
                  resourceTitle="Club Redevelopment Risk Checklist"
                  pdfPath="/resources/pdfs/club-redevelopment-risk-checklist.pdf"
                />
              </div>
            </BlurFade>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Need Help Assessing Your Project&apos;s Risk Profile?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              A checklist identifies the risks. An experienced advisor helps you
              manage them. If your club is planning or mid-way through a
              redevelopment, we can review your project&apos;s specific risk
              exposure — no obligation.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Book a Free Consultation</Link>
              </Button>
            </div>
          </div>
        </BlurFade>
      </Section>
    </>
  )
}
