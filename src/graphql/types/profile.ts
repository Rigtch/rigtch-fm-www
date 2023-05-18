import { Image } from './image'

export interface ProfileQuery {
  profile: Profile
}

export interface Profile {
  id: string
  displayName: string
  images: Image[]
  followers: number
  country?: string
  email?: string
  href: string
}
