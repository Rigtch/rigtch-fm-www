import {
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
} from '@app/api/fetchers/items'
import { ItemsList } from '@app/components/items/list'
import { ItemCard } from '@app/components/items/cards/item-card'
import { validateId } from '@app/utils/validators'
import { ItemHeaderSection } from '@app/(items)/sections'
import { GenreChip } from '@app/components/items/genre'
import type { PageWithIdParamProps } from '@app/types'

export default async function ArtistPage({ params }: PageWithIdParamProps) {
  const id = validateId(params.id)

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
    <div className="flex flex-col gap-8 p-12">
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <div className="flex flex-col gap-4">
          <ItemHeaderSection
            name={name}
            images={images}
            href={href}
            followers={followers}
          />

          <div className="flex flex-row flex-wrap justify-start gap-2">
            {genres.slice(0, 3).map((genre, index) => (
              <GenreChip genre={genre} key={index} />
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-1/2">
          <div className="text-4xl">Top Tracks</div>

          <ItemsList items={tracks.slice(0, 5)} positionClassName="text-2xl" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-4xl">Albums</div>

        <div className="flex w-full flex-wrap justify-center gap-4 lg:justify-start">
          {sortedAlbums.map(album => (
            <ItemCard key={album.id} {...album} />
          ))}
        </div>
      </div>
    </div>
  )
}
