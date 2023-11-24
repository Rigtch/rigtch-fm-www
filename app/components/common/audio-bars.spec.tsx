import { render, screen } from '@testing-library/react'

import { AudioBars } from './audio-bars'

describe('AudioBars', () => {
  test('should render', () => {
    render(<AudioBars isPlaying={false} />)

    expect(screen.getAllByRole('generic')[0]).toBeInTheDocument()
  })

  test('should render with `isPlaying`', () => {
    render(<AudioBars isPlaying />)

    expect(screen.getAllByRole('generic')[1]).toHaveClass('play')
  })
})
