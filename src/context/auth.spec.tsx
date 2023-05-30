import { useContext } from 'react'
import { describe, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import { AuthContext, AuthProvider } from './auth'

import { Profile } from '~/graphql'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/common/constants'

const removeCookiesMock = vi.fn()
const routerPushMock = vi.fn()

vi.mock(
  'next/router',
  vi.fn(() => ({
    useRouter: vi.fn(() => ({
      push: routerPushMock,
    })),
  }))
)

vi.mock(
  'react-cookie',
  vi.fn(() => ({
    useCookies: vi.fn(() => [vi.fn(), vi.fn(), removeCookiesMock]),
  }))
)

enum AuthStatus {
  Authorized = 'authorized',
  Unauthorized = 'unauthorized',
}

const profileMock: Profile = {
  displayName: 'John Doe',
  href: 'https://open.spotify.com/user/1234567890',
  images: [
    {
      url: 'https://i.scdn.co/image/ab6775700000ee85d8b4c9e0b5c5f0e3c5a7e3a5',
    },
  ],
  id: '1234567890',
  followers: 20,
}

function ComponentMock() {
  const { profile, setProfile, disconnect, isAuthorized } =
    useContext(AuthContext)

  return (
    <>
      <p>{profile?.displayName}</p>
      <p>{isAuthorized ? AuthStatus.Authorized : AuthStatus.Unauthorized}</p>

      <button onClick={disconnect}>Disconnect</button>
      <button onClick={() => setProfile(profileMock)}>Set Profile</button>
    </>
  )
}

const WrappedComponentMock = () => (
  <AuthProvider>
    <ComponentMock />
  </AuthProvider>
)

describe('AuthContext', () => {
  test('profile should be empty', () => {
    render(<WrappedComponentMock />)

    expect(screen.getByText(AuthStatus.Unauthorized)).toBeInTheDocument()
  })

  test('should set the profile', async () => {
    render(<WrappedComponentMock />)

    await fireEvent.click(screen.getByText('Set Profile'))

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText(AuthStatus.Authorized)).toBeInTheDocument()
  })

  test('should disconnect', async () => {
    render(<WrappedComponentMock />)

    await fireEvent.click(screen.getByText('Set Profile'))

    expect(screen.getByText(AuthStatus.Authorized)).toBeInTheDocument()

    await fireEvent.click(screen.getByText('Disconnect'))

    expect(screen.getByText(AuthStatus.Unauthorized)).toBeInTheDocument()
    expect(removeCookiesMock).toBeCalledWith(ACCESS_TOKEN)
    expect(removeCookiesMock).toBeCalledWith(REFRESH_TOKEN)
    expect(routerPushMock).toBeCalledWith('/about')
  })
})
