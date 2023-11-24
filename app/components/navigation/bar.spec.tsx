import { fireEvent, render, screen } from '@testing-library/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { NavigationBar } from './bar'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'
import { displayNameMock, profileMock } from '@tests/mocks/profile'

vi.mock('@tanstack/react-query')
vi.mock('next/navigation')
vi.mock('@app/hooks/use-auth-cookies')

describe('NavigationBar', () => {
  const queryClientClearMock = vi.fn()
  const routerPushMock = vi.fn()
  const routerRefreshMock = vi.fn()
  const removeAuthCookiesMock = vi.fn()

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
  })

  test('should render without profile', () => {
    render(<NavigationBar />)

    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  test('should render with profile', () => {
    render(<NavigationBar profile={profileMock} />)

    expect(screen.getByText(displayNameMock)).toBeInTheDocument()
  })

  test('should disconnect', () => {
    render(<NavigationBar profile={profileMock} />)

    fireEvent.click(screen.getByText(displayNameMock))
    fireEvent.click(screen.getByText('Disconnect'))

    expect(removeAuthCookiesMock).toHaveBeenCalled()
    expect(queryClientClearMock).toHaveBeenCalled()
    expect(routerPushMock).toHaveBeenCalledWith('/')
    expect(routerRefreshMock).toHaveBeenCalled()
  })
})
