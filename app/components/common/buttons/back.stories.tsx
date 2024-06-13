import type { Meta, StoryObj } from '@storybook/react'

import { BackButton } from './back'

type BackButtonType = typeof BackButton

const meta: Meta<BackButtonType> = {
  title: 'Components/Common/Buttons/BackButton',
  component: BackButton,
}

export default meta

type Story = StoryObj<BackButtonType>

export const Default: Story = {
  args: {},
}
