import type { HtmlHTMLAttributes } from 'react'

import type { ArtistEntity, Image } from '@app/api/types'
import { ItemArtists, ItemImage } from '@app/components/items/misc'
import { FollowersCount, SpotifyLink } from '@app/components/common'

type ArtistsOrFollowers =
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

namespace ItemHeaderSection {
  export type Props = ArtistsOrFollowers &
    Pick<HtmlHTMLAttributes<HTMLDivElement>, 'children'> & {
      name: string
      images: Image[]
    }
}

function ItemHeaderSection({
  name,
  images,
  children,
  artists,
  followers,
  href,
}: ItemHeaderSection.Props) {
  return (
    <div className="flex w-full flex-col gap-8 md:flex-row md:p-8">
      <ItemImage images={images} size={200} alt={name} />

      <div className="flex flex-col justify-around gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-3xl md:text-4xl lg:text-5xl">{name}</span>

          {artists && (
            <div className="mr-4 flex items-center gap-2">
              <SpotifyLink href={href} />
              <span className="w-full text-xl">
                by&nbsp;
                <ItemArtists artists={artists} />
              </span>
            </div>
          )}

          {followers && (
            <div className="mr-4 flex flex-row items-center gap-2">
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

export { ItemHeaderSection }
