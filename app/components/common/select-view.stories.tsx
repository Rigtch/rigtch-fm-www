import type { Meta, StoryObj } from '@storybook/react'

import { SelectView } from './select-view'

import { View } from '@app/types'

type SelectViewType = typeof SelectView
type SelectViewStory = StoryObj<SelectViewType>

export default {
  title: 'Components/Common/SelectView',
  component: SelectView,
  argTypes: {
    initialValue: {
      options: Object.values(View),
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<SelectViewType>

export const Default: SelectViewStory = {
  args: {
    initialValue: View.CARD,
  },
}
