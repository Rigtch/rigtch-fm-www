import { render } from '@testing-library/react'

import { genreExample } from './examples'
import { GenreChip } from './genre-chip'

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

  test('should match snapshot with plays', () => {
    const view = render(
      <GenreChip genre={genreExample} plays={100} maxPlays={110} />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with playTime', () => {
    const view = render(
      <GenreChip
        genre={genreExample}
        playTime={1000 * 60 * 60 * 4}
        maxPlayTime={1000 * 60 * 60 * 6}
      />
    )

    expect(view).toMatchSnapshot()
  })
})
