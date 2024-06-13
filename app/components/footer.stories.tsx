import type { Meta, StoryObj } from '@storybook/react'

import { Footer } from './footer'

type FooterType = typeof Footer
type FooterStory = StoryObj<FooterType>

export default {
  title: 'Components/Footer',
  component: Footer,
} as Meta<FooterType>

export const Default: FooterStory = {
  decorators: [
    Story => (
      <div className="w-[90vw]">
        <Story />
      </div>
    ),
  ],
}
