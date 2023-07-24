import { Mock, describe, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { fireEvent, render, screen } from '@testing-library/react'

import { PlaybackCard } from './card'

import { Device } from '@api/types'
import { usePlaybackStateContext } from '@context/playback-state'
import { albumMock, trackMock } from '@tests/mocks'

vi.mock('@context/playback-state')

describe('PlaybackCard', () => {
  const toggleStateMock = vi.fn()

  beforeEach(() => {
    ;(usePlaybackStateContext as Mock).mockReturnValue({
      isPlaying: true,
      toggleState: toggleStateMock,
      data: {
        device: mock<Device>(),
        track: trackMock,
        album: albumMock,
        albumImage: 'image',
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render playback card with data', () => {
    render(<PlaybackCard />)

    expect(screen.getByText('Track 1')).toBeInTheDocument()
    expect(screen.getByText('Artist 1')).toBeInTheDocument()
  })

  test('should render playback card without data', () => {
    ;(usePlaybackStateContext as Mock).mockReturnValue({
      isPlaying: false,
      toggleState: toggleStateMock,
      data: undefined,
    })

    render(<PlaybackCard />)

    expect(screen.queryByText('Track 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Artist 1')).not.toBeInTheDocument()
  })

  test('should toggle playback state', () => {
    render(<PlaybackCard />)

    fireEvent.click(screen.getByRole('button'))

    expect(toggleStateMock).toHaveBeenCalled()
  })
})
