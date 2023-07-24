import { describe, test, vi } from 'vitest'

import { putPlayerResume } from './put-player-resume'

describe('putPlayerResume', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => ({
        success: true,
      }),
    }))

    const { success } = await putPlayerResume()

    expect(success).toBeTruthy()
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(putPlayerResume()).rejects.toThrow('Unauthorized')
  })

  test('should throw error when status is 403', () => {
    vi.stubGlobal('fetch', () => ({
      status: 403,
      statusText: 'Forbidden',
    }))

    expect(putPlayerResume()).rejects.toThrow('Forbidden')
  })
})
