import { render } from '@testing-library/react'

import { ItemsSection } from './items-section'

import { View } from '@app/types'
import { tracksMock } from '@tests/mocks/track'
import { artistEntitiesMocks } from '@tests/mocks/artist'

import '@tests/mocks/window'

describe('ItemsSection', () => {
  const title = 'Top Items'

  test('should match snapshot with view card', () => {
    const view = render(
      <ItemsSection view={View.CARD} title={title} items={tracksMock} />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with view list', () => {
    const view = render(
      <ItemsSection view={View.LIST} title={title} items={tracksMock} />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with view list and relative time', () => {
    const view = render(
      <ItemsSection
        view={View.LIST}
        title={title}
        items={tracksMock.map((item, index) => ({
          ...item,
          playedAt: new Date(Date.now() - index * 1000).toISOString(),
        }))}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as artists with view card', () => {
    const view = render(
      <ItemsSection
        view={View.CARD}
        title={title}
        items={artistEntitiesMocks}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with no data', () => {
    const view = render(
      <ItemsSection view={View.CARD} title={title} items={[]} />
    )

    expect(view).toMatchSnapshot()
  })
})
