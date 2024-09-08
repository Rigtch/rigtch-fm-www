import type { ProfilePageProps } from '@app/profile/types'

export type ProfileReportsPageProps = Readonly<
  Omit<ProfilePageProps, 'searchParams'> & {
    searchParams: {
      before?: string | null
      after?: string | null
    } & Pick<ProfilePageProps['searchParams'], 'stats-measurement'>
  }
>
