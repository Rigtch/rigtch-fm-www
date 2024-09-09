import type { StoryObj, Meta } from '@storybook/react'

import { ListeningDaysChart } from './listening-days-chart'

import { StatsMeasurement } from '@app/api/enums'

type ListeningDaysChartType = typeof ListeningDaysChart
type ListeningDaysChartStory = StoryObj<ListeningDaysChartType>

export default {
  title: 'Components/Reports/Charts/ListeningDaysChart',
  component: ListeningDaysChart,
} satisfies Meta<ListeningDaysChartType>

const thisWeekResponseExample = [
  { dayIndex: 1, value: 2, date: new Date('2022-01-01') },
  { dayIndex: 2, value: 94, date: new Date('2022-01-02') },
  { dayIndex: 3, value: 27, date: new Date('2022-01-03') },
  { dayIndex: 4, value: 54, date: new Date('2022-01-04') },
  { dayIndex: 5, value: 23, date: new Date('2022-01-05') },
  { dayIndex: 6, value: 34, date: new Date('2022-01-06') },
  { dayIndex: 7, value: 85, date: new Date('2022-01-07') },
]

const lastWeekResponseExample = [
  { dayIndex: 1, value: 68, date: new Date('2022-01-01') },
  { dayIndex: 2, value: 25, date: new Date('2022-01-02') },
  { dayIndex: 3, value: 12, date: new Date('2022-01-03') },
  { dayIndex: 4, value: 87, date: new Date('2022-01-04') },
  { dayIndex: 5, value: 26, date: new Date('2022-01-05') },
  { dayIndex: 6, value: 39, date: new Date('2022-01-06') },
  { dayIndex: 7, value: 52, date: new Date('2022-01-07') },
]
const thisWeekResponseExamplePlaytime = thisWeekResponseExample.map(day => ({
  ...day,
  value: day.value * 1000 * 60,
}))

const lastWeekResponseExamplePlaytime = lastWeekResponseExample.map(day => ({
  ...day,
  value: day.value * 1000 * 60,
}))

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
