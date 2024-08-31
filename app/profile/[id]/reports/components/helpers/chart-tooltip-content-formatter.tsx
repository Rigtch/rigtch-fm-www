import type { ComponentProps, CSSProperties } from 'react'

import { valueMeasurementFormatter } from '@app/profile/[id]/reports/helpers'
import type { ChartTooltipContent } from '@app/components/ui/chart'
import type { StatsMeasurement } from '@app/api/enums'

type ChartTooltipContentFormatter = ComponentProps<
  typeof ChartTooltipContent
>['formatter']

export const chartTooltipContentFormatter = (
  measurement: StatsMeasurement
): ChartTooltipContentFormatter => {
  // eslint-disable-next-line react/display-name
  return (value, name, item) => (
    <>
      <div
        className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] h-2.5 w-2.5"
        style={
          {
            '--color-bg': item.color,
            '--color-border': item.color,
          } as CSSProperties
        }
      />

      <div className="flex flex-1 gap-1 justify-between leading-none items-end">
        <div className="grid gap-1.5">
          <span className="text-muted-foreground">{item.name}</span>
        </div>
        {item.value && (
          <span className="font-mono font-medium tabular-nums text-foreground">
            {valueMeasurementFormatter(+value, measurement, false)}
          </span>
        )}
      </div>
    </>
  )
}
