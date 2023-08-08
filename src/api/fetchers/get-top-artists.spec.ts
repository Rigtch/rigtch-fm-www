import { describe, test, vi } from 'vitest'

import { getTopArtists } from './get-top-artists'

import { artistMock } from '@tests/mocks'

describe('getTopArtists', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => [artistMock],
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

  test('should throw error when status is 403', () => {
    vi.stubGlobal('fetch', () => ({
      status: 403,
      statusText: 'Forbidden',
    }))

    expect(getTopArtists()).rejects.toThrow('Forbidden')
  })
})
