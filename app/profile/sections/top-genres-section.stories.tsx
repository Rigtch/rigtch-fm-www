import type { Meta, StoryObj } from '@storybook/react'

import { TopGenresSection } from './top-genres-section'

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

export const WithPlays: GenresSectionStory = {
  args: {
    items: genresExample.map((genre, index) => ({
      item: genre,
      plays: 100 / (index + 1),
    })),
  },
}

export const WithPlayTime: GenresSectionStory = {
  args: {
    items: genresExample.map((genre, index) => ({
      item: genre,
      playTime: (1000 * 60 * 60 * 4) / (index + 1),
    })),
  },
}

export const NoData: GenresSectionStory = {
  args: {
    items: [],
  },
}
