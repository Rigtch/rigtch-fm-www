import { render } from '@testing-library/react'

import { GenreChip } from './genre-chip'

describe('GenreChip', () => {
  test('should match snapshot', () => {
    const view = render(<GenreChip genre="Black Metal" />)

    expect(view).toMatchSnapshot()
  })
})
