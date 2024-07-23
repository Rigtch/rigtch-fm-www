import type { Meta, StoryObj } from '@storybook/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { StatsOptions } from './stats-options'

import { StatsMeasurement } from '@app/api/enums'
import { ID } from '@app/constants'
import { RigtchTimeRange, StatsProvider, View } from '@app/profile/enums'
import { QueryClientWrapper } from '@tests/utils'

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
        <QueryClientWrapper>
          <Story />
        </QueryClientWrapper>
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
