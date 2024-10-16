export const baseBeforeParamFactory = (currentDate: Date) =>
  new Date(
    currentDate.getTime() -
      currentDate.getHours() * 1000 * 60 * 60 -
      currentDate.getMinutes() * 1000 * 60 -
      currentDate.getSeconds() * 1000 -
      currentDate.getMilliseconds()
  ).toISOString()
