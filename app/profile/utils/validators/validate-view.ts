import { View } from '@app/profile/enums'

function isView(value: string): value is View {
  return Object.values(View).includes(value as View)
}

export function validateView(view?: string | string[] | null) {
  if (typeof view === 'string' && isView(view)) return view

  return View.CARD
}
