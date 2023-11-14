import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group'

import { TimeRange } from '@api/types'

export interface SelectTimeRangeProps {
  value: TimeRange
  onChange: (timeRange: TimeRange) => void
}

export function SelectTimeRange({ value, onChange }: SelectTimeRangeProps) {
  const timeRangeOptions = [
    { label: '4 weeks', value: TimeRange.SHORT_TERM },
    { label: '6 months', value: TimeRange.MEDIUM_TERM },
    { label: 'lifetime', value: TimeRange.LONG_TERM },
  ]

  return (
    <ToggleGroup
      value={value}
      type="single"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onValueChange={({ value }: any) => value && onChange(value)}
    >
      {timeRangeOptions.map(({ label, value }) => (
        <ToggleGroupItem key={value} value={value}>
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
