import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'
import { BlurFade } from '@/components/animation/blur-fade'

interface ServiceCtaProps {
  heading: string
  description: string
  buttonText: string
  buttonHref?: string
  showBooking?: boolean
  bookingText?: string
}

export function ServiceCta({
  heading,
  description,
  buttonText,
  buttonHref = '/contact',
  showBooking = false,
  bookingText = 'Book a Consultation',
}: ServiceCtaProps) {
  return (
    <Section background="dark">
      <BlurFade>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 text-lg text-neutral-300">{description}</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
          {showBooking && (
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
                {bookingText}
              </a>
            </Button>
          )}
        </div>
      </div>
      </BlurFade>
    </Section>
  )
}
