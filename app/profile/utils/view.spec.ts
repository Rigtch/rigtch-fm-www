import { isView, validateView } from './view'

import { View } from '@app/types'

describe('View', () => {
  const view = View.CARD
  const invalid = 'invalid'

  describe('isView', () => {
    test('should return true when value is a View', () => {
      expect(isView(view)).toBeTruthy()
    })

    test('should return false when value is not a View', () => {
      expect(isView(invalid)).toBeFalsy()
    })
  })

  describe('validateView', () => {
    test('should return view when view is a View', () => {
      expect(validateView(view)).toEqual(view)
    })

    test('should return View.CARD when view is not a View', () => {
      expect(validateView(invalid)).toEqual(View.CARD)
    })
  })
})
