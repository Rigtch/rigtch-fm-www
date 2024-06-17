import type { Meta, StoryObj } from '@storybook/react'

import { GenreBadge } from './genre-badge'

type GenreBadgeType = typeof GenreBadge
type GenreBadgeStory = StoryObj<GenreBadgeType>

export default {
  title: 'Components/Items/Misc/Genre/Badge',
  component: GenreBadge,
  argTypes: {
    genre: {
      control: 'text',
    },
  },
  args: {
    genre: 'Black Metal',
  },
} satisfies Meta<GenreBadgeType>

export const Default: GenreBadgeStory = {}
