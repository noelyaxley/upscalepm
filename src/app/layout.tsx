import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { GTMScript, GTMNoScript } from '@/components/analytics/gtm-script'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HubSpotTracker } from '@/components/hubspot/hubspot-tracker'
import { UTMProvider } from '@/components/hubspot/utm-provider'
import { SmoothScroll } from '@/components/animation/smooth-scroll'
import { ScrollReveal } from '@/components/animation/scroll-reveal'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://upscalepm.com.au'),
  title: {
    default: 'UpScalePM | Client-Side Project Management',
    template: '%s | UpScalePM',
  },
  description:
    'Client-side project management for property and construction projects. From feasibility through to handover, we protect your time, budget, and quality.',
  openGraph: {
    siteName: 'UpScalePM',
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <GTMScript />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <GTMNoScript />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <HubSpotTracker />
          <UTMProvider />
          <ScrollReveal />
        </SmoothScroll>
      </body>
    </html>
  )
}
