import type { Meta, StoryObj } from '@storybook/react'

import { ItemsList } from './list'
import { ItemsListSkeleton } from './list.skeleton'

import type { TrackEntity } from '@app/api/types'
import { View } from '@app/types'

type ItemsListType = typeof ItemsList
type ItemsListStory = StoryObj<ItemsListType>

const trackExampleFactory = (
  name: string,
  artistName: string,
  imageUrl: string
) =>
  ({
    id: '1',
    name,
    artists: [
      {
        name: artistName,
        id: '1',
        href: 'https://open.spotify.com/artist/1',
      },
    ],
    album: {
      images: [
        {
          url: imageUrl,
          width: 200,
          height: 200,
        },
      ],
    },
  }) as TrackEntity

const items = [
  trackExampleFactory(
    'Djavulens tid ar kommen',
    'Dimhymn',
    'https://i.scdn.co/image/ab67616d0000b27359ca7635bbb1f478c24860e6'
  ),
  trackExampleFactory(
    'Lost in Liminal',
    'Kriegsmaschine',
    'https://i.scdn.co/image/ab67616d0000b2730909018befabc2acd69be483'
  ),
  trackExampleFactory(
    'The Pallid Scourge',
    'Kriegsmaschine',
    'https://i.scdn.co/image/ab67616d0000b2730909018befabc2acd69be483'
  ),
  trackExampleFactory(
    'Night Crawler',
    'Judas Priest',
    'https://i.scdn.co/image/ab67616d00001e0260db4ca924d17bc6754e89aa'
  ),
  trackExampleFactory(
    'Painkiller',
    'Judas Priest',
    'https://i.scdn.co/image/ab67616d00001e0260db4ca924d17bc6754e89aa'
  ),
]

export default {
  title: 'Components/Items/List',
  component: ItemsList,
  argTypes: {
    isTop: {
      control: 'boolean',
    },
    withoutPosition: {
      control: 'boolean',
    },
    lastItemSeparator: {
      control: 'boolean',
    },
  },
  args: {
    items,
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

export const WithoutPosition: ItemsListStory = {
  args: {
    withoutPosition: true,
  },
}

export const LastItemSeparator: ItemsListStory = {
  args: {
    lastItemSeparator: true,
  },
}

export const WithRelativeTime: ItemsListStory = {
  args: {
    items: items.map((item, index) => ({
      ...item,
      playedAt: new Date(Date.now() - index * 1000).toISOString(),
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
