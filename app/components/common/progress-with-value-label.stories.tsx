import type { Meta, StoryObj } from '@storybook/react'

import { ProgressWithValueLabel } from './progress-with-value-label'

type ProgressWithValueLabelType = typeof ProgressWithValueLabel
type ProgressWithValueLabelStory = StoryObj<ProgressWithValueLabelType>

export default {
  title: 'Components/Common/ProgressWithValueLabel',
  component: ProgressWithValueLabel,
  argTypes: {
    value: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    max: 100,
  },
  decorators: [
    Story => (
      <div className="min-w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<ProgressWithValueLabelType>

export const SmallProgress: ProgressWithValueLabelStory = {
  args: {
    value: 1,
    max: 100,
    label: '1 play',
  },
}

export const MediumProgress: ProgressWithValueLabelStory = {
  args: {
    value: 50,
    max: 100,
    label: '50 plays',
  },
}

export const LargeProgress: ProgressWithValueLabelStory = {
  args: {
    value: 99,
    max: 100,
    label: '99 plays',
  },
}
