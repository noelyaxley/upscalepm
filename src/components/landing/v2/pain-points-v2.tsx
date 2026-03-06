'use client'

import Image from 'next/image'
import { Container } from '@/components/layout/container'
import { BlurFade } from './blur-fade'

const painPoints = [
  {
    pain: 'Builder says \'on track.\' No update in three weeks.',
    fix: 'We deliver weekly progress reports — no silence.',
    icon: '/images/landing/icons/RadioSilence.gif',
  },
  {
    pain: 'Approving variations you don\'t fully understand.',
    fix: 'We review every variation before you sign.',
    icon: '/images/landing/icons/ConfusedDoc.gif',
  },
  {
    pain: '$3M contract and no independent eyes on it.',
    fix: 'We scrutinise every claim, every dollar.',
    icon: '/images/landing/icons/BlindMoney.gif',
  },
  {
    pain: 'Progress claim doesn\'t match what you saw on site.',
    fix: 'We verify on-site before you pay.',
    icon: '/images/landing/icons/Mismatch.gif',
  },
]

export function PainPointsV2() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <BlurFade>
          <div className="text-center">
            <h2 className="font-display text-[3.25rem] font-bold tracking-tight leading-[0.95] sm:text-5xl md:text-7xl">
              Does This Sound Familiar?
            </h2>
          </div>
        </BlurFade>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {painPoints.map((point, i) => (
            <BlurFade key={point.pain} delay={0.1 + i * 0.1}>
              <div className="group flex h-full flex-col rounded-lg border-2 border-primary/60 bg-neutral-50 p-6 transition-colors hover:border-primary hover:bg-primary/5 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Image
                      src={point.icon}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                    />
                  </div>
                  <p className="text-base font-bold leading-relaxed text-neutral-700">
                    {point.pain}
                  </p>
                </div>
                <p className="mt-3 pl-16 text-sm text-neutral-500 transition-colors group-hover:text-primary">
                  {point.fix}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.5}>
          <div className="mt-10 text-center">
            <a
              href="#survey-form"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              Stop Hoping. Start Here.
            </a>
          </div>
        </BlurFade>
      </Container>
    </section>
  )
}
