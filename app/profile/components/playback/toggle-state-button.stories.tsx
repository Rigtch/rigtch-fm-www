import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { ToggleStateButton } from './toggle-state-button'

type PlaybackToggleStateButtonType = typeof ToggleStateButton
type PlaybackToggleStateButtonStory = StoryObj<PlaybackToggleStateButtonType>

export default {
  title: 'Components/Profile/Playback/ToggleStateButton',
  component: ToggleStateButton,
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
    // eslint-disable-next-line sonarjs/rules-of-hooks
    const [isPlaying, setIsPlaying] = useState(args.isPlaying)

    return (
      <ToggleStateButton
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
