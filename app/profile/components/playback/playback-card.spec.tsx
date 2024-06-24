import { render } from '@testing-library/react'
import { mock } from 'vitest-mock-extended'

import { PlaybackCard } from './playback-card'

import type { Device } from '@app/api/types'
import { trackMock } from '@tests/mocks/track'

describe('PlaybackCard', () => {
  test('should match snapshot as resumed', () => {
    const view = render(
      <PlaybackCard
        isPlaying={true}
        isPlayingOptimistic={true}
        device={mock<Device>()}
        handleToggleState={() => Promise.resolve()}
        userId="1"
        routeUserId="1"
        track={trackMock}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as paused', () => {
    const view = render(
      <PlaybackCard
        isPlaying={false}
        isPlayingOptimistic={false}
        device={mock<Device>()}
        handleToggleState={() => Promise.resolve()}
        userId="1"
        routeUserId="1"
        track={trackMock}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as optimistically resumed', () => {
    const view = render(
      <PlaybackCard
        isPlaying={false}
        isPlayingOptimistic={true}
        device={mock<Device>()}
        handleToggleState={() => Promise.resolve()}
        userId="1"
        routeUserId="1"
        track={trackMock}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as optimistically paused', () => {
    const view = render(
      <PlaybackCard
        isPlaying={true}
        isPlayingOptimistic={false}
        device={undefined}
        handleToggleState={() => Promise.resolve()}
        userId="1"
        routeUserId="2"
        track={trackMock}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as disabled', () => {
    const view = render(
      <PlaybackCard
        isPlaying={true}
        isPlayingOptimistic={false}
        device={undefined}
        handleToggleState={() => Promise.resolve()}
        userId="1"
        routeUserId="2"
        track={trackMock}
      />
    )

    expect(view).toMatchSnapshot()
  })
})
