import type { StoryObj, Meta } from '@storybook/react'

import { GenreChip } from './genre-chip'

type GenreChipType = typeof GenreChip

const meta: Meta<GenreChipType> = {
  title: 'Components/Common/GenreChip',
  component: GenreChip,
  argTypes: {
    genre: {
      control: 'text',
      defaultValue: 'Black Metal',
    },
  },
}

export default meta

type Story = StoryObj<GenreChipType>

export const Default: Story = {
  args: {
    genre: 'Black Metal',
  },
}
