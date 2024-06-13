vi.mock('next/navigation')

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockInstance } from 'vitest'
import { useSearchParams } from 'next/navigation'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import mockRouter from 'next-router-mock'

import { SeeMoreButton } from './see-more'

import { TIME_RANGE } from '@app/constants'
import { TimeRange } from '@app/api/types'

describe('SeeMoreButton', () => {
  const href = '/profile'
  const searchParams = new URLSearchParams()

  let useSearchParamsSpy: MockInstance

  beforeEach(() => {
    useSearchParamsSpy = vi.mocked(useSearchParams)
    useSearchParamsSpy.mockReturnValue(searchParams)
  })

  test('should match snapshot', () => {
    const view = render(<SeeMoreButton href={href} />)

    expect(view).toMatchSnapshot()
  })

  test('should navigate on click', async () => {
    render(<SeeMoreButton href={href} />, {
      wrapper: MemoryRouterProvider,
    })

    const user = userEvent.setup()

    await user.click(screen.getByRole('link'))

    expect(mockRouter.pathname).toEqual(href)
  })

  test('should navigate on click with query', async () => {
    searchParams.append(TIME_RANGE, TimeRange.MEDIUM_TERM)

    useSearchParamsSpy.mockReturnValue(searchParams)

    render(<SeeMoreButton href={href} />, {
      wrapper: MemoryRouterProvider,
    })

    const user = userEvent.setup()

    await user.click(screen.getByRole('link'))

    expect(mockRouter.pathname).toEqual(href)
    expect(mockRouter.query).toEqual({
      [TIME_RANGE]: TimeRange.MEDIUM_TERM,
    })
  })
})
