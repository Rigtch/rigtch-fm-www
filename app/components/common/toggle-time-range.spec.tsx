import { render, screen } from '@testing-library/react'
import { MockInstance } from 'vitest'
import { usePathname, useSearchParams } from 'next/navigation'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import mockRouter from 'next-router-mock'

import { ToggleTimeRange } from './toggle-time-range'

import { TimeRange } from '@app/api/types'
import { TIME_RANGE } from '@app/constants'

vi.mock('next/navigation')

describe('ToggleTimeRange', () => {
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
    const view = render(<ToggleTimeRange initialValue={TimeRange.SHORT_TERM} />)

    expect(view).toMatchSnapshot()
  })

  test('should toggle time range', async () => {
    render(<ToggleTimeRange initialValue={TimeRange.SHORT_TERM} />, {
      wrapper: MemoryRouterProvider,
    })

    await user.click(screen.getByText('6 months'))

    expect(mockRouter.query[TIME_RANGE]).toEqual(TimeRange.MEDIUM_TERM)

    await user.click(screen.getByText('lifetime'))

    expect(mockRouter.query[TIME_RANGE]).toEqual(TimeRange.LONG_TERM)
  })
})
