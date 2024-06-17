import type { Meta, StoryObj } from '@storybook/react'

import { ItemArtists } from './item-artists'

type ItemArtistsType = typeof ItemArtists
type ItemArtistsStory = StoryObj<ItemArtistsType>

const artistExample = {
  name: 'Darkthrone',
  href: '/artist/Darkthrone',
  id: 'id',
}

export default {
  title: 'Components/Items/Misc/ItemArtists',
  component: ItemArtists,
} satisfies Meta<ItemArtistsType>

export const Single: ItemArtistsStory = {
  args: {
    artists: [artistExample],
  },
}

export const Multiple: ItemArtistsStory = {
  args: {
    artists: [
      artistExample,
      {
        name: 'Mayhem',
        href: '/artist/Mayhem',
        id: 'id',
      },
    ],
  },
}
