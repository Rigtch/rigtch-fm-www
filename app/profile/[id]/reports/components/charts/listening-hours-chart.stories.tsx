import type { StoryObj, Meta } from '@storybook/react'

import { ListeningHoursChart } from './listening-hours-chart'

import { StatsMeasurement } from '@app/api/enums'

type ListeningHoursChartType = typeof ListeningHoursChart
type ListeningHoursChartStory = StoryObj<ListeningHoursChartType>

export default {
  title: 'Components/Reports/Charts/ListeningHoursChart',
  component: ListeningHoursChart,
} satisfies Meta<ListeningHoursChartType>

const thisWeekResponseExample = {
  '0': 2,
  '1': 1,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 1,
  '7': 6,
  '8': 12,
  '9': 34,
  '10': 27,
  '11': 20,
  '12': 23,
  '13': 2,
  '14': 0,
  '15': 12,
  '16': 27,
  '17': 32,
  '18': 23,
  '19': 19,
  '20': 0,
  '21': 0,
  '22': 10,
  '23': 8,
}

const lastWeekResponseExample = {
  '0': 12,
  '1': 17,
  '2': 28,
  '3': 2,
  '4': 0,
  '5': 0,
  '6': 0,
  '7': 0,
  '8': 0,
  '9': 0,
  '10': 0,
  '11': 1,
  '12': 12,
  '13': 11,
  '14': 19,
  '15': 23,
  '16': 27,
  '17': 30,
  '18': 0,
  '19': 0,
  '20': 12,
  '21': 23,
  '22': 45,
  '23': 32,
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

export const PlaysMeasurement: ListeningHoursChartStory = {
  args: {
    thisWeekResponse: thisWeekResponseExample,
    lastWeekResponse: lastWeekResponseExample,
    measurement: StatsMeasurement.PLAYS,
  },
}

export const PlaytimeMeasurement: ListeningHoursChartStory = {
  args: {
    thisWeekResponse: thisWeekResponseExamplePlaytime,
    lastWeekResponse: lastWeekResponseExamplePlaytime,
    measurement: StatsMeasurement.PLAY_TIME,
  },
}
