import Image from 'next/image'
import { Container } from '@/components/layout/container'
import { StarRating } from './star-rating'

export function FounderV2() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <Image
              src="/images/landing/noel-portrait.jpg"
              alt="Noel Yaxley — Founder of UpScale Project Management"
              fill
              quality={90}
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl md:text-7xl">
              Not Another Faceless Firm.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600">
              <p>
                <strong className="text-neutral-900">Noel Yaxley.</strong> 15+ years.
                $85M+ in project value. Commercial, government, health, residential.
              </p>
              <p>
                Founded UpScale because property owners deserve a Project Manager who picks up the phone,
                who&apos;s been on 200+ sites, and who works for{' '}
                <strong className="text-neutral-900">you</strong> &mdash; not the builder.
              </p>
              <p className="italic text-neutral-500">
                This isn&apos;t a call centre. When you call UpScale, you get Noel.
              </p>
            </div>
            <div className="mt-6">
              <StarRating className="text-neutral-400" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
