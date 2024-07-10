import type { StoryObj, Meta } from '@storybook/react'

import { SelectStatsMeasurement } from './select-stats-measurement'

import { StatsMeasurement } from '@app/api/enums'

type SelectStatsMeasurementType = typeof SelectStatsMeasurement
type SelectStatsMeasurementStory = StoryObj<SelectStatsMeasurementType>

export default {
  title: 'Components/Profile/Common/Selects/SelectStatsMeasurement',
  component: SelectStatsMeasurement,
  argTypes: {
    initialValue: {
      options: Object.values(StatsMeasurement),
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<SelectStatsMeasurementType>

export const Default: SelectStatsMeasurementStory = {
  args: {
    initialValue: StatsMeasurement.PLAYS,
  },
}
