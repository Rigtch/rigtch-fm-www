import type { Meta, StoryObj } from '@storybook/react'

import {
  artistExample,
  maxPlayTimeExample,
  maxPlaysExample,
  playTimeExample,
  playsExample,
} from '../examples'

import { ItemsListElement } from './items-list-element'
import { ItemsListElementSkeleton } from './items-list-element.skeleton'

type ItemsListElementType = typeof ItemsListElement
type ItemsListElementStory = StoryObj<ItemsListElementType>

export default {
  title: 'Components/Items/List/ItemsListElement',
  component: ItemsListElement,
  argTypes: {
    name: {
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
  args: artistExample,
} satisfies Meta<ItemsListElementType>

export const Default: ItemsListElementStory = {
  args: {
    position: 1,
  },
}

export const WithRelativeTime: ItemsListElementStory = {
  args: {
    playedAt: '2022-01-01',
  },
}

export const WithPlays: ItemsListElementStory = {
  args: {
    plays: playsExample,
    maxPlays: maxPlaysExample,
  },
}

export const WithPlayTime: ItemsListElementStory = {
  args: {
    playTime: playTimeExample,
    maxPlayTime: maxPlayTimeExample,
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
