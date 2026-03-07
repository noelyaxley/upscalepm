import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'
import { GeometricShapes } from '@/components/animation/geometric-shapes'
import { BlurFade } from '@/components/animation/blur-fade'

export function HomepageCta() {
  return (
    <Section background="dark" className="section-diagonal-top-reverse relative overflow-hidden">
      <GeometricShapes variant="dark" />
      <BlurFade>
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
          Planning a Club Redevelopment?
        </h2>
        <p className="mt-4 text-lg text-neutral-300">
          Whether you are in early feasibility or ready to appoint a builder,
          we can help protect your club&apos;s interests. Book a free
          30-minute consultation.
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
      </BlurFade>
    </Section>
  )
}
