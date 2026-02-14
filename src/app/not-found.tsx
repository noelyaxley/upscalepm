import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'

const suggestedPages = [
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
]

export default function NotFound() {
  return (
    <Section spacing="generous">
      <div className="text-center">
        <p className="text-primary-500 text-lg font-semibold">404</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>

        {/* Additional navigation links */}
        <div className="mt-12">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Or try one of these pages:
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {suggestedPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
