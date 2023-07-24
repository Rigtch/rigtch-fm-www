import { describe, test, vi } from 'vitest'

import { getProfile } from './get-profile'

import { profileMock } from '@tests/mocks'

describe('getProfile', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => profileMock,
    }))

    const { displayName } = await getProfile()

    expect(displayName).toEqual('John Doe')
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(getProfile()).rejects.toThrow('Unauthorized')
  })
})
