import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { useProfileQuery } from './use-profile'

import { ACCESS_TOKEN } from '@api/constants'
import { getProfile } from '@api/fetchers'
import { Profile } from '@api/types'
import { queryClientWrapper } from '@tests/utils'

vi.mock('@api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useProfileQuery', () => {
  beforeEach(() => {
    ;(getProfile as Mock).mockReturnValue(
      mock<Profile>({
        displayName: 'John Doe',
      })
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('should return profile', async () => {
    const { result } = renderHook(() => useProfileQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.displayName).toEqual('John Doe')
    expect(getProfile).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
