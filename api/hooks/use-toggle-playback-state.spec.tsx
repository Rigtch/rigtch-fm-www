import { Mock, describe, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'

import { useTogglePlaybackStateQuery } from './use-toggle-playback-state'

import { ACCESS_TOKEN } from '@api/constants'
import { putPlayerPause, putPlayerResume } from '@api/fetchers'

vi.mock('@api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useTogglePlaybackStateQuery', () => {
  beforeEach(() => {
    ;(putPlayerPause as Mock).mockReturnValue({
      success: true,
    })
    ;(putPlayerResume as Mock).mockReturnValue({
      success: true,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should pause player', async () => {
    const { result } = renderHook(() => useTogglePlaybackStateQuery())

    await waitFor(() => expect(result.current.toggle).toBeDefined())

    act(() => {
      result.current.toggle(true)
    })

    expect(putPlayerPause).toHaveBeenCalledWith(ACCESS_TOKEN)
  })

  test('should resume player', async () => {
    const { result } = renderHook(() => useTogglePlaybackStateQuery())

    await waitFor(() => expect(result.current.toggle).toBeDefined())

    act(() => {
      result.current.toggle(false)
    })

    expect(putPlayerResume).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
