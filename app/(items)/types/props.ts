import { ALBUM_ID, ARTIST_ID, TRACK_ID } from '@app/constants'

export interface ArtistPageProps {
  params: {
    [ARTIST_ID]?: string
  }
}

export interface TrackPageProps {
  params: {
    [TRACK_ID]?: string
  }
}

export interface AlbumPageProps {
  params: {
    [ALBUM_ID]?: string
  }
}
