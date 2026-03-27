import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animation/blur-fade'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/components/seo/schemas'
import { ResourceDownloadForm } from '@/components/resources/resource-download-form'

export const metadata: Metadata = generatePageMetadata({
  title: 'Club Capital Works Budget Template',
  description:
    'A comprehensive line-item budget framework for club redevelopments. Covers land, planning, professional fees, construction, fitout, contingencies, financing, insurance, and project admin with real cost ranges.',
  path: '/resources/budget-template',
})

/* ------------------------------------------------------------------ */
/*  Table helper                                                       */
/* ------------------------------------------------------------------ */

function BudgetTable({
  headers,
  rows,
  caption,
}: {
  headers: string[]
  rows: string[][]
  caption?: string
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        {caption && (
          <caption className="bg-muted/60 px-4 py-2 text-left text-xs font-medium text-muted-foreground">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b bg-muted/40">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={
                i % 2 === 0
                  ? 'bg-background'
                  : 'bg-muted/20'
              }
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${j === 0 ? 'font-medium' : 'text-muted-foreground'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */

function SectionHeading({
  id,
  label,
  title,
  allocation,
}: {
  id: string
  label: string
  title: string
  allocation: string
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">
        {label}
      </p>
      <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{allocation}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BudgetTemplatePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: 'Budget Template', url: '/resources/budget-template' },
        ])}
      />

      <PageHeader
        title="Club Capital Works Budget Template"
        subtitle="A comprehensive line-item budget framework for club redevelopments covering every cost category from land acquisition through to opening night."
        breadcrumbs={[
          { label: 'Resources', href: '/resources' },
          { label: 'Budget Template' },
        ]}
      />

      {/* Intro + Download Form */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Most club budgets understate the true cost of a redevelopment. They
              omit line items that don&apos;t appear until the project is
              underway — interest during construction, Long Service Levy,
              developer contributions, temporary member facilities, and
              commissioning costs. This template covers all of them.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              The cost ranges below are benchmarked against a <strong>$12M
              project</strong> (a typical mid-scale club redevelopment in NSW as
              of 2026). Adjust proportionally for your project scale — see the
              assumptions section for guidance on smaller and larger projects.
            </p>

            <div className="mt-8">
              <ResourceDownloadForm
                resourceSlug="budget-template"
                resourceTitle="Club Capital Works Budget Template"
                pdfPath="/resources/pdfs/club-capital-works-budget-template.pdf"
              />
            </div>

            {/* Quick nav */}
            <nav className="mt-10 rounded-lg border bg-muted/30 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Jump to section
              </p>
              <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2 md:grid-cols-3">
                {[
                  { id: 'land-site', label: 'A. Land & Site' },
                  { id: 'planning', label: 'B. Planning & Approvals' },
                  { id: 'fees', label: 'C. Professional Fees' },
                  { id: 'construction', label: 'D. Construction Costs' },
                  { id: 'fitout', label: 'E. Fitout & FF&E' },
                  { id: 'contingencies', label: 'F. Contingencies' },
                  { id: 'financing', label: 'G. Financing' },
                  { id: 'insurance', label: 'H. Insurance & Legal' },
                  { id: 'admin', label: 'I. Project Admin' },
                  { id: 'summary', label: 'Summary' },
                  { id: 'assumptions', label: 'Assumptions' },
                ].map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION A: LAND & SITE                                       */}
      {/* ============================================================ */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionHeading
              id="land-site"
              label="Section A"
              title="Land & Site Costs"
              allocation="Typical allocation: 0-5% of project (0-2% for existing club sites)"
            />
            <BudgetTable
              headers={['Line Item', 'Cost Range', 'Notes']}
              rows={[
                [
                  'Land/property acquisition',
                  'As required',
                  'Applies only if purchasing adjacent land. For existing club property, use land valuation for financial reporting.',
                ],
                [
                  'Demolition of existing structures',
                  '$500K\u2013$2M+',
                  'Varies by size/complexity. Asbestos removal, hazmat disposal, staged demolition if maintaining operations. Include site clearing, utilities disconnection.',
                ],
                [
                  'Contaminated site remediation',
                  '$100K\u2013$1M+',
                  'Phase 2 ESA may identify contamination; remediation required before construction. Variable based on contamination type.',
                ],
                [
                  'Site investigation & surveys',
                  '$80K\u2013$150K',
                  'Geotechnical, utility mapping, contamination assessment, heritage surveys, topographical surveys.',
                ],
                [
                  'Environmental approvals (if applicable)',
                  '$20K\u2013$100K',
                  'EIS preparation, biodiversity assessment, water management.',
                ],
              ]}
            />
            <p className="text-sm font-semibold">
              Typical allocation for $12M project:{' '}
              <span className="text-primary">$400K\u2013$800K (3\u20137%)</span>
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION B: PLANNING & APPROVALS                              */}
      {/* ============================================================ */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionHeading
              id="planning"
              label="Section B"
              title="Planning & Approvals"
              allocation="Typical allocation: 2-4% of project"
            />
            <BudgetTable
              headers={['Line Item', 'Cost Range', 'Notes']}
              rows={[
                [
                  'Development Application lodgement fees',
                  '$30K\u2013$80K',
                  'Council DA fee + planning appeal bonds. Scales with project size/complexity.',
                ],
                [
                  'BASIX certification',
                  '$5K\u2013$15K',
                  'Building Sustainability Index compliance.',
                ],
                [
                  'Accessibility compliance review',
                  '$10K\u2013$25K',
                  'Disability Discrimination Act, BCA Section D3 compliance.',
                ],
                [
                  'Long Service Levy (s.34 EP&A Act)',
                  '$80K\u2013$200K+',
                  '0.4% of construction cost for projects >$25M or public facilities. 0.6% for regional areas. Calculated on final construction estimate.',
                ],
                [
                  's.7.11/7.12 Contributions',
                  '$200K\u2013$800K+',
                  'Calculated by council based on project type/scale. Varies by LGA; can be significant (5\u20138% of construction for some councils).',
                ],
                [
                  'Heritage assessment & approval (if applicable)',
                  '$40K\u2013$120K',
                  'Heritage NSW consultation, heritage impact statement, conservation plan.',
                ],
              ]}
            />
            <p className="text-sm font-semibold">
              Typical allocation for $12M project:{' '}
              <span className="text-primary">
                $365K\u2013$1.24M (3\u201310%, higher in urban councils with
                high contributions)
              </span>
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION C: PROFESSIONAL FEES                                 */}
      {/* ============================================================ */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionHeading
              id="fees"
              label="Section C"
              title="Professional Fees"
              allocation="Typical allocation: 8-14% of project"
            />
            <BudgetTable
              headers={['Line Item', 'Fee %', '$ on $12M Build', 'Notes']}
              rows={[
                [
                  'Architecture',
                  '3\u20135%',
                  '$360K\u2013$600K',
                  'Concept 10%, schematic 20%, detailed 30%, documentation 20%, administration 20%. Includes heritage architect if required.',
                ],
                [
                  'Structural Engineering',
                  '0.8\u20131.2%',
                  '$96K\u2013$144K',
                  'Detailed design through construction stage.',
                ],
                [
                  'Building Services (M/E/P)',
                  '1.2\u20131.8%',
                  '$144K\u2013$216K',
                  'HVAC, electrical, hydraulic services. Gaming machine power/networking adds complexity.',
                ],
                [
                  'Project Manager',
                  '1.5\u20132.5%',
                  '$180K\u2013$300K',
                  'Monthly retainer or lump sum. Typically 24\u201336 month engagement. Includes board reporting.',
                ],
                [
                  'Quantity Surveyor',
                  '0.8\u20131.2%',
                  '$96K\u2013$144K',
                  'Cost planning, tender documentation, contract administration, variation assessment, final account negotiation. Critical role.',
                ],
                [
                  'Heritage Advisor (if required)',
                  '0.5\u20131%',
                  '$60K\u2013$120K',
                  'Design compliance, DA support, condition surveys.',
                ],
                [
                  'Town Planner',
                  '0.3\u20130.7%',
                  '$36K\u2013$84K',
                  'DA preparation, council consultation, pre-lodgement support.',
                ],
                [
                  'Building Code Compliance Consultant',
                  '0.2\u20130.5%',
                  '$24K\u2013$60K',
                  'NCC/BCA advice, certification.',
                ],
                [
                  'Acoustician (if applicable)',
                  '0.1\u20130.3%',
                  '$12K\u2013$36K',
                  'Gaming floor, venue noise mitigation, neighbour impact.',
                ],
                [
                  'Other specialists',
                  '0.2\u20130.5%',
                  '$24K\u2013$60K',
                  'Geotechnical, arborist, etc. As required per site conditions.',
                ],
              ]}
            />
            <p className="text-sm font-semibold">
              Typical allocation for $12M project:{' '}
              <span className="text-primary">
                $1.032M\u2013$1.764M (8.6\u201314.7%)
              </span>
            </p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Fee negotiation notes
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  &bull; Architects often operate on a sliding scale (lower % for
                  larger projects)
                </li>
                <li>
                  &bull; PM fee may be a fixed retainer ($20K\u2013$35K/month)
                  rather than percentage
                </li>
                <li>
                  &bull; QS fees are often competitive; obtain 3 quotes
                </li>
                <li>
                  &bull; Combined consultant fee typically 9\u201312% for $10M+
                  projects
                </li>
              </ul>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION D: CONSTRUCTION COSTS                                */}
      {/* ============================================================ */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionHeading
              id="construction"
              label="Section D"
              title="Construction Costs (Base Build)"
              allocation="Typical allocation: 70-80% of project"
            />
            <BudgetTable
              headers={['Line Item', 'Cost Range/sqm', '$ Amount', 'Notes']}
              rows={[
                [
                  'Preliminaries',
                  '8\u201315% of build',
                  '$864K\u2013$1.62M',
                  'Site management, temporary works, site facilities, administration, project documentation, indemnity insurance, contractor\u2019s margin.',
                ],
                [
                  'Demolition (structural)',
                  '$150\u2013$300/sqm',
                  '$180K\u2013$360K',
                  'Assumes ~1,200 sqm demolition area. Asbestos/hazmat removals add 30\u201350%.',
                ],
                [
                  'Excavation & Earthworks',
                  '$50\u2013$120/sqm',
                  '$60K\u2013$144K',
                  'Site preparation, basement/undercroft if required.',
                ],
                [
                  'Structural Frame',
                  '$400\u2013$700/sqm',
                  '$480K\u2013$840K',
                  'Reinforced concrete or steel frame. Gaming floor structural requirements may add 5\u201310%.',
                ],
                [
                  'External Envelopes',
                  '$300\u2013$500/sqm',
                  '$360K\u2013$600K',
                  'Facades, windows, roofing, weatherproofing. Heritage requirements may increase cost 10\u201320%.',
                ],
                [
                  'Internal Walls & Partitions',
                  '$80\u2013$150/sqm',
                  '$96K\u2013$180K',
                  'Includes door frames, door sets, partition hardware. Gaming floor sound/vibration isolation adds cost.',
                ],
                [
                  'Flooring',
                  '$100\u2013$200/sqm',
                  '$120K\u2013$240K',
                  'Varies by area type (gaming polished concrete, dining timber, kitchens epoxy).',
                ],
                [
                  'Ceilings & Finishes',
                  '$60\u2013$120/sqm',
                  '$72K\u2013$144K',
                  'Suspended ceilings, plasterboard, acoustic panels, fire-rated treatments.',
                ],
                [
                  'Painting & Decorative',
                  '$30\u2013$60/sqm',
                  '$36K\u2013$72K',
                  'All areas painted/finished.',
                ],
                [
                  'Bathroom & WC Fitout',
                  '$40\u2013$80/sqm',
                  '$48K\u2013$96K',
                  'Sanitary ware, tiling, mirrors, accessories. Code compliance for accessibility.',
                ],
                [
                  'Mechanical Systems (HVAC)',
                  '$80\u2013$150/sqm',
                  '$96K\u2013$180K',
                  'Ducting, units, controls. Gaming venues require high air change rates.',
                ],
                [
                  'Electrical Installation',
                  '$90\u2013$160/sqm',
                  '$108K\u2013$192K',
                  'Full power distribution, lighting, emergency systems. Gaming machine power circuits, bar POS systems.',
                ],
                [
                  'Hydraulic Services (Plumbing)',
                  '$50\u2013$100/sqm',
                  '$60K\u2013$120K',
                  'Pipes, fixtures, waste management, water pressure systems, kitchen requirements.',
                ],
                [
                  'Fire Safety Systems',
                  '$60\u2013$120/sqm',
                  '$72K\u2013$144K',
                  'Sprinklers (mandatory in 1,200+ sqm buildings), fire detection, emergency lighting, signage.',
                ],
                [
                  'Data & Communications',
                  '$40\u2013$80/sqm',
                  '$48K\u2013$96K',
                  'Network cabling, security systems, CCTV, access control, gaming machine comms, WiFi.',
                ],
                [
                  'Vertical Transport',
                  '$300K\u2013$600K (fixed)',
                  '$300K\u2013$600K',
                  'Elevators, escalators if required. Costly line item; evaluate necessity.',
                ],
                [
                  'Temporary Works During Construction',
                  '$150K\u2013$400K (line item)',
                  '$150K\u2013$400K',
                  'Site hoardings, false floors, temporary access, temporary utilities, staging facilities.',
                ],
              ]}
            />
            <p className="text-sm font-semibold">
              Typical allocation for $12M project:{' '}
              <span className="text-primary">$8.4M\u2013$9.6M (70\u201380%)</span>
            </p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Cost estimation notes
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  &bull; Gaming floor specification: $500\u2013$800/sqm (higher
                  due to power, ventilation, structural)
                </li>
                <li>
                  &bull; Kitchen facilities: $1,000\u2013$2,000/sqm (high-end
                  fitout)
                </li>
                <li>&bull; Dining/bar areas: $400\u2013$600/sqm</li>
                <li>
                  &bull; Administrative/back-of-house: $250\u2013$400/sqm
                </li>
                <li>
                  &bull; Basement/undercroft (if included): adds 20\u201340% to
                  project cost
                </li>
                <li>
                  &bull; Regional projects typically 10\u201315% cheaper than
                  Sydney metro
                </li>
              </ul>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION E: FITOUT & FF&E                                     */}
      {/* ============================================================ */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionHeading
              id="fitout"
              label="Section E"
              title="Fitout & FF&E"
              allocation="Typical allocation: 7-12% of project"
            />
            <BudgetTable
              headers={['Line Item', 'Cost Range', 'Notes']}
              rows={[
                [
                  'Gaming Machines & Installation',
                  '$800K\u2013$2M',
                  'Average $20K\u2013$30K per machine (50\u201380 machines). Supplier installation, power, networking, compliance testing. Liquor & Gaming NSW approval required.',
                ],
                [
                  'Bar Equipment',
                  '$150K\u2013$300K',
                  'Bottle displays, fridges, POS terminals, optics, glassware, furniture.',
                ],
                [
                  'Kitchen Equipment',
                  '$300K\u2013$600K',
                  'Commercial cooking equipment, hood systems, walk-ins, prep benches, dishwashers. High-specification kitchens for multi-outlet clubs.',
                ],
                [
                  'Dining Furniture',
                  '$200K\u2013$400K',
                  'Tables, chairs, lounge suites (for gaming/dining areas). Specify gaming floor furniture for durability.',
                ],
                [
                  'Audio/Visual & Entertainment Systems',
                  '$150K\u2013$350K',
                  'Sound systems, projection screens, LED displays, lighting rigs. Gaming floor TVs (typically 8\u201315 screens, ~$40K\u2013$60K).',
                ],
                [
                  'Reception/Admin Furniture & Fittings',
                  '$80K\u2013$150K',
                  'Desks, filing, signage, access control, membership systems, security monitors.',
                ],
                [
                  'Kitchen Crockery/Glassware (Opening Stock)',
                  '$40K\u2013$80K',
                  'Plates, glasses, cutlery, pots, pans, utensils for all outlets. 60\u201370% of capacity stock.',
                ],
                [
                  'Gaming Compliance Systems',
                  '$50K\u2013$100K',
                  'Responsible gambling signage, age verification equipment, staff training materials, player tracking systems, EGM management software licenses.',
                ],
                [
                  'Liquor Storage & Compliance',
                  '$60K\u2013$120K',
                  'Wine racks, bottle storage, cellaring systems, security systems.',
                ],
                [
                  'Soft Furnishings',
                  '$80K\u2013$150K',
                  'Curtains, carpets, rugs, artwork, decoration, lighting fixtures beyond base build.',
                ],
                [
                  'Plant Room Equipment',
                  '$100K\u2013$200K',
                  'Boilers, tanks, pumps, generators (if backup power), meters, control systems.',
                ],
              ]}
            />
            <p className="text-sm font-semibold">
              Typical allocation for $12M project:{' '}
              <span className="text-primary">
                $840K\u2013$1.44M (7\u201312%)
              </span>
            </p>
            <p className="text-sm italic text-muted-foreground">
              FF&E timing note: Typically ordered 6\u20139 months before
              practical completion; long-lead items (gaming machines, kitchen
              equipment) ordered early.
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION F: CONTINGENCIES                                     */}
      {/* ============================================================ */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionHeading
              id="contingencies"
              label="Section F"
              title="Contingencies"
              allocation="Varies by project stage"
            />
            <BudgetTable
              headers={[
                'Contingency Type',
                'Amount',
                'Timing',
                'Usage Rules',
              ]}
              rows={[
                [
                  'Design Contingency',
                  '10\u201315% of estimated costs',
                  'Feasibility through detailed design',
                  'Covers design development, specification upgrades, scope clarifications discovered during design. Released at construction tender stage.',
                ],
                [
                  'Construction Contingency',
                  '8\u201312% of contract value',
                  'Active during construction',
                  'Manages variations, unforeseen conditions, minor scope changes. Controlled by QS; typically 50% released at 50% progress, balance at practical completion if unused.',
                ],
                [
                  'Client/Overall Contingency',
                  '5\u20138% of total project cost',
                  'Entire project duration',
                  'Covers items beyond design/construction (e.g., regulatory costs, fee escalation, inflation). Managed by board; release requires board approval.',
                ],
              ]}
            />
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-bold">
                Total contingency pool for $12M project:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  &bull; Design contingency: $1.2M\u2013$1.8M (released as
                  project enters construction)
                </li>
                <li>
                  &bull; Construction contingency: $960K\u2013$1.44M (held
                  throughout construction, typically 70\u201380% returned
                  post-completion)
                </li>
                <li>
                  &bull; Client contingency: $600K\u2013$960K (board-managed
                  reserve)
                </li>
                <li className="font-semibold text-foreground">
                  &bull; Total: $2.76M\u2013$4.2M (23\u201335% of base
                  construction cost)
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Contingency usage notes
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  &bull; Typical release: 10\u201315% of contingency used on
                  projects &lt;$15M
                </li>
                <li>
                  &bull; Design contingency fully expended by tender stage
                  (design changes, scope clarifications)
                </li>
                <li>
                  &bull; Construction contingency 30\u201350% used (variations,
                  unforeseen conditions, minor rework)
                </li>
                <li>
                  &bull; Client contingency typically preserved for
                  post-completion items
                </li>
              </ul>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION G: FINANCING                                         */}
      {/* ============================================================ */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionHeading
              id="financing"
              label="Section G"
              title="Financing & Facility Costs"
              allocation="Typical allocation: 2-5% of project"
            />
            <BudgetTable
              headers={['Line Item', 'Calculation', 'Example Amount']}
              rows={[
                [
                  'Interest During Construction (IDC)',
                  '(Loan \u00d7 Rate \u00d7 Years) \u00f7 2',
                  '$20M loan @ 5.5% over 24 months = $1.1M',
                ],
                [
                  'Loan Establishment Fees',
                  '0.5\u20131.5% of facility',
                  '$20M @ 1% = $200K',
                ],
                [
                  'Loan Documentation & Legal',
                  '$15K\u2013$40K',
                  '$25K (fixed)',
                ],
                [
                  'Financial Advisor Fees',
                  '$30K\u2013$80K',
                  'Assists refinancing, loan structure optimisation',
                ],
                [
                  'Valuation for Security Purposes',
                  '$8K\u2013$20K',
                  'Lender requirement (multiple times during project)',
                ],
                [
                  'Insurance (Lender-Required)',
                  '0.5\u20131.2% of facility p.a.',
                  '$20M @ 0.8% = $160K annually ($320K over 24 months)',
                ],
              ]}
            />
            <p className="text-sm font-semibold">
              Typical allocation for $12M project with $20M facility:{' '}
              <span className="text-primary">$1.6M\u2013$2.2M</span>
            </p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Financing notes
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  &bull; Establish facility 6 months pre-construction to avoid
                  funding delays
                </li>
                <li>
                  &bull; IDC is a significant cost; accelerated completion saves
                  money
                </li>
                <li>
                  &bull; Facility size typically 1.25\u20131.5x total project
                  cost to cover contingencies
                </li>
                <li>
                  &bull; Rate @ 5\u20136.5% typical for club secured lending
                  (2026 rates); varies by lender, club financial position,
                  security offered
                </li>
              </ul>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION H: INSURANCE & LEGAL                                 */}
      {/* ============================================================ */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionHeading
              id="insurance"
              label="Section H"
              title="Insurance & Legal"
              allocation="Typical allocation: 1-3% of project"
            />
            <BudgetTable
              headers={['Line Item', 'Cost Range', 'Notes']}
              rows={[
                [
                  'Professional Indemnity Insurance (design team)',
                  '$40K\u2013$80K (3-year term)',
                  'Mandatory; protects against design defects. Club verifies coverage; minimum $10M limit typical.',
                ],
                [
                  'Construction Defects Insurance',
                  '$60K\u2013$150K',
                  'Optional but recommended; covers latent defects post-completion. Premium ~0.5\u20131% of contract value.',
                ],
                [
                  'Legal Review (contracts, approvals)',
                  '$30K\u2013$80K',
                  'Contract review, lease amendments if required, regulatory compliance review, dispute resolution advice.',
                ],
                [
                  'Legal Registration/Title Documentation',
                  '$5K\u2013$15K',
                  'Registration of mortgages, security interests, title updates post-completion.',
                ],
                [
                  'Building & Works Insurance',
                  '$80K\u2013$200K (entire project)',
                  'Contractor\u2019s all-risks insurance; club typically reimburses as part of contract. Verify coverage limits ($20M minimum).',
                ],
                [
                  'Public Liability Insurance (project-specific)',
                  '$40K\u2013$100K',
                  'Enhanced limits during construction. Covered under contract preliminaries typically.',
                ],
              ]}
            />
            <p className="text-sm font-semibold">
              Typical allocation for $12M project:{' '}
              <span className="text-primary">
                $255K\u2013$625K (2.1\u20135.2%)
              </span>
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION I: PROJECT ADMIN                                     */}
      {/* ============================================================ */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <SectionHeading
              id="admin"
              label="Section I"
              title="Project Administration & Miscellaneous"
              allocation="Typical allocation: 1-3% of project"
            />
            <BudgetTable
              headers={['Line Item', 'Cost Range', 'Notes']}
              rows={[
                [
                  'Board/Member Communications',
                  '$30K\u2013$80K',
                  'Project newsletters, member updates, website, AGM presentations, graphics/design.',
                ],
                [
                  'Project Branding & Signage',
                  '$20K\u2013$60K',
                  'Project hoardings signage, wayfinding, temporary directional signage.',
                ],
                [
                  'Temporary Member Facilities',
                  '$50K\u2013$150K',
                  'Gaming venue relocation, temporary bar setup, temporary dining area if applicable. Operational cost during construction.',
                ],
                [
                  'Staff Retraining & Induction',
                  '$20K\u2013$50K',
                  'Training on new systems, gaming compliance, health & safety, facilities operation.',
                ],
                [
                  'Opening & Commissioning Events',
                  '$30K\u2013$80K',
                  'Grand opening event, staff launch, member appreciation events, media launch.',
                ],
                [
                  'Permits & Temporary Approvals',
                  '$10K\u2013$30K',
                  'Construction permits, traffic management, temporary structure approvals, works notification fees.',
                ],
                [
                  'Testing, Commissioning & Handover',
                  '$40K\u2013$100K',
                  'Final inspections, system commissioning, defects rectification, practical completion protocols, final account negotiation.',
                ],
                [
                  'Contingency Administration',
                  '$20K\u2013$50K',
                  'Cost estimating, budget tracking, forecasting, reporting tools/software, board papers.',
                ],
              ]}
            />
            <p className="text-sm font-semibold">
              Typical allocation for $12M project:{' '}
              <span className="text-primary">
                $220K\u2013$600K (1.8\u20135%)
              </span>
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  SUMMARY TABLE                                                */}
      {/* ============================================================ */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-6">
            <div id="summary" className="scroll-mt-24">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Summary
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Budget Summary \u2014 $12M Project Example
              </h2>
            </div>
            <div className="overflow-x-auto rounded-lg border-2 border-primary/20">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-primary/5">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                      Low Range
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                      High Range
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                      Allocation %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Land/Site', '$400K', '$800K', '3\u20137%'],
                    ['Planning/Approvals', '$365K', '$1.24M', '3\u201310%'],
                    [
                      'Professional Fees',
                      '$1.032M',
                      '$1.764M',
                      '8.6\u201314.7%',
                    ],
                    ['Construction', '$8.4M', '$9.6M', '70\u201380%'],
                    ['Fitout/FF&E', '$840K', '$1.44M', '7\u201312%'],
                    ['Contingencies', '$2.76M', '$4.2M', '23\u201335%'],
                    [
                      'Financing/Facility Costs',
                      '$1.6M',
                      '$2.2M',
                      '13\u201318%',
                    ],
                    ['Insurance/Legal', '$255K', '$625K', '2.1\u20135.2%'],
                    ['Project Admin/Misc', '$220K', '$600K', '1.8\u20135%'],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={
                        i % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                      }
                    >
                      <td className="px-4 py-3 font-medium">{row[0]}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {row[1]}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {row[2]}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {row[3]}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-primary/30 bg-primary/5 font-bold">
                    <td className="px-4 py-3">TOTAL</td>
                    <td className="px-4 py-3 text-right">$15.872M</td>
                    <td className="px-4 py-3 text-right">$22.469M</td>
                    <td className="px-4 py-3 text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Total Project Cost Range: $15.9M\u2013$22.5M</strong>{' '}
              (with contingencies), or $11.2M\u2013$14M excluding contingencies
              as often shown in feasibility studies.
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  ASSUMPTIONS                                                  */}
      {/* ============================================================ */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl space-y-8">
            <div id="assumptions" className="scroll-mt-24">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Key Assumptions
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Budget Assumptions & Adjustments
              </h2>
            </div>

            {/* Smaller projects */}
            <div className="rounded-lg border bg-background p-5">
              <h3 className="font-bold">
                Smaller projects ($2M\u2013$5M)
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  &bull; Professional fees: 12\u201315% (higher % due to fixed
                  costs)
                </li>
                <li>
                  &bull; Construction contingency: 10\u201315% (higher as
                  smaller projects have less predictability)
                </li>
                <li>
                  &bull; Financing costs: 3\u20135% (IDC higher as construction
                  period typically longer relatively)
                </li>
                <li>
                  &bull; Planning/approvals: 4\u20138% (can be significant
                  relative to project size)
                </li>
              </ul>
            </div>

            {/* Larger projects */}
            <div className="rounded-lg border bg-background p-5">
              <h3 className="font-bold">
                Larger projects ($20M\u2013$50M)
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  &bull; Professional fees: 7\u201310% (lower % as fees scale)
                </li>
                <li>
                  &bull; Construction contingency: 7\u20139% (lower % due to
                  higher predictability)
                </li>
                <li>
                  &bull; Financing costs: 1.5\u20132.5% (lower % as
                  construction typically faster)
                </li>
                <li>
                  &bull; Gaming machine costs: remain fixed ~$1M\u2013$2M
                  regardless of project size
                </li>
              </ul>
            </div>

            {/* Inflation */}
            <div className="rounded-lg border bg-background p-5">
              <h3 className="font-bold">
                Inflation/Escalation (annual rates)
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  &bull; Construction costs: 3\u20134% per annum (post-2024)
                </li>
                <li>&bull; Labour: 3\u20135% per annum</li>
                <li>&bull; Material: 2\u20133% per annum</li>
                <li>&bull; Professional fees: 2\u20133% per annum</li>
              </ul>
            </div>

            {/* Basement */}
            <div className="rounded-lg border bg-background p-5">
              <h3 className="font-bold">
                Projects with basement/undercroft
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  &bull; Add 30\u201340% to construction costs
                </li>
                <li>&bull; Add 2\u20133 months to timeline</li>
                <li>&bull; Add 10\u201315% to contingency</li>
              </ul>
            </div>

            {/* Heritage */}
            <div className="rounded-lg border bg-background p-5">
              <h3 className="font-bold">Heritage projects</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  &bull; Add 15\u201325% to professional fees (heritage
                  advisor, specialised design)
                </li>
                <li>
                  &bull; Add 10\u201320% to construction costs (specialised
                  materials, conservation techniques)
                </li>
                <li>&bull; Add 4\u20138 weeks to DA timeline</li>
              </ul>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  Bottom download form                                         */}
      {/* ============================================================ */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <ResourceDownloadForm
              resourceSlug="budget-template"
              resourceTitle="Club Capital Works Budget Template"
              pdfPath="/resources/pdfs/club-capital-works-budget-template.pdf"
            />
          </div>
        </BlurFade>
      </Section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <Section background="dark">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Need a Budget Tailored to Your Club?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              This template gives you the structure. For a detailed cost plan
              based on your club&apos;s specific project scope, site conditions,
              and market, book a free consultation with our team.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href="/resources"
                  className="border-neutral-600 text-neutral-200 hover:bg-neutral-800"
                >
                  View All Resources
                </Link>
              </Button>
            </div>
          </div>
        </BlurFade>
      </Section>
    </>
  )
}
