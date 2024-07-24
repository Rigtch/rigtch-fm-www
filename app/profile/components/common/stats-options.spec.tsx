import { render } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

import { StatsOptions } from './stats-options'

import { QueryClientWrapper } from '@tests/utils'

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({
    id: 'id',
  }),
  usePathname: () => '/profile/id',
  useRouter: () => ({
    push: vi.fn(),
  }),
  notFound: vi.fn(),
}))

describe('StatsOptions', () => {
  test('should match snapshot', () => {
    const view = render(
      <SessionProvider
        session={
          {
            token: {
              value: 'token',
            },
          } as Session
        }
      >
        <StatsOptions />
      </SessionProvider>,
      {
        wrapper: QueryClientWrapper,
      }
    )

    expect(view).toMatchSnapshot()
  })
})
