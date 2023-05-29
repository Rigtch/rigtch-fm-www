import { Image } from './image'

export interface Artist {
  name: string
  genres: string[]
  href: string
  images: Image[]
}

export interface TopArtistsQuery {
  topArtists: Artist[]
}

export type TrackArtist = Omit<Artist, 'genres'>
