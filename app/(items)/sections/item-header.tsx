import type { HtmlHTMLAttributes } from 'react'

import type { ArtistEntity, Image } from '@app/api/types'
import { ItemArtists, ItemImage } from '@app/components/items/misc'
import { FollowersCount, SpotifyLink } from '@app/components/common'

export type ArtistsOrFollowers =
  | {
      artists: Pick<ArtistEntity, 'id' | 'name'>[]
      href: string
      followers?: never
    }
  | {
      followers: number
      href: string
      artists?: never
    }

export type ItemHeaderSectionProps = ArtistsOrFollowers &
  Pick<HtmlHTMLAttributes<HTMLDivElement>, 'children'> & {
    name: string
    images: Image[]
  }

export function ItemHeaderSection({
  name,
  images,
  children,
  artists,
  followers,
  href,
}: ItemHeaderSectionProps) {
  return (
    <div className="w-full flex flex-col md:flex-row md:p-8 gap-8">
      <ItemImage images={images} size={200} alt={name} />

      <div className="flex flex-col gap-2 justify-around">
        <div className="flex flex-col gap-2">
          <span className="text-3xl md:text-4xl lg:text-5xl">{name}</span>

          {artists && (
            <div className="flex items-center mr-4 gap-2">
              <SpotifyLink href={href} />
              <span className="text-xl w-full">
                by&nbsp;
                <ItemArtists artists={artists} />
              </span>
            </div>
          )}

          {followers && (
            <div className="flex flex-row items-center gap-2 mr-4">
              <SpotifyLink href={href} />

              <FollowersCount value={followers} />
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  )
}
