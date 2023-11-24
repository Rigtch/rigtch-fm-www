import { VIEW } from '@app/constants'
import { SearchParams, View } from '@app/types'

export function isView(value: string): value is View {
  return Object.values(View).includes(value as View)
}

export function validateView(view?: string | string[] | null) {
  if (typeof view === 'string' && isView(view)) return view

  return View.CARD
}

export function getViewFromSearchParams(searchParams: SearchParams) {
  const view = searchParams[VIEW]

  return validateView(view)
}
