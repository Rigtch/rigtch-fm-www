import { describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { getLastTracks } from './get-last-tracks'

import { Track } from '@api/types'

describe('getLastTracks', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => [
        mock<Track>({
          name: 'Track 1',
        }),
      ],
    }))

    const [{ name }] = await getLastTracks()

    expect(name).toEqual('Track 1')
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(getLastTracks()).rejects.toThrow('Unauthorized')
  })
})
