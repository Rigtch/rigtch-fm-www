'use client'

import { DateTime, type DateTimeOptions } from 'luxon'

import { cn } from '@app/utils/cn'

namespace RelativeTime {
  export interface Props {
    value: string
    className?: string
    options?: DateTimeOptions
  }
}

function RelativeTime({ value, options, className }: RelativeTime.Props) {
  return (
    <p
      className={cn('text-primary-foreground/80 whitespace-nowrap', className)}
      suppressHydrationWarning
    >
      {DateTime.fromISO(value, options).toRelative()}
    </p>
  )
}

export { RelativeTime }
