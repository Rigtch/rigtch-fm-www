import { render } from '@testing-library/react'

import {
  maxPlaysExample,
  maxPlayTimeExample,
  playsExample,
  playtimeExample,
} from '../examples'

import { ItemsListElement } from './items-list-element'

import { genresMock, hrefMock, idMock } from '@tests/mocks'
import { albumMock } from '@tests/mocks/album'
import { artistsMock } from '@tests/mocks/artist'
import { imagesMock } from '@tests/mocks/images'
import { trackNameMock } from '@tests/mocks/track'

describe('ItemsListElement', () => {
  test('should match snapshot with position', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        images={imagesMock}
        genres={genresMock}
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
        genres={genresMock}
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
        genres={genresMock}
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
        genres={genresMock}
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
        playTime={playtimeExample}
        genres={genresMock}
        position={1}
        maxPlayTime={maxPlayTimeExample}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with genres', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        href={hrefMock}
        images={imagesMock}
        genres={genresMock}
        position={1}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with artists and albums', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        href={hrefMock}
        artists={artistsMock}
        album={albumMock}
        position={1}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with genres display length', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        href={hrefMock}
        images={imagesMock}
        genres={genresMock}
        position={1}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with different genres display length', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        href={hrefMock}
        images={imagesMock}
        genres={genresMock}
        genresDisplayLength={1}
        position={1}
      />
    )

    expect(view).toMatchSnapshot()
  })
})
