import type { Meta, StoryObj } from '@storybook/react'

import { CookiesDialog } from './cookies-dialog'

type CookiesDialogType = typeof CookiesDialog
type CookiesDialogStory = StoryObj<CookiesDialogType>

export default {
  title: 'Components/CookiesDialog',
  component: CookiesDialog,
  argTypes: {
    isAccepted: {
      control: { type: 'boolean' },
    },
  },
  args: {
    isAccepted: false,
  },
} satisfies Meta<CookiesDialogType>

export const Default: CookiesDialogStory = {}
