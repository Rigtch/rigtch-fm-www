import type { ArtistPageProps } from '@app/(items)/types'
import {
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
} from '@app/api/fetchers'
import { SpotifyLink, FollowersCount } from '@app/components/common'
import { ItemImage, ItemsList } from '@app/components/items'
import { ItemCard } from '@app/components/items/cards/item-card'
import { ARTIST_ID } from '@app/constants'
import { validateId } from '@app/utils/validate-id'

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
    <div className="flex flex-col p-12 gap-8 md:gap-0">
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
              {genres.slice(0, 3).map((genre, index) => (
                <div className="rounded-xl bg-neutral-800 p-2" key={index}>
                  {genre}
                </div>
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

        <div className="flex flex-wrap justify-start gap-y-4 md:gap-x-6 w-full">
          {sortedAlbums.map(album => (
            <ItemCard key={album.id} {...album} />
          ))}
        </div>
      </div>
    </div>
  )
}
