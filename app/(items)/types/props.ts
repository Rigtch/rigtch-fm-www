import type { ID } from '@app/constants'

export interface ArtistPageProps {
  params: {
    [ID]?: string
  }
}

export interface TrackPageProps {
  params: {
    [ID]?: string
  }
}

export interface AlbumPageProps {
  params: {
    [ID]?: string
  }
}
