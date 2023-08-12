import { SelectButton } from 'primereact/selectbutton'

import { TimeRange } from '@api/types'

export interface SelectTimeRangeProps {
  value: TimeRange
  onChange: (timeRange: TimeRange) => void
}

export function SelectTimeRange({ value, onChange }: SelectTimeRangeProps) {
  const timeRangeOptions = [
    { label: 'lifetime', value: TimeRange.LONG_TERM },
    { label: '6 months', value: TimeRange.MEDIUM_TERM },
    { label: '4 weeks', value: TimeRange.SHORT_TERM },
  ]

  return (
    <SelectButton
      value={value}
      options={timeRangeOptions}
      onChange={({ value }) => value && onChange(value)}
    />
  )
}
