import { render } from '@testing-library/react'

import { LinkButton } from './link-button'

describe('LinkButton', () => {
  test('should match snapshot', () => {
    const view = render(<LinkButton href="/">Link</LinkButton>)

    expect(view).toMatchSnapshot()
  })
})
