interface StatCardProps {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="not-prose my-4 inline-flex flex-col items-center rounded-lg border border-neutral-200 bg-white px-6 py-4 shadow-sm">
      <span className="text-3xl font-bold text-primary-600">{value}</span>
      <span className="mt-1 text-sm text-neutral-500">{label}</span>
    </div>
  )
}
