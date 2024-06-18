import { ItemsList } from '@app/components/items/list'
import type { ArtistPageProps } from '@app/(items)/types'
import {
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
} from '@app/api/fetchers'
import { SpotifyLink, FollowersCount } from '@app/components/common'
import { ItemCard } from '@app/components/items/cards/item-card'
import { GenreChip } from '@app/components/items/genre'
import { ARTIST_ID } from '@app/constants'
import { validateId } from '@app/utils/validate-id'
import { ItemImage } from '@app/components/items/misc'

export default async function ArtistPage({ params }: ArtistPageProps) {
  const id = validateId(params[ARTIST_ID])

  const { followers, images, name, href, genres } = await getArtist({
    id,
  })
  const { tracks } = await getArtistTopTracks({ id })
  const { albums } = await getArtistAlbums({ id })

  const sortedAlbums = albums.sort(
    (firstAlbum, secondAlbum) =>
      new Date(secondAlbum.releaseDate).getFullYear() -
      new Date(firstAlbum.releaseDate).getFullYear()
  )

  return (
    <div className="flex flex-col p-12 gap-8 md:gap-12">
      <div className="flex flex-row flex-wrap">
        <div className="w-full md:w-1/2 flex flex-row flex-wrap p-12 gap-8">
          <ItemImage images={images} size={200} alt={name} />

          <div className="flex flex-col gap-6 justify-start">
            <div className="flex flex-col gap-2">
              <span className="text-3xl md:text-4xl">{name}</span>

              <div className="flex flex-row items-center gap-2 mr-4">
                <SpotifyLink href={href} />

                <FollowersCount value={followers} />
              </div>
            </div>

            <div className="flex flex-row flex-wrap justify-start gap-4">
              {genres.slice(0, 3).map(genre => (
                <GenreChip
                  className="bg-neutral-800"
                  key={genre}
                  genre={genre}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="text-4xl">Top Tracks</div>

          <ItemsList items={tracks.slice(0, 5)} positionClassName="text-2xl" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-4xl">Albums</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-4">
          {sortedAlbums.map(album => (
            <ItemCard key={album.id} {...album} />
          ))}
        </div>
      </div>
    </div>
  )
}
