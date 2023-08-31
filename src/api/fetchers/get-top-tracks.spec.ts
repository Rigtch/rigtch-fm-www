import { describe, test, vi } from 'vitest'

import { getTopTracks } from './get-top-tracks'

import { spotifyResponseMockFactory, trackMock } from '@tests/mocks'

describe('getTopTracks', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => spotifyResponseMockFactory([trackMock]),
    }))

    const {
      items: [{ name }],
    } = await getTopTracks()

    expect(name).toEqual('Track 1')
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(getTopTracks()).rejects.toThrow('Unauthorized')
  })

  test('should throw error when status is 403', () => {
    vi.stubGlobal('fetch', () => ({
      status: 403,
      statusText: 'Forbidden',
    }))

    expect(getTopTracks()).rejects.toThrow('Forbidden')
  })
})
