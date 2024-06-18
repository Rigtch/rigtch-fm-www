import type { Meta, StoryObj } from '@storybook/react'

import {
  albumExample,
  artistExample,
  idExample,
  trackExample,
} from '../examples'

import { ItemTopCard } from './item-top-card'

type ItemTopCardType = typeof ItemTopCard
type ItemTopCardStory = StoryObj<ItemTopCardType>

export default {
  title: 'Components/Items/Cards/ItemTopCard',
  component: ItemTopCard,
  argTypes: {
    id: {
      control: 'text',
    },
    position: {
      control: 'number',
    },
    carousel: {
      control: 'boolean',
    },
  },
  args: {
    id: idExample,
    position: 1,
  },
} satisfies Meta<ItemTopCardType>

export const Album: ItemTopCardStory = {
  args: albumExample,
}

export const Track: ItemTopCardStory = {
  args: trackExample,
}

export const Artist: ItemTopCardStory = {
  args: artistExample,
}

export const Top2: ItemTopCardStory = {
  args: {
    position: 2,
    ...artistExample,
  },
}

export const Top3: ItemTopCardStory = {
  args: {
    position: 3,
    ...artistExample,
  },
}
