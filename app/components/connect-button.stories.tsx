import type { Meta, StoryObj } from '@storybook/react'

import { ConnectButton } from './connect-button'

type ConnectButtonType = typeof ConnectButton
type ConnectButtonStory = StoryObj<ConnectButtonType>

export default {
  title: 'Components/ConnectButton',
  component: ConnectButton,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'success',
      ],
      defaultValue: 'default',
    },
  },
} as Meta<ConnectButtonType>

export const Default: ConnectButtonStory = {}

export const SuccessVariant: ConnectButtonStory = {
  args: {
    variant: 'success',
  },
}
