import type { StoryObj, Meta } from '@storybook/react'

import { GenreChip } from './genre-chip'

type GenreChipType = typeof GenreChip
type GenreChipStory = StoryObj<GenreChipType>

export default {
  title: 'Components/Items/GenreChip',
  component: GenreChip,
  argTypes: {
    genre: {
      control: 'text',
      defaultValue: 'Black Metal',
    },
  },
} satisfies Meta<GenreChipType>

export const Default: GenreChipStory = {
  args: {
    genre: 'Black Metal',
  },
}
