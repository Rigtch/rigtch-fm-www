import type { Meta, StoryObj } from '@storybook/react'

import { NoDataAlert } from './no-data-alert'

type NoDataAlertType = typeof NoDataAlert
type NoDataAlertStory = StoryObj<NoDataAlertType>

export default {
  title: 'Components/Profile/Common/NoDataAlert',
  component: NoDataAlert,
} satisfies Meta<NoDataAlertType>

export const Default: NoDataAlertStory = {}
