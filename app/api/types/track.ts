import { type Album, type AlbumEntity } from './album'
import { type ArtistEntity, type TrackArtist } from './artist'

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

export interface TrackEntity extends Omit<Track, 'artists' | 'album'> {
  externalId: string
  artists: ArtistEntity[]
  album: Omit<AlbumEntity, 'tracks'>
}

export interface HistoryTrack {
  id: string
  playedAt: string
  track: TrackEntity
}
