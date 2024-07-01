import { render } from '@testing-library/react'

import { ItemHeaderSection } from './item-header-section'

import { imagesMock } from '@tests/mocks/images'
import { trackNameMock } from '@tests/mocks/track'
import { artistEntitiesMocks } from '@tests/mocks/artist'

describe('ItemHeaderSection', () => {
  test('should match snapshot with artists', () => {
    const view = render(
      <ItemHeaderSection
        name={trackNameMock}
        images={imagesMock}
        artists={artistEntitiesMocks}
        href=""
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with followers', () => {
    const view = render(
      <ItemHeaderSection
        name={trackNameMock}
        images={imagesMock}
        followers={100}
        href=""
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with children', () => {
    const view = render(
      <ItemHeaderSection
        name={trackNameMock}
        images={imagesMock}
        followers={100}
        href=""
      >
        <div>Children</div>
      </ItemHeaderSection>
    )

    expect(view).toMatchSnapshot()
  })
})
