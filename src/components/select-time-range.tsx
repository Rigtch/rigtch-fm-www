import { SelectButton } from 'primereact/selectbutton'

import { TimeRange } from '@api/types'

export interface SelectTimeRangeProps {
  value: TimeRange
  onChange: (timeRange: TimeRange) => void
}

export function SelectTimeRange({ value, onChange }: SelectTimeRangeProps) {
  const timeRangeOptions = [
    { label: 'Long Term', value: TimeRange.LONG_TERM },
    { label: 'Medium Term', value: TimeRange.MEDIUM_TERM },
    { label: 'Short Term', value: TimeRange.SHORT_TERM },
  ]

  return (
    <SelectButton
      value={value}
      options={timeRangeOptions}
      onChange={({ value }) => value && onChange(value)}
    />
  )
}
