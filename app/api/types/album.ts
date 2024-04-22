import { Image } from './image'
import { type TrackEntity } from './track'

export interface Album {
  id: string
  href: string
  releaseDate: string
  totalTracks: number
  name: string
  images: Image[]
}

export interface AlbumEntity extends Album {
  externalId: string
  tracks: TrackEntity[]
}
