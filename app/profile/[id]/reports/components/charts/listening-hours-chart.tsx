'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import type { ComponentProps } from 'react'

import { chartTooltipContentFormatter } from '../helpers'

import type { StatsMeasurement } from '@app/api/enums'
import type { ChartConfig } from '@app/components/ui/chart'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@app/components/ui/chart'

type LabelFormatter = NonNullable<
  ComponentProps<typeof ChartTooltipContent>['labelFormatter']
>

const labelFormatter: LabelFormatter = (
  label,
  [
    {
      payload: { hour },
    },
  ]
) => `${hour}:00 - ${hour + 1}:00`

namespace ListeningHoursChart {
  export type Props = Readonly<{
    thisWeekResponse: Record<number, number>
    lastWeekResponse: Record<number, number>
    measurement: StatsMeasurement
  }>
}

function ListeningHoursChart({
  thisWeekResponse,
  lastWeekResponse,
  measurement,
}: ListeningHoursChart.Props) {
  const listeningHours = Array.from({
    length: Object.values(thisWeekResponse).length,
  }).map((_, index) => ({
    hour: index,
    thisWeek: thisWeekResponse[index],
    lastWeek: lastWeekResponse[index],
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

  return (
    <ChartContainer
      config={chartConfig}
      className="dark mb-6 min-h-[300px] w-full"
    >
      <RadarChart
        data={listeningHours}
        margin={{
          top: -40,
          bottom: -10,
        }}
        innerRadius={20}
      >
        <PolarAngleAxis dataKey="hour" />
        <PolarGrid gridType="circle" />
        <Radar dataKey="lastWeek" fill="var(--color-lastWeek)" />
        <Radar dataKey="thisWeek" fill="var(--color-thisWeek)" />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={chartTooltipContentFormatter(measurement)}
              labelFormatter={labelFormatter}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

export { ListeningHoursChart }
