import { Cursors } from './cursors'

export interface SpotifyResponse<T = unknown> {
  href: string
  limit: number
  next: string
  items: T[]
}

export interface SpotifyResponseWithOffset<T = unknown>
  extends SpotifyResponse<T> {
  offset: number
}

export interface SpotifyResponseWithCursors<T = unknown>
  extends SpotifyResponse<T> {
  cursors: Cursors
}
