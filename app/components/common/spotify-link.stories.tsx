import { Meta, StoryObj } from '@storybook/react'

import { SpotifyLink } from './spotify-link'

type SpotifyLinkType = typeof SpotifyLink

const meta: Meta<SpotifyLinkType> = {
  title: 'Components/Common/SpotifyLink',
  component: SpotifyLink,
}

export default meta

type Story = StoryObj<SpotifyLinkType>

export const Default: Story = {
  args: {
    href: 'https://open.spotify.com/track/1DXdKZKfQZ4Wlk0b6xZ3Km',
  },
}
