import { describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { getRefresh } from './get-refresh'

import { SecretData } from '@api/types'

describe('getRefresh', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () =>
        mock<SecretData>({
          accessToken: 'token',
        }),
    }))

    const { accessToken } = await getRefresh()

    expect(accessToken).toEqual('token')
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(getRefresh()).rejects.toThrow('Unauthorized')
  })
})
