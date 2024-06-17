import type { StoryObj, Meta } from '@storybook/react'

import { ItemImage } from './item-image'

type ItemImageType = typeof ItemImage
type ItemImageStory = StoryObj<ItemImageType>

export default {
  title: 'Components/Items/Misc/ItemImage',
  component: ItemImage,
  argTypes: {
    size: {
      control: 'number',
    },
  },
  args: {
    images: [
      {
        height: 64,
        width: 64,
        url: 'https://i.scdn.co/image/ab67616d000048515fdcfafcc8e7831c5fe2c618',
      },
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e025fdcfafcc8e7831c5fe2c618',
      },
      {
        height: 640,
        width: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b2735fdcfafcc8e7831c5fe2c618',
      },
    ],
    alt: '',
    size: 64,
  },
} satisfies Meta<ItemImageType>

export const Small: ItemImageStory = {}

export const Medium: ItemImageStory = {
  args: {
    size: 300,
  },
}

export const Large: ItemImageStory = {
  args: {
    size: 640,
  },
}
