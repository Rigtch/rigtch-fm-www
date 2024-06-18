import { render } from '@testing-library/react'

import { GenreChip } from './genre-chip'
import { genreExample } from './examples'

describe('GenreChip', () => {
  test('should match snapshot', () => {
    const view = render(<GenreChip genre={genreExample} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with custom className', () => {
    const view = render(
      <GenreChip genre={genreExample} className="bg-neutral-800" />
    )

    expect(view).toMatchSnapshot()
  })
})
