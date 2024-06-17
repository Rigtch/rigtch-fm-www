import type { Meta, StoryObj } from '@storybook/react'

import { ItemName } from './item-name'

type ItemNameType = typeof ItemName
type ItemNameStory = StoryObj<ItemNameType>

export default {
  title: 'Components/Items/Misc/ItemName',
  component: ItemName,
  argTypes: {
    name: { control: 'text' },
    href: { control: 'text' },
  },
  args: {
    href: '/',
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
