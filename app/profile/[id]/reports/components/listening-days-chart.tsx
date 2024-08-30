'use client'

import { BarChart, Bar, XAxis, CartesianGrid } from 'recharts'

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
  }
}

function ListeningDaysChart({
  thisWeekResponse,
  lastWeekResponse,
}: ListeningDaysChart.Props) {
  const listeningDays = [
    {
      day: 'Monday',
      thisWeek: thisWeekResponse[1],
      lastWeek: lastWeekResponse[1],
    },
    {
      day: 'Tuesday',
      thisWeek: thisWeekResponse[2],
      lastWeek: lastWeekResponse[2],
    },
    {
      day: 'Wednesday',
      thisWeek: thisWeekResponse[3],
      lastWeek: lastWeekResponse[3],
    },
    {
      day: 'Thursday',
      thisWeek: thisWeekResponse[4],
      lastWeek: lastWeekResponse[4],
    },
    {
      day: 'Friday',
      thisWeek: thisWeekResponse[5],
      lastWeek: lastWeekResponse[5],
    },
    {
      day: 'Saturday',
      thisWeek: thisWeekResponse[6],
      lastWeek: lastWeekResponse[6],
    },
    {
      day: 'Sunday',
      thisWeek: thisWeekResponse[7],
      lastWeek: lastWeekResponse[7],
    },
  ]

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
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="thisWeek" fill="var(--color-thisWeek)" radius={4} />
        <Bar dataKey="lastWeek" fill="var(--color-lastWeek)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export { ListeningDaysChart }
