'use client'

import { Container } from '@/components/layout/container'

export function SalesLetter() {
  const today = new Date().toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="bg-neutral-100 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold text-muted-foreground">
            Updated: {today}
          </p>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-700">
            <p className="font-display text-lg font-bold text-neutral-900">
              Dear property owner,
            </p>

            <p>We get it.</p>

            <p>
              Managing a build is hard. Really, <em>really</em> hard.
            </p>

            <p>
              Your builder says everything&apos;s &ldquo;on track&rdquo; &mdash;
              but you haven&apos;t seen a programme update in weeks. Variations
              are landing in your inbox with zero context. Progress claims
              that don&apos;t add up. And you&apos;re starting to wonder if the
              builder&apos;s PM is actually looking out for you.
            </p>

            <p className="italic text-neutral-500">
              (Spoiler: they&apos;re not. They work for the builder.)
            </p>

            <p>
              So now you&apos;re Googling &ldquo;how to check a progress
              claim&rdquo; at 11pm. Reading contracts you don&apos;t fully
              understand. Wondering if that $50K variation is legit or if
              you&apos;re being taken for a ride.
            </p>

            <p>
              Sound familiar? You&apos;re not the first. And you won&apos;t be the last.
            </p>

            <p>
              <strong className="text-neutral-900">
                But this isn&apos;t about us&hellip; It&apos;s about you.
              </strong>
            </p>

            <p>
              You want confidence. Control. Someone in your corner who
              actually knows what they&apos;re looking at. Someone who works
              for <strong className="text-neutral-900">you</strong> &mdash;
              not the builder.
            </p>

            <p>
              Whatever that looks like for you&hellip; it all starts by
              choosing your path below.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
