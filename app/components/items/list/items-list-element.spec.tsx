import { render } from '@testing-library/react'

import {
  maxPlayTimeExample,
  maxPlaysExample,
  playTimeExample,
  playsExample,
} from '../examples'

import { ItemsListElement } from './items-list-element'

import { hrefMock, idMock } from '@tests/mocks'
import { trackNameMock } from '@tests/mocks/track'
import { imagesMock } from '@tests/mocks/images'
import { artistsMock } from '@tests/mocks/artist'

describe('ItemsListElement', () => {
  test('should match snapshot with position', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        images={imagesMock}
        href={hrefMock}
        position={1}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with artists', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        images={imagesMock}
        artists={artistsMock}
        href={hrefMock}
        position={1}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with playedAt', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        href={hrefMock}
        images={imagesMock}
        playedAt="2022-01-01"
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with plays', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        href={hrefMock}
        images={imagesMock}
        plays={playsExample}
        position={1}
        maxPlays={maxPlaysExample}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with playTime', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        href={hrefMock}
        images={imagesMock}
        playTime={playTimeExample}
        position={1}
        maxPlayTime={maxPlayTimeExample}
      />
    )

    expect(view).toMatchSnapshot()
  })
})
