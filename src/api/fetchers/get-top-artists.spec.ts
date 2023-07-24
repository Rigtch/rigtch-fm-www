import { describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { getTopArtists } from './get-top-artists'

import { Artist } from '@api/types'

describe('getTopArtists', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => [
        mock<Artist>({
          name: 'Artist 1',
        }),
      ],
    }))

    const [{ name }] = await getTopArtists()

    expect(name).toEqual('Artist 1')
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(getTopArtists()).rejects.toThrow('Unauthorized')
  })
})
