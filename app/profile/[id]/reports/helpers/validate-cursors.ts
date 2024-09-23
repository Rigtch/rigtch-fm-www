import type { ReportsCursors } from '../types/reports-cursors'

export function validateCursors(
  beforeParam?: string | null,
  afterParam?: string | null
): ReportsCursors {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  const weekDayRaw = new Date().getDay()
  const weekDay = weekDayRaw === 0 ? 7 : weekDayRaw
  const date = new Date(year, month - 1, day)

  const before = beforeParam
    ? new Date(beforeParam)
    : new Date(date.getTime() - 1000 * 60 * 60 * 24 * (weekDay - 1))
  const after = afterParam
    ? new Date(afterParam)
    : new Date(date.getTime() - 1000 * 60 * 60 * 24 * (weekDay + 6))

  return {
    before,
    after,
  }
}
