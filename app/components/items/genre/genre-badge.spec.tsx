import { render } from '@testing-library/react'

import { GenreBadge } from './genre-badge'
import { genreExample } from './examples'

describe('GenreBadge', () => {
  test('should match snapshot', () => {
    const view = render(<GenreBadge genre={genreExample} />)

    expect(view).toMatchSnapshot()
  })
})
