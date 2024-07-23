import type { StoryObj, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

import { StatsOptions } from './stats-options'

import { StatsMeasurement } from '@app/api/enums'
import { StatsProvider, View, RigtchTimeRange } from '@app/profile/enums'
import { ID } from '@app/constants'

type StatsOptionsType = typeof StatsOptions
type StatsOptionsStory = StoryObj<StatsOptionsType>

export default {
  title: 'Components/Profile/Common/StatsOptions',
  component: StatsOptions,
  decorators: [
    Story => (
      <SessionProvider
        session={
          {
            token: {
              value: 'test',
            },
          } as Session
        }
      >
        <QueryClientProvider client={new QueryClient()}>
          <Story />
        </QueryClientProvider>
      </SessionProvider>
    ),
  ],
  parameters: {
    nextjs: {
      navigation: {
        segments: [[ID, '88b381b3-5dd8-4ccf-b962-72cb5b24d591']],
      },
    },
  },
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
