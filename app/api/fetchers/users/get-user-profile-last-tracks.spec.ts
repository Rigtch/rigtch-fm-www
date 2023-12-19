import { fetchApi } from '../fetch-api'

import { getUserProfileLastTracks } from './get-user-profile-last-tracks'

import { spotifyResponseWithCursorsMockFactory } from '@tests/mocks/spotify-response'
import { tracksMock } from '@tests/mocks/track'

vi.mock('../fetch-api')

describe('GetUserProfileLastTracks', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      spotifyResponseWithCursorsMockFactory(tracksMock)
    )
  })

  test('should get user profile last tracks', async () => {
    const { items } = await getUserProfileLastTracks()

    expect(items).toEqual(tracksMock)
  })
})
