import { render, screen } from '@testing-library/react'
import { DateTime } from 'luxon'

import { RelativeTime } from './relative-time'

describe('RelativeTime', () => {
  const time = '2021-08-03T15:00:00'

  test('should render', () => {
    render(<RelativeTime value={time} />)

    const relativeTime = DateTime.fromISO(time).toRelative() ?? time

    expect(screen.getByText(relativeTime)).toBeInTheDocument()
  })
})
