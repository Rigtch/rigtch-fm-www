import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { PlaybackToggleStateButton } from './toggle-state-button'

type PlaybackToggleStateButtonType = typeof PlaybackToggleStateButton
type PlaybackToggleStateButtonStory = StoryObj<PlaybackToggleStateButtonType>

export default {
  title: 'Components/Profile/Playback/ToggleStateButton',
  component: PlaybackToggleStateButton,
  argTypes: {
    isDeviceAvailable: {
      control: {
        type: 'boolean',
      },
    },
    hasAccess: {
      control: {
        type: 'boolean',
      },
    },
    toggleState: {},
  },
  args: {
    toggleState: () => Promise.resolve(),
  },
} satisfies Meta<PlaybackToggleStateButtonType>

export const Default: PlaybackToggleStateButtonStory = {
  render: args => {
    const [isPlaying, setIsPlaying] = useState(args.isPlaying)

    return (
      <PlaybackToggleStateButton
        {...args}
        isPlaying={isPlaying}
        toggleState={() => {
          setIsPlaying(value => !value)

          return Promise.resolve()
        }}
      />
    )
  },
  args: {
    isDeviceAvailable: true,
    hasAccess: true,
    toggleState: () => Promise.resolve(),
  },
}

export const Disabled: PlaybackToggleStateButtonStory = {
  args: {
    hasAccess: false,
  },
}
