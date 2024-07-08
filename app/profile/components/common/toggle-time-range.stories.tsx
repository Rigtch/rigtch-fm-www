import type { Meta, StoryObj } from '@storybook/react'

import { ToggleTimeRange } from './toggle-time-range'

import { SpotifyTimeRange } from '@app/api/types'

type ToggleTimeRangeType = typeof ToggleTimeRange
type ToggleTimeRangeStory = StoryObj<ToggleTimeRangeType>

export default {
  title: 'Components/Profile/Common/ToggleTimeRange',
  component: ToggleTimeRange,
  argTypes: {
    initialValue: {
      options: Object.values(SpotifyTimeRange),
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<ToggleTimeRangeType>

export const Default: ToggleTimeRangeStory = {
  args: {
    initialValue: SpotifyTimeRange.SHORT_TERM,
  },
}
