import type { StoryObj, Meta } from '@storybook/react'

import { GenreChip } from './genre-chip'
import { genreExample } from './examples'

type GenreChipType = typeof GenreChip
type GenreChipStory = StoryObj<GenreChipType>

export default {
  title: 'Components/Items/Misc/Genre/Chip',
  component: GenreChip,
  argTypes: {
    genre: {
      control: 'text',
    },
  },
  args: {
    genre: genreExample,
  },
} satisfies Meta<GenreChipType>

export const Default: GenreChipStory = {}

export const CustomClassName: GenreChipStory = {
  args: {
    className: 'bg-neutral-800',
  },
}
