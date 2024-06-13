import type { Meta, StoryObj } from '@storybook/react'

import { BackButton } from './back'

type BackButtonType = typeof BackButton
type BackButtonStory = StoryObj<BackButtonType>

export default {
  title: 'Components/Common/Buttons/BackButton',
  component: BackButton,
} satisfies Meta<BackButtonType>

export const Default: BackButtonStory = {}
