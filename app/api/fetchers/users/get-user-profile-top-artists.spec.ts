import { fetchApi } from '../fetch-api'

import { getUserProfileTopArtists } from './get-user-profile-top-artists'

import { artistsMock } from '@tests/mocks/artist'
import { spotifyResponseWithOffsetMockFactory } from '@tests/mocks/spotify-response'

vi.mock('../fetch-api')

describe('GetUserProfileTopArtists', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      spotifyResponseWithOffsetMockFactory(artistsMock)
    )
  })

  test('should get user profile top artists', async () => {
    const { items } = await getUserProfileTopArtists()

    expect(items).toEqual(artistsMock)
  })
})
