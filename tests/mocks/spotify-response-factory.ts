import { SpotifyResponse } from '@api/types'

export const spotifyResponseMockFactory = <T>(
  items: T[]
): SpotifyResponse<T> => ({
  href: 'https://api.spotify.com/v1/search?query=metallica&type=artist&offset=0&limit=20',
  limit: 20,
  next: 'https://api.spotify.com/v1/search?query=metallica&type=artist&offset=20&limit=20',
  items,
})
