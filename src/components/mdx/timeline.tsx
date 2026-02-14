import type { ReactNode } from 'react'

interface TimelineProps {
  children: ReactNode
}

interface TimelineItemProps {
  title: string
  date?: string
  children: ReactNode
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="not-prose my-8">
      <div className="relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-neutral-200">
        {children}
      </div>
    </div>
  )
}

export function TimelineItem({ title, date, children }: TimelineItemProps) {
  return (
    <div className="relative">
      {/* Dot */}
      <div className="absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center">
        <div className="h-3 w-3 rounded-full border-2 border-primary-500 bg-white" />
      </div>

      {/* Content */}
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h4 className="text-base font-semibold text-neutral-900">{title}</h4>
          {date && (
            <span className="text-xs font-medium text-neutral-500">{date}</span>
          )}
        </div>
        <div className="mt-1 text-sm leading-relaxed text-neutral-600">
          {children}
        </div>
      </div>
    </div>
  )
}
