import type { Meta, StoryObj } from '@storybook/react'

import { ItemsSection } from './items'
import { TopTracksSkeletonSection } from './top-tracks.skeleton'
import { TopArtistsSkeletonSection } from './top-artists.skeleton'

import { View } from '@app/types'
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

export const TopTracksSkeletonCardView: ItemsSectionStory = {
  render: () => <TopTracksSkeletonSection />,
}

export const TopTracksSkeletonListView: ItemsSectionStory = {
  render: () => <TopTracksSkeletonSection view={View.LIST} />,
}

export const TopArtistsSkeletonCardView: ItemsSectionStory = {
  render: () => <TopArtistsSkeletonSection />,
}

export const TopArtistsSkeletonListView: ItemsSectionStory = {
  render: () => <TopArtistsSkeletonSection view={View.LIST} />,
}
