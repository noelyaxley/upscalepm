import { ImageResponse } from 'next/og'
import { getServiceBySlug } from '@/lib/services'
import { getLocationBySlug, getAllServiceLocationParams } from '@/lib/locations'

export const alt = 'UpScalePM Service'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllServiceLocationParams()
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; location: string }>
}) {
  const { slug, location } = await params
  const service = getServiceBySlug(slug)
  const loc = getLocationBySlug(location)

  const serviceName = service?.title ?? 'Service'
  const cityName = loc?.name ?? 'Location'

  return new ImageResponse(
    (
      <div
        style={{
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #c2410c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            color: '#c2410c',
            fontSize: 28,
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          UpScalePM
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: '80%',
          }}
        >
          {serviceName}
        </div>
        <div
          style={{
            color: '#d4d4d4',
            fontSize: 36,
            marginTop: 16,
            fontWeight: 500,
          }}
        >
          {`${cityName}, NSW`}
        </div>
        <div
          style={{
            color: '#a3a3a3',
            fontSize: 22,
            marginTop: 24,
            maxWidth: '70%',
          }}
        >
          Client-side project management for property and construction
        </div>
      </div>
    ),
    { ...size }
  )
}
