import type { Meta, StoryObj } from '@storybook/react'

import { ItemName } from './name'

type ItemNameType = typeof ItemName
type ItemNameStory = StoryObj<ItemNameType>

export default {
  title: 'Components/Items/Name',
  component: ItemName,
  argTypes: {
    name: { control: 'text' },
    id: { control: 'text' },
  },
  args: {
    id: '4530c625-2385-45d6-8db1-8b867f125e30',
  },
} satisfies Meta<ItemNameType>

export const Default: ItemNameStory = {
  args: {
    name: 'A Dark Forgotten Past',
  },
}

export const WithLongName: ItemNameStory = {
  args: {
    name: 'Dark Medieval Times (Remastered 2021)',
  },
}
