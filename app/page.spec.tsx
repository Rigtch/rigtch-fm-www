import { render, screen } from '@testing-library/react'
import { cookies } from 'next/headers'

import HomePage from './page'
import { ACCESS_TOKEN } from './api/constants'
import { getUser } from './api/fetchers'

import { profileMock } from '@tests/mocks/profile'
import { userMock } from '@tests/mocks/user'

vi.mock('next/headers')
vi.mock('next/navigation')
vi.mock('./api/fetchers')

describe('HomePage', () => {
  const accessTokenMock = 'accessToken'

  beforeEach(() => {
    vi.mocked(cookies, { partial: true }).mockReturnValue({
      get: () => ({
        name: ACCESS_TOKEN,
        value: accessTokenMock,
      }),
    })
  })

  test('should render with rigtch.fm text', async () => {
    render(await HomePage())

    expect(screen.getByText('rigtch.fm')).toBeInTheDocument()
  })

  test('should render with profile data', async () => {
    vi.mocked(getUser).mockResolvedValue(userMock)

    render(await HomePage())

    expect(
      screen.getByText(`Welcome back ${profileMock.displayName}!`)
    ).toBeInTheDocument()
  })
})
