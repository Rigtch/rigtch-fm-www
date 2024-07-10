import userEvent, { type UserEvent } from '@testing-library/user-event'
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider'
import { useSearchParams, usePathname } from 'next/navigation'
import type { MockInstance } from 'vitest'
import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { ToggleStatsProvider } from './toggle-stats-provider'

import { STATS_PROVIDER } from '@app/profile/constants'
import { StatsProvider } from '@app/profile/enums'

vi.mock('next/navigation')

describe('ToggleStatsProvider', () => {
  const pathname = '/profile/id'

  let useSearchParamsSpy: MockInstance
  let usePathnameSpy: MockInstance
  let user: UserEvent

  beforeEach(() => {
    const searchParams = new URLSearchParams()

    useSearchParamsSpy = vi.mocked(useSearchParams)
    usePathnameSpy = vi.mocked(usePathname)
    user = userEvent.setup()

    usePathnameSpy.mockReturnValue(pathname)
    useSearchParamsSpy.mockReturnValue(searchParams)
  })

  test('should match snapshot', () => {
    const view = render(
      <ToggleStatsProvider initialValue={StatsProvider.SPOTIFY} />
    )

    expect(view).toMatchSnapshot()
  })

  test('should navigate on click', async () => {
    render(<ToggleStatsProvider initialValue={StatsProvider.SPOTIFY} />, {
      wrapper: MemoryRouterProvider,
    })

    await user.click(screen.getByText('rigtch.fm'))

    expect(mockRouter.pathname).toEqual(pathname)
    expect(mockRouter.query[STATS_PROVIDER]).toEqual(StatsProvider.RIGTCH)

    await user.click(screen.getByText('Spotify'))

    expect(mockRouter.query[STATS_PROVIDER]).toEqual(StatsProvider.SPOTIFY)
  })
})
