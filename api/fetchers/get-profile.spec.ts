import { Mock, describe, test, vi } from 'vitest'

import { getProfile } from './get-profile'
import { fetchApi } from './fetch-api'

import { profileMock } from '@tests/mocks'

vi.mock('./fetch-api')

describe('getProfile', () => {
  beforeEach(() => {
    ;(fetchApi as Mock).mockResolvedValue(profileMock)
  })

  test('should get profile', async () => {
    const { displayName } = await getProfile()

    expect(displayName).toEqual('John Doe')
  })
})
