import type { Meta, StoryObj } from '@storybook/react'

import { ToggleStatsProvider } from './toggle-stats-provider'

import { StatsProvider } from '@app/profile/enums'

type ToggleStatsProviderType = typeof ToggleStatsProvider
type ToggleStatsProviderStory = StoryObj<ToggleStatsProviderType>

export default {
  title: 'Components/Profile/Common/ToggleStatsProvider',
  component: ToggleStatsProvider,
} satisfies Meta<ToggleStatsProviderType>

export const Spotify: ToggleStatsProviderStory = {
  args: {
    initialValue: StatsProvider.SPOTIFY,
  },
}

export const Rigtch: ToggleStatsProviderStory = {
  args: {
    initialValue: StatsProvider.RIGTCH,
  },
}
