import type { Meta, StoryObj } from '@storybook/react'

import { SpotifyLink } from './spotify-link'

type SpotifyLinkType = typeof SpotifyLink
type SpotifyLinkStory = StoryObj<SpotifyLinkType>

export default {
  title: 'Components/Common/SpotifyLink',
  component: SpotifyLink,
} satisfies Meta<SpotifyLinkType>

export const Default: SpotifyLinkStory = {
  args: {
    href: 'https://open.spotify.com/track/1DXdKZKfQZ4Wlk0b6xZ3Km',
  },
}
