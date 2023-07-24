import { Mock, afterEach, beforeEach, describe, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ProfileInfo } from './info'

import { profileMock } from '@tests/mocks'
import { useProfileQuery } from '@hooks/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'

vi.mock('@hooks/api')
vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
}))
vi.mock('react-cookie')
vi.mock('@tanstack/react-query')

describe('ProfileInfo', () => {
  const routerPushMock = vi.fn()
  const queryClientClearMock = vi.fn()
  const removeCookiesMock = vi.fn()

  beforeEach(() => {
    ;(useProfileQuery as Mock).mockReturnValue({
      data: profileMock,
    })
    ;(useRouter as Mock).mockReturnValue({
      push: routerPushMock,
    })
    ;(useQueryClient as Mock).mockReturnValue({
      clear: queryClientClearMock,
    })
    ;(useCookies as Mock).mockReturnValue([vi.fn(), vi.fn(), removeCookiesMock])
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render profile info with data', () => {
    render(<ProfileInfo />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  test('should render profile info without data', () => {
    ;(useProfileQuery as Mock).mockReturnValue({
      data: undefined,
    })

    render(<ProfileInfo />)

    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  test('should disconnect', () => {
    render(<ProfileInfo />)

    fireEvent.click(screen.getByText('John Doe'))
    fireEvent.click(screen.getByText('Disconnect'))

    expect(removeCookiesMock).toHaveBeenCalledWith(ACCESS_TOKEN)
    expect(removeCookiesMock).toHaveBeenCalledWith(REFRESH_TOKEN)
    expect(queryClientClearMock).toHaveBeenCalled()
    expect(routerPushMock).toHaveBeenCalledWith('/about')
  })

  test('should open in spotify', () => {
    const windowOpenMock = vi.fn()

    vi.spyOn(window, 'open').mockImplementation(windowOpenMock)

    render(<ProfileInfo />)

    fireEvent.click(screen.getByText('John Doe'))
    fireEvent.click(screen.getByText('Open in Spotify'))

    expect(windowOpenMock).toHaveBeenCalledWith(profileMock.href, '_blank')
  })
})
