import type { Meta, StoryObj } from '@storybook/react'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import { LuUserCircle } from 'react-icons/lu'

import { NavigationListItem } from './navigation-list-item'

type NavigationListItemType = typeof NavigationListItem
type NavigationListItemStory = StoryObj<NavigationListItemType>

export default {
  title: 'Components/Navigation/NavigationListItem',
  component: NavigationListItem,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Item',
  },
  decorators: [
    Story => (
      <NavigationMenu>
        <Story />
      </NavigationMenu>
    ),
  ],
} satisfies Meta<NavigationListItemType>

export const Default: NavigationListItemStory = {}

export const WithIcon: NavigationListItemStory = {
  args: {
    children: (
      <>
        <LuUserCircle />
        My Profile
      </>
    ),
    className: 'gap-2',
  },
}
