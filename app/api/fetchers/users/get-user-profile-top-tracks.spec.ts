import { fetchApi } from '../fetch-api'

import { getUserProfileTopTracks } from './get-user-profile-top-tracks'

import { spotifyResponseWithOffsetMockFactory } from '@tests/mocks/spotify-response'
import { tracksMock } from '@tests/mocks/track'

vi.mock('../fetch-api')

describe('GetUserProfileTopTracks', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      spotifyResponseWithOffsetMockFactory(tracksMock)
    )
  })

  test('should get user profile top tracks', async () => {
    const { items } = await getUserProfileTopTracks()

    expect(items).toEqual(tracksMock)
  })
})
