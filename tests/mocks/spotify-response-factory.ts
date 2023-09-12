import {
  SpotifyResponse,
  SpotifyResponseWithCursors,
  SpotifyResponseWithOffset,
} from '@api/types'

export const spotifyResponseMockFactory = <T>(
  items: T[]
): SpotifyResponse<T> => ({
  href: 'https://api.spotify.com/v1/search?query=metallica&type=artist&offset=0&limit=20',
  limit: 20,
  next: 'https://api.spotify.com/v1/search?query=metallica&type=artist&offset=20&limit=20',
  items,
})

export const spotifyResponseWithOffsetMockFactory = <T>(
  items: T[]
): SpotifyResponseWithOffset<T> => ({
  ...spotifyResponseMockFactory(items),
  offset: 0,
})

export const spotifyResponseWithCursorsMockFactory = <T>(
  items: T[]
): SpotifyResponseWithCursors<T> => ({
  ...spotifyResponseMockFactory(items),
  cursors: {
    after: '1693946946214',
    before: '1693946946214',
  },
})
