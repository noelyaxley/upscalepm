import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 md:py-32 lg:py-40">
      <h1 className="text-5xl font-bold tracking-tight">UpScalePM</h1>
      <p className="max-w-md text-center text-lg text-muted-foreground">
        Client-side project management for property and construction.
      </p>
      <Button asChild size="lg">
        <Link href="/contact">Get in Touch</Link>
      </Button>
    </div>
  )
}
