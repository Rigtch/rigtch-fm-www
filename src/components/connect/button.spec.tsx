import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { ConnectButton } from './button'

describe('Components - ConnectButton', () => {
  test('should render the button', () => {
    render(<ConnectButton />)

    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  test('should open the authentication url', async () => {
    vi.spyOn(window, 'open')

    render(<ConnectButton />)

    await fireEvent.click(screen.getByText('Connect'))

    expect(window.open).toHaveBeenCalled()
  })
})
