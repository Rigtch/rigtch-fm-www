import userEvent, { type UserEvent } from '@testing-library/user-event'
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import type { MockInstance } from 'vitest'
import { render, screen } from '@testing-library/react'

import { SelectTimeRange } from './select-time-range'

import { RigtchTimeRange, SpotifyTimeRange } from '@app/profile/enums'

vi.mock('next/navigation')

describe('SelectTimeRange', () => {
  let user: UserEvent
  let useSearchParamsSpy: MockInstance
  let useRouterSpy: MockInstance
  let usePathnameSpy: MockInstance

  beforeEach(() => {
    user = userEvent.setup()
    useSearchParamsSpy = vi.mocked(useSearchParams)
    useRouterSpy = vi.mocked(useRouter)
    usePathnameSpy = vi.mocked(usePathname)
  })

  test('should match snapshot with spotify provider', () => {
    const view = render(
      <SelectTimeRange initialValue={SpotifyTimeRange.SHORT_TERM} />,
      {
        wrapper: MemoryRouterProvider,
      }
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with rigtch provider', () => {
    const view = render(
      <SelectTimeRange initialValue={RigtchTimeRange.WEEK} />,
      {
        wrapper: MemoryRouterProvider,
      }
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as disabled', () => {
    const view = render(
      <SelectTimeRange
        initialValue={RigtchTimeRange.WEEK}
        userCreatedAt={new Date()}
      />
    )

    expect(view).toMatchSnapshot()
  })

  describe('actions', () => {
    const pushSpy = vi.fn()
    const searchParams = new URLSearchParams()

    beforeEach(() => {
      useSearchParamsSpy.mockReturnValue(searchParams)
      useRouterSpy.mockReturnValue({
        push: pushSpy,
      })
      usePathnameSpy.mockReturnValue('/profile/id')
    })

    test('should not change time range because component is disabled', () => {
      render(
        <SelectTimeRange
          initialValue={RigtchTimeRange.WEEK}
          userCreatedAt={new Date()}
        />,
        {
          wrapper: MemoryRouterProvider,
        }
      )

      const selectButton = screen.getByRole('combobox')

      expect(selectButton).toHaveTextContent('7 days')
      expect(selectButton).toBeDisabled()
    })

    test('should change time range with spotify provider', async () => {
      render(<SelectTimeRange initialValue={SpotifyTimeRange.SHORT_TERM} />, {
        wrapper: MemoryRouterProvider,
      })

      const selectButton = screen.getByRole('combobox')

      expect(selectButton).toHaveTextContent('4 weeks')

      await user.click(selectButton)
      await user.click(screen.getByRole('option', { name: '6 months' }))

      expect(pushSpy).toHaveBeenCalled()

      await user.click(selectButton)
      await user.click(screen.getByRole('option', { name: 'lifetime' }))

      expect(pushSpy).toHaveBeenCalled()
    })

    test('should change time range with rigtch provider', async () => {
      render(<SelectTimeRange initialValue={RigtchTimeRange.WEEK} />, {
        wrapper: MemoryRouterProvider,
      })

      const selectButton = screen.getByRole('combobox')

      expect(selectButton).toHaveTextContent('7 days')

      await user.click(selectButton)
      await user.click(screen.getByRole('option', { name: '14 days' }))

      expect(pushSpy).toHaveBeenCalled()

      await user.click(selectButton)
      await user.click(screen.getByRole('option', { name: '30 days' }))

      expect(pushSpy).toHaveBeenCalled()

      await user.click(selectButton)
      await user.click(screen.getByRole('option', { name: '90 days' }))

      expect(pushSpy).toHaveBeenCalled()
    })
  })
})
