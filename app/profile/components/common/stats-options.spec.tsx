import { render } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { StatsOptions } from './stats-options'

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
      <QueryClientProvider client={new QueryClient()}>
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
            statsMeasurement={StatsMeasurement.PLAYS}
            view={View.CARD}
            timeRange={RigtchTimeRange.WEEK}
          />
        </SessionProvider>
      </QueryClientProvider>
    )

    expect(view).toMatchSnapshot()
  })
})
