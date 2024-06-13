import { Meta, StoryObj } from '@storybook/react'

import { SelectView } from './select-view'

import { View } from '@app/types'

type SelectViewType = typeof SelectView

const meta: Meta<SelectViewType> = {
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
}

export default meta

type Story = StoryObj<SelectViewType>

export const Default: Story = {
  args: {
    initialValue: View.CARD,
  },
}
