'use client'

import { Building2, Landmark, Heart, GraduationCap, Home, Hotel } from 'lucide-react'

const sectors = [
  { name: 'Commercial', icon: Building2 },
  { name: 'Government', icon: Landmark },
  { name: 'Health', icon: Heart },
  { name: 'Education', icon: GraduationCap },
  { name: 'Residential', icon: Home },
  { name: 'Hospitality', icon: Hotel },
]

export function SectorMarquee() {
  const items = [...sectors, ...sectors, ...sectors, ...sectors]

  return (
    <section className="overflow-hidden bg-[#0a0404] py-10 text-white md:py-14">
      <div className="marquee-sector flex w-max gap-10">
        {items.map((sector, i) => {
          const Icon = sector.icon
          return (
            <div key={`${sector.name}-${i}`} className="flex shrink-0 items-center gap-3">
              <Icon className="size-5 text-primary" />
              <span className="font-display text-lg font-bold uppercase tracking-wider md:text-xl">
                {sector.name}
              </span>
              <span className="text-neutral-600">&mdash;</span>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .marquee-sector {
          animation: marquee-sector 40s linear infinite;
        }
        @keyframes marquee-sector {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
