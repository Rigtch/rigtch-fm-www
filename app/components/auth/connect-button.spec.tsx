import { render } from '@testing-library/react'

import { ConnectButton } from './connect-button'

describe('ConnectButton', () => {
  test('should match snapshot', () => {
    const view = render(<ConnectButton />)

    expect(view).toMatchSnapshot()
  })
})
