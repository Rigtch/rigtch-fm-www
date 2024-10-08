import type { SimplifiedUser, User } from './user'

export interface UserFollowers extends Pick<User, 'id'> {
  followers: SimplifiedUser[]
}
