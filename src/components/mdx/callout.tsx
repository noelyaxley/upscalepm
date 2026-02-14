import type { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'tip' | 'important'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const calloutConfig: Record<CalloutType, { icon: string; borderColor: string; bgColor: string; titleColor: string }> = {
  info: {
    icon: 'ℹ',
    borderColor: 'border-l-blue-500',
    bgColor: 'bg-blue-50',
    titleColor: 'text-blue-800',
  },
  warning: {
    icon: '⚠',
    borderColor: 'border-l-amber-500',
    bgColor: 'bg-amber-50',
    titleColor: 'text-amber-800',
  },
  tip: {
    icon: '💡',
    borderColor: 'border-l-primary-500',
    bgColor: 'bg-primary-50',
    titleColor: 'text-primary-800',
  },
  important: {
    icon: '❗',
    borderColor: 'border-l-red-500',
    bgColor: 'bg-red-50',
    titleColor: 'text-red-800',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = calloutConfig[type]

  return (
    <div className={`not-prose my-6 border-l-4 ${config.borderColor} ${config.bgColor} rounded-r-lg p-4`}>
      {title && (
        <p className={`mb-2 flex items-center gap-2 font-semibold ${config.titleColor}`}>
          <span className="text-lg" aria-hidden="true">{config.icon}</span>
          {title}
        </p>
      )}
      <div className="text-neutral-700 text-sm leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
