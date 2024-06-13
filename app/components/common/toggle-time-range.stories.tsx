import type { Meta, StoryObj } from '@storybook/react'

import { ToggleTimeRange } from './toggle-time-range'

import { TimeRange } from '@app/api/types'

type ToggleTimeRangeType = typeof ToggleTimeRange
type ToggleTimeRangeStory = StoryObj<ToggleTimeRangeType>

export default {
  title: 'Components/Common/ToggleTimeRange',
  component: ToggleTimeRange,
  argTypes: {
    initialValue: {
      options: Object.values(TimeRange),
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<ToggleTimeRangeType>

export const Default: ToggleTimeRangeStory = {
  args: {
    initialValue: TimeRange.SHORT_TERM,
  },
}
