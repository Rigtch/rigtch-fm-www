import { describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { getProfile } from './get-profile'

import { Profile } from '@api/types'

describe('getProfile', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () =>
        mock<Profile>({
          displayName: 'John Doe',
        }),
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
