import { render } from '@testing-library/react'

import { ItemsListElement } from './element'

import { idMock } from '@tests/mocks'
import { trackNameMock } from '@tests/mocks/track'
import { getImage } from '@app/utils/get-image'
import { imagesMock } from '@tests/mocks/images'
import { artistsMock } from '@tests/mocks/artist'

describe('ItemsListElement', () => {
  test('should match snapshot', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        image={getImage(imagesMock)}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with position', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        image={getImage(imagesMock)}
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
        image={getImage(imagesMock)}
        artists={artistsMock}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with playedAt', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        image={getImage(imagesMock)}
        playedAt="2022-01-01"
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as entity', () => {
    const view = render(
      <ItemsListElement
        id={idMock}
        name={trackNameMock}
        image={getImage(imagesMock)}
        externalId="4ynKJK9w2Dv2y0Qy0ggj2w"
      />
    )

    expect(view).toMatchSnapshot()
  })
})
