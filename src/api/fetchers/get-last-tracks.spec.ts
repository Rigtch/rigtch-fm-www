import { describe, test, vi } from 'vitest'

import { getLastTracks } from './get-last-tracks'

import { spotifyResponseMockFactory, trackMock } from '@tests/mocks'

describe('getLastTracks', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => spotifyResponseMockFactory([trackMock]),
    }))

    const {
      items: [{ name }],
    } = await getLastTracks()

    expect(name).toEqual('Track 1')
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(getLastTracks()).rejects.toThrow('Unauthorized')
  })

  test('should throw error when status is 403', () => {
    vi.stubGlobal('fetch', () => ({
      status: 403,
      statusText: 'Forbidden',
    }))

    expect(getLastTracks()).rejects.toThrow('Forbidden')
  })
})
