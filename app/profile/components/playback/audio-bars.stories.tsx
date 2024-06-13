import type { Meta, StoryObj } from '@storybook/react'

import { AudioBars } from './audio-bars'

type AudioBarsType = typeof AudioBars
type AudioBarsStory = StoryObj<AudioBarsType>

export default {
  title: 'Components/Common/AudioBars',
  component: AudioBars,
  argTypes: {
    isPlaying: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} satisfies Meta<AudioBarsType>

export const Paused: AudioBarsStory = {
  args: {
    isPlaying: false,
  },
}

export const Resumed: AudioBarsStory = {
  args: {
    isPlaying: true,
  },
}
