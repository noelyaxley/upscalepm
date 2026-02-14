import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'

export function HomepageCta() {
  return (
    <Section background="dark">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to Start Your Project?
        </h2>
        <p className="mt-4 text-lg text-neutral-300">
          Whether you need feasibility advice, design management, or full
          construction oversight, we are here to protect your interests and
          deliver results.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
