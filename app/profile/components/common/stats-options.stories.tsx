import type { Meta, StoryObj } from '@storybook/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { StatsOptions } from './stats-options'

import { ID } from '@app/constants'
import { STATS_PROVIDER } from '@app/profile/constants'
import { StatsProvider } from '@app/profile/enums'
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
  parameters: {
    nextjs: {
      navigation: {
        query: {
          [STATS_PROVIDER]: StatsProvider.RIGTCH,
        },
      },
    },
  },
}

export const Spotify: StatsOptionsStory = {
  parameters: {
    nextjs: {
      navigation: {
        query: {
          [STATS_PROVIDER]: StatsProvider.SPOTIFY,
        },
      },
    },
  },
}
