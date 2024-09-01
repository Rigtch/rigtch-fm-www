'use client'

import { LabelList, Pie, PieChart } from 'recharts'

import { chartTooltipContentFormatter } from '../helpers'

import { StatsMeasurement } from '@app/api/enums'
import type { RigtchStatsResponse } from '@app/api/types'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@app/components/ui/chart'

namespace MostListenedGenresChart {
  export interface Props {
    topGenresResponse: RigtchStatsResponse<string>
    measurement: StatsMeasurement
  }
}

function MostListenedGenresChart({
  topGenresResponse,
  measurement,
}: MostListenedGenresChart.Props) {
  const colors = [
    '#9400d5',
    '#590080',
    '#d500ac',
    '#2e00ef',
    '#1e89ee',
    '#0f6cc5',
    '#0b5090',
    '#00d594',
    '#388e3c',
    '#4aef00',
    '#fff223',
    '#ef2e00',
  ]

  const topGenres = topGenresResponse
    .slice(0, 10)
    .map(({ item, playTime, plays }, index) => ({
      name: item,
      value: measurement === StatsMeasurement.PLAYS ? plays! : playTime!,
      fill: colors[index],
      color: colors[index],
    }))

  const chartConfig: ChartConfig = {}
  for (const { name, fill } of topGenres) {
    chartConfig[name.split(' ').join('-')] = {
      label: `${name.at(0)?.toUpperCase()}${name.slice(1)}`,
      color: fill,
    }
  }

  return (
    <ChartContainer config={chartConfig} className="dark min-h-[350px] w-full">
      <PieChart>
        <Pie data={topGenres} dataKey="value">
          <LabelList
            dataKey="name"
            formatter={(name: string) =>
              topGenres.find(genre => genre.name === name)!.value >
              topGenres[1].value / 2
                ? name
                : ''
            }
          />
        </Pie>

        <ChartTooltip
          content={<ChartTooltipContent />}
          formatter={chartTooltipContentFormatter(measurement)}
        />
      </PieChart>
    </ChartContainer>
  )
}

export { MostListenedGenresChart }
