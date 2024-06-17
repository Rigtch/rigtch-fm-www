import type { Meta, StoryObj } from '@storybook/react'

import { ItemPosition } from './item-position'

type ItemsListElementPositionType = typeof ItemPosition
type ItemsListElementPositionStory = StoryObj<ItemsListElementPositionType>

export default {
  title: 'Components/Items/Misc/ItemPosition',
  component: ItemPosition,
  argTypes: {
    position: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    className: { control: 'text' },
  },
  args: {
    position: 1,
  },
} satisfies Meta<ItemsListElementPositionType>

export const Small: ItemsListElementPositionStory = {
  args: {
    size: 'sm',
  },
}

export const Medium: ItemsListElementPositionStory = {
  args: {
    size: 'md',
  },
}

export const Large: ItemsListElementPositionStory = {
  args: {
    size: 'lg',
  },
}

export const XLarge: ItemsListElementPositionStory = {
  args: {
    size: 'xl',
  },
}
