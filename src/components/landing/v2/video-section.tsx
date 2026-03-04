import Image from 'next/image'
import { Play } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { StarRating } from './star-rating'
import { StripeOverlay } from './stripe-overlay'

export function VideoSection() {
  return (
    <section className="relative bg-[#0a0404] py-20 text-white md:py-28">
      <StripeOverlay />

      <Container>
        <div className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-primary">
              No more hoping for the best
            </p>
            <h2 className="mt-3 font-display text-[3.25rem] font-bold tracking-tight leading-[0.95] sm:text-5xl md:text-7xl">
              The Power Is In The Process.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
              Most property owners cross their fingers and trust the builder.
              We&apos;ve spent 15 years proving that doesn&apos;t work.
            </p>
          </div>

          {/* Video placeholder with pulsing play button */}
          <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl">
            <Image
              src="/images/landing/brand/vibe-hotel-entrance.jpg"
              alt="Vibe Hotel Sydney"
              width={1200}
              height={600}
              quality={90}
              className="h-72 w-full object-cover brightness-75 md:h-[500px]"
              sizes="(max-width: 768px) 95vw, 1100px"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Pulsing rings */}
              <div className="absolute size-20 rounded-full bg-primary/30 animate-[pulse-ring_1.5s_ease-out_infinite]" />
              <div className="absolute size-20 rounded-full bg-primary/20 animate-[pulse-ring_1.5s_ease-out_infinite_0.4s]" />
              {/* Play button */}
              <div className="relative flex size-16 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-110">
                <Play className="size-7 fill-white text-white" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <a
              href="#survey-form"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Talk To Us
            </a>
            <StarRating className="text-neutral-500" />
          </div>
        </div>
      </Container>
    </section>
  )
}
