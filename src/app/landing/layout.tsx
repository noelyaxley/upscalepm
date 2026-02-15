import { GTMScript } from '@/components/analytics/gtm-script'
import { HubSpotTracker } from '@/components/hubspot/hubspot-tracker'
import { UTMProvider } from '@/components/hubspot/utm-provider'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GTMScript />
      <main className="flex-1">{children}</main>
      <HubSpotTracker />
      <UTMProvider />
    </>
  )
}
