import { fireEvent, render, screen } from '@testing-library/react'

import { ConnectButton } from './button'

vi.mock('@app/config/environment', () => ({
  environment: {
    API_URL: 'http://localhost:3001',
  },
}))

describe('ConnectButton', () => {
  test('should render', () => {
    render(<ConnectButton />)

    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  test('should call `window.open` onClick', () => {
    window.open = vi.fn()

    render(<ConnectButton />)

    fireEvent.click(screen.getByText('Connect'))

    expect(window.open).toHaveBeenCalledWith(
      'http://localhost:3001/auth/login',
      '_self'
    )
  })
})
