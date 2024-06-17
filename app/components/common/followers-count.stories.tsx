import type { Meta, StoryObj } from '@storybook/react'

import { FollowersCount } from './followers-count'

type FollowersCountType = typeof FollowersCount
type FollowersCountStory = StoryObj<FollowersCountType>

export default {
  title: 'Components/Common/FollowersCount',
  component: FollowersCount,
  argTypes: {
    value: {
      control: 'number',
    },
  },
  args: {
    value: 4200,
  },
} satisfies Meta<FollowersCountType>

export const Default: FollowersCountStory = {}
