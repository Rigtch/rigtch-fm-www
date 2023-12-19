import { render, screen } from '@testing-library/react'
import { DateTime } from 'luxon'

import { RelativeTime } from './relative-time'

describe('RelativeTime', () => {
  const relativeTime = '2021-08-03T15:00:00'

  test('should render', () => {
    render(<RelativeTime value={relativeTime} />)

    const time = DateTime.fromISO(relativeTime).toRelative() ?? relativeTime

    expect(screen.getByText(time)).toBeInTheDocument()
  })
})
