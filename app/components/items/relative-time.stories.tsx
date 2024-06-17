import type { Meta, StoryObj } from '@storybook/react'

import { RelativeTime } from './relative-time'

type RelativeTimeType = typeof RelativeTime
type RelativeTimeStory = StoryObj<RelativeTimeType>

const relativeTimeValue = '2022-01-01'

export default {
  title: 'Components/Items/RelativeTime',
  component: RelativeTime,
  argTypes: {
    value: {
      control: 'text',
    },
  },
  args: {
    value: relativeTimeValue,
  },
} satisfies Meta<RelativeTimeType>

export const Default: RelativeTimeStory = {}
