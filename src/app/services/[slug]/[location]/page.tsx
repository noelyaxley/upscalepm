import { notFound } from 'next/navigation'

// Location-specific service pages are disabled during club repositioning
export const dynamicParams = false

export function generateStaticParams() {
  return []
}

export default function LocationServicePage() {
  notFound()
}
