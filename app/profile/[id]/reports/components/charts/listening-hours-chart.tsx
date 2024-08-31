'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

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

namespace ListeningHoursChart {
  export interface Props {
    thisWeekResponse: Record<number, number>
    lastWeekResponse: Record<number, number>
    measurement: StatsMeasurement
  }
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
    thisWeek: thisWeekResponse[index - 1],
    lastWeek: lastWeekResponse[index - 1],
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
    <ChartContainer config={chartConfig} className="min-h-[350px] w-full dark">
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
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

export { ListeningHoursChart }
