import type { Meta, StoryObj } from '@storybook/react'

import { TopGenresSection } from './top-genres'

import { genresExample } from '@app/components/items/examples'

type GenresSectionType = typeof TopGenresSection
type GenresSectionStory = StoryObj<GenresSectionType>

export default {
  title: 'Sections/Profile/TopGenresSection',
  component: TopGenresSection,
  args: {
    items: genresExample,
  },
} satisfies Meta<GenresSectionType>

export const Default: GenresSectionStory = {}

export const NoData: GenresSectionStory = {
  args: {
    items: [],
  },
}
