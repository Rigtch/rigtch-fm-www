import { render } from '@testing-library/react'

import { TopGenresSection } from './top-genres'

import { genresExample } from '@app/components/items/examples'

describe('TopGenresSection', () => {
  test('should match snapshot', () => {
    const view = render(<TopGenresSection items={genresExample} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with no data', () => {
    const view = render(<TopGenresSection items={[]} />)

    expect(view).toMatchSnapshot()
  })
})
