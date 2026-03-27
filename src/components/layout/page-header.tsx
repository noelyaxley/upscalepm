import Link from 'next/link'
import { Container } from './container'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/components/seo/schemas'

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  // Build breadcrumb schema items from the UI breadcrumbs
  const schemaItems = breadcrumbs && breadcrumbs.length > 0
    ? [
        { name: 'Home', url: '/' },
        ...breadcrumbs.map((crumb) => ({
          name: crumb.label,
          url: crumb.href ?? '',
        })),
      ]
    : null

  return (
    <div className="relative overflow-hidden border-b bg-neutral-950 py-16 text-white md:py-20 lg:py-24">
      {schemaItems && <JsonLd data={breadcrumbSchema(schemaItems)} />}
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <Container className="relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-neutral-400">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight md:text-5xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  )
}
