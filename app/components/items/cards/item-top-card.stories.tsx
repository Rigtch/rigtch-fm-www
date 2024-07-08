import type { Meta, StoryObj } from '@storybook/react'

import {
  albumExample,
  artistExample,
  idExample,
  maxPlaysExample,
  maxPlayTimeExample,
  playsExample,
  playtimeExample,
  trackExample,
} from '../examples'

import { ItemTopCard } from './item-top-card'
import { ItemTopCardSkeleton } from './item-top-card.skeleton'

type ItemTopCardType = typeof ItemTopCard
type ItemTopCardStory = StoryObj<ItemTopCardType>

export default {
  title: 'Components/Items/Cards/ItemTopCard',
  component: ItemTopCard,
  argTypes: {
    id: {
      control: 'text',
    },
    position: {
      control: 'number',
    },
    isCarousel: {
      control: 'boolean',
    },
  },
  args: {
    id: idExample,
    position: 1,
  },
} satisfies Meta<ItemTopCardType>

export const Album: ItemTopCardStory = {
  args: albumExample,
}

export const Track: ItemTopCardStory = {
  args: trackExample,
}

export const Artist: ItemTopCardStory = {
  args: artistExample,
}

export const Top2: ItemTopCardStory = {
  args: {
    position: 2,
    ...artistExample,
  },
}

export const Top3: ItemTopCardStory = {
  args: {
    position: 3,
    ...artistExample,
  },
}

export const WithPlays: ItemTopCardStory = {
  args: {
    plays: playsExample,
    maxPlays: maxPlaysExample,
    ...artistExample,
  },
}

export const WithPlayTime: ItemTopCardStory = {
  args: {
    playTime: playtimeExample,
    maxPlayTime: maxPlayTimeExample,
    ...artistExample,
  },
}

export const Skeleton: ItemTopCardStory = {
  render: () => <ItemTopCardSkeleton />,
}

export const SkeletonWithGenres: ItemTopCardStory = {
  render: () => <ItemTopCardSkeleton genres />,
}

export const SkeletonWithArtists: ItemTopCardStory = {
  render: () => <ItemTopCardSkeleton artists />,
}

export const SkeletonWithProgress: ItemTopCardStory = {
  render: () => <ItemTopCardSkeleton progress />,
}

export const SkeletonWithProgressAndArtists: ItemTopCardStory = {
  render: () => <ItemTopCardSkeleton artists progress />,
}

export const SkeletonWithProgressAndGenres: ItemTopCardStory = {
  render: () => <ItemTopCardSkeleton genres progress />,
}
