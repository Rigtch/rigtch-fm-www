import type { Meta, StoryObj } from '@storybook/react'

import { ItemsSection } from './items-section'
import { TopTracksSectionSkeleton } from './top-tracks-section.skeleton'
import { TopArtistsSectionSkeleton } from './top-artists-section.skeleton'
import { TopAlbumsSectionSkeleton } from './top-albums-section.skeleton'

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

export const NoData: ItemsSectionStory = {
  args: {
    items: [],
  },
}

export const TopTracksSkeletonCardView: ItemsSectionStory = {
  render: () => <TopTracksSectionSkeleton />,
}

export const TopTracksSkeletonListView: ItemsSectionStory = {
  render: () => <TopTracksSectionSkeleton view={View.LIST} />,
}

export const TopArtistsSkeletonCardView: ItemsSectionStory = {
  render: () => <TopArtistsSectionSkeleton />,
}

export const TopArtistsSkeletonListView: ItemsSectionStory = {
  render: () => <TopArtistsSectionSkeleton view={View.LIST} />,
}

export const TopAlbumsSkeletonCardView: ItemsSectionStory = {
  render: () => <TopAlbumsSectionSkeleton />,
}

export const TopAlbumsSkeletonListView: ItemsSectionStory = {
  render: () => <TopAlbumsSectionSkeleton view={View.LIST} />,
}
