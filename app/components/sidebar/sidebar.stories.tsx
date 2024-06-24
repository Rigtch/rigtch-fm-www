import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from './sidebar'

import { USER_ID } from '@app/constants'

type SidebarType = typeof Sidebar
type SidebarStory = StoryObj<SidebarType>

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    nextjs: {
      navigation: {
        query: {
          example: 'value',
        },
        segments: [[USER_ID, '1']],
      },
    },
  },
} satisfies Meta<SidebarType>

export const Default: SidebarStory = {}
