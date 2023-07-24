import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { ReactElement } from 'react'
import { Mock, describe, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { useLastTracksQuery } from './use-last-tracks'

import { Track } from '@api/types'
import { getLastTracks } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'

const wrapper = ({ children }: { children: ReactElement }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

vi.mock('@api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useLastTracksQuery', () => {
  beforeEach(() => {
    ;(getLastTracks as Mock).mockReturnValue([mock<Track>({ name: 'track 1' })])
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('should return last tracks', async () => {
    const { result } = renderHook(() => useLastTracksQuery(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.[0]?.name).toEqual('track 1')
    expect(getLastTracks).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
