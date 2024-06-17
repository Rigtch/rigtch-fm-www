import { render } from '@testing-library/react'

import { RelativeTime } from './relative-time'

describe('RelativeTime', () => {
  const value = '2022-01-01'

  test('should match snapshot', () => {
    const view = render(<RelativeTime value={value} />)

    expect(view).toMatchSnapshot()
  })
})
