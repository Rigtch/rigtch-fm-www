import { Image } from '@api/types'

export const getImage = (images?: Image[], index = 0) =>
  images?.[index]?.url ?? ''
