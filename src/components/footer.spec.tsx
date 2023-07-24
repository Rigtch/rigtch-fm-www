import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Footer } from './footer'

describe('Footer', () => {
  test('should render footer', () => {
    render(<Footer />)

    expect(
      screen.getByText(
        `Rigtch ${new Date().getFullYear()} © All right reserved.`
      )
    ).toBeInTheDocument()
  })
})
