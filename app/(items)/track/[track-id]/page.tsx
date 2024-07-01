import type { TrackPageProps } from '@app/(items)/types'
import { getTrack } from '@app/api/fetchers/get-track'
import { LinkButton } from '@app/components/common/buttons'
import { TRACK_ID } from '@app/constants'
import { validateId } from '@app/utils/validate-id'
import { ItemHeaderSection } from '@app/(items)/sections'

export default async function TrackPage({ params }: TrackPageProps) {
  const id = validateId(params[TRACK_ID])

  const {
    name,
    album: { images, ...album },
    artists,
    href,
  } = await getTrack({
    id,
  })

  return (
    <div className="w-full flex md:flex-row flex-col p-12 gap-8">
      <ItemHeaderSection
        name={name}
        images={images}
        artists={artists}
        href={href}
      >
        <div className="flex flex-col">
          <span className="text-lg">From album:</span>

          <LinkButton href={`/album/${album.id}`} className="justify-start">
            {album.name}
          </LinkButton>
        </div>
      </ItemHeaderSection>
    </div>
  )
}
