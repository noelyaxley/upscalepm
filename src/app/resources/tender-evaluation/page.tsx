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
import {
  ClipboardList,
  DollarSign,
  Calendar,
  Wrench,
  Users,
  ShieldAlert,
  Star,
  AlertTriangle,
  CheckCircle2,
  FileText,
} from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Builder Tender Evaluation Template | Free Download',
  description:
    'A structured evaluation framework for assessing construction tenders. Covers price, program, methodology, capability, risk, and references with weighted scoring.',
  path: '/resources/tender-evaluation',
})

export default function TenderEvaluationPage() {
  return (
    <>
      <PageHeader
        title="Builder Tender Evaluation Template"
        subtitle="A structured framework for evaluating construction tenders objectively. Score builders on price, program, capability, risk, and track record."
        breadcrumbs={[
          { label: 'Resources', href: '/resources' },
          { label: 'Tender Evaluation Template' },
        ]}
      />

      {/* Download Form - Top */}
      <Section spacing="compact">
        <BlurFade>
          <div className="mx-auto max-w-2xl">
            <ResourceDownloadForm
              resourceSlug="tender-evaluation"
              resourceTitle="Builder Tender Evaluation Template"
              pdfPath="/resources/pdfs/builder-tender-evaluation-template.pdf"
            />
          </div>
        </BlurFade>
      </Section>

      {/* Introduction */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Why You Need a Structured Tender Evaluation
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Selecting a builder is one of the highest-stakes decisions your
              board will make. The cheapest tender is not always the best value.
              Without a structured evaluation process, boards risk choosing a
              builder based on gut feel, personal relationships, or price alone
              — and paying for it later in delays, variations, and disputes.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              This template gives your board an objective, defensible framework
              for comparing tenders across the criteria that actually matter:
              price, program, methodology, capability, risk management, and
              track record.
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* Process Overview */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              The Tender Evaluation Process
            </h2>
            <p className="mt-4 text-muted-foreground">
              Follow these seven steps to run a transparent, defensible
              evaluation process.
            </p>
            <ol className="mt-8 space-y-4">
              {[
                'Establish evaluation criteria and weightings (documented, approved by board before tenders received)',
                'Appoint tender evaluation panel (project manager, quantity surveyor, board representative)',
                'Receive tenders from shortlisted builders (typically 4-6 builders)',
                'Evaluate each tender against established criteria',
                'Score and rank all submissions',
                'Present recommendation to board with full scoring rationale',
                'Negotiate contract terms with recommended builder',
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </BlurFade>
      </Section>

      {/* Weighted Scoring Table */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Recommended Weightings
            </h2>
            <p className="mt-4 text-muted-foreground">
              These weightings are typical for major club projects ($10M+).
              Adjust based on your project&apos;s specific priorities — but
              price should never be the only factor.
            </p>
            <div className="mt-8 overflow-hidden rounded-xl border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-bold">
                      Criterion
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold">
                      Weighting
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold">
                      Score Range
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      criterion: 'Price',
                      weight: '35-40%',
                      icon: DollarSign,
                    },
                    {
                      criterion: 'Program',
                      weight: '15-20%',
                      icon: Calendar,
                    },
                    {
                      criterion: 'Capability',
                      weight: '15-20%',
                      icon: Users,
                    },
                    {
                      criterion: 'Risk Management',
                      weight: '15-20%',
                      icon: ShieldAlert,
                    },
                    {
                      criterion: 'References',
                      weight: '5-10%',
                      icon: Star,
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-b-0 even:bg-muted/20"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <row.icon className="size-4 text-primary" />
                          <span className="font-medium">{row.criterion}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-center font-semibold text-primary">
                        {row.weight}
                      </td>
                      <td className="px-6 py-3 text-center text-muted-foreground">
                        1-10
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Each criterion is scored 1-10 by the evaluation panel. The
              weighted scores are combined to produce an overall tender score
              out of 10.
            </p>
          </div>
        </BlurFade>
      </Section>

      {/* Criterion 1: Price Assessment */}
      <Section background="muted" id="price">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                <DollarSign className="size-5 text-white" strokeWidth={1.75} />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                1. Price Assessment (35-40%)
              </h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              Price is the most significant factor, but it must be assessed in
              context. A bid that is significantly below market may indicate
              underbidding, financial stress, or scope gaps — which often leads
              to aggressive variation claims during construction.
            </p>

            <div className="mt-8 space-y-8">
              {/* 1a */}
              <div>
                <h3 className="text-lg font-bold">
                  Lump Sum Price Competitiveness
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Compare the lump sum bid against an independent QS
                  assessment and market benchmarks.
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    'Within 5% of market estimate: 10/10',
                    '5-10% below market: 9/10',
                    '5-10% above market: 6/10',
                    'More than 10% above market: 3/10',
                    'More than 15% below market (risky): 2/10 — may indicate underbidding',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-medium italic text-muted-foreground">
                  Key question: Is this price realistic for the scope? Can the
                  builder remain financially viable at this price?
                </p>
              </div>

              {/* 1b */}
              <div>
                <h3 className="text-lg font-bold">
                  Provisional Sums Justification
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Provisional sums are estimates for work that cannot be fully
                  defined at tender stage. They should be itemised,
                  adequately scoped, and not excessive.
                </p>
                <div className="mt-3 rounded-lg border bg-background p-4">
                  <p className="text-sm font-semibold">
                    Typical provisional sum categories:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>
                      Site conditions (geotechnical, utilities, contamination):
                      5-10% of contract
                    </li>
                    <li>
                      Variations/design development: 3-5% of contract
                    </li>
                    <li>Contingency: 5-8% of contract</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Score 9/10 for well-justified, detailed breakdowns. Score
                  2/10 for excessive provisional sums that shift risk to the
                  club.
                </p>
              </div>

              {/* 1c */}
              <div>
                <h3 className="text-lg font-bold">Preliminaries Breakdown</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Preliminaries cover site management, temporary works, and
                  administration. For a $10-15M project, expect preliminaries
                  of 8-15% of contract value. They should be transparent and
                  itemised.
                </p>
              </div>

              {/* 1d */}
              <div>
                <h3 className="text-lg font-bold">
                  Payment Terms
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Look for monthly progress payments tied to certified work,
                  with 10% retention. Be wary of builders requesting
                  significant upfront payments or unfavourable payment
                  structures.
                </p>
              </div>

              <div className="rounded-lg border-2 border-primary/20 bg-background p-4">
                <p className="text-sm font-semibold">
                  Price sub-weighting formula:
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  (Lump sum x 40%) + (Provisional sums x 30%) +
                  (Preliminaries x 20%) + (Payment terms x 10%)
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Criterion 2: Program Assessment */}
      <Section id="program">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                <Calendar className="size-5 text-white" strokeWidth={1.75} />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                2. Program Assessment (15-20%)
              </h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              The construction program is not just about speed. A realistic
              program with contingency built in is far more valuable than an
              optimistic timeline that slips within the first month.
            </p>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-bold">Schedule Realism</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Is the programmed completion date realistic? Does it include
                  weather allowances, coordination float, and contingency?
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    'Program matches or beats board target: 9/10',
                    'Program 4-8 weeks later than target: 7/10',
                    'Program 8-16 weeks later: 5/10',
                    'Program significantly exceeds tolerance: 2/10',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Staging and Phasing Methodology
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  For multi-stage projects: Is the phasing strategy
                  well-developed? Is operational continuity maintained? Has
                  the builder provided a temporary facilities strategy?
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Critical Path and Key Milestones
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Does the builder identify critical path activities? Are key
                  milestones scheduled with appropriate buffers? Score 9/10
                  for clear critical path identification with buffered
                  milestones; 3/10 if the critical path is not explicitly
                  identified.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Schedule Risk Management</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Has the builder included a risk register in their
                  submission? Are mitigation strategies identified for
                  schedule risks? Score 8/10 for a risk register with
                  mitigation strategies; 2/10 if no risk management is
                  evident.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Long-Lead Item Procurement
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  For critical items such as gaming machines, lifts, HVAC
                  systems, and kitchen equipment: has the builder provided a
                  detailed procurement schedule with early ordering
                  commitments?
                </p>
              </div>

              <div className="rounded-lg border-2 border-primary/20 bg-background p-4">
                <p className="text-sm font-semibold">
                  Program sub-weighting formula:
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  (Realism x 30%) + (Staging x 20%) + (Critical path x 20%)
                  + (Risk mgmt x 15%) + (Long-lead procurement x 15%)
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Criterion 3: Capability */}
      <Section background="muted" id="capability">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                <Users className="size-5 text-white" strokeWidth={1.75} />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                3. Capability Assessment (15-20%)
              </h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              You are not just hiring a company — you are hiring a team. The
              project manager, site manager, and supervisors who will actually
              run your project matter more than the company name on the
              letterhead.
            </p>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-bold">
                  Project Manager Experience
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Does the proposed PM have relevant experience with
                  club/hospitality projects of similar scale and complexity?
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    '10+ years experience with multiple major club projects: 9/10',
                    '5-10 years experience with some club projects: 7/10',
                    'Junior PM or limited club experience: 4/10',
                    'No relevant experience: 2/10',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-medium italic text-muted-foreground">
                  Ask: Will this PM remain on your project for its full
                  duration? Are they supported by an adequate team?
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Site Management Team</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Is there a full-time site manager with hospitality/club
                  experience? Is the supervision team adequately resourced for
                  the scale of works?
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Relevant Project Experience
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Look for completed major club projects ($10M+) with complex
                  staging, hospitality/gaming venue projects, and multi-trade
                  coordination on occupied premises.
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    '3+ major club/hospitality projects successfully completed: 9/10',
                    '1-2 major club projects completed: 7/10',
                    'Limited club experience, strong general commercial: 5/10',
                    'No club/hospitality experience: 2/10',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Current Workload and Capacity
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Is your project the builder&apos;s primary focus, or are they
                  over-committed? A builder running five projects
                  simultaneously will not give yours the attention it needs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Team Continuity Commitment
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Does the builder commit key team members for the full
                  project duration? Is there a documented replacement protocol
                  if key staff depart?
                </p>
              </div>

              <div className="rounded-lg border-2 border-primary/20 bg-background p-4">
                <p className="text-sm font-semibold">
                  Capability sub-weighting formula:
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  (PM experience x 25%) + (Site management x 20%) + (Project
                  experience x 30%) + (Current workload x 15%) + (Team
                  continuity x 10%)
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Criterion 4: Risk Management */}
      <Section id="risk">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                <ShieldAlert
                  className="size-5 text-white"
                  strokeWidth={1.75}
                />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                4. Risk Assessment (15-20%)
              </h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              How risk is allocated in the contract determines who pays when
              things go wrong. The right contract structure protects the club
              from cost blowouts while keeping the builder incentivised to
              deliver.
            </p>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-bold">
                  Contract Type and Risk Allocation
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A fixed-price contract with a clear variation procedure
                  scores 9/10. A cost-plus contract (cost reimbursement plus
                  margin) scores only 5/10 — the builder has limited incentive
                  to control costs, and the club bears most of the risk.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Variation Procedure and Dispute Resolution
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Is there a detailed variation procedure with agreed rate
                  schedules? How are disputes resolved? A contract that is
                  silent on variation pricing is a dispute waiting to happen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Insurance and Bank Guarantees
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Expect full insurance coverage: professional indemnity,
                  public liability, and contractor all-risks. Bank guarantee
                  should be 5-10% of contract value.
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    'Full coverage + 10% bank guarantee: 9/10',
                    'Adequate insurance + 5-8% guarantee: 8/10',
                    'Insurance gaps or inadequate guarantee: 4/10',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Defects Liability and Rectification
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Standard is a 12-month defects liability period with a 10%
                  bond and a clear rectification timeline (14-28 days). A
                  defects liability period shorter than 12 months or no bond
                  at all is a red flag.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Liquidated Damages for Delay
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A liquidated damages clause ($X per week of delay) gives the
                  builder a financial incentive to complete on time. Without
                  it, delays have no contractual consequence. Score 9/10 for a
                  clear LD clause; 2/10 if there is no financial penalty for
                  delay.
                </p>
              </div>

              <div className="rounded-lg border-2 border-primary/20 bg-background p-4">
                <p className="text-sm font-semibold">
                  Risk sub-weighting formula:
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  (Contract type x 20%) + (Variation procedure x 20%) +
                  (Insurance x 20%) + (Defects liability x 20%) + (Payment
                  terms x 10%) + (Liquidated damages x 10%)
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Criterion 5: References */}
      <Section background="muted" id="references">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                <Star className="size-5 text-white" strokeWidth={1.75} />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                5. References and Track Record (5-10%)
              </h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              Past performance is the best predictor of future performance.
              Do not just accept a list of references — call them, and ask
              specific questions about delivery, quality, and how disputes
              were handled.
            </p>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-bold">Reference Projects</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Contact references from similar projects. Were they
                  completed on time and on budget? Were quality outcomes
                  satisfactory? Score 9/10 for three or more strong
                  references; 4/10 for limited references or concerns raised.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Defect and Claims History
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Has the builder had significant defect issues or claims on
                  past projects? Minimal defects and no major claims scores
                  9/10. A history of defect issues or claims scores 3/10.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Financial Stability</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check ASIC records, credit rating, and bank references. Are
                  audited financials available? Is the balance sheet strong
                  with positive cash flow? Financial concerns — negative cash
                  flow, high debt — score 3/10.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Safety and Compliance Record
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Does the builder have a strong safety record with regular
                  audits? Safety concerns or compliance issues are a serious
                  red flag. Score 9/10 for an excellent record with industry
                  recognition.
                </p>
              </div>

              <div className="rounded-lg border-2 border-primary/20 bg-background p-4">
                <p className="text-sm font-semibold">
                  References sub-weighting formula:
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  (References x 40%) + (Defects/claims x 30%) + (Financial
                  stability x 20%) + (Safety record x 10%)
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Overall Scoring Example */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Overall Tender Scoring Example
            </h2>
            <p className="mt-4 text-muted-foreground">
              Combine the weighted category scores to produce a single overall
              tender score. Here is an example for a $12M club project:
            </p>
            <div className="mt-8 overflow-hidden rounded-xl border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-bold">
                      Criterion
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold">
                      Weighting
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold">
                      Score
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold">
                      Weighted
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      criterion: 'Price',
                      weight: '35%',
                      score: '7.7',
                      weighted: '2.7',
                    },
                    {
                      criterion: 'Program',
                      weight: '20%',
                      score: '7.4',
                      weighted: '1.5',
                    },
                    {
                      criterion: 'Capability',
                      weight: '20%',
                      score: '7.6',
                      weighted: '1.5',
                    },
                    {
                      criterion: 'Risk Management',
                      weight: '15%',
                      score: '8.2',
                      weighted: '1.2',
                    },
                    {
                      criterion: 'References',
                      weight: '10%',
                      score: '8.1',
                      weighted: '0.8',
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-b-0 even:bg-muted/20"
                    >
                      <td className="px-6 py-3 font-medium">
                        {row.criterion}
                      </td>
                      <td className="px-6 py-3 text-center text-muted-foreground">
                        {row.weight}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {row.score}
                      </td>
                      <td className="px-6 py-3 text-center font-semibold text-primary">
                        {row.weighted}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 bg-muted/30">
                    <td className="px-6 py-3 font-bold">TOTAL</td>
                    <td className="px-6 py-3 text-center font-bold">100%</td>
                    <td className="px-6 py-3" />
                    <td className="px-6 py-3 text-center text-lg font-bold text-primary">
                      7.7/10
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Tender Report */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                <FileText className="size-5 text-white" strokeWidth={1.75} />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                What to Include in the Board Report
              </h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              Your tender evaluation report is the document the board will use
              to approve the builder. It must be comprehensive, transparent,
              and defensible.
            </p>
            <div className="mt-8 space-y-6">
              {[
                {
                  title: 'Tender Summary',
                  desc: 'Number of tenders received, pricing range (low to high), schedule range, and key variances identified.',
                },
                {
                  title: 'Evaluation Matrix',
                  desc: 'Full scoring for each builder on each criterion. Rankings with overall scores (e.g., Tender 1: 7.9/10, Tender 2: 7.5/10).',
                },
                {
                  title: 'Recommendation',
                  desc: 'Recommended builder with justification: competitive price, realistic schedule, proven track record, strong risk management.',
                },
                {
                  title: 'Tender Risk Analysis',
                  desc: 'Concerns identified for each builder (e.g., limited club experience, aggressive schedule) and mitigation if recommended builder is selected.',
                },
                {
                  title: 'Contract Negotiation Items',
                  desc: 'Any contract terms to be negotiated before execution. Do not sign until these are resolved.',
                },
                {
                  title: 'Board Approval Resolution',
                  desc: 'Board approves preferred builder conditional on contract finalisation. PM authorised to negotiate within pre-approved parameters.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Red Flags */}
      <Section id="red-flags">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-destructive shadow-md shadow-destructive/30">
                <AlertTriangle
                  className="size-5 text-white"
                  strokeWidth={1.75}
                />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Red Flags to Watch For
              </h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              Any of these should trigger further investigation before
              proceeding. Some are deal-breakers.
            </p>
            <div className="mt-8 space-y-4">
              {[
                {
                  flag: 'Unrealistic Schedule',
                  desc: 'Program significantly faster than market benchmark. Indicates inadequate contingency and aggressive assumptions.',
                },
                {
                  flag: 'Unrealistic Price',
                  desc: 'Bid significantly below market. May indicate underbidding, potential financial stress, or quality risk.',
                },
                {
                  flag: 'Vague Methodology',
                  desc: 'Generic approach without project-specific detail. Indicates insufficient planning.',
                },
                {
                  flag: 'Inadequate Insurance',
                  desc: 'Professional indemnity below $10M or public liability below $20M. Risk transfer is inadequate.',
                },
                {
                  flag: 'No Defects Liability Bond',
                  desc: 'Builder unwilling to provide defects security. This is a serious red flag.',
                },
                {
                  flag: 'Excessive Provisional Sums',
                  desc: 'More than 10% of contract value. The builder is shifting risk to the club and the final cost is uncertain.',
                },
                {
                  flag: 'No Variation Procedure',
                  desc: 'Contract silent on how variations will be priced. This is a dispute waiting to happen.',
                },
                {
                  flag: 'Team Turnover Risk',
                  desc: 'Key personnel not committed for the project duration. No replacement protocol documented.',
                },
                {
                  flag: 'Financial Concerns',
                  desc: 'Builder financials unavailable or showing financial distress. Check ASIC records and credit ratings.',
                },
                {
                  flag: 'Poor References',
                  desc: 'References reluctant to recommend, or mentioning quality and schedule issues on past projects.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4"
                >
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
                  <div>
                    <p className="font-bold">{item.flag}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Best Practices */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Tender Evaluation Best Practices
            </h2>
            <p className="mt-4 text-muted-foreground">
              Follow these principles to ensure your evaluation is fair,
              transparent, and defensible.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Transparency',
                  desc: 'Criteria and weightings established before tenders are received — not adjusted after to favour a preferred builder.',
                },
                {
                  title: 'Independence',
                  desc: 'Evaluation panel is independent with no conflicts of interest. PM is not related to the preferred builder.',
                },
                {
                  title: 'Documentation',
                  desc: 'All scoring documented with notes justifying each score. Full audit trail for board review.',
                },
                {
                  title: 'Like-for-Like',
                  desc: 'Tenders compared on the same scope, same contract terms. Apples to apples.',
                },
                {
                  title: 'Risk-Based',
                  desc: 'Lowest price does not automatically win if there are significant risks: underbidding, inexperienced team, inadequate insurance.',
                },
                {
                  title: 'Due Diligence',
                  desc: 'ASIC search, credit check, and bank references on the recommended builder before contract execution.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-background p-4"
                >
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Alternative Tender Approaches */}
      <Section>
        <BlurFade>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Alternative Tender Approaches
            </h2>
            <p className="mt-4 text-muted-foreground">
              Different procurement methods suit different project types. Here
              are the four most common approaches for club projects.
            </p>
            <div className="mt-8 space-y-6">
              {[
                {
                  title: 'Design and Construct (D&C)',
                  desc: 'Builder designs and constructs with a fixed price. Single point of responsibility and accountability, but less control over design.',
                },
                {
                  title: 'Traditional (Design-Bid-Build)',
                  desc: 'Club designs via architect, then tenders to builders. Best design control and competitive tendering, but longer timeline.',
                },
                {
                  title: 'Staged Tender',
                  desc: 'Tender based on concept design. Builder involved in detailed design. Enables early construction start but with less price certainty.',
                },
                {
                  title: 'Guaranteed Maximum Price (GMP)',
                  desc: 'Contractor proposes budget and schedule. Shares cost savings if delivered under budget. Complex contract but good cost incentive.',
                },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border bg-muted/30 p-5">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-lg border-2 border-primary/20 bg-primary/5 p-5">
              <p className="text-sm font-semibold">
                Recommendation for most club projects:
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Traditional design-bid-build (club designs via architect,
                competitive tender to 4-6 qualified builders, fixed-price
                contract) provides the best balance of design control, cost
                certainty, and competitive tendering.
              </p>
            </div>
          </div>
        </BlurFade>
      </Section>

      {/* Download Form - Bottom */}
      <Section background="muted">
        <BlurFade>
          <div className="mx-auto max-w-2xl">
            <ResourceDownloadForm
              resourceSlug="tender-evaluation"
              resourceTitle="Builder Tender Evaluation Template"
              pdfPath="/resources/pdfs/builder-tender-evaluation-template.pdf"
            />
          </div>
        </BlurFade>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Need Help Evaluating Tenders?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              Running a tender process for the first time? We can help your
              board establish evaluation criteria, assess submissions, and
              negotiate the right contract. Book a free consultation.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </BlurFade>
      </Section>
    </>
  )
}
