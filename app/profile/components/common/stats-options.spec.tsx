import { render } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

import { StatsOptions } from './stats-options'

import { QueryClientWrapper } from '@tests/utils'
import { RigtchTimeRange, StatsProvider, View } from '@app/profile/enums'
import { StatsMeasurement } from '@app/api/enums'

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
        <StatsOptions
          statsProvider={StatsProvider.RIGTCH}
          measurement={StatsMeasurement.PLAYS}
          timeRange={RigtchTimeRange.WEEK}
          view={View.CARD}
          userCreatedAt={new Date()}
        />
      </SessionProvider>,
      {
        wrapper: QueryClientWrapper,
      }
    )

    expect(view).toMatchSnapshot()
  })
})
