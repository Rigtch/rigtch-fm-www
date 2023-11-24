import { describe, test, vi } from 'vitest'

import { getTopTracks } from './get-top-tracks'
import { fetchApi } from './fetch-api'

import { trackMock } from '@tests/mocks/track'
import { spotifyResponseMockFactory } from '@tests/mocks/spotify-response'

vi.mock('./fetch-api')

describe('getTopTracks', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      spotifyResponseMockFactory([trackMock])
    )
  })

  test('should return response', async () => {
    const {
      items: [{ name }],
    } = await getTopTracks()

    expect(name).toEqual('Track 1')
  })
})
