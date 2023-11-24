import { render, screen } from '@testing-library/react'

import HomePage from './page'

describe('HomePage', () => {
  test('should render with connect button', () => {
    render(<HomePage />)

    expect(screen.getByText('Connect')).toBeInTheDocument()
  })
})
