'use client'

import { usePathname, useRouter } from 'next/navigation'

import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group'
import { TimeRange } from '@api/types'

export interface SelectTimeRangeProps {
  initialValue: TimeRange
}

export function SelectTimeRange({ initialValue }: SelectTimeRangeProps) {
  const timeRangeOptions = [
    { label: '4 weeks', value: TimeRange.SHORT_TERM },
    { label: '6 months', value: TimeRange.MEDIUM_TERM },
    { label: 'lifetime', value: TimeRange.LONG_TERM },
  ]

  const pathname = usePathname()
  const router = useRouter()

  return (
    <ToggleGroup
      value={initialValue}
      type="single"
      onValueChange={value => router.push(`${pathname}?time-range=${value}`)}
    >
      {timeRangeOptions.map(({ label, value }) => (
        <ToggleGroupItem key={value} value={value}>
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
