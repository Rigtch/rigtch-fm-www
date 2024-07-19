import type { Meta, StoryObj } from '@storybook/react'

import { ItemsSection } from './items-section'
import { ItemsSectionSkeleton } from './items-section.skeleton'

import { View } from '@app/profile/enums'
import { trackExamples } from '@app/components/items/examples'

type ItemsSectionType = typeof ItemsSection
type ItemsSectionStory = StoryObj<ItemsSectionType>

export default {
  title: 'Sections/Profile/ItemsSection',
  component: ItemsSection,
  argTypes: {
    title: { control: 'text' },
    view: { control: 'select', options: [View.CARD, View.LIST] },
  },
  args: {
    title: 'Top Items',
    view: View.CARD,
  },
} satisfies Meta<ItemsSectionType>

export const CardView: ItemsSectionStory = {
  args: {
    items: trackExamples,
  },
}

export const ListView: ItemsSectionStory = {
  args: {
    items: trackExamples,
    view: View.LIST,
  },
}

export const WithRelativeTime: ItemsSectionStory = {
  args: {
    items: trackExamples.map((item, index) => ({
      ...item,
      playedAt: new Date(Date.now() - index * 1000).toISOString(),
    })),
    view: View.LIST,
  },
}

export const NoData: ItemsSectionStory = {
  args: {
    items: [],
  },
}

export const Skeleton: ItemsSectionStory = {
  render: () => <ItemsSectionSkeleton title="Top Items" />,
}

export const SkeletonWithArtists: ItemsSectionStory = {
  render: () => <ItemsSectionSkeleton title="Top Items" withArtists />,
}

export const SkeletonWithPlayedAt: ItemsSectionStory = {
  render: () => <ItemsSectionSkeleton title="Top Items" withPlayedAt />,
}

export const SkeletonWithArtistsAndPlayedAt: ItemsSectionStory = {
  render: () => (
    <ItemsSectionSkeleton title="Top Items" withArtists withPlayedAt />
  ),
}

export const SkeletonWithCardView: ItemsSectionStory = {
  render: () => <ItemsSectionSkeleton title="Top Items" view={View.CARD} />,
}

export const SkeletonWithCardViewAndArtists: ItemsSectionStory = {
  render: () => (
    <ItemsSectionSkeleton title="Top Items" view={View.CARD} withArtists />
  ),
}

export const SkeletonWithCardViewArtistsAndProgress: ItemsSectionStory = {
  render: () => (
    <ItemsSectionSkeleton
      title="Top Items"
      view={View.CARD}
      withArtists
      withProgress
    />
  ),
}

export const SkeletonWithCardViewAndGenres: ItemsSectionStory = {
  render: () => (
    <ItemsSectionSkeleton title="Top Items" view={View.CARD} withGenres />
  ),
}

export const SkeletonWithCardViewGenresAndProgress: ItemsSectionStory = {
  render: () => (
    <ItemsSectionSkeleton
      title="Top Items"
      view={View.CARD}
      withGenres
      withProgress
    />
  ),
}
