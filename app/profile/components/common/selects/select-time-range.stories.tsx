import type { StoryObj, Meta } from '@storybook/react'

import { SelectTimeRange } from './select-time-range'

import { RigtchTimeRange, SpotifyTimeRange } from '@app/profile/enums'

type SelectRigtchTimeRangeType = typeof SelectTimeRange
type SelectRigtchTimeRangeStory = StoryObj<SelectRigtchTimeRangeType>

export default {
  title: 'Components/Profile/Common/Selects/SelectTimeRange',
  component: SelectTimeRange,
  argTypes: {
    initialValue: {
      options: Object.values(RigtchTimeRange),
      control: {
        type: 'select',
      },
    },
  },
  args: {
    initialValue: RigtchTimeRange.WEEK,
  },
} satisfies Meta<SelectRigtchTimeRangeType>

export const SpotifyProvider: SelectRigtchTimeRangeStory = {
  args: {
    initialValue: SpotifyTimeRange.SHORT_TERM,
  },
}

export const RigtchProvider: SelectRigtchTimeRangeStory = {}

export const AllValuesDisabled: SelectRigtchTimeRangeStory = {
  args: {
    userCreatedAt: new Date(),
    ignoreBetaUser: true,
  },
}

export const ThreeMonthsValueDisabled: SelectRigtchTimeRangeStory = {
  args: {
    userCreatedAt: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000),
    ignoreBetaUser: true,
  },
}

export const OneMonthValueDisabled: SelectRigtchTimeRangeStory = {
  args: {
    userCreatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
    ignoreBetaUser: true,
  },
}

export const TwoWeeksValueDisabled: SelectRigtchTimeRangeStory = {
  args: {
    userCreatedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
    ignoreBetaUser: true,
  },
}
