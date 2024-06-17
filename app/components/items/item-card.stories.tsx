import type { Meta, StoryObj } from '@storybook/react'

import { ItemCard } from './item-card'

type ItemCardType = typeof ItemCard
type ItemCardStory = StoryObj<ItemCardType>

export default {
  title: 'Components/Items/Card',
  component: ItemCard,
  argTypes: {
    name: { control: 'text' },
    href: { control: 'text' },
    id: { control: 'text' },
  },
} satisfies Meta<ItemCardType>

export const Album: ItemCardStory = {
  args: {
    name: 'A Dark Forgotten Past',
    id: '4530c625-2385-45d6-8db1-8b867f125e30',
    releaseDate: '2017-12-01T00:00:00.000Z',
    albumType: 'album',
    href: 'https://open.spotify.com/album/7gtPnEabb5TuGYn9pGLiz8',
    images: [
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e02c84f17fc34c60240d9676c2f',
      },
    ],
  },
}

export const Track: ItemCardStory = {
  args: {
    id: '4530c625-2385-45d6-8db1-8b867f125e30',
    name: 'In Search for New Wisdom',
    href: 'https://open.spotify.com/track/0QBcteLxmPLG4gAXc1pEqW',
    album: {
      images: [
        {
          height: 300,
          width: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e02c84f17fc34c60240d9676c2f',
        },
      ],
    },
    artists: [
      {
        id: 'dec548ab-365f-4fe1-a2b9-c0ea52c9ff89',
        name: 'Eldamar',
      },
    ],
  },
}

export const Artist: ItemCardStory = {
  args: {
    id: 'dec548ab-365f-4fe1-a2b9-c0ea52c9ff89',
    name: 'Eldamar',
    href: 'https://open.spotify.com/artist/dec548ab-365f-4fe1-a2b9-c0ea52c9ff89',
    images: [
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab67616d0000b2735fdcfafcc8e7831c5fe2c618',
      },
    ],
  },
}
