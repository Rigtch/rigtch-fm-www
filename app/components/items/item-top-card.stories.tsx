import type { Meta, StoryObj } from '@storybook/react'

import { ItemTopCard } from './item-top-card'

type ItemTopCardType = typeof ItemTopCard
type ItemTopCardStory = StoryObj<ItemTopCardType>

export default {
  title: 'Components/Items/ItemTopCard',
  component: ItemTopCard,
  argTypes: {
    id: {
      control: 'text',
    },
    position: {
      control: 'number',
    },
  },
  args: {
    id: 'di',
    position: 1,
  },
} satisfies Meta<ItemTopCardType>

export const Album: ItemTopCardStory = {
  args: {
    name: 'A Dark Forgotten Past',
    href: 'https://open.spotify.com/album/7gtPnEabb5TuGYn9pGLiz8',
    images: [
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e02c84f17fc34c60240d9676c2f',
      },
    ],
    genres: ['Atmospheric Black Meta', 'Black Metal', 'Metal'],
  },
}

export const Track: ItemTopCardStory = {
  args: {
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

export const Artist: ItemTopCardStory = {
  args: {
    name: 'Eldamar',
    href: 'https://open.spotify.com/artist/dec548ab-365f-4fe1-a2b9-c0ea52c9ff89',
    images: [
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab67616d0000b2735fdcfafcc8e7831c5fe2c618',
      },
    ],
    genres: ['Atmospheric Black Meta', 'Black Metal', 'Metal'],
  },
}

export const Top2: ItemTopCardStory = {
  args: {
    position: 2,
    name: 'Eldamar',
    href: 'https://open.spotify.com/artist/dec548ab-365f-4fe1-a2b9-c0ea52c9ff89',
    images: [
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab67616d0000b2735fdcfafcc8e7831c5fe2c618',
      },
    ],
    genres: ['Atmospheric Black Meta', 'Black Metal', 'Metal'],
  },
}

export const Top3: ItemTopCardStory = {
  args: {
    position: 3,
    name: 'Eldamar',
    href: 'https://open.spotify.com/artist/dec548ab-365f-4fe1-a2b9-c0ea52c9ff89',
    images: [
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab67616d0000b2735fdcfafcc8e7831c5fe2c618',
      },
    ],
    genres: ['Atmospheric Black Meta', 'Black Metal', 'Metal'],
  },
}
