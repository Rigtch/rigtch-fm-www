import type { Meta, StoryObj } from '@storybook/react'

import { ProfileAvatar } from './avatar'

type ProfileAvatarType = typeof ProfileAvatar
type ProfileAvatarStory = StoryObj<ProfileAvatarType>

export default {
  title: 'Components/Profile/Avatar',
  component: ProfileAvatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'lg'],
      },
    },
    displayName: {
      control: {
        type: 'text',
      },
    },
    src: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<ProfileAvatarType>

export const Image: ProfileAvatarStory = {
  args: {
    src: 'https://i.scdn.co/image/ab6775700000ee8503aef823b019723735326905',
    size: 'lg',
  },
}

export const Fallback: ProfileAvatarStory = {
  args: {
    displayName: 'Mnigos',
    size: 'lg',
  },
}