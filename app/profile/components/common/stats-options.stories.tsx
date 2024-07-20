import type { StoryObj, Meta } from '@storybook/react'

import { StatsOptions } from './stats-options'

import { StatsMeasurement } from '@app/api/enums'
import { StatsProvider, View, RigtchTimeRange } from '@app/profile/enums'

type StatsOptionsType = typeof StatsOptions
type StatsOptionsStory = StoryObj<StatsOptionsType>

export default {
  title: 'Components/Profile/Common/StatsOptions',
  component: StatsOptions,
} satisfies Meta<StatsOptionsType>

export const Rigtch: StatsOptionsStory = {
  args: {
    statsProvider: StatsProvider.RIGTCH,
    statsMeasurement: StatsMeasurement.PLAYS,
    view: View.CARD,
    timeRange: RigtchTimeRange.WEEK,
  },
}

export const Spotify: StatsOptionsStory = {
  args: {
    statsProvider: StatsProvider.SPOTIFY,
    view: View.CARD,
    timeRange: RigtchTimeRange.WEEK,
  },
}
