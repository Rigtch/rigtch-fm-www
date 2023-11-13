import { Mock, describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { getRefresh } from './get-refresh'
import { fetchApi } from './fetch-api'

import { SecretData } from '@api/types'

vi.mock('./fetch-api')

describe('getRefresh', () => {
  beforeEach(() => {
    ;(fetchApi as Mock).mockResolvedValue(
      mock<SecretData>({
        accessToken: 'token',
      })
    )
  })

  test('should get secret data', async () => {
    const { accessToken } = await getRefresh()

    expect(accessToken).toEqual('token')
  })
})
