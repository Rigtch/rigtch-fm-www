import type { Meta, StoryObj } from '@storybook/react'

import { genreExample } from './examples'
import { GenreChip } from './genre-chip'

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

export const WithPlays: GenreChipStory = {
  args: {
    plays: 100,
    maxPlays: 110,
  },
}

export const WithPlayTime: GenreChipStory = {
  args: {
    playTime: 1000 * 60 * 60 * 4,
    maxPlayTime: 1000 * 60 * 60 * 6,
  },
}
