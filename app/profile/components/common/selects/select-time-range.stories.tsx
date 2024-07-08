import type { StoryObj, Meta } from '@storybook/react'

import { SelectTimeRange } from './select-time-range'

import { RigtchTimeRange, SpotifyTimeRange } from '@app/api/types'

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
} satisfies Meta<SelectRigtchTimeRangeType>

export const SpotifyProvider: SelectRigtchTimeRangeStory = {
  args: {
    initialValue: SpotifyTimeRange.SHORT_TERM,
  },
}

export const RigtchProvider: SelectRigtchTimeRangeStory = {
  args: {
    initialValue: RigtchTimeRange.WEEK,
  },
}
