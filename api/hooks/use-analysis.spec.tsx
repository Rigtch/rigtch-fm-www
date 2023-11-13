import { renderHook, waitFor } from '@testing-library/react'
import { Mock, vi } from 'vitest'

import { useAnalysisQuery } from './use-analysis'

import { ACCESS_TOKEN } from '@api/constants'
import { getAnalysis } from '@api/fetchers'
import { analysisMock } from '@tests/mocks'
import { queryClientWrapper } from '@tests/utils'

vi.mock('@api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useAnalysisQuery', () => {
  beforeEach(() => {
    ;(getAnalysis as Mock).mockReturnValue(analysisMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should return analysis', async () => {
    const { result } = renderHook(() => useAnalysisQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.acousticness).toEqual(analysisMock.acousticness)
    expect(getAnalysis).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
