import type { Meta, StoryObj } from '@storybook/react'

import { PlaybackCard } from './playback-card'
import { PlaybackCardSkeleton } from './playback-card.skeleton'

import type { Device, Track } from '@app/api/types'
import { trackExample } from '@app/components/items/examples'

type PlaybackCardType = typeof PlaybackCard
type PlaybackCardStory = StoryObj<PlaybackCardType>

export default {
  title: 'Components/Profile/Playback/PlaybackCard',
  component: PlaybackCard,
  argTypes: {
    userId: {
      control: 'text',
    },
    routeUserId: {
      control: 'text',
    },
  },
  args: {
    userId: '1',
    routeUserId: '1',
    device: {
      id: '1',
    } as Device,
    track: trackExample as Track,
  },
} satisfies Meta<PlaybackCardType>

export const Resumed: PlaybackCardStory = {
  args: {
    isPlaying: true,
    isPlayingOptimistic: true,
  },
}

export const Paused: PlaybackCardStory = {
  args: {
    isPlaying: false,
    isPlayingOptimistic: false,
  },
}

export const OptimisticallyResumed: PlaybackCardStory = {
  args: {
    isPlaying: false,
    isPlayingOptimistic: true,
  },
}

export const OptimisticallyPaused: PlaybackCardStory = {
  args: {
    isPlaying: true,
    isPlayingOptimistic: false,
  },
}

export const Disabled: PlaybackCardStory = {
  args: {
    isPlaying: false,
    isPlayingOptimistic: false,
    device: undefined,
    track: trackExample as Track,
  },
}

export const Skeleton: PlaybackCardStory = {
  render: () => <PlaybackCardSkeleton />,
}
