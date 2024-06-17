import { render } from '@testing-library/react'

import { ItemPosition } from './item-position'

describe('ItemPosition', () => {
  test('should match snapshot', () => {
    const view = render(<ItemPosition position={1} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with size md', () => {
    const view = render(<ItemPosition position={1} size="md" />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with size lg', () => {
    const view = render(<ItemPosition position={1} size="lg" />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with size xl', () => {
    const view = render(<ItemPosition position={1} size="xl" />)

    expect(view).toMatchSnapshot()
  })
})
