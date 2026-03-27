import Image from 'next/image'
import Link from 'next/link'

export function AuthorBio() {
  return (
    <div className="mt-12 flex items-start gap-4 rounded-xl border bg-muted/50 p-6">
      <Image
        src="/images/landing/noel-portrait.jpg"
        alt="Noel Yaxley, Director of UpScale Project Management"
        width={80}
        height={80}
        className="shrink-0 rounded-full object-cover"
      />
      <div>
        <p className="font-display text-base font-semibold">
          <Link href="/about" className="hover:underline">
            Noel Yaxley
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          Director, UpScale Project Management
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Architect-turned-project manager with experience across government
          infrastructure, commercial, and hospitality sectors. Noel founded
          UpScale PM to provide independent, client-side advisory for club
          boards navigating major redevelopment projects across NSW.
        </p>
      </div>
    </div>
  )
}
