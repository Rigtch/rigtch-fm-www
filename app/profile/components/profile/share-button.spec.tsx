import { render, screen } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'

import { ShareButton } from './share-button'

describe('ShareButton', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  test('should match snapshot', () => {
    const view = render(<ShareButton />)

    expect(view).toMatchSnapshot()
  })

  test('should copy to clipboard', async () => {
    render(<ShareButton />)

    expect(await window.navigator.clipboard.readText()).toEqual('')

    await user.click(screen.getByText('Share'))

    expect(await window.navigator.clipboard.readText()).toEqual(
      window.location.href
    )
  })
})
