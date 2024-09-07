import type { Meta, StoryObj } from '@storybook/react'

import { artistExamples, trackExamples } from '../examples'

import { ItemsList } from './items-list'
import { ItemsListSkeleton } from './items-list.skeleton'

import { View } from '@app/profile/enums'

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
    items: artistExamples,
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

const maxPlayTime = 1000 * 60 * 60 * artistExamples.length
const calculatePlayTime = (index: number) =>
  1000 * 60 * 60 * (artistExamples.length - index) + 1000 * 60 * index + 2

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

export const WithGenres: ItemsListStory = {
  args: {
    items: artistExamples.map(item => ({
      ...item,
      genres: ['Black Metal', 'Death Metal', 'Thrash Metal'],
      genresDisplayLength: 2,
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
  render: () => <ItemsListSkeleton withArtists />,
}

export const SkeletonWithPlayedAtWithoutPosition: ItemsListStory = {
  render: () => <ItemsListSkeleton withPlayedAt />,
}

export const SkeletonWithGenres: ItemsListStory = {
  render: () => <ItemsListSkeleton withGenres view={View.CARD} />,
}
