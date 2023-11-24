import { Album } from './album'
import { TrackArtist } from './artist'

export interface Track {
  id: string
  name: string
  album: Album
  artists: TrackArtist[]
  href: string
  duration: number
  playedAt?: string
  progress?: number
}
