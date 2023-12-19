import { mock } from 'vitest-mock-extended'

import { fetchApi } from './fetch-api'

import { trackMock, trackNameMock } from '@tests/mocks/track'
import { PlaybackState } from '@app/api/types'

describe('fetchApi', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      ok: true,
      json: () =>
        mock<PlaybackState>({
          track: trackMock,
        }),
    }))

    const {
      track: { name },
    } = await fetchApi<PlaybackState>('')

    expect(name).toEqual(trackNameMock)
  })

  test('should throw error when status is 401', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      json: () => ({
        message: 'Unauthorized',
      }),
    }))

    await expect(fetchApi<PlaybackState>('')).rejects.toThrow('Unauthorized')
  })

  test('should throw error when status is 403', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 403,
      json: () => ({
        message: 'Forbidden',
      }),
    }))

    await expect(fetchApi<PlaybackState>('')).rejects.toThrow('Forbidden')
  })
})
