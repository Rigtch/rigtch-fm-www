import { describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { getPlaybackState } from './get-playback-state'

import { PlaybackState } from '@api/types'
import { trackMock } from '@tests/mocks'

describe('getPlaybackState', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () =>
        mock<PlaybackState>({
          track: trackMock,
        }),
    }))

    const {
      track: { name },
    } = await getPlaybackState()

    expect(name).toEqual('Track 1')
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(getPlaybackState()).rejects.toThrow('Unauthorized')
  })

  test('should throw error when status is 403', () => {
    vi.stubGlobal('fetch', () => ({
      status: 403,
      statusText: 'Forbidden',
    }))

    expect(getPlaybackState()).rejects.toThrow('Forbidden')
  })
})
