import type { Meta, StoryObj } from '@storybook/react'

import { ToggleTimeRange } from './toggle-time-range'

import { TimeRange } from '@app/api/types'

type ToggleTimeRangeType = typeof ToggleTimeRange

const meta: Meta<ToggleTimeRangeType> = {
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
}

export default meta

type Story = StoryObj<ToggleTimeRangeType>

export const Default: Story = {
  args: {
    initialValue: TimeRange.SHORT_TERM,
  },
}
