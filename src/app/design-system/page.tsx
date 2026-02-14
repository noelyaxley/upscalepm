import type { Metadata } from 'next'
import { Container, Section, PageHeader } from '@/components/layout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Design System',
  robots: { index: false },
}

/* ---------- Colour swatch data ---------- */

const primarySwatches = [
  { name: '50', tw: 'bg-primary-50' },
  { name: '100', tw: 'bg-primary-100' },
  { name: '200', tw: 'bg-primary-200' },
  { name: '300', tw: 'bg-primary-300' },
  { name: '400', tw: 'bg-primary-400' },
  { name: '500', tw: 'bg-primary-500' },
  { name: '600', tw: 'bg-primary-600' },
  { name: '700', tw: 'bg-primary-700' },
  { name: '800', tw: 'bg-primary-800' },
  { name: '900', tw: 'bg-primary-900' },
  { name: '950', tw: 'bg-primary-950' },
]

const neutralSwatches = [
  { name: '50', tw: 'bg-neutral-50' },
  { name: '100', tw: 'bg-neutral-100' },
  { name: '200', tw: 'bg-neutral-200' },
  { name: '300', tw: 'bg-neutral-300' },
  { name: '400', tw: 'bg-neutral-400' },
  { name: '500', tw: 'bg-neutral-500' },
  { name: '600', tw: 'bg-neutral-600' },
  { name: '700', tw: 'bg-neutral-700' },
  { name: '800', tw: 'bg-neutral-800' },
  { name: '900', tw: 'bg-neutral-900' },
  { name: '950', tw: 'bg-neutral-950' },
]

const semanticColours = [
  { name: 'background', tw: 'bg-background' },
  { name: 'foreground', tw: 'bg-foreground' },
  { name: 'muted', tw: 'bg-muted' },
  { name: 'border', tw: 'bg-border' },
  { name: 'ring', tw: 'bg-ring' },
  { name: 'accent', tw: 'bg-accent' },
  { name: 'primary', tw: 'bg-primary' },
  { name: 'secondary', tw: 'bg-secondary' },
  { name: 'destructive', tw: 'bg-destructive' },
  { name: 'card', tw: 'bg-card' },
]

/* ---------- Page ---------- */

export default function DesignSystemPage() {
  return (
    <>
      <PageHeader
        title="Design System"
        subtitle="Typography, colour palette, components, and layout primitives for UpScalePM."
        breadcrumbs={[{ label: 'Design System' }]}
      />

      {/* ============================================
          TYPOGRAPHY
          ============================================ */}
      <Section id="typography" spacing="default">
        <h2 className="mb-8 text-3xl font-bold">Typography</h2>

        {/* Heading levels */}
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Headings
          </p>
          <h1 className="text-6xl font-bold tracking-tight">
            H1 -- Display Font (Playfair Display)
          </h1>
          <h2 className="text-5xl font-bold tracking-tight">
            H2 -- Display Font (Playfair Display)
          </h2>
          <h3 className="text-4xl font-bold tracking-tight">
            H3 -- Body Font (Inter)
          </h3>
          <h4 className="text-3xl font-bold tracking-tight">
            H4 -- Body Font (Inter)
          </h4>
          <h5 className="text-2xl font-bold tracking-tight">
            H5 -- Body Font (Inter)
          </h5>
          <h6 className="text-xl font-bold tracking-tight">
            H6 -- Body Font (Inter)
          </h6>
        </div>

        {/* Body text sizes */}
        <div className="mt-12 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Body Text Sizes
          </p>
          <p className="text-sm">
            text-sm (0.875rem) -- Fine print and secondary information.
          </p>
          <p className="text-base">
            text-base (1rem) -- Default body text for paragraphs and general
            content.
          </p>
          <p className="text-lg">
            text-lg (1.125rem) -- Slightly emphasised body text, used for lead
            paragraphs.
          </p>
          <p className="text-xl">
            text-xl (1.25rem) -- Large body text for hero subtitles and
            callouts.
          </p>
        </div>

        {/* Prose block */}
        <div className="mt-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Prose Block (MDX Preview)
          </p>
          <div className="prose prose-lg max-w-none">
            <h2>Client-Side Project Management</h2>
            <p>
              When you engage a builder, architect, or consultant, you need
              someone in your corner. Client-side project management means
              having an experienced professional who represents{' '}
              <strong>your interests</strong> -- not the contractor&apos;s.
            </p>
            <blockquote>
              <p>
                &ldquo;The best time to engage a project manager is before you
                sign a single contract. The second-best time is right
                now.&rdquo;
              </p>
            </blockquote>
            <h3>What We Cover</h3>
            <ul>
              <li>Feasibility analysis and budget planning</li>
              <li>Consultant procurement and contract administration</li>
              <li>Design management and value engineering</li>
              <li>Construction monitoring and defect management</li>
            </ul>
            <p>
              Every project is different, but the fundamentals remain the same:
              protect the client&apos;s time, budget, and quality. We bring
              structure to chaos so you can focus on the decisions that matter.
            </p>
            <h3>Our Approach</h3>
            <ol>
              <li>
                <strong>Understand</strong> -- We start by understanding your
                goals, constraints, and risk appetite.
              </li>
              <li>
                <strong>Plan</strong> -- We build a clear roadmap with
                milestones, budgets, and accountabilities.
              </li>
              <li>
                <strong>Execute</strong> -- We manage the day-to-day so you
                don&apos;t have to.
              </li>
              <li>
                <strong>Report</strong> -- Transparent reporting at every stage.
                No surprises.
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* ============================================
          COLOUR PALETTE
          ============================================ */}
      <Section id="colours" background="muted" spacing="default">
        <h2 className="mb-8 text-3xl font-bold">Colour Palette</h2>

        {/* Primary */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Primary (Orange)
          </p>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
            {primarySwatches.map((s) => (
              <div key={s.name} className="text-center">
                <div
                  className={`${s.tw} h-16 w-full rounded-lg border border-black/5`}
                />
                <span className="mt-1 block text-xs text-muted-foreground">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Neutral */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Neutral (Warm Grey)
          </p>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
            {neutralSwatches.map((s) => (
              <div key={s.name} className="text-center">
                <div
                  className={`${s.tw} h-16 w-full rounded-lg border border-black/5`}
                />
                <span className="mt-1 block text-xs text-muted-foreground">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Semantic Colours
          </p>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {semanticColours.map((s) => (
              <div key={s.name} className="text-center">
                <div
                  className={`${s.tw} h-16 w-full rounded-lg border border-black/5`}
                />
                <span className="mt-1 block text-xs text-muted-foreground">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================
          COMPONENTS
          ============================================ */}
      <Section id="components" spacing="default">
        <h2 className="mb-8 text-3xl font-bold">Components</h2>

        {/* Buttons -- Variants */}
        <div className="mb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Button Variants
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* Buttons -- Sizes */}
        <div className="mb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Button Sizes
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Card */}
        <div className="mb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Card
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Feasibility Analysis</CardTitle>
                <CardDescription>
                  Financial modelling for property development projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Assess land acquisition costs, construction budgets, sales
                  revenue, and funding structures to determine project viability
                  before you commit.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Monitoring</CardTitle>
                <CardDescription>
                  Independent oversight of construction progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Regular site inspections, progress reporting, cost tracking,
                  and risk identification to keep your project on track.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Administration</CardTitle>
                <CardDescription>
                  Managing contractor obligations and claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Progress claims assessment, variations management, extension
                  of time evaluation, and practical completion certification.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Container sizes */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Container Sizes
          </p>
          <div className="space-y-4">
            {(['narrow', 'default', 'wide'] as const).map((size) => (
              <Container key={size} size={size}>
                <div className="rounded-lg border-2 border-dashed border-primary-300 bg-primary-50 px-4 py-3 text-center text-sm font-medium text-primary-700">
                  Container: {size}
                </div>
              </Container>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================
          LAYOUT
          ============================================ */}
      <Section id="layout" background="muted" spacing="default">
        <h2 className="mb-8 text-3xl font-bold">Layout</h2>

        {/* Section backgrounds */}
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Section Backgrounds & Spacing
        </p>
      </Section>

      <Section background="default" spacing="compact">
        <p className="text-center text-sm font-medium">
          background=&quot;default&quot; / spacing=&quot;compact&quot;
        </p>
      </Section>

      <Section background="muted" spacing="default">
        <p className="text-center text-sm font-medium">
          background=&quot;muted&quot; / spacing=&quot;default&quot;
        </p>
      </Section>

      <Section background="primary" spacing="default">
        <p className="text-center text-sm font-medium">
          background=&quot;primary&quot; / spacing=&quot;default&quot;
        </p>
      </Section>

      <Section background="dark" spacing="generous">
        <p className="text-center text-sm font-medium">
          background=&quot;dark&quot; / spacing=&quot;generous&quot;
        </p>
      </Section>

      {/* Responsive grid */}
      <Section spacing="default">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Responsive Grid (1 col / 2 col / 3 col)
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100 text-sm font-medium text-neutral-600"
            >
              Grid Item {i + 1}
            </div>
          ))}
        </div>
      </Section>

      {/* PageHeader example */}
      <Section background="muted" spacing="compact">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          PageHeader Component (shown at top of this page)
        </p>
        <p className="text-sm text-muted-foreground">
          The PageHeader at the top of this page demonstrates the component with
          a title, subtitle, and breadcrumbs. It uses the display font (Playfair
          Display) for the H1 heading, a muted background, and responsive
          vertical padding.
        </p>
      </Section>
    </>
  )
}
