import { describe, test, vi } from 'vitest'

import { TimeRange } from '../types'

import { getTopTracks } from './get-top-tracks'
import { fetchApi } from './fetch-api'

import { trackNameMock, tracksMock } from '@tests/mocks/track'
import { spotifyResponseMockFactory } from '@tests/mocks/spotify-response'

vi.mock('./fetch-api')

describe('getTopTracks', () => {
  const accessToken = 'accessToken'
  const userId = 'userId'

  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      spotifyResponseMockFactory(tracksMock)
    )
  })

  test('should return response for selected user', async () => {
    const {
      items: [{ name }],
    } = await getTopTracks(accessToken, { userId })

    expect(name).toEqual(trackNameMock)
    expect(fetchApi).toHaveBeenCalledWith(
      `/users/${userId}/profile/top/tracks?timeRange=long_term&limit=10&offset=0`,
      {
        token: accessToken,
      }
    )
  })

  test('should return response with params', async () => {
    const limit = 50
    const offset = 10
    const timeRange = TimeRange.SHORT_TERM
    const {
      items: [{ name }],
    } = await getTopTracks(accessToken, {
      limit,
      offset,
      timeRange,
      userId,
    })

    expect(name).toEqual(trackNameMock)
    expect(fetchApi).toHaveBeenCalledWith(
      `/users/${userId}/profile/top/tracks?timeRange=${timeRange}&limit=${limit}&offset=${offset}`,
      {
        token: accessToken,
      }
    )
  })
})
