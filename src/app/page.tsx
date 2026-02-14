import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-5xl font-bold tracking-tight">UpScalePM</h1>
      <p className="text-lg text-muted-foreground max-w-md text-center">
        Client-side project management for property and construction.
      </p>
      <Button size="lg">Get in Touch</Button>
    </div>
  )
}
