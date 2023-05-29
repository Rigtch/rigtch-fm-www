import { Album } from './album'
import { TrackArtist } from './artist'

export interface LastTracksQuery {
  lastTracks: Track[]
}

export interface Track {
  name: string
  href: string
  artists: TrackArtist[]
  album: Album
  duration: number
  progress?: number
  playedAt?: string
}
