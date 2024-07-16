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

export { ItemHeaderSection }
