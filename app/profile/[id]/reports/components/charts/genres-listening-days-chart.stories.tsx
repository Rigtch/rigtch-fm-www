import type { StoryObj, Meta } from '@storybook/react'

import { GenresListeningDaysChart } from './genres-listening-days-chart'

import { StatsMeasurement } from '@app/api/enums'
import type { GenresListeningDays } from '@app/api/types'

type GenresListeningDaysChartType = typeof GenresListeningDaysChart
type GenresListeningDaysChartStory = StoryObj<GenresListeningDaysChartType>

export default {
  title: 'Components/Reports/Charts/GenresListeningDaysChart',
  component: GenresListeningDaysChart,
} satisfies Meta<GenresListeningDaysChartType>

const genresListeningDaysResponseExample: GenresListeningDays = [
  {
    dayIndex: 1,
    date: new Date('2022-01-01'),
    data: {
      'Black Metal': 2,
      'Death Metal': 1,
      'Thrash Metal': 10,
    },
  },
  {
    dayIndex: 2,
    date: new Date('2022-01-02'),
    data: {
      'Black Metal': 12,
      'Death Metal': 2,
      'Thrash Metal': 23,
    },
  },
  {
    dayIndex: 3,
    date: new Date('2022-01-03'),
    data: {
      'Black Metal': 35,
      'Death Metal': 6,
      'Thrash Metal': 11,
    },
  },
  {
    dayIndex: 4,
    date: new Date('2022-01-04'),
    data: {
      'Black Metal': 21,
      'Death Metal': 7,
      'Thrash Metal': 12,
    },
  },
  {
    dayIndex: 5,
    date: new Date('2022-01-05'),
    data: {
      'Black Metal': 34,
      'Death Metal': 5,
      'Thrash Metal': 12,
    },
  },
  {
    dayIndex: 6,
    date: new Date('2022-01-06'),
    data: {
      'Black Metal': 30,
      'Death Metal': 27,
      'Thrash Metal': 13,
    },
  },
  {
    dayIndex: 7,
    date: new Date('2022-01-07'),
    data: {
      'Black Metal': 18,
      'Death Metal': 21,
      'Thrash Metal': 7,
    },
  },
]

const genresListeningDaysResponseExamplePlaytime =
  genresListeningDaysResponseExample.map(day => ({
    ...day,
    data: {
      'Black Metal': day.data['Black Metal'] * 1000 * 60,
      'Death Metal': day.data['Death Metal'] * 1000 * 60,
      'Thrash Metal': day.data['Thrash Metal'] * 1000 * 60,
    },
  }))

export const PlaysMeasurement: GenresListeningDaysChartStory = {
  args: {
    response: genresListeningDaysResponseExample,
    measurement: StatsMeasurement.PLAYS,
  },
}

export const PlaytimeMeasurement: GenresListeningDaysChartStory = {
  args: {
    response: genresListeningDaysResponseExamplePlaytime,
    measurement: StatsMeasurement.PLAY_TIME,
  },
}
