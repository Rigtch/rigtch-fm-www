export function getCursors() {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  const weekDayRaw = new Date().getDay()
  const weekDay = weekDayRaw === 0 ? 7 : weekDayRaw
  const todayDate = new Date(year, month - 1, day)

  const before = new Date(
    todayDate.getTime() - 1000 * 60 * 60 * 24 * (weekDay - 1)
  )
  const after = new Date(
    todayDate.getTime() - 1000 * 60 * 60 * 24 * (weekDay + 6)
  )

  return {
    before,
    after,
  }
}
