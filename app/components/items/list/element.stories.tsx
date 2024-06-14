import type { Meta, StoryObj } from '@storybook/react'

import { ItemsListElement } from './element'
import { ItemsListElementSkeleton } from './element.skeleton'

type ItemsListElementType = typeof ItemsListElement
type ItemsListElementStory = StoryObj<ItemsListElementType>

export default {
  title: 'Components/Items/List/Element',
  component: ItemsListElement,
  argTypes: {
    name: {
      control: 'text',
    },
    image: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
    playedAt: {
      control: 'text',
    },
    position: {
      control: 'number',
    },
    positionSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    positionClassName: {
      control: 'text',
    },
  },
  args: {
    name: 'Kathaarian Life Code - Studio',
    artists: [
      {
        name: 'Darkthrone',
        href: 'https://open.spotify.com/artist/4ynKJK9w2Dv2y0Qy0ggj2w',
        id: '4ynKJK9w2Dv2y0Qy0ggj2w',
      },
    ],
    image: 'https://i.scdn.co/image/ab67616d00001e02754029bf280ce924ef682664',
    href: 'https://open.spotify.com/track/1Y9x9Zj2w4wJK2b2g1Z0Qh',
  },
} satisfies Meta<ItemsListElementType>

export const Default: ItemsListElementStory = {
  args: {
    position: 1,
  },
}

export const AsEntity: ItemsListElementStory = {
  args: {
    id: '4ynKJK9w2Dv2y0Qy0ggj2w',
    position: 1,
    externalId: '4ynKJK9w2Dv2y0Qy0ggj2w',
  },
}

export const WithRelativeTime: ItemsListElementStory = {
  args: {
    playedAt: '2022-01-01',
  },
}

export const Skeleton: ItemsListElementStory = {
  render: () => <ItemsListElementSkeleton />,
}

export const SkeletonWithPosition: ItemsListElementStory = {
  render: () => <ItemsListElementSkeleton position={1} />,
}

export const SkeletonWithArtists: ItemsListElementStory = {
  render: () => <ItemsListElementSkeleton artists />,
}

export const SkeletonWithRelativeTime: ItemsListElementStory = {
  render: () => <ItemsListElementSkeleton playedAt />,
}

export const SkeletonWithRelativeTimeAndArtists: ItemsListElementStory = {
  render: () => <ItemsListElementSkeleton playedAt artists />,
}
