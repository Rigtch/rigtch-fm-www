import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, test, vi } from 'vitest'

import { useProfileQuery } from './use-profile'

import { ACCESS_TOKEN } from '@api/constants'
import { getProfile } from '@api/fetchers'
import { queryClientWrapper } from '@tests/utils'
import { profileMock } from '@tests/mocks'

vi.mock('@api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useProfileQuery', () => {
  beforeEach(() => {
    ;(getProfile as Mock).mockReturnValue(profileMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should return profile', async () => {
    const { result } = renderHook(() => useProfileQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.displayName).toEqual('John Doe')
    expect(getProfile).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
