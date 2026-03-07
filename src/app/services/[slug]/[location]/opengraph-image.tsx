import { ImageResponse } from 'next/og'

export const alt = 'UpScale PM Service'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Location pages disabled during club repositioning
export function generateStaticParams() {
  return []
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
          fontSize: 36,
        }}
      >
        UpScale PM
      </div>
    ),
    { ...size }
  )
}
