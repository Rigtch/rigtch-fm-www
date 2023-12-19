import { getLastTracks } from './get-last-tracks'
import { fetchApi } from './fetch-api'

import { trackMock } from '@tests/mocks/track'
import { spotifyResponseMockFactory } from '@tests/mocks/spotify-response'

vi.mock('./fetch-api')

describe('getLastTracks', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      spotifyResponseMockFactory([trackMock])
    )
  })

  test('should get last tracks', async () => {
    const {
      items: [{ name }],
    } = await getLastTracks()

    expect(name).toBe('Track 1')
  })
})
