import type { Meta, StoryObj } from '@storybook/react'

import {
  albumExample,
  artistExample,
  idExample,
  trackExample,
} from '../examples'

import { ItemCard } from './item-card'

type ItemCardType = typeof ItemCard
type ItemCardStory = StoryObj<ItemCardType>

export default {
  title: 'Components/Items/Cards/ItemCard',
  component: ItemCard,
  argTypes: {
    name: { control: 'text' },
    href: { control: 'text' },
    id: { control: 'text' },
  },
  args: {
    id: idExample,
  },
} satisfies Meta<ItemCardType>

export const Album: ItemCardStory = {
  args: albumExample,
}

export const Track: ItemCardStory = {
  args: trackExample,
}

export const Artist: ItemCardStory = {
  args: artistExample,
}
