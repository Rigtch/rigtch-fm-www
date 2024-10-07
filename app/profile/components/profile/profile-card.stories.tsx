import type { Meta, StoryObj } from '@storybook/react'

import { PlaybackCard } from '../playback'

import { ProfileCard } from './profile-card'
import { ProfileCardSkeleton } from './profile-card.skeleton'

import type { Device, Track } from '@app/api/types'
import { trackExample } from '@app/components/items/examples'

type ProfileCardType = typeof ProfileCard
type ProfileCardStory = StoryObj<ProfileCardType>

export default {
  title: 'Components/Profile/ProfileCard',
  component: ProfileCard,
  argTypes: {
    displayName: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
    followersCount: {
      control: 'number',
    },
    followingCount: {
      control: 'number',
    },
  },
  args: {
    displayName: 'Mnigos',
    followersCount: 10,
    followingCount: 7,
    href: 'https://open.spotify.com/user/moneyigos',
    images: [
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab6775700000ee8503aef823b019723735326905',
      },
    ],
  },
} satisfies Meta<ProfileCardType>

export const Default: ProfileCardStory = {}

export const WithPlayback: ProfileCardStory = {
  args: {
    children: (
      <PlaybackCard
        isPlaying={true}
        isPlayingOptimistic={true}
        handleToggleState={() => Promise.resolve()}
        userId="1"
        routeUserId="1"
        device={{ id: '1' } as Device}
        track={trackExample as Track}
      />
    ),
  },
}

export const Skeleton: ProfileCardStory = {
  render: () => <ProfileCardSkeleton />,
}
