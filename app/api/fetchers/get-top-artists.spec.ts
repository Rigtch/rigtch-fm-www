import { TimeRange } from '../types'

import { getTopArtists } from './get-top-artists'
import { fetchApi } from './fetch-api'

import { artistMock, artistNameMock } from '@tests/mocks/artist'
import { spotifyResponseMockFactory } from '@tests/mocks/spotify-response'

vi.mock('./fetch-api')

describe('getTopArtists', () => {
  const userId = 'userId'
  const accessToken = 'accessToken'

  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      spotifyResponseMockFactory([artistMock])
    )
  })

  test('should get top artists for selected user', async () => {
    const {
      items: [{ name }],
    } = await getTopArtists(accessToken, { userId })

    expect(name).toEqual(artistNameMock)
    expect(fetchApi).toHaveBeenCalledWith(
      `/users/${userId}/profile/top/artists?timeRange=long_term&limit=10&offset=0`,
      {
        token: accessToken,
      }
    )
  })

  test('should get top artists with params', async () => {
    const limit = 50
    const offset = 10
    const timeRange = TimeRange.SHORT_TERM
    const {
      items: [{ name }],
    } = await getTopArtists(accessToken, {
      limit,
      offset,
      userId,
      timeRange,
    })

    expect(name).toEqual(artistNameMock)
    expect(fetchApi).toHaveBeenCalledWith(
      `/users/${userId}/profile/top/artists?timeRange=${timeRange}&limit=${limit}&offset=${offset}`,
      {
        token: accessToken,
      }
    )
  })
})
