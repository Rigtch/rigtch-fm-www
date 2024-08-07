import type { Meta, StoryObj } from '@storybook/react'

import { SelectView } from './select-view'

import { View } from '@app/profile/enums'

type SelectViewType = typeof SelectView
type SelectViewStory = StoryObj<SelectViewType>

export default {
  title: 'Components/Profile/Common/Selects/SelectView',
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
