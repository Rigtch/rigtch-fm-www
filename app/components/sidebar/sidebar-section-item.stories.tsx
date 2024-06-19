import type { Meta, StoryObj } from '@storybook/react'
import { LuUser } from 'react-icons/lu'

import { SidebarSectionItem } from './sidebar-section-item'

type SidebarSectionItemType = typeof SidebarSectionItem
type SidebarSectionItemStory = StoryObj<SidebarSectionItemType>

export default {
  title: 'Components/Sidebar/SidebarSectionItem',
  component: SidebarSectionItem,
} satisfies Meta<SidebarSectionItemType>

export const Default: SidebarSectionItemStory = {
  args: {
    label: 'Label',
    pathname: '/something',
    href: '/',
  },
}

export const Active: SidebarSectionItemStory = {
  args: {
    label: 'Label',
    pathname: '/',
    href: '/',
  },
}

export const WithIcon: SidebarSectionItemStory = {
  args: {
    label: 'Label',
    pathname: '/something',
    href: '/',
    icon: LuUser,
  },
}
