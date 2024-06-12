import { type StoryObj, type Meta } from '@storybook/react'

import { GenreChip } from './genre-chip'

type GenreChipType = typeof GenreChip

const meta: Meta<GenreChipType> = {
  title: 'Common/GenreChip',
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
