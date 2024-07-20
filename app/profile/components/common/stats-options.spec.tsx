import { render } from '@testing-library/react'

import { StatsOptions } from './stats-options'

import { RigtchTimeRange, StatsProvider, View } from '@app/profile/enums'
import { StatsMeasurement } from '@app/api/enums'

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/profile/id',
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('StatsOptions', () => {
  test('should match snapshot', () => {
    const view = render(
      <StatsOptions
        statsProvider={StatsProvider.RIGTCH}
        statsMeasurement={StatsMeasurement.PLAYS}
        view={View.CARD}
        timeRange={RigtchTimeRange.WEEK}
      />
    )

    expect(view).toMatchSnapshot()
  })
})
