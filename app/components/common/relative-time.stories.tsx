import type { Meta, StoryObj } from '@storybook/react'

import { RelativeTime } from './relative-time'

type RelativeTimeType = typeof RelativeTime
type RelativeTimeStory = StoryObj<RelativeTimeType>

export default {
  title: 'Components/Common/RelativeTime',
  component: RelativeTime,
  argTypes: {
    value: {
      control: 'text',
    },
  },
} satisfies Meta<RelativeTimeType>

export const Default: RelativeTimeStory = {
  args: {
    value: '2022-01-01',
  },
}
