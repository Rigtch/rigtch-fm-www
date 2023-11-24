import { getTopArtists } from './get-top-artists'
import { fetchApi } from './fetch-api'

import { artistMock } from '@tests/mocks/artist'
import { spotifyResponseMockFactory } from '@tests/mocks/spotify-response'

vi.mock('./fetch-api')

describe('getTopArtists', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      spotifyResponseMockFactory([artistMock])
    )
  })

  test('should get top artists', async () => {
    const {
      items: [{ name }],
    } = await getTopArtists()

    expect(name).toEqual('Artist 1')
  })
})
