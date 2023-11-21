import { test, describe, vi, expect } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { fetchApi } from './fetch-api'

import { trackMock } from '@tests/mocks'
import { PlaybackState } from '@api/types'

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

    expect(name).toEqual('Track 1')
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      json: () => ({
        message: 'Unauthorized',
      }),
    }))

    expect(fetchApi<PlaybackState>('')).rejects.toThrow('Unauthorized')
  })

  test('should throw error when status is 403', () => {
    vi.stubGlobal('fetch', () => ({
      status: 403,
      json: () => ({
        message: 'Forbidden',
      }),
    }))

    expect(fetchApi<PlaybackState>('')).rejects.toThrow('Forbidden')
  })
})
