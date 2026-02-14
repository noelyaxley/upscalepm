import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'
import { GeometricShapes } from '@/components/animation/geometric-shapes'

export function HomepageCta() {
  return (
    <Section background="dark" className="section-diagonal-top-reverse relative overflow-hidden">
      <GeometricShapes variant="dark" />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Your Project Deserves Expert Representation
        </h2>
        <p className="mt-4 text-lg text-neutral-300">
          Whether you are starting a new development or need help with a project
          already underway, we will give you straight answers in a free
          30-minute consultation.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Send an Enquiry</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-neutral-400 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <a
              href={
                process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact#booking'
              }
            >
              Book a Call
            </a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
