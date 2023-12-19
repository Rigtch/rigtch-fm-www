import { cookies } from 'next/headers'
import { render, screen } from '@testing-library/react'

import { ACCESS_TOKEN } from './api/constants'
import { getProfile } from './api/fetchers'
import RootLayout from './layout'

import { displayNameMock } from '@tests/mocks/profile'
import { userMock } from '@tests/mocks/user'

vi.mock('next/headers')
vi.mock('next/navigation')
vi.mock('./api/fetchers')

describe('RootLayout', () => {
  const accessTokenMock = 'accessToken'

  beforeEach(() => {
    vi.mocked(cookies, { partial: true }).mockReturnValue({
      get: () => ({
        name: ACCESS_TOKEN,
        value: accessTokenMock,
      }),
    })
  })

  test('should render with connect button', async () => {
    vi.mocked(getProfile).mockImplementation(() => {
      throw new Error('error')
    })

    render(await RootLayout({ children: 'awd' }))

    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  test('should render with profile', async () => {
    vi.mocked(getProfile).mockResolvedValue(userMock)

    render(await RootLayout({ children: 'awd' }))

    expect(screen.getByText(displayNameMock)).toBeInTheDocument()
  })
})
