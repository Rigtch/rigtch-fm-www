import type { Meta, StoryObj } from '@storybook/react'

import { GenreBadge } from './genre-badge'
import { genreExample } from './examples'

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
    genre: genreExample,
  },
} satisfies Meta<GenreBadgeType>

export const Default: GenreBadgeStory = {}
