import { cookies } from 'next/headers'
import { render, screen } from '@testing-library/react'

import ProfileLayout from '../../layout'
import { ProfileProviders } from '../providers'

import { ACCESS_TOKEN } from '@app/api/constants'
import { displayNameMock } from '@tests/mocks/profile'
import { getUser } from '@app/api/fetchers'
import { NavigationSidebar } from '@app/components/navigation'
import { LayoutProps } from '@app/types'
import { userMock } from '@tests/mocks/user'

vi.mock('next/headers')
vi.mock('@app/api/fetchers')
vi.mock('@app/components/navigation')
vi.mock('./providers')

describe('ProfileLayout', () => {
  const accessTokenMock = 'accessToken'
  const children = 'children'

  beforeEach(() => {
    vi.mocked(cookies, { partial: true }).mockReturnValue({
      get: () => ({
        name: ACCESS_TOKEN,
        value: accessTokenMock,
      }),
    })
    vi.mocked(NavigationSidebar).mockReturnValue(<div>NavigationSidebar</div>)
    vi.mocked(getUser).mockResolvedValue(userMock)
    vi.mocked(ProfileProviders).mockImplementation(
      ({ children }: LayoutProps) => <div>{children}</div>
    )
  })

  test('should render with profile', async () => {
    render(
      await ProfileLayout({
        children,
      })
    )

    expect(screen.getByText(displayNameMock)).toBeInTheDocument()
    expect(getUser).toHaveBeenCalledWith(accessTokenMock)
    expect(NavigationSidebar).toHaveBeenCalled()
    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
