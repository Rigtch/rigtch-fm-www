import { render } from '@testing-library/react'

import { StatCard } from './stat-card'

describe('StatCard', () => {
  test('should match snapshot', () => {
    const view = render(<StatCard label="label">100</StatCard>)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with valueSize lg', () => {
    const view = render(
      <StatCard label="label" size="lg">
        100
      </StatCard>
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with valueSize xl', () => {
    const view = render(
      <StatCard label="label" size="xl">
        100
      </StatCard>
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with vs last week percent', () => {
    const view = render(
      <StatCard label="label" size="xl" value={100} lastWeekValue={50}>
        100
      </StatCard>
    )

    expect(view).toMatchSnapshot()
  })
})
