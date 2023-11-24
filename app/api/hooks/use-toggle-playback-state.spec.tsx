import { act, renderHook, waitFor } from '@testing-library/react'

import { ACCESS_TOKEN } from '../constants'
import { putPlayerPause, putPlayerResume } from '../fetchers'

import { useTogglePlaybackStateQuery } from './use-toggle-playback-state'

vi.mock('@app/api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useTogglePlaybackStateQuery', () => {
  beforeEach(() => {
    vi.mocked(putPlayerPause).mockResolvedValue({
      success: true,
    })
    vi.mocked(putPlayerResume).mockResolvedValue({
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
