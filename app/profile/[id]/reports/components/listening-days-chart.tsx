'use client'

import prettyMilliseconds from 'pretty-ms'
import type { ComponentProps, CSSProperties } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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

  type ChartTooltipContentFormatter = ComponentProps<
    typeof ChartTooltipContent
  >['formatter']

  const formatter: ChartTooltipContentFormatter = (value, name, item) => {
    const formattedValue =
      measurement === StatsMeasurement.PLAYS
        ? `${value} plays`
        : prettyMilliseconds(+value, { unitCount: 2 })

    return (
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
              {formattedValue}
            </span>
          )}
        </div>
      </>
    )
  }

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
        <ChartTooltip content={<ChartTooltipContent />} formatter={formatter} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="thisWeek" fill="var(--color-thisWeek)" radius={4} />
        <Bar dataKey="lastWeek" fill="var(--color-lastWeek)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export { ListeningDaysChart }
