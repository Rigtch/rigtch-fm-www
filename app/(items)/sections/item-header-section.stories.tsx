import type { Meta, StoryObj } from '@storybook/react'

import { ItemHeaderSection } from './item-header-section'

import {
  albumExample,
  artistExample,
  genresExample,
  idExample,
  trackExample,
} from '@app/components/items/examples'
import { LinkButton } from '@app/components/common/buttons'
import { GenreChip } from '@app/components/items/genre'

type ItemHeaderSectionType = typeof ItemHeaderSection
type ItemHeaderSectionStory = StoryObj<ItemHeaderSectionType>

export default {
  title: 'Sections/Items/ItemHeader',
  component: ItemHeaderSection,
} satisfies Meta<ItemHeaderSectionType>

export const Track: ItemHeaderSectionStory = {
  args: {
    name: trackExample.name,
    images: albumExample.images,
    artists: trackExample.artists,
    href: trackExample.href,
    children: (
      <div className="flex flex-col">
        <span className="text-lg">From album:</span>

        <LinkButton href={`/album/${idExample}`} className="justify-start">
          {albumExample.name}
        </LinkButton>
      </div>
    ),
  },
}

export const Artist: ItemHeaderSectionStory = {
  args: {
    name: artistExample.name,
    images: artistExample.images,
    href: artistExample.href,
    followers: 420_000,
  },
  decorators: [
    Story => (
      <>
        <Story />

        <div className="flex flex-row flex-wrap justify-start gap-2">
          {genresExample.slice(0, 3).map((genre, index) => (
            <GenreChip genre={genre} key={index} />
          ))}
        </div>
      </>
    ),
  ],
}

export const Album: ItemHeaderSectionStory = {
  args: {
    name: albumExample.name,
    images: albumExample.images,
    href: albumExample.href,
    artists: albumExample.artists,
    children: (
      <>
        <div>Release date: 1998 &bull; Napalm Records</div>

        {[
          '(C) 1998 Napalm Records Handels GmbH',
          '(P) 1998 Napalm Records Handels GmbH',
        ].map((copyright, index) => (
          <span className="text-sm" key={index}>
            {copyright}
          </span>
        ))}
      </>
    ),
  },
}
