import { Mock, describe, test, vi } from 'vitest'

import { getTopTracks } from './get-top-tracks'
import { fetchApi } from './fetch-api'

import { spotifyResponseMockFactory, trackMock } from '@tests/mocks'

vi.mock('./fetch-api')

describe('getTopTracks', () => {
  beforeEach(() => {
    ;(fetchApi as Mock).mockResolvedValue(
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
