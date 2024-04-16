import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getArtist } from '@app/api/fetchers/get-artist'
import { ARTIST_ID } from '@app/constants'
import { ArtistPageProps } from '@app/profile/types'

export default async function ArtistPage({ params }: ArtistPageProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect('/')

  if (!params[ARTIST_ID]) redirect('/profile')

  const artist = await getArtist(accessToken, { id: params[ARTIST_ID] })

  return <div>{artist.name}: name</div>
}
