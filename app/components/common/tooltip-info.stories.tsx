import type { Meta, StoryObj } from '@storybook/react'

import { TooltipInfo } from './tooltip-info'

type TooltipInfoType = typeof TooltipInfo
type TooltipInfoStory = StoryObj<TooltipInfoType>

export default {
  title: 'Components/Common/TooltipInfo',
  component: TooltipInfo,
  argTypes: {
    title: {
      control: 'text',
    },
  },
} satisfies Meta<TooltipInfoType>

export const Default: TooltipInfoStory = {
  args: {
    title: 'Tooltip',
    children: 'Tooltip content',
  },
}
