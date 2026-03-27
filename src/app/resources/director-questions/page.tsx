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
import {
  AlertTriangle,
  ShieldCheck,
  DollarSign,
  Eye,
  HardHat,
  Scale,
} from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Questions Every Director Should Ask Before Approving a Project',
  description:
    '15 critical governance questions every club director should ask before voting on a major capital works project. A free checklist covering financial viability, independent oversight, construction delivery, and risk management.',
  path: '/resources/director-questions',
})

function QuestionCard({
  number,
  question,
  why,
  asks,
  redFlags,
  delay,
}: {
  number: number
  question: string
  why: string
  asks: string[]
  redFlags: string[]
  delay: number
}) {
  return (
    <BlurFade delay={delay}>
      <div className="rounded-xl border-2 border-primary/15 bg-background p-6 transition-all hover:border-primary/40 md:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30">
            {number}
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-bold leading-snug md:text-xl">
              {question}
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          {/* Why this matters */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Why This Matters
            </h4>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
              {why}
            </p>
          </div>

          {/* What to ask */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">
              What to Ask
            </h4>
            <ul className="mt-2 space-y-1.5">
              {asks.map((ask, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[15px] leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
                  {ask}
                </li>
              ))}
            </ul>
          </div>

          {/* Red flags */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-red-600 dark:text-red-400" />
              <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">
                Red Flags
              </h4>
            </div>
            <ul className="mt-2 space-y-1.5">
              {redFlags.map((flag, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed text-red-700/80 dark:text-red-300/80"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BlurFade>
  )
}

function SectionHeading({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType
  title: string
  description: string
  delay: number
}) {
  return (
    <BlurFade delay={delay}>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
          <Icon className="size-5 text-white" strokeWidth={1.75} />
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h2>
      </div>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </BlurFade>
  )
}

export default function DirectorQuestionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: 'Director Questions', url: '/resources/director-questions' },
        ])}
      />

      <PageHeader
        title="15 Questions Every Director Should Ask Before Approving a Project"
        subtitle="A governance checklist for club board members. These are the critical questions to ask before voting on major capital expenditure — drawn from our experience advising club boards across NSW."
        breadcrumbs={[
          { label: 'Resources', href: '/resources' },
          { label: 'Director Questions' },
        ]}
      />

      {/* Intro + Download Form */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <BlurFade>
            <div className="prose prose-lg mx-auto max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Approving a major capital works project is among the most
                significant decisions a club board will ever make. A $5M-$50M+
                redevelopment affects every member, every staff member, and the
                club&apos;s financial future for decades.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Yet many boards approve projects without asking the hard
                questions. The result? Cost blowouts, schedule delays, builder
                disputes, and member dissatisfaction that could have been avoided
                with disciplined due diligence.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Under the{' '}
                <strong>Registered Clubs Act</strong>, directors have a fiduciary
                duty to act in the best interests of the club and its members.
                These 15 questions provide the framework for meeting that
                obligation.
              </p>
            </div>
          </BlurFade>

          <div className="mt-10">
            <ResourceDownloadForm
              resourceSlug="director-questions"
              resourceTitle="15 Questions Every Director Should Ask"
              pdfPath="/resources/pdfs/director-questions-checklist.pdf"
            />
          </div>
        </div>
      </Section>

      {/* SECTION A: Financial Viability */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl space-y-8">
          <SectionHeading
            icon={DollarSign}
            title="Section A: Financial Viability & Sustainability"
            description="Before a single dollar is committed, the board must be satisfied the project is financially sound. These three questions establish whether the numbers stack up."
            delay={0.1}
          />

          <QuestionCard
            number={1}
            question="What is the total project cost, range of uncertainty, and how was it derived?"
            why="The board must understand not just the headline figure but the confidence level in the estimate. Early feasibility estimates carry +/-30-50% accuracy; detailed design estimates +/-10-15%; tender estimates +/-5%. If you are voting on a number, you must know how reliable that number is."
            asks={[
              'Is this estimate from a qualified QS with AAPI or Chartered Quantity Surveyor accreditation?',
              'What cost derivation methodology was used (square metre rates, schedule of rates, parametric modelling)?',
              'Has the estimate been validated by an independent third party?',
              'What assumptions underpin the estimate (site conditions, specification level, programme)?',
              'What is the stated confidence level (+/-10%? +/-20%? +/-30%)?',
              'How does this compare to similar club projects nationally?',
            ]}
            redFlags={[
              'Estimate produced by architect or builder rather than an independent QS (conflict of interest)',
              'No stated contingency or contingency below 8%',
              'Estimate significantly lower than comparable projects without clear justification',
              'Estimate lacks line-item detail; just a lump sum provided',
            ]}
            delay={0.15}
          />

          <QuestionCard
            number={2}
            question="What is the financial viability case (NPV, payback, IRR)? What revenue assumptions underpin the business case?"
            why="The project must generate a positive financial return or demonstrable member benefit. Revenue assumptions during and after construction are critical to the payback analysis. Many projects fail because revenue does not recover post-completion."
            asks={[
              'What is the net present value (NPV) of the project over 10 and 20 years?',
              'What is the payback period under base case, optimistic, and pessimistic scenarios?',
              'What is the internal rate of return (IRR)?',
              'What revenue improvements does the project assume across gaming, dining, venue hire, and memberships?',
              'How were revenue assumptions validated (market analysis, member surveys, comparable venues)?',
              'What happens if gaming revenue falls 15%? Does the NPV remain positive if interest rates rise 1-2%?',
            ]}
            redFlags={[
              'No formal financial model provided; just "the project will pay for itself"',
              'Revenue assumptions exceed historical performance or industry benchmarks',
              'No stress-testing under adverse scenarios',
              'Payback period exceeds 15 years',
              'Project funded entirely by member loans or guarantees (Registered Clubs Act risk)',
            ]}
            delay={0.2}
          />

          <QuestionCard
            number={3}
            question="Is the funding strategy documented and secured? What is the refinancing risk?"
            why="Project failure often stems from funding gaps or refinancing risk. The board must confirm funding is available and committed before construction commences."
            asks={[
              'What is the funding structure (bank facility, member loans, grants, internal reserves)?',
              'Is the bank facility pre-approved and committed? What conditions must be satisfied?',
              'What are the covenants (financial ratio requirements, board approvals, quarterly certifications)?',
              'What is the contingency built into the facility?',
              'What is the refinancing risk if the club\'s financial position deteriorates during construction?',
              'Are there member loans or guarantees required under s.29 of the Registered Clubs Act?',
              'What is the interest-during-construction (IDC) cost, and is it budgeted separately?',
              'What is the exit strategy if funding proves insufficient mid-project?',
            ]}
            redFlags={[
              'No bank commitment letter; only an "indicative" facility',
              'Facility size less than project cost plus contingency',
              'Covenants require member approval for variations or contingency release',
              'No contingency funding identified; assumption that all costs are known precisely',
              'Refinancing required during construction period',
            ]}
            delay={0.25}
          />
        </div>
      </Section>

      {/* SECTION B: Independent Oversight */}
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <SectionHeading
            icon={Eye}
            title="Section B: Independent Oversight & Governance"
            description="You do not need construction expertise to be an effective director. But you do need independent experts reporting to the board — not to the builder or the general manager."
            delay={0.1}
          />

          <QuestionCard
            number={4}
            question="What independent governance structure exists to oversee project delivery?"
            why="The board cannot reasonably oversee a complex construction project without independent project governance. Monthly board meetings without project detail often result in unpleasant surprises at practical completion."
            asks={[
              'Is a Project Steering Committee established, separate from the main board?',
              'Who chairs the steering committee (ideally an independent director or external PMO)?',
              'What monthly reporting package does the board receive (KPIs, variance analysis, risk register, decisions log)?',
              'What is the board approval threshold for variations ($50K? $100K? Percentage of project cost)?',
              'What financial or schedule variance triggers escalation to the board?',
              'What escalation protocol exists if major issues go unresolved?',
            ]}
            redFlags={[
              'No project governance structure; the board directly approves all decisions',
              'Project Manager reports only to the General Manager, not to a board steering committee',
              'Monthly board reports are narrative only; no dashboard or KPI metrics',
              'Variation approval threshold exceeds $200K (delays decision-making)',
              'No escalation protocol; ad-hoc decision-making',
            ]}
            delay={0.15}
          />

          <QuestionCard
            number={5}
            question="What independent expertise has been engaged (QS, PM, specialist advisors)?"
            why="Board liability increases if a project fails due to inadequate independent advice. The architect and builder cannot provide objective cost, schedule, or risk advice — they have inherent conflicts of interest."
            asks={[
              'What Quantity Surveyor is engaged? Are they independent of the architect and builder teams?',
              'What is the QS scope of work (cost planning, tender documentation, contract administration, variation assessment)?',
              'What Project Manager is engaged? Are they independent?',
              'What specialist advisors are engaged (heritage, planning, geotechnical, acoustic, gaming compliance)?',
              'What authority does the PM/QS have to approve or reject builder work?',
              'Are all consultant agreements in writing with defined scope, fees, duration, and insurance requirements?',
            ]}
            redFlags={[
              'No independent QS or PM; the builder manages cost and schedule',
              'Consultant selection based on lowest fee (quality risk)',
              'Consultant agreements are verbal or informal with no written scope',
              'Professional indemnity insurance requirements not specified in contracts',
              'No defined authority levels for consultants',
            ]}
            delay={0.2}
          />

          <QuestionCard
            number={6}
            question="What is the decision-making framework for variations, contingency release, and unforeseen issues?"
            why="Variations and unforeseen issues are inevitable on a 24-36 month project. Without a clear decision framework, variations accumulate uncontrolled, contingency depletes, and costs spiral."
            asks={[
              'What is the formal variation procedure (identification, analysis, approval, implementation)?',
              'What approval authority exists at each level (QS under $50K? PM under $100K? Board above $100K?)?',
              'What information is required for variation approval (cost impact, schedule impact, alternatives considered)?',
              'Are variations tracked monthly and reported to the board?',
              'What is the contingency release procedure?',
              'What triggers board escalation (cumulative variations exceeding 10% of contract value? Schedule slip beyond 4 weeks?)?',
            ]}
            redFlags={[
              'No formal variation procedure; variations approved ad-hoc by management',
              'Variation threshold undefined; everything goes to board (or nothing does)',
              'No monthly variation tracking; variations discovered at final account',
              'Contingency managed informally with no release authorisation required',
              'Disputes over variation costs become disputes with builder at final account',
            ]}
            delay={0.25}
          />
        </div>
      </Section>

      {/* SECTION C: Construction & Delivery */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl space-y-8">
          <SectionHeading
            icon={HardHat}
            title="Section C: Construction & Delivery"
            description="How the project is staged, contracted, and delivered determines whether the club stays operational during construction and whether costs stay under control."
            delay={0.1}
          />

          <QuestionCard
            number={7}
            question="Is the staging/phasing strategy documented? What is the impact on operations, revenue, and members?"
            why="Staging failure is a common reason for cost overruns and member dissatisfaction. The board must understand the phasing implications before approval — not after demolition begins."
            asks={[
              'What is the staging strategy (how many phases, what is demolished/constructed in each, what remains operational)?',
              'For each phase: which member facilities remain open, which close, and for how long?',
              'What is the revenue impact of each phase? Has revenue loss been quantified?',
              'What temporary facilities are required (temporary gaming, dining, bar) and are they budgeted?',
              'What is the member communication strategy for each phase?',
              'What is the staff impact (redeployment, retraining, temporary redundancies)?',
            ]}
            redFlags={[
              'Staging strategy is vague; just "minimises disruption to operations"',
              'Revenue impact not quantified for each phase',
              'Temporary facilities mentioned but not budgeted or scheduled',
              'No member communication plan documented',
              'Single-stage strategy with all operations closed for 24+ months (revenue cliff)',
            ]}
            delay={0.15}
          />

          <QuestionCard
            number={8}
            question="What is the contract structure with the builder? What risks are allocated to the club versus the builder?"
            why="The builder contract is the critical risk allocation mechanism. Poor contract terms expose the club to cost overruns, schedule delays, and defects that should be the builder's responsibility."
            asks={[
              'Is the contract fixed-price (lump sum), cost-reimbursable (cost-plus), or hybrid?',
              'What provisional sums are in the contract? (Each one represents a variation risk.)',
              'What is the defects liability period (12, 18, or 24 months)?',
              'What performance security is in place (bank guarantee, insurance bond, amount, release conditions)?',
              'Is there a liquidated damages clause for delay past practical completion?',
              'What payment terms apply (monthly milestones, certification requirements, retention)?',
              'Has the contract been reviewed by the club\'s own legal counsel (not the builder\'s)?',
            ]}
            redFlags={[
              'Fixed-price contract but substantial provisional sums (provisional = variation risk)',
              'No defects liability bond; post-handover defects risk unaddressed',
              'Performance security below 5% of contract value',
              'No liquidated damages clause (no financial penalty for delay)',
              'Payment terms are 100% upon invoice with no retention',
              'Contract reviewed only by the builder\'s legal counsel',
            ]}
            delay={0.2}
          />
        </div>
      </Section>

      {/* SECTION D: Risk Management */}
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <SectionHeading
            icon={ShieldCheck}
            title="Section D: Risk Management & Contingency"
            description="Every major project encounters problems. The question is not whether risks will materialise, but whether the board has planned for them."
            delay={0.1}
          />

          <QuestionCard
            number={9}
            question="What are the top 10 project risks and how are they being managed?"
            why="Risks are inevitable on major projects. The board must understand the top risks and mitigation strategies before commencement. Contingency must be proportional to identified risks."
            asks={[
              'Is there a formal project risk register with owners assigned, mitigation strategies documented, and contingency allocated?',
              'What are the top 10 risks identified? Has impact and probability been assessed for each?',
              'What is the overall project contingency (amount, trigger for release, approval authority)?',
              'Has contingency been adequate on similar projects historically?',
              'Do the top risks include builder insolvency, cost blowout, schedule delay, and regulatory change?',
              'What is the board\'s risk appetite (10% contingency? 15%? 20%)?',
            ]}
            redFlags={[
              'No formal risk register; risks managed ad-hoc',
              'Risk register exists but is not updated monthly',
              'Contingency below 8% of project cost',
              'Top risks do not include builder insolvency, cost blowout, or schedule delay',
              'Risk register not shared with board monthly',
            ]}
            delay={0.15}
          />

          <QuestionCard
            number={10}
            question="What happens if the project encounters major financial difficulty? What is the exit strategy?"
            why="Worst-case planning is essential. The board needs to understand its options if the project hits a major problem mid-construction — not discover them in a crisis."
            asks={[
              'What happens if the builder becomes insolvent mid-construction (termination rights, replacement procurement, insurance)?',
              'What if cumulative cost overruns exceed contingency? Where do additional funds come from?',
              'What if revenue loss during construction exceeds forecast (cash flow impact, funding gap)?',
              'What if DA approval is refused or conditions escalate costs significantly?',
              'What is the full stop/exit strategy? At what point does the board pause or halt the project?',
              'What approvals are required to pause, and what is the financial consequence?',
            ]}
            redFlags={[
              'No contingency planning; assumption is "project will proceed as planned"',
              'No documented exit strategy or pause triggers',
              'Builder insolvency scenario not addressed in contract or insurance',
              'Funding gap scenario not analysed (no contingency funding source identified)',
              'Board cannot identify options if a major issue emerges',
            ]}
            delay={0.2}
          />
        </div>
      </Section>

      {/* SECTION E: Contract & Financial Control */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl space-y-8">
          <SectionHeading
            icon={Scale}
            title="Section E: Contract & Financial Control"
            description="Discipline in variation management and financial reporting is what separates projects that stay on budget from those that blow out."
            delay={0.1}
          />

          <QuestionCard
            number={11}
            question="Are key contract terms understood by all parties? What is the variation pipeline forecast?"
            why="Uncontrolled variations are the most common reason for project cost blowouts. Variation management discipline must be established before construction begins, not after the first claim lands on your desk."
            asks={[
              'Have the builder, QS, and PM met to confirm mutual understanding of contract terms?',
              'What is the current variation pipeline (anticipated variations identified and estimated but not yet authorised)?',
              'What is the forecast cumulative variation cost at project completion?',
              'Are variations monitored weekly and reported to the board monthly?',
              'What controls prevent scope creep (design freeze, specification discipline, change control board)?',
              'What has been the actual variation rate on similar projects (as a percentage of original contract value)?',
            ]}
            redFlags={[
              'No variation pipeline identified; assumption is that no variations will be required',
              'Forecast variations exceed 15% of contract value (design or specification inadequacy)',
              'No change control discipline; member requests bypass the process',
              'Variation approval process is unclear, causing delays that cascade to construction',
            ]}
            delay={0.15}
          />

          <QuestionCard
            number={12}
            question="What financial reporting and cost control processes are in place?"
            why="Monthly cost certification and reforecasting are essential on major projects. Without them, the board is flying blind until it is too late to course correct."
            asks={[
              'What monthly reporting package does the board receive (cost by phase, cost by trade, variance analysis)?',
              'Is there independent cost certification by the QS each month?',
              'What is the budget versus actual tracking methodology?',
              'What is the forecast cost at completion (FCAC), and is it updated monthly?',
              'What budget variance triggers board escalation (over 5% cumulative? Over $100K in a month?)?',
              'What is the retention fund management process (percentage retained, when released, documented authority)?',
            ]}
            redFlags={[
              'Monthly reporting is narrative only; no detailed cost data',
              'No independent cost certification; relying on the builder\'s progress claims',
              'Forecast at completion not updated monthly by the QS',
              'Retention fund not documented; unclear when or how it is released',
              'Cost variance explained as "normal" without rigorous analysis',
            ]}
            delay={0.2}
          />
        </div>
      </Section>

      {/* SECTION F: Revenue Protection */}
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <SectionHeading
            icon={DollarSign}
            title="Section F: Revenue Protection & Delivery Closure"
            description="The project does not end at practical completion. Revenue protection during construction and proper closure are where many boards lose focus — and lose money."
            delay={0.1}
          />

          <QuestionCard
            number={13}
            question="How is member revenue protected during construction? What is the post-construction recovery plan?"
            why="Revenue loss during construction often exceeds projections. The board must monitor revenue actuals versus forecast throughout, and have a recovery plan ready for opening day."
            asks={[
              'What is the revenue forecast by phase during construction (gaming, dining, venue hire, bar)?',
              'What is the member retention rate during construction? Are members using alternative venues?',
              'What temporary venue strategy is in place (gaming relocation, temporary dining)?',
              'What is the post-construction revenue ramp-up forecast (immediate recovery or phased over 6 months)?',
              'What is the member retention and acquisition campaign post-opening?',
              'What is the breakeven revenue required on new facilities to service the debt?',
            ]}
            redFlags={[
              'Revenue forecast assumes minimal member attrition during construction',
              'Post-construction ramp-up assumes immediate return to pre-construction levels',
              'No temporary venue strategy; gaming floor closed for extended period',
              'Club has insufficient cash reserves to cover a revenue shortfall',
              'No dedicated member retention campaign budgeted for post-opening',
            ]}
            delay={0.15}
          />

          <QuestionCard
            number={14}
            question="What is the practical completion criteria, defects liability process, and project closure process?"
            why="The handover and defects liability phase is often contentious. Clear processes prevent disputes and ensure the club receives the building quality it paid for."
            asks={[
              'What is the Practical Completion definition in the contract?',
              'What is the pre-practical completion inspection process (site walk-through, punch list)?',
              'What is the defects liability period and the defects liability bond (percentage, duration, release conditions)?',
              'What is the defects rectification procedure (how many days for builder to correct, penalties)?',
              'What is the final account process (builder claim, QS review, disputes, payment timeline)?',
              'Is a 12-month post-opening review scheduled (building performance, defects resolution, lessons learned)?',
            ]}
            redFlags={[
              'Practical Completion criteria vague; potential for dispute on when the building is "complete"',
              'Defects liability period less than 12 months',
              'No defects liability bond',
              'Final account process not documented; disputes anticipated',
              'No 12-month post-opening review scheduled',
            ]}
            delay={0.2}
          />
        </div>
      </Section>

      {/* SECTION G: Board Commitment */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl space-y-8">
          <SectionHeading
            icon={ShieldCheck}
            title="Section G: Board Resolution & Commitment"
            description="The final governance checkpoint before the board commits to an investment that will define the club for the next 20 years."
            delay={0.1}
          />

          <QuestionCard
            number={15}
            question="Has the board conducted full due diligence? Is the board prepared to oversee this project through to completion?"
            why="This is the final checkpoint before the board commits to a $2M-$50M+ investment. Every director must be satisfied that the preceding 14 questions have been answered."
            asks={[
              'Has every board director received a detailed project briefing (financial model, risks, contracts, governance structure)?',
              'Has the board conducted comprehensive due diligence (financial, legal, operational, risk)?',
              'Does the board have sufficient expertise — or external advisors — to oversee the project?',
              'Is the board prepared to commit 2-3 years of oversight through to project completion?',
              'What happens if the board chair or key directors resign mid-project?',
              'What is the board\'s member communication commitment (regular updates, member forums, AGM reports)?',
            ]}
            redFlags={[
              'Questions 1-14 have not been answered to every director\'s satisfaction',
              'Board expertise gaps not identified or addressed',
              'Board members divided on project support with no path to resolution',
              'No board resolution documenting the decision rationale and conditions',
              'Board unprepared for a 2-3 year oversight commitment',
            ]}
            delay={0.15}
          />
        </div>
      </Section>

      {/* Closing Note */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <BlurFade>
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 md:p-8">
              <h2 className="font-display text-xl font-bold md:text-2xl">
                A Note to Directors
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Your role is not to micromanage construction. It is to ensure
                  that financial viability is confirmed, independent expertise is
                  engaged, clear governance processes are documented, risks are
                  identified and managed, monthly oversight is maintained, and
                  member interests are protected.
                </p>
                <p className="font-semibold text-foreground">
                  If these 15 questions cannot be answered satisfactorily, delay
                  project approval until they can be. Projects rarely benefit
                  from board approval without adequate due diligence.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Bottom Download Form */}
          <div className="mt-10">
            <ResourceDownloadForm
              resourceSlug="director-questions"
              resourceTitle="15 Questions Every Director Should Ask"
              pdfPath="/resources/pdfs/director-questions-checklist.pdf"
            />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-tight md:text-4xl">
              Need Help Preparing Your Board?
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              We help club boards ask the right questions, engage the right
              advisors, and establish governance structures that protect the
              club&apos;s interests throughout a redevelopment. Book a free
              consultation to discuss your project.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href="/resources"
                  className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white"
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
