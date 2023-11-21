import { getViewFromSearchParams, isView, validateView } from './view'

import { SearchParams, View } from '@common/types'

describe('(Utils) - View', () => {
  const view = View.CARD
  const invalid = 'invalid'

  describe('isView', () => {
    it('should return true when value is a View', () => {
      expect(isView(view)).toBeTruthy()
    })

    it('should return false when value is not a View', () => {
      expect(isView(invalid)).toBeFalsy()
    })
  })

  describe('validateView', () => {
    it('should return view when view is a View', () => {
      expect(validateView(view)).toEqual(view)
    })

    it('should return View.CARD when view is not a View', () => {
      expect(validateView(invalid)).toEqual(View.CARD)
    })
  })

  describe('getViewFromSearchParams', () => {
    const searchParamsMock: SearchParams = {}

    beforeEach(() => {
      searchParamsMock[View.CARD] = view
    })

    it('should return view when view is a View', () => {
      expect(getViewFromSearchParams(searchParamsMock)).toEqual(view)
    })
  })
})
