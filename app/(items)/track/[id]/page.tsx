import { redirect } from 'next/navigation'

import { getTrack } from '@app/api/fetchers/items'
import type { PageWithIdParamProps } from '@app/types'
import { validateId } from '@app/utils/validators'

export default async function TrackPage({ params }: PageWithIdParamProps) {
  const id = validateId(params.id)

  const { album } = await getTrack({
    id,
  })

  redirect(`/album/${album.id}?highlighted-track-id=${id}`)
}
