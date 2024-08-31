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

namespace ListeningDaysChart {
  export interface Props {
    thisWeekResponse: Record<number, number>
    lastWeekResponse: Record<number, number>
    measurement: StatsMeasurement
  }
}

function ListeningDaysChart({
  thisWeekResponse,
  lastWeekResponse,
  measurement,
}: ListeningDaysChart.Props) {
  const listeningDays = weekDays.map((day, index) => ({
    day,
    thisWeek: thisWeekResponse[index + 1],
    lastWeek: lastWeekResponse[index + 1],
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
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full dark">
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
