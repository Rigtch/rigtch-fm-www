'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

import { TimeRange } from '@app/api/types'
import { formatSearchParams } from '@app/profile/utils/formatters'

export interface ToggleTimeRangeProps {
  initialValue: TimeRange
}

export function ToggleTimeRange({ initialValue }: ToggleTimeRangeProps) {
  const timeRangeOptions = [
    { label: '4 weeks', value: TimeRange.SHORT_TERM },
    { label: '6 months', value: TimeRange.MEDIUM_TERM },
    { label: 'lifetime', value: TimeRange.LONG_TERM },
  ]

  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <ToggleGroup value={initialValue} type="single">
      {timeRangeOptions.map(({ label, value }) => (
        <ToggleGroupItem key={value} value={value} asChild>
          <Link
            href={`${pathname}?${formatSearchParams(
              searchParams,
              'time-range',
              value
            )}`}
          >
            {label}
          </Link>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
