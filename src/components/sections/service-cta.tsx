import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'

interface ServiceCtaProps {
  heading: string
  description: string
  buttonText: string
  buttonHref?: string
}

export function ServiceCta({
  heading,
  description,
  buttonText,
  buttonHref = '/contact',
}: ServiceCtaProps) {
  return (
    <Section background="dark">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-lg text-neutral-300">{description}</p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
