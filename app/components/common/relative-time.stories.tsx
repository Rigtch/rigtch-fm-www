import type { Meta, StoryObj } from '@storybook/react'

import { RelativeTime } from './relative-time'

type RelativeTimeType = typeof RelativeTime

const meta: Meta<RelativeTimeType> = {
  title: 'Components/Common/RelativeTime',
  component: RelativeTime,
  argTypes: {
    value: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<RelativeTimeType>

export const Default: Story = {
  args: {
    value: '2022-01-01',
  },
}
