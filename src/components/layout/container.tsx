import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'main'
  size?: 'default' | 'narrow' | 'wide' | 'full'
}

export function Container({
  children,
  className,
  as: Component = 'div',
  size = 'default',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        {
          'max-w-5xl': size === 'narrow',
          'max-w-7xl': size === 'default',
          'max-w-[90rem]': size === 'wide',
          'max-w-none': size === 'full',
        },
        className,
      )}
    >
      {children}
    </Component>
  )
}
