import { ImageResponse } from 'next/og'

export const alt = 'UpScalePM - Client-Side Project Management'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: '80%',
          }}
        >
          Client-Side Project Management
        </div>
        <div
          style={{
            color: '#a3a3a3',
            fontSize: 24,
            marginTop: 24,
            maxWidth: '70%',
          }}
        >
          Protecting your time, budget, and quality from feasibility through to
          handover.
        </div>
      </div>
    ),
    { ...size }
  )
}
