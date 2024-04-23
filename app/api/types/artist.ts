import { Image } from './image'

export interface Artist {
  id: string
  name: string
  genres: string[]
  href: string
  images: Image[]
}

export type TrackArtist = Omit<Artist, 'genres' | 'images'>

export interface ArtistEntity extends Artist {
  popularity: number
  externalId: string
  followers: number
}
