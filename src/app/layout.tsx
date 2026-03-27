import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { GTMScript, GTMNoScript } from '@/components/analytics/gtm-script'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PhoneClickTracker } from '@/components/analytics/phone-click-tracker'
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
    default: 'Independent Advisers for Club Redevelopments | UpScale PM',
    template: '%s | UpScale PM',
  },
  description:
    'Independent advisors for club and golf club redevelopments across NSW. Helping club boards and CEOs successfully deliver major capital projects — from feasibility to opening night.',
  openGraph: {
    siteName: 'UpScale Project Management',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://js.hs-scripts.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <GTMScript />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <GTMNoScript />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <PhoneClickTracker />
          <HubSpotTracker />
          <UTMProvider />
          <ScrollReveal />
        </SmoothScroll>
      </body>
    </html>
  )
}
