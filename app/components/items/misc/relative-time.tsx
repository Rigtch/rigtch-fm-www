'use client'

import { DateTime, type DateTimeOptions } from 'luxon'

import { cn } from '@app/utils/cn'

export interface RelativeTimeProps {
  value: string
  className?: string
  options?: DateTimeOptions
}

export function RelativeTime({ value, options, className }: RelativeTimeProps) {
  return (
    <p
      className={cn('text-primary-foreground/80 whitespace-nowrap', className)}
      suppressHydrationWarning
    >
      {DateTime.fromISO(value, options).toRelative()}
    </p>
  )
}
