import { fireEvent, render, screen } from '@testing-library/react'

import { PlaybackStateToggleButton } from './state-toggle-button'

describe('PlaybackStateToggleButton', () => {
  const toggleStateMock = vi.fn()

  test('should render with props', () => {
    render(
      <PlaybackStateToggleButton
        toggleState={toggleStateMock}
        isPlaying={true}
        isDeviceAvailable={true}
      />
    )

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  test('should render with `isPlaying=false`', () => {
    render(
      <PlaybackStateToggleButton
        toggleState={toggleStateMock}
        isPlaying={false}
        isDeviceAvailable={true}
      />
    )

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('svg')).toHaveClass('ml-[1px]')
  })

  test('should be disabled if no available device', () => {
    render(
      <PlaybackStateToggleButton
        toggleState={toggleStateMock}
        isPlaying={false}
        isDeviceAvailable={false}
      />
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should call `toggleState` on click', () => {
    render(
      <PlaybackStateToggleButton
        toggleState={toggleStateMock}
        isPlaying={false}
        isDeviceAvailable={true}
      />
    )

    fireEvent.click(screen.getByRole('button'))

    expect(toggleStateMock).toHaveBeenCalled()
  })
})
