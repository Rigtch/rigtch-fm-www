import { getTrack } from '@app/api/fetchers/items'
import { LinkButton } from '@app/components/common/buttons'
import { validateId } from '@app/utils/validators'
import { ItemHeaderSection } from '@app/(items)/sections'
import type { PageWithIdParamProps } from '@app/types'

export default async function TrackPage({ params }: PageWithIdParamProps) {
  const id = validateId(params.id)

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
