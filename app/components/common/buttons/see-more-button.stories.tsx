import type { Meta, StoryObj } from '@storybook/react'

import { SeeMoreButton } from './see-more-button'

type SeeMoreButtonType = typeof SeeMoreButton
type Story = StoryObj<SeeMoreButtonType>

export default {
  title: 'Components/Common/Buttons/SeeMoreButton',
  component: SeeMoreButton,
} satisfies Meta<SeeMoreButtonType>

export const Default: Story = {
  args: {
    href: '/profile/[id]',
  },
}
