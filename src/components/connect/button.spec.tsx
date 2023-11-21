import { fireEvent, render, screen } from '@testing-library/react'

import { ConnectButton } from './button'

vi.mock('@config/environment', () => ({
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
    const openSpy = vi.spyOn(window, 'open')

    render(<ConnectButton />)

    fireEvent.click(screen.getByText('Connect'))

    expect(openSpy).toHaveBeenCalledWith(
      'http://localhost:3001/auth/login',
      '_self'
    )
  })
})
