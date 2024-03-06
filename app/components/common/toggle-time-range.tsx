'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

import { TimeRange } from '@app/api/types'
import { formatSearchParams } from '@app/profile/utils/formatters'

export interface ToggleTimeRangeProps {
  initialValue: TimeRange
  routeName?: string
}

export function ToggleTimeRange({
  initialValue,
  routeName,
}: ToggleTimeRangeProps) {
  const timeRangeOptions = [
    { label: '4 weeks', value: TimeRange.SHORT_TERM },
    { label: '6 months', value: TimeRange.MEDIUM_TERM },
    { label: 'lifetime', value: TimeRange.LONG_TERM },
  ]

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const timeRange = 'time-range'

  const saveTimeRangeToLocalStorage = (value: TimeRange) => {
    localStorage.setItem(`${timeRange}-${routeName}`, value)

    console.log(localStorage.getItem(`${timeRange}-${routeName}`))

    console.log('done')
  }

  return (
    <ToggleGroup value={initialValue} type="single">
      {timeRangeOptions.map(({ label, value }) => (
        <ToggleGroupItem key={value} value={value} asChild>
          <Link
            href={`${pathname}?${formatSearchParams(
              searchParams,
              timeRange,
              value
            )}`}
            onClick={() => {
              saveTimeRangeToLocalStorage(value)
            }}
          >
            {label}
          </Link>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
