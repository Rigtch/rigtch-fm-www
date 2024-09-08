import type {
  NameType,
  Payload,
} from 'recharts/types/component/DefaultTooltipContent'
import type { ValueType } from 'tailwindcss/types/config'
import type { MockProxy } from 'vitest-mock-extended'
import { mock } from 'vitest-mock-extended'
import { render } from '@testing-library/react'

import { chartTooltipContentFormatter } from './chart-tooltip-content-formatter'

import { StatsMeasurement } from '@app/api/enums'

type ItemPayload = Payload<ValueType, NameType>

function TestComponent({
  measurement,
  value,
  item,
}: {
  measurement: StatsMeasurement
  value: number
  item: ItemPayload
}) {
  return chartTooltipContentFormatter(measurement)(value, item.name!, item, 0, [
    item,
  ])
}

describe('chartTooltipContentFormatter', () => {
  const itemName = 'item-name'

  let itemMock: MockProxy<ItemPayload>

  beforeEach(() => {
    itemMock = mock<ItemPayload>({
      name: itemName,
    })
  })

  test('should return formatted tooltip content with measurement plays', () => {
    const view = render(
      <TestComponent
        measurement={StatsMeasurement.PLAYS}
        value={100}
        item={itemMock}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should return formatted tooltip content with measurement playTime', () => {
    const view = render(
      <TestComponent
        measurement={StatsMeasurement.PLAY_TIME}
        value={1000 * 60 * 60 * 4}
        item={itemMock}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should return formatted tooltip content with color', () => {
    itemMock.color = '#000000'

    const view = render(
      <TestComponent
        measurement={StatsMeasurement.PLAYS}
        value={100}
        item={itemMock}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should return formatted tooltip content with fill', () => {
    itemMock.payload.fill = '#000000'

    const view = render(
      <TestComponent
        measurement={StatsMeasurement.PLAYS}
        value={100}
        item={itemMock}
      />
    )

    expect(view).toMatchSnapshot()
  })
})
