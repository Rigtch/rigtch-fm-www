import { DateTime, DateTimeOptions } from 'luxon'

import { cn } from '@app/utils/cn'

export interface relativeTimeProps {
  value: string
  className?: string
  options?: DateTimeOptions
}

export function RelativeTime({ value, options, className }: relativeTimeProps) {
  return (
    <p
      className={cn('text-primary-foreground/80 whitespace-nowrap', className)}
    >
      {DateTime.fromISO(value, options).toRelative()}
    </p>
  )
}
