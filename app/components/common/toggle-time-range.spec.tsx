import { act, render, screen } from '@testing-library/react'
import { MockInstance } from 'vitest'
import { usePathname, useSearchParams } from 'next/navigation'
import userEvent from '@testing-library/user-event'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import mockRouter from 'next-router-mock'

import { ToggleTimeRange } from './toggle-time-range'

import { TimeRange } from '@app/api/types'

vi.mock('next/navigation')

describe('ToggleTimeRange', () => {
  const pathname = '/profile/id'

  let searchParamsSpy: MockInstance
  let pathnameSpy: MockInstance

  beforeEach(() => {
    const searchParams = new URLSearchParams()

    searchParamsSpy = vi.mocked(useSearchParams)
    pathnameSpy = vi.mocked(usePathname)

    pathnameSpy.mockReturnValue(pathname)
    searchParamsSpy.mockReturnValue(searchParams)
  })

  test('should match snapshot', () => {
    const view = render(<ToggleTimeRange initialValue={TimeRange.SHORT_TERM} />)

    expect(view).toMatchSnapshot()
  })

  test('should toggle time range', async () => {
    render(<ToggleTimeRange initialValue={TimeRange.SHORT_TERM} />, {
      wrapper: MemoryRouterProvider,
    })

    const user = userEvent.setup()

    await act(async () => {
      await user.click(screen.getByText('6 months'))
    })

    expect(mockRouter.asPath).toEqual(`${pathname}?time-range=medium_term`)

    await act(async () => {
      await user.click(screen.getByText('lifetime'))
    })

    expect(mockRouter.asPath).toEqual(`${pathname}?time-range=long_term`)
  })
})
