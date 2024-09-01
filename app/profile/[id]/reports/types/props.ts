import type { ProfilePageProps } from '@app/profile/types'

export interface ProfileReportsPageProps
  extends Omit<ProfilePageProps, 'searchParams'> {
  searchParams: {
    before?: string | null
    after?: string | null
  } & Pick<ProfilePageProps['searchParams'], 'stats-measurement'>
}
