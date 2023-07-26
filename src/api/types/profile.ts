import { Image } from './image'

export interface Profile {
  id: string
  displayName: string
  email: string
  images: Image[] | []
  country: string
  href: string
  followers: number
}
