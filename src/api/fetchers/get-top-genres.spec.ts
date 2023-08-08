import { describe, test, vi } from 'vitest'

import { getTopGenres } from './get-top-genres'

describe('getTopGenres', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => ({
        genres: ['pop', 'rock', 'rap'],
      }),
    }))

    const { genres } = await getTopGenres()

    expect(genres).toEqual(['pop', 'rock', 'rap'])
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(getTopGenres()).rejects.toThrow('Unauthorized')
  })

  test('should throw error when status is 403', () => {
    vi.stubGlobal('fetch', () => ({
      status: 403,
      statusText: 'Forbidden',
    }))

    expect(getTopGenres()).rejects.toThrow('Forbidden')
  })
})
