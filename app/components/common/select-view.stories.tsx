import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'

import { SelectView } from './select-view'

import { View } from '@app/types'

type SelectViewType = typeof SelectView

const meta: Meta<SelectViewType> = {
  title: 'Components/Common/SelectView',
  component: SelectView,
}

export default meta

type Story = StoryObj<SelectViewType>

export const Default: Story = {
  args: {
    initialValue: View.CARD,
  },
}

export const ViewChanged: Story = {
  args: {
    initialValue: View.CARD,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!)

    const selectButton = canvas.getByRole('combobox')

    await userEvent.click(selectButton)
    await userEvent.click(canvas.getByText('List'))

    await expect(selectButton).toHaveTextContent('List')
  },
}
