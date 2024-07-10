import { validateView } from './validate-view'

import { View } from '@app/profile/enums'

describe('validateView', () => {
  const view = View.CARD
  const invalid = 'invalid'

  test('should return view when view is a View', () => {
    expect(validateView(view)).toEqual(view)
  })

  test('should return View.CARD when view is not a View', () => {
    expect(validateView(invalid)).toEqual(View.CARD)
  })
})
