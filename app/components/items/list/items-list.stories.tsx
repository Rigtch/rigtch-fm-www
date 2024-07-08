import type { Meta, StoryObj } from '@storybook/react'

import { trackExamples } from '../examples'

import { ItemsList } from './items-list'
import { ItemsListSkeleton } from './items-list.skeleton'

import { View } from '@app/types'

type ItemsListType = typeof ItemsList
type ItemsListStory = StoryObj<ItemsListType>

export default {
  title: 'Components/Items/List/ItemsList',
  component: ItemsList,
  argTypes: {
    isTop: {
      control: 'boolean',
    },
    lastItemSeparator: {
      control: 'boolean',
    },
  },
  args: {
    items: trackExamples,
  },
  decorators: [
    Story => (
      <div className="w-[90vw]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<ItemsListType>

export const Default: ItemsListStory = {}

export const WithTop: ItemsListStory = {
  args: {
    isTop: true,
  },
}

export const LastItemSeparator: ItemsListStory = {
  args: {
    lastItemSeparator: true,
  },
}

export const WithRelativeTime: ItemsListStory = {
  args: {
    items: trackExamples.map((item, index) => ({
      ...item,
      playedAt: new Date(Date.now() - index * 1000).toISOString(),
    })),
  },
}

export const Carousel: ItemsListStory = {
  args: {
    isTop: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}

const calculatePlays = (index: number) => 100 - index * 10

export const WithPlays: ItemsListStory = {
  args: {
    items: trackExamples.map((item, index) => ({
      ...item,
      plays: calculatePlays(index),
      maxPlays: 100,
    })),
  },
}

export const WithPlaysAndTop: ItemsListStory = {
  args: {
    isTop: true,
    items: trackExamples.map((item, index) => ({
      ...item,
      plays: calculatePlays(index),
      maxPlays: 100,
    })),
  },
}

const maxPlayTime = 1000 * 60 * 60 * trackExamples.length
const calculatePlayTime = (index: number) =>
  1000 * 60 * 60 * (trackExamples.length - index) + 1000 * 60 * index + 2

export const WithPlayTime: ItemsListStory = {
  args: {
    items: trackExamples.map((item, index) => ({
      ...item,
      playTime: calculatePlayTime(index),
      maxPlayTime,
    })),
  },
}

export const WithPlayTimeAndTop: ItemsListStory = {
  args: {
    isTop: true,
    items: trackExamples.map((item, index) => ({
      ...item,
      playTime: calculatePlayTime(index),
      maxPlayTime,
    })),
  },
}

export const Skeleton: ItemsListStory = {
  render: () => <ItemsListSkeleton />,
}

export const SkeletonWithTop: ItemsListStory = {
  render: () => <ItemsListSkeleton view={View.CARD} />,
}

export const SkeletonWithArtists: ItemsListStory = {
  render: () => <ItemsListSkeleton artists />,
}

export const SkeletonWithPlayedAtWithoutPosition: ItemsListStory = {
  render: () => <ItemsListSkeleton withoutPosition playedAt />,
}

export const SkeletonWithGenres: ItemsListStory = {
  render: () => <ItemsListSkeleton genres view={View.CARD} />,
}
