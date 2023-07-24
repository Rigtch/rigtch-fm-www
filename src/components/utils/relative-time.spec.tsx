import { render, screen } from '@testing-library/react'
import { expect, test, describe } from 'vitest'

import { RelativeTime } from './relative-time'

describe('RelativeTime', () => {
  test('should return relative time', () => {
    render(
      <RelativeTime
        value={new Date(Date.now() - 1000 * 60 * 60).toISOString()}
      />
    )

    expect(screen.getByText('1 hour ago')).toBeInTheDocument()
  })
})
