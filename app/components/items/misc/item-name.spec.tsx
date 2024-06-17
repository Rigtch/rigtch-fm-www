import { render } from '@testing-library/react'

import { ItemName } from './item-name'

describe('ItemName', () => {
  test('should match snapshot', () => {
    const view = render(<ItemName name="A Dark Forgotten Past" href="" />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with long name', () => {
    const view = render(
      <ItemName name="Dark Medieval Times (Remastered 2021)" href="" />
    )

    expect(view).toMatchSnapshot()
  })
})
