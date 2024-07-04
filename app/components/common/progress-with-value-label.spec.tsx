import { render } from '@testing-library/react'

import { ProgressWithValueLabel } from './progress-with-value-label'

describe('ProgressWithValueLabel', () => {
  test('should match snapshot', () => {
    const view = render(
      <ProgressWithValueLabel value={48} max={100} label="1 play" />
    )

    expect(view).toMatchSnapshot()
  })
})
