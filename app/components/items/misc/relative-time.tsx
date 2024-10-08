'use client'

import { DateTime, type DateTimeOptions } from 'luxon'

import { cn } from '@app/utils/cn'

namespace RelativeTime {
  export type Props = Readonly<{
    value: string
    className?: string
    options?: DateTimeOptions
  }>
}

function RelativeTime({ value, options, className }: RelativeTime.Props) {
  return (
    <p
      className={cn('whitespace-nowrap text-primary-foreground/80', className)}
      suppressHydrationWarning
    >
      {DateTime.fromISO(value, options).setLocale('en').toRelative()}
    </p>
  )
}

export { RelativeTime }
