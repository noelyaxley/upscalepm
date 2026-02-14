interface StatItem {
  label: string
  value: string
}

interface ProjectStatsProps {
  stats: StatItem[]
}

export function ProjectStats({ stats }: ProjectStatsProps) {
  return (
    <div className="not-prose my-8 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
              {stat.label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-neutral-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
