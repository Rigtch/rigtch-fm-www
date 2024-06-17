import { render } from '@testing-library/react'

import { GenreBadge } from './genre-badge'

describe('GenreBadge', () => {
  test('should match snapshot', () => {
    const view = render(<GenreBadge genre="Black Metal" />)

    expect(view).toMatchSnapshot()
  })
})
