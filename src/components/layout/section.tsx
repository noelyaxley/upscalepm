import { cn } from '@/lib/utils'
import { Container } from './container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerSize?: 'narrow' | 'default' | 'wide' | 'full'
  id?: string
  background?: 'default' | 'muted' | 'primary' | 'dark'
  spacing?: 'default' | 'compact' | 'generous'
}

export function Section({
  children,
  className,
  containerSize = 'default',
  id,
  background = 'default',
  spacing = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        {
          'py-16 md:py-20 lg:py-24': spacing === 'default',
          'py-10 md:py-12 lg:py-16': spacing === 'compact',
          'py-24 md:py-32 lg:py-40': spacing === 'generous',
        },
        {
          'bg-background': background === 'default',
          'bg-muted': background === 'muted',
          'bg-primary-500 text-white': background === 'primary',
          'bg-neutral-950 text-white': background === 'dark',
        },
        className,
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}
