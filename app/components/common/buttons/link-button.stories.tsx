import type { Meta, StoryObj } from '@storybook/react'

import { LinkButton } from './link-button'

type LinkButtonType = typeof LinkButton
type LinkButtonStory = StoryObj<LinkButtonType>

export default {
  title: 'Components/Common/Buttons/LinkButton',
  component: LinkButton,
  argTypes: {
    href: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    href: '/',
    children: 'Link',
  },
} satisfies Meta<LinkButtonType>

export const Default: LinkButtonStory = {}
