import type { ComponentProps, CSSProperties } from 'react'
import { DateTime } from 'luxon'

import { valueMeasurementFormatter } from '@app/profile/[id]/reports/helpers'
import type { ChartTooltipContent } from '@app/components/ui/chart'
import type { StatsMeasurement } from '@app/api/enums'

type ChartTooltipContentFormatter = NonNullable<
  ComponentProps<typeof ChartTooltipContent>['formatter']
>

export const chartTooltipContentFormatter = (
  measurement: StatsMeasurement
): ChartTooltipContentFormatter => {
  // eslint-disable-next-line react/display-name
  return (value, name, item) => (
    <>
      <div
        className="h-2.5 w-2.5 shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]"
        style={
          {
            '--color-bg': item.color ?? item.payload.fill,
            '--color-border': item.color ?? item.payload.fill,
          } as CSSProperties
        }
      />

      <div className="flex flex-1 items-end justify-between gap-1 leading-none">
        <div className="grid gap-1.5">
          <span className="text-muted-foreground">
            {item.name}&nbsp;
            {item.name === 'thisWeek' &&
              item.payload?.thisWeekDate &&
              `(${DateTime.fromJSDate(item.payload.thisWeekDate).toFormat('LLL dd')})`}
            {item.name === 'lastWeek' &&
              item.payload?.lastWeekDate &&
              `(${DateTime.fromJSDate(item.payload.lastWeekDate).toFormat('LLL dd')})`}
          </span>
        </div>

        {item.value && (
          <span className="font-mono font-medium tabular-nums text-foreground">
            {valueMeasurementFormatter(+value, measurement)}
          </span>
        )}
      </div>
    </>
  )
}
