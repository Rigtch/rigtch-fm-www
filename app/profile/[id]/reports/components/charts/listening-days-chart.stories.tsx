import type { StoryObj, Meta } from '@storybook/react'

import { ListeningDaysChart } from './listening-days-chart'

import { StatsMeasurement } from '@app/api/enums'

type ListeningDaysChartType = typeof ListeningDaysChart
type ListeningDaysChartStory = StoryObj<ListeningDaysChartType>

export default {
  title: 'Components/Reports/Charts/ListeningDaysChart',
  component: ListeningDaysChart,
} satisfies Meta<ListeningDaysChartType>

const thisWeekResponseExample = {
  '1': 2,
  '2': 94,
  '3': 27,
  '4': 54,
  '5': 23,
  '6': 34,
  '7': 85,
}
const lastWeekResponseExample = {
  '1': 68,
  '2': 25,
  '3': 12,
  '4': 87,
  '5': 26,
  '6': 39,
  '7': 52,
}
const thisWeekResponseExamplePlaytime: Record<string, number> = {}
const lastWeekResponseExamplePlaytime: Record<string, number> = {}

for (const day in thisWeekResponseExample) {
  const key = day as keyof typeof thisWeekResponseExample

  thisWeekResponseExamplePlaytime[key] =
    thisWeekResponseExample[key] * 1000 * 60
  lastWeekResponseExamplePlaytime[key] =
    lastWeekResponseExample[key] * 1000 * 60
}

export const PlaysMeasurement: ListeningDaysChartStory = {
  args: {
    thisWeekResponse: thisWeekResponseExample,
    lastWeekResponse: lastWeekResponseExample,
    measurement: StatsMeasurement.PLAYS,
  },
}

export const PlaytimeMeasurement: ListeningDaysChartStory = {
  args: {
    thisWeekResponse: thisWeekResponseExamplePlaytime,
    lastWeekResponse: lastWeekResponseExamplePlaytime,
    measurement: StatsMeasurement.PLAY_TIME,
  },
}
