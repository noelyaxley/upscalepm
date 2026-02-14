import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

      <Container className="relative">
        <div className="py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Client-Side Project Management for Property &amp; Construction
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
              From feasibility through to handover, we protect your time, budget,
              and quality. Architectural insight meets hands-on delivery across
              education, health, commercial, and residential projects.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-neutral-600 text-white hover:bg-white/10 hover:text-white">
                <Link href="/case-studies">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
