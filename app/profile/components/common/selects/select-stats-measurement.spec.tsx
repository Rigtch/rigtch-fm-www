vi.mock('next/navigation')

import { render, screen } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { MockInstance } from 'vitest'

import { SelectStatsMeasurement } from './select-stats-measurement'

import { StatsMeasurement } from '@app/api/enums'

describe('SelectStatsMeasurement', () => {
  let user: UserEvent
  let useRouterSpy: MockInstance
  let useSearchParamsSpy: MockInstance
  let usePathnameSpy: MockInstance

  beforeEach(() => {
    user = userEvent.setup()
    useRouterSpy = vi.mocked(useRouter)
    useSearchParamsSpy = vi.mocked(useSearchParams)
    usePathnameSpy = vi.mocked(usePathname)
  })

  test('should match snapshot', () => {
    const view = render(
      <SelectStatsMeasurement initialValue={StatsMeasurement.PLAYS} />,
      {
        wrapper: MemoryRouterProvider,
      }
    )

    expect(view).toMatchSnapshot()
  })

  test('should change stats measurement', async () => {
    const pushSpy = vi.fn()
    const prefetchSpy = vi.fn()
    const searchParams = new URLSearchParams()

    useSearchParamsSpy.mockReturnValue(searchParams)
    useRouterSpy.mockReturnValue({
      push: pushSpy,
      prefetch: prefetchSpy,
    })
    usePathnameSpy.mockReturnValue('/profile/id')

    render(<SelectStatsMeasurement initialValue={StatsMeasurement.PLAYS} />, {
      wrapper: MemoryRouterProvider,
    })

    const selectButton = screen.getByRole('combobox')

    expect(selectButton).toHaveTextContent('Plays')

    await user.click(selectButton)

    expect(prefetchSpy).toHaveBeenCalled()

    await user.click(screen.getByRole('option', { name: 'PlayTime' }))

    expect(pushSpy).toHaveBeenCalled()
  })
})
