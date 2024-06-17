import { ArtistEntity } from './artist'
import { Image } from './image'
import { type TrackEntity } from './track'

export interface Album {
  id: string
  href: string
  releaseDate: string
  releaseDatePrecision: string
  albumType: string
  totalTracks: number
  name: string
  images: Image[]
}

export interface AlbumEntity extends Album {
  externalId: string
  tracks: TrackEntity[]
  genres: string[]
  artists: ArtistEntity[]
}
