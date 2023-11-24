import { fireEvent, render, screen } from '@testing-library/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended'

import { NavigationBar } from './bar'

import { Profile } from '@app/api/types'
import { useAuthCookies } from '@app/hooks/use-auth-cookies'

vi.mock('@tanstack/react-query')
vi.mock('next/navigation')
vi.mock('@app/hooks/use-auth-cookies')

describe('NavigationBar', () => {
  const displayName = 'displayName'

  const queryClientClearMock = vi.fn()
  const routerPushMock = vi.fn()
  const routerRefreshMock = vi.fn()
  const removeAuthCookiesMock = vi.fn()

  let profileMock: DeepMockProxy<Profile>

  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  beforeEach(() => {
    vi.mocked(useQueryClient, { partial: true }).mockReturnValue({
      clear: queryClientClearMock,
    })
    vi.mocked(useRouter, { partial: true }).mockReturnValue({
      push: routerPushMock,
      refresh: routerRefreshMock,
    })
    vi.mocked(useAuthCookies, { partial: true }).mockReturnValue({
      removeAuthCookies: removeAuthCookiesMock,
    })

    profileMock = mockDeep<Profile>({
      displayName,
      href: 'href',
    })
  })

  test('should render without profile', () => {
    render(<NavigationBar />)

    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  test('should render with profile', () => {
    render(<NavigationBar profile={profileMock} />)

    expect(screen.getByText(displayName)).toBeInTheDocument()
  })

  test('should disconnect', () => {
    render(<NavigationBar profile={profileMock} />)

    fireEvent.click(screen.getByText(displayName))
    fireEvent.click(screen.getByText('Disconnect'))

    expect(removeAuthCookiesMock).toHaveBeenCalled()
    expect(queryClientClearMock).toHaveBeenCalled()
    expect(routerPushMock).toHaveBeenCalledWith('/')
    expect(routerRefreshMock).toHaveBeenCalled()
  })
})
