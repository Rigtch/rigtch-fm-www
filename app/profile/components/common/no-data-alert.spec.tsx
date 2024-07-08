import { render } from '@testing-library/react'

import { NoDataAlert } from './no-data-alert'

describe('NoDataAlert', () => {
  test('should match snapshot', () => {
    const view = render(<NoDataAlert />)

    expect(view).toMatchSnapshot()
  })
})
