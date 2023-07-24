import { describe, test, vi } from 'vitest'

import { putPlayerPause } from './put-player-pause'

describe('putPlayerPause', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => ({
        success: true,
      }),
    }))

    const { success } = await putPlayerPause()

    expect(success).toBeTruthy()
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(putPlayerPause()).rejects.toThrow('Unauthorized')
  })

  test('should throw error when status is 403', () => {
    vi.stubGlobal('fetch', () => ({
      status: 403,
      statusText: 'Forbidden',
    }))

    expect(putPlayerPause()).rejects.toThrow('Forbidden')
  })
})
