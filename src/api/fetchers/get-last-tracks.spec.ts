import { Mock, describe, test, vi } from 'vitest'

import { getLastTracks } from './get-last-tracks'
import { fetchApi } from './fetch-api'

import { spotifyResponseMockFactory, trackMock } from '@tests/mocks'

vi.mock('./fetch-api')

describe('getLastTracks', () => {
  beforeEach(() => {
    ;(fetchApi as Mock).mockResolvedValue(
      spotifyResponseMockFactory([trackMock])
    )
  })

  test('should get last tracks', async () => {
    const {
      items: [{ name }],
    } = await getLastTracks()

    expect(name).toEqual('Track 1')
  })
})
