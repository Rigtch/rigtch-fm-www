import type { Meta, StoryObj } from '@storybook/react'

import { ShareButton } from './share-button'

import { Toaster } from '@app/components/ui/toaster'

type ShareButtonType = typeof ShareButton
type ShareButtonStory = StoryObj<ShareButtonType>

export default {
  title: 'Components/Profile/ShareButton',
  component: ShareButton,
} satisfies Meta<ShareButtonType>

export const Default: ShareButtonStory = {}

export const WithToaster: ShareButtonStory = {
  render: () => (
    <>
      <ShareButton />
      <Toaster />
    </>
  ),
}
