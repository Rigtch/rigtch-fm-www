'use client'

import prettyMilliseconds from 'pretty-ms'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { chartTooltipContentFormatter } from '../helpers'

import { StatsMeasurement } from '@app/api/enums'
import type { GenresListeningDays } from '@app/api/types'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@app/components/ui/chart'
import { chartColors, weekDays } from '@app/profile/[id]/reports/helpers'

type FormattedGenresListeningDays = Record<string, number> & {
  day: string
}

namespace GenresListeningDaysChart {
  export type Props = Readonly<{
    response: GenresListeningDays
    measurement: StatsMeasurement
  }>
}

function GenresListeningDaysChart({
  response,
  measurement,
}: GenresListeningDaysChart.Props) {
  const genresListeningDays = weekDays.map(
    (day, index) =>
      ({
        day,
        ...response[index].data,
      }) as FormattedGenresListeningDays
  )
  const chartConfig: ChartConfig = {}

  for (const [index, genre] of Object.keys(response[0].data).entries()) {
    chartConfig[genre] = {
      label: genre,
      color: chartColors[index],
    } satisfies ChartConfig[keyof ChartConfig]
  }

  const tickFormatter = (value: number) =>
    measurement === StatsMeasurement.PLAYS
      ? value + ''
      : prettyMilliseconds(value, { unitCount: 2 })

  return (
    <ChartContainer config={chartConfig} className="dark min-h-[350px]">
      <AreaChart
        accessibilityLayer
        data={genresListeningDays}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid />

        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={8}
          tickFormatter={tickFormatter}
        />

        <ChartTooltip
          content={<ChartTooltipContent />}
          formatter={chartTooltipContentFormatter(measurement)}
        />
        <ChartLegend content={<ChartLegendContent />} />

        {Object.keys(response[0].data).map(key => (
          <Area
            key={key}
            dataKey={key}
            stackId={key}
            type="monotone"
            stroke={chartConfig[key].color}
            fill={`url(#${key.split(' ').join('-')})`}
          />
        ))}

        <defs>
          {Object.keys(response[0].data).map(key => (
            <linearGradient
              key={key}
              id={key.split(' ').join('-')}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={chartConfig[key].color}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={chartConfig[key].color}
                stopOpacity={0.1}
              />
            </linearGradient>
          ))}
        </defs>
      </AreaChart>
    </ChartContainer>
  )
}

export { GenresListeningDaysChart }
