import { render } from '@testing-library/react'

import { CookiesDialog } from './cookies-dialog'

vi.mock('@app/actions/user-cookies')

describe('CookiesDialog', () => {
  test('should match snapshot when not accepted', () => {
    const view = render(<CookiesDialog isAccepted={false} />)
    expect(view).toMatchSnapshot()
  })

  test('should match snapshot when accepted', () => {
    const view = render(<CookiesDialog isAccepted />)
    expect(view).toMatchSnapshot()
  })
})
