import type { StoryObj, Meta } from '@storybook/react'

import { MostListenedGenresChart } from './most-listened-genres-chart'

import { StatsMeasurement } from '@app/api/enums'
import type { RigtchStatsResponse } from '@app/api/types'

type MostListenedGenresChartType = typeof MostListenedGenresChart
type MostListenedGenresChartStory = StoryObj<MostListenedGenresChartType>

export default {
  title: 'Components/Reports/Charts/MostListenedGenresChart',
  component: MostListenedGenresChart,
} satisfies Meta<MostListenedGenresChartType>

const topGenresResponseExample = [
  {
    item: 'Black Metal',
    plays: 100,
    playTime: 100 * 1000 * 60,
  },
  {
    item: 'Metal',
    plays: 84,
    playTime: 84 * 1000 * 60,
  },
  {
    item: 'Rock',
    plays: 45,
    playTime: 45 * 1000 * 60,
  },
  {
    item: 'Pop',
    plays: 12,
    playTime: 12 * 1000 * 60,
  },
  {
    item: 'Rap',
    plays: 2,
    playTime: 2 * 1000 * 60,
  },
] as unknown as RigtchStatsResponse<string>

export const PlaysMeasurement: MostListenedGenresChartStory = {
  args: {
    topGenresResponse: topGenresResponseExample,
    measurement: StatsMeasurement.PLAYS,
  },
}

export const PlaytimeMeasurement: MostListenedGenresChartStory = {
  args: {
    topGenresResponse: topGenresResponseExample,
    measurement: StatsMeasurement.PLAY_TIME,
  },
}
