import { getRecentlyPlayed } from './get-recently-played'
import { fetchApi } from './fetch-api'

import { trackNameMock, tracksMock } from '@tests/mocks/track'
import { spotifyResponseMockFactory } from '@tests/mocks/spotify-response'

vi.mock('./fetch-api')

describe('getLastTracks', () => {
  const accessToken = 'accessToken'
  const userId = 'userId'

  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      spotifyResponseMockFactory(tracksMock)
    )
  })

  test('should get last tracks for selected user', async () => {
    const {
      items: [{ name }],
    } = await getRecentlyPlayed(accessToken, { userId })

    expect(name).toEqual(trackNameMock)
    expect(fetchApi).toHaveBeenCalledWith(
      `/users/${userId}/profile/recently-played?limit=10`,
      {
        token: accessToken,
        cache: 'no-cache',
      }
    )
  })

  test('should get last tracks with cursors', async () => {
    const before = 'before'
    const after = 'after'
    const {
      items: [{ name }],
    } = await getRecentlyPlayed(accessToken, {
      before,
      userId,
      after,
    })

    expect(name).toEqual(trackNameMock)
    expect(fetchApi).toHaveBeenCalledWith(
      `/users/${userId}/profile/recently-played?limit=10&after=${after}&before=${before}`,
      {
        token: accessToken,
        cache: 'no-cache',
      }
    )
  })
})
