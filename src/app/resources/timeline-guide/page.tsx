import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animation/blur-fade'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/components/seo/schemas'
import { ResourceDownloadForm } from '@/components/resources/resource-download-form'
import { Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Club Redevelopment Timeline Guide',
  description:
    'Realistic timelines for every phase of a NSW club redevelopment — from feasibility through to practical completion. Honest durations, common delays, and what boards actually need to plan for.',
  path: '/resources/timeline-guide',
})

const phases = [
  {
    number: 1,
    title: 'Feasibility Study',
    duration: '4-8 weeks',
    delayImpact: '+1-3 weeks',
    whatHappens: [
      'Board endorsement of concept',
      'Site analysis — existing conditions, utilities, constraints documented',
      'Preliminary concept design — architect produces 1-2 concept options',
      'Preliminary cost estimate — QS order-of-magnitude estimate, +/-30-50% accuracy',
      'Preliminary financial model — revenue assumptions, payback analysis, NPV',
      'Preliminary project schedule — high-level phases, key milestones',
      'Governance structure options — steering committee, reporting, decision-making',
      'Board decision: proceed to detailed design or pause/revise concept',
    ],
    delays: [
      'Board meetings infrequent (monthly only) — approvals cascade over 2-3 months',
      'Concept decision prolonged — board wants "more options" explored; adds 2-4 weeks',
      'Site analysis incomplete — utilities not fully mapped, asbestos survey deferred',
      'Architect scope unclear — multiple revisions required; adds 2 weeks',
      'Member consultation deferred — board wants concept finalized first',
      'Financial model assumptions contentious — board wants 5-year and 20-year scenarios; adds 1-2 weeks',
    ],
  },
  {
    number: 2,
    title: 'Concept Design',
    duration: '6-10 weeks',
    delayImpact: '+2-4 weeks',
    whatHappens: [
      'Architect develops concept to 25% design stage',
      'Schematic design drawings — floor plans, elevations, 3D renders',
      'Schematic specifications — material types, finishes, key systems',
      'Refined cost estimate — QS cost plan refined, +/-20% accuracy',
      'Utility requirements confirmed — power, water, sewer, communications',
      'Heritage assessment (if applicable) — NSW Heritage Office consultation',
      'Member consultation — concept presented, feedback collected, refinements made',
      'Preliminary planning assessment — town planner advises on likely DA requirements',
      'Board decision: approve concept, proceed to detailed design, or revise',
    ],
    delays: [
      'Member consultation extensive — multiple member forums required; 2-3 week cycle',
      'Heritage assessment prolonged — heritage advisor identifies issues requiring design changes; 2-4 weeks',
      'Utility conflicts emerge — power upgrade required; adds 2-3 weeks for confirmation',
      'Architect concept revisions — board/members request design changes; 1-2 weeks per revision cycle',
      'Financing discussion deferred — board wants cost implications understood; adds 1-2 weeks',
      'DA preliminary assessment reveals constraint — design revision required; adds 1-2 weeks',
    ],
  },
  {
    number: 3,
    title: 'Detailed Design & Documentation',
    duration: '12-16 weeks',
    delayImpact: '+3-6 weeks',
    whatHappens: [
      'Architect develops design to 80-90% completion',
      'Detailed drawings produced — architectural, structural, mechanical, electrical, hydraulic',
      'Detailed specifications — materials, finishes, quality standards, performance requirements',
      'BASIX assessment completed',
      'Accessibility audit — BCA Section D compliance verified',
      'Engineering design completed — structural, mechanical, electrical, hydraulic systems',
      'QS produces detailed cost estimate — +/-10-15% accuracy',
      'Gaming venue compliance review — Liquor & Gaming NSW preliminary consultation if required',
      'DA application package compiled',
      'Project Manager appointed; baseline schedule developed',
    ],
    delays: [
      'Architect/engineer coordination issues — mechanical conflict with structural frame; 2-3 weeks',
      'BASIX/accessibility compliance — design changes required; 1-2 weeks',
      'Heritage design requirements identified — modifications needed; 2-3 weeks',
      'Utility coordination incomplete — awaiting utility provider confirmation; 2-4 weeks',
      'Gaming/liquor compliance requirements unclear — design revision; 2-3 weeks',
      'Cost estimate significantly exceeds budget — QS estimate >20% over; board/architect reassess scope; 2-4 weeks',
      'Scope creep — board/members request design additions; 1-3 weeks per revision',
      'Design freeze discipline not enforced — design continues past intended freeze date',
    ],
    warning:
      'This phase is where projects experience the most schedule pressure. Late decision-making, scope changes, and design issues discovered late cascade to delay DA lodgement by 4-8 weeks.',
  },
  {
    number: 4,
    title: 'DA Lodgement & Determination',
    duration: '8-16 weeks (can extend to 24+ weeks)',
    delayImpact: '+4-12 weeks',
    whatHappens: [
      'Pre-lodgement consultation with council planner (2-4 weeks)',
      'DA application submitted to local council',
      'Council completeness review — checks if all documentation provided',
      'If incomplete: RFI (Request for Information) issued',
      'Public notification period — 14 days for neighbours to lodge objections',
      'Council assessment against LEP, DCP, and case law',
      'Conditions of consent determined — typically 20-50 conditions for major projects',
      'Development Consent issued with conditions',
    ],
    delays: [
      'Application incompleteness (RFI) — missing documentation; +2-4 weeks',
      'Neighbour objections — noise, parking, privacy, heritage impact; +4-8 weeks (minor) or +8-16 weeks (design changes required)',
      'Council requested amendments — design issues or compliance concerns; +4-8 weeks per revision cycle',
      'Traffic/parking study inadequate — additional modelling required; +2-4 weeks',
      'Heritage requirements — NSW Heritage Office consultation (6-8 week process); +6-12 weeks',
      'Environmental issues — biodiversity, tree removal, contaminated land; +4-8 weeks',
      'Council conditions contentious — negotiation required; +2-4 weeks',
      'Land and Environment Court appeal — additional 3-6 months',
    ],
    warning:
      'DA phase is a significant schedule bottleneck. Board should assume 16-20 weeks for major projects, not the optimistic 8-10 weeks.',
  },
  {
    number: 5,
    title: 'Construction Documentation & Tender',
    duration: '11-17 weeks',
    delayImpact: '+2-6 weeks',
    whatHappens: [
      'Architect produces 100% construction documentation (often starts parallel with DA)',
      'Specifications finalized — NCC/BCA compliance, Australian Standards referenced',
      'QS produces Bills of Quantities for tendering',
      'PM completes baseline construction schedule — critical path analysis',
      'Tender documentation compiled — drawings, specs, BoQ, contract terms, site information',
      'Tender package released to 4-6 qualified builders',
      'Tender period — builders prepare bids (3-5 weeks)',
      'Tender evaluation, board approval, contract negotiation and signature',
    ],
    delays: [
      'Construction documentation delayed if design phase overruns; +2-4 weeks',
      'Bills of Quantities incomplete — QS requires additional design info; +1-2 weeks',
      'Specifications disputes — architect/engineer/builder disagreements; +1 week',
      'Significant variation in tender prices — board uncertain; requests re-tenders; +3-4 weeks',
      'Negotiation with preferred tenderer prolonged; +1-2 weeks',
      'Contract execution delayed — legal review, board formalities; +1 week',
    ],
  },
  {
    number: 6,
    title: 'Construction',
    duration: '16-46+ months (varies by project size)',
    delayImpact: '+10-25% schedule overrun typical',
    whatHappens: [
      'Site establishment — temporary facilities, hoardings, safety systems (Weeks 1-4)',
      'Demolition (if applicable) — asbestos removal, structural demo, site clearance (Weeks 2-8)',
      'Foundations & structural frame — excavation, concrete pours, steel assembly (Weeks 8-20)',
      'Building envelope & services rough-in — walls, roofing, windows, pipes, ducts (Weeks 18-32)',
      'Internal partitions & systems installation (Weeks 30-42)',
      'Finishes & fitout — flooring, painting, kitchen/bar equipment, gaming machines (Weeks 40-48)',
      'Systems commissioning — HVAC, electrical, water, fire, lifts, gaming (Weeks 46-52)',
      'Defects & handover — final inspection, punch list, practical completion (Weeks 50-56)',
    ],
    delays: [
      'Weather events — rain delays concrete pours, roof installation; +1-2 weeks per event; 4-8 weeks cumulative on 24+ month projects',
      'Material delays — long-lead items (lifts, gaming machines, kitchen equipment, HVAC); +2-8 weeks',
      'Labour shortage — trades unavailable, subcontractors under-resourced; +2-6 weeks',
      'Design issues discovered during construction — design change required; +2-6 weeks',
      'Variations & scope changes — client changes require design revision, cost approval; +1-3 weeks per variation',
      'Unforeseen site conditions — ground conditions, utility conflicts, contamination; +2-8 weeks',
      'Staging complexity — multi-stage project with operations maintained during construction; +2-6 weeks cumulative',
      'Builder resource constraints — builder stretched across multiple projects; +2-8 weeks',
    ],
    warning:
      'Most major projects experience 10-25% schedule slip vs. original baseline. Board should expect delays and plan accordingly.',
  },
  {
    number: 7,
    title: 'Defects Liability Period',
    duration: '12 months',
    delayImpact: 'Ongoing',
    whatHappens: [
      'Building occupied and operations commence',
      'Defects discovered post-opening identified and logged',
      'Builder rectifies defects within contracted timeframe (typically 14-28 days from notice)',
      'Defects liability bond held by club (10% contract value typically)',
      'Monthly defects tracking and status reporting',
      'Final defects liability resolution at month 12',
      'Bond released once defects resolved and snagging complete',
    ],
    delays: [
      'Builder slow to respond to defect notices',
      'Disputes over whether item is "defect" or "maintenance"',
      'Defect rectification poor quality — requires re-work',
      'Defects liability period expires before all defects rectified',
      'Latent defects discovered after 12-month period — no longer builder obligation',
    ],
  },
]

const constructionDurations = [
  {
    size: '$2-5M',
    area: '2,000-4,000 sqm',
    baseline: '14-18 months',
    contingency: '+2-4 months',
    total: '16-22 months',
  },
  {
    size: '$5-10M',
    area: '4,000-8,000 sqm',
    baseline: '18-24 months',
    contingency: '+3-6 months',
    total: '21-30 months',
  },
  {
    size: '$10-15M',
    area: '8,000-12,000 sqm',
    baseline: '24-30 months',
    contingency: '+4-8 months',
    total: '28-38 months',
  },
  {
    size: '$15-25M',
    area: '12,000-18,000 sqm',
    baseline: '30-36 months',
    contingency: '+6-10 months',
    total: '36-46 months',
  },
  {
    size: '$25M+',
    area: '18,000+ sqm',
    baseline: '36+ months',
    contingency: '+8-12+ months',
    total: '44-48+ months',
  },
]

const summaryTimeline = [
  { phase: 'Feasibility Study', duration: '4-8 weeks', cumulative: '4-8 weeks' },
  { phase: 'Concept Design', duration: '6-10 weeks', cumulative: '10-18 weeks' },
  { phase: 'Detailed Design', duration: '12-16 weeks', cumulative: '22-34 weeks' },
  {
    phase: 'DA Lodgement & Determination',
    duration: '8-16 weeks',
    cumulative: '32-54 weeks',
    note: 'Can extend to 24+ weeks with objections',
  },
  {
    phase: 'Construction Documentation & Tender',
    duration: '11-17 weeks',
    cumulative: '43-71 weeks',
  },
  {
    phase: 'Construction',
    duration: '24-30 months',
    cumulative: 'Varies by project size',
    note: 'See construction duration table',
  },
  { phase: 'Defects Liability', duration: '12 months', cumulative: 'Post-completion' },
]

const overallDelayDrivers = [
  {
    rank: 1,
    driver: 'DA Process Extended',
    detail:
      'Objections, RFI, heritage issues, council review prolonged.',
    impact: '+4-12 weeks',
  },
  {
    rank: 2,
    driver: 'Design Phase Overruns',
    detail:
      'Scope changes, client decisions delayed, cost control issues, design coordination.',
    impact: '+2-6 weeks',
  },
  {
    rank: 3,
    driver: 'Construction Material & Labour Issues',
    detail:
      'Long-lead items delayed, trades unavailable, labour shortages.',
    impact: '+4-12 weeks cumulative',
  },
  {
    rank: 4,
    driver: 'Site Conditions Worse Than Anticipated',
    detail:
      'Geotechnical surprises, utility conflicts, contamination discovered.',
    impact: '+2-8 weeks',
  },
  {
    rank: 5,
    driver: 'Weather Events',
    detail: 'Rain, extreme weather, seasonal delays.',
    impact: '+4-8 weeks cumulative',
  },
  {
    rank: 6,
    driver: 'Variation Management Failure',
    detail:
      'Uncontrolled variations, design changes, scope creep.',
    impact: '+2-6 weeks (plus cost impact)',
  },
  {
    rank: 7,
    driver: 'Staging & Phasing Complexity',
    detail:
      'Multi-phase coordination failures, operational handover delays.',
    impact: '+2-8 weeks cumulative',
  },
  {
    rank: 8,
    driver: 'Regulatory Approval & Inspection Delays',
    detail:
      'Council building inspections late, compliance issues requiring re-work.',
    impact: '+1-4 weeks',
  },
  {
    rank: 9,
    driver: 'Project Team Dysfunction',
    detail:
      'Architect/builder/PM coordination failures, unclear responsibilities, slow decision-making.',
    impact: '+2-6 weeks',
  },
  {
    rank: 10,
    driver: 'Contingency Underestimation',
    detail:
      'Insufficient contingency allocated; unforeseen issues consume contingency quickly.',
    impact: '+2-8 weeks',
  },
]

const mitigationStrategies = [
  {
    title: 'Front-load decision-making',
    detail:
      'Complete feasibility, concept, and design phases comprehensively. Avoid design changes during construction.',
  },
  {
    title: 'Plan a comprehensive DA strategy',
    detail:
      'Early council engagement, heritage assessment, objection management, and appeal contingency included in the timeline.',
  },
  {
    title: 'Enforce design freeze discipline',
    detail:
      'No scope changes after freeze date without formal change control and explicit timeline acceptance.',
  },
  {
    title: 'Allocate realistic contingency',
    detail:
      '15-25% schedule contingency. Identify the critical path and focus risk management on critical activities.',
  },
  {
    title: 'Procure long-lead items early',
    detail:
      'Identify lifts, gaming machines, HVAC units, and kitchen equipment early. Place orders and manage delivery schedules.',
  },
  {
    title: 'Appoint experienced project team',
    detail:
      'PM with similar project experience, QS with cost control discipline, site management with scheduling discipline.',
  },
  {
    title: 'Weekly site meetings during construction',
    detail:
      'Track progress weekly against schedule. Identify delays early. Implement corrective action promptly.',
  },
  {
    title: 'Monthly board reporting',
    detail:
      'Track schedule variance monthly. Escalate delays to board. Decision on acceleration strategies (overtime, extra resources).',
  },
]

export default function TimelineGuidePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Resources', url: '/resources' },
          {
            name: 'Club Redevelopment Timeline Guide',
            url: '/resources/timeline-guide',
          },
        ])}
      />

      <PageHeader
        title="Club Redevelopment Timeline Guide"
        subtitle="Realistic timelines for every phase of a NSW club redevelopment. No sugar-coating — just honest durations and the delays boards actually need to plan for."
        breadcrumbs={[
          { label: 'Resources', href: '/resources' },
          { label: 'Timeline Guide' },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <BlurFade>
            <ResourceDownloadForm
              resourceSlug="timeline-guide"
              resourceTitle="Club Redevelopment Timeline Guide"
              pdfPath="/resources/pdfs/club-redevelopment-timeline-guide.pdf"
            />
          </BlurFade>

          {/* Intro */}
          <BlurFade delay={0.1}>
            <div className="mt-12">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Club boards consistently underestimate how long redevelopments
                take. The typical question is &ldquo;how long from go to
                opening?&rdquo; — and the typical answer they get is
                optimistic by 12-18 months.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                This guide breaks down every phase of a NSW club redevelopment
                with realistic durations, common delay drivers at each stage,
                and the total timeline boards should actually be planning
                around.
              </p>
              <div className="mt-6 rounded-lg border-l-4 border-primary bg-primary/5 px-6 py-4">
                <p className="text-sm font-semibold">The honest answer:</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  From initial concept to practical completion, most club
                  redevelopments take{' '}
                  <strong className="text-foreground">3-4 years</strong>. From
                  board approval to practical completion:{' '}
                  <strong className="text-foreground">2.5-3.5 years</strong>.
                  Projects with 24-month baselines typically experience 4-8
                  month delays (17-33% overrun).
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Phase-by-phase breakdown */}
          <div className="mt-16 space-y-12">
            {phases.map((phase, i) => (
              <BlurFade key={phase.number} delay={0.1 + i * 0.03}>
                <div className="relative">
                  {/* Phase header with timeline step indicator */}
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-md shadow-primary/30">
                      {phase.number}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-2xl font-bold tracking-tight">
                        {phase.title}
                      </h2>
                      <div className="mt-1 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                          <Clock className="size-3.5" />
                          {phase.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          <AlertTriangle className="size-3.5" />
                          Typical delay: {phase.delayImpact}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Duration bar */}
                  <div className="ml-16 mt-4">
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary/60"
                        style={{
                          width: `${Math.min(100, (phase.number / 7) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* What happens */}
                  <div className="ml-16 mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      What Happens
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {phase.whatHappens.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm leading-relaxed"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common delays */}
                  <div className="ml-16 mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Common Delays
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {phase.delays.map((delay) => (
                        <li
                          key={delay}
                          className="flex items-start gap-2 text-sm leading-relaxed"
                        >
                          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
                          <span>{delay}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warning callout */}
                  {phase.warning && (
                    <div className="ml-16 mt-6 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-900/10">
                      <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                        Board Warning
                      </p>
                      <p className="mt-1 text-sm text-amber-700 dark:text-amber-300/80">
                        {phase.warning}
                      </p>
                    </div>
                  )}

                  {/* Construction duration table (Phase 6 only) */}
                  {phase.number === 6 && (
                    <div className="ml-16 mt-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Construction Duration by Project Size
                      </h3>
                      <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b text-left">
                              <th className="pb-2 pr-4 font-semibold">
                                Project Size
                              </th>
                              <th className="pb-2 pr-4 font-semibold">
                                Floor Area
                              </th>
                              <th className="pb-2 pr-4 font-semibold">
                                Baseline
                              </th>
                              <th className="pb-2 pr-4 font-semibold">
                                Contingency
                              </th>
                              <th className="pb-2 font-semibold">
                                Realistic Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {constructionDurations.map((row) => (
                              <tr
                                key={row.size}
                                className="border-b border-muted"
                              >
                                <td className="py-2.5 pr-4 font-medium">
                                  {row.size}
                                </td>
                                <td className="py-2.5 pr-4 text-muted-foreground">
                                  {row.area}
                                </td>
                                <td className="py-2.5 pr-4">{row.baseline}</td>
                                <td className="py-2.5 pr-4 text-amber-600 dark:text-amber-400">
                                  {row.contingency}
                                </td>
                                <td className="py-2.5 font-semibold">
                                  {row.total}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Contingency based on realistic schedule float of
                        15-25%. For a $10-15M project: 10-15% float on
                        critical path activities, 5-10% on non-critical.
                      </p>
                    </div>
                  )}

                  {/* Connector line between phases */}
                  {phase.number < 7 && (
                    <div className="ml-[23px] mt-8 h-8 w-0.5 bg-primary/20" />
                  )}
                </div>
              </BlurFade>
            ))}
          </div>

          {/* Summary timeline table */}
          <BlurFade delay={0.3}>
            <div className="mt-20">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Total Project Timeline Summary
              </h2>
              <p className="mt-3 text-muted-foreground">
                Pre-construction phases alone typically take 10-17 months before
                a builder sets foot on site. Factor in construction and
                you&apos;re looking at 3-4 years for most projects.
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 pr-4 font-semibold">Phase</th>
                      <th className="pb-2 pr-4 font-semibold">Duration</th>
                      <th className="pb-2 font-semibold">Cumulative</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryTimeline.map((row) => (
                      <tr key={row.phase} className="border-b border-muted">
                        <td className="py-2.5 pr-4">
                          <span className="font-medium">{row.phase}</span>
                          {row.note && (
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {row.note}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 pr-4">{row.duration}</td>
                        <td className="py-2.5 text-muted-foreground">
                          {row.cumulative}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Concept to Completion
                  </p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    36-48 months
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    3-4 years typical
                  </p>
                </div>
                <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Board Approval to Completion
                  </p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    30-42 months
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    2.5-3.5 years
                  </p>
                </div>
                <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Contract to Completion
                  </p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    24-36 months
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    2-3 years construction
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 px-6 py-4 dark:bg-amber-900/10">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                  Schedule overrun reality
                </p>
                <p className="mt-1 text-sm text-amber-700 dark:text-amber-300/80">
                  Projects with a 24-month baseline typically experience 4-8
                  month delays (17-33% overrun). Projects with a 30-month
                  baseline typically experience 4-10 month delays (13-33%
                  overrun). With comprehensive risk management and contingency
                  planning, 10-15% delays are achievable — but that still
                  requires discipline.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Common causes of delays */}
          <BlurFade delay={0.35}>
            <div className="mt-20">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Top 10 Causes of Overall Project Delays
              </h2>
              <p className="mt-3 text-muted-foreground">
                These are the delay drivers that hit club redevelopments across
                the full project lifecycle — not just during construction.
              </p>

              <div className="mt-8 space-y-4">
                {overallDelayDrivers.map((item) => (
                  <div
                    key={item.rank}
                    className="flex gap-4 rounded-lg border p-4"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                      {item.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold">{item.driver}</h3>
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          {item.impact}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Mitigation strategies */}
          <BlurFade delay={0.4}>
            <div className="mt-20">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                How to Minimise Delays
              </h2>
              <p className="mt-3 text-muted-foreground">
                You can&apos;t eliminate delays entirely, but disciplined
                project management can keep overruns to 10-15% instead of
                25-33%.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {mitigationStrategies.map((strategy) => (
                  <div
                    key={strategy.title}
                    className="rounded-lg border p-5"
                  >
                    <h3 className="font-semibold">{strategy.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {strategy.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Bottom download form */}
          <BlurFade delay={0.45}>
            <div className="mt-16">
              <ResourceDownloadForm
                resourceSlug="timeline-guide"
                resourceTitle="Club Redevelopment Timeline Guide"
                pdfPath="/resources/pdfs/club-redevelopment-timeline-guide.pdf"
              />
            </div>
          </BlurFade>
        </div>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Need a Timeline Specific to Your Project?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              Every club redevelopment is different. Site constraints, council
              requirements, staging complexity, and project size all drive
              different timelines. We can help you build a realistic schedule
              for your specific project.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Book a Consultation
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/resources">Browse All Resources</Link>
              </Button>
            </div>
          </div>
        </BlurFade>
      </Section>
    </>
  )
}
