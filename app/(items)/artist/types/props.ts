import { ARTIST_ID } from '@app/constants'

export interface ArtistPageProps {
  params: {
    [ARTIST_ID]?: string
  }
}
