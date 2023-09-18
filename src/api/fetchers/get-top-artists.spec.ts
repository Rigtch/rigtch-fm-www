import { Mock, describe, test, vi } from 'vitest'

import { getTopArtists } from './get-top-artists'
import { fetchApi } from './fetch-api'

import { artistMock, spotifyResponseMockFactory } from '@tests/mocks'

vi.mock('./fetch-api')

describe('getTopArtists', () => {
  beforeEach(() => {
    ;(fetchApi as Mock).mockResolvedValue(
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
