'use client'

import prettyMilliseconds from 'pretty-ms'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { chartTooltipContentFormatter } from '../helpers'

import { weekDays } from '@app/profile/[id]/reports/helpers'
import { StatsMeasurement } from '@app/api/enums'
import type { ChartConfig } from '@app/components/ui/chart'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@app/components/ui/chart'
import type { ListeningDays } from '@app/api/types'

namespace ListeningDaysChart {
  export type Props = Readonly<{
    thisWeekResponse: ListeningDays
    lastWeekResponse: ListeningDays
    measurement: StatsMeasurement
  }>
}

function ListeningDaysChart({
  thisWeekResponse,
  lastWeekResponse,
  measurement,
}: ListeningDaysChart.Props) {
  const listeningDays = weekDays.map((day, index) => ({
    day,
    thisWeekDate: thisWeekResponse[index].date,
    lastWeekDate: lastWeekResponse[index].date,
    thisWeek: thisWeekResponse[index].value,
    lastWeek: lastWeekResponse[index].value,
  }))

  const chartConfig = {
    thisWeek: {
      label: 'This week',
      color: '#9400d5',
    },
    lastWeek: {
      label: 'Last week',
      color: '#590080',
    },
  } satisfies ChartConfig

  const tickFormatter = (value: number) =>
    measurement === StatsMeasurement.PLAYS
      ? value + ''
      : prettyMilliseconds(value, { unitCount: 2 })

  return (
    <ChartContainer
      config={chartConfig}
      className="dark -ml-[1rem] min-h-[300px] w-[calc(100%+2rem)] lg:min-h-[200px] xl:ml-0 xl:w-full"
    >
      <BarChart accessibilityLayer data={listeningDays}>
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={8}
          tickFormatter={tickFormatter}
        />
        <CartesianGrid vertical={false} />
        <ChartTooltip
          content={<ChartTooltipContent />}
          formatter={chartTooltipContentFormatter(measurement)}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="thisWeek" fill="var(--color-thisWeek)" radius={4} />
        <Bar dataKey="lastWeek" fill="var(--color-lastWeek)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export { ListeningDaysChart }