import type { Meta, StoryObj } from '@storybook/react'

import { NavigationBar } from './navigation-bar'

import { QueryClientWrapper } from '@tests/utils'

type NavigationBarType = typeof NavigationBar
type NavigationBarStory = StoryObj<NavigationBarType>

export default {
  title: 'Components/Navigation/NavigationBar',
  component: NavigationBar,
  decorators: [
    Story => (
      <QueryClientWrapper>
        <Story />
      </QueryClientWrapper>
    ),
  ],
} as Meta<NavigationBarType>

export const Unauthenticated: NavigationBarStory = {}

export const Authenticated: NavigationBarStory = {
  args: {
    user: {
      name: 'John Doe',
      id: '123456789',
      image: 'https://placekitten.com/200/300',
    },
    userId: '123456789',
  },
}
