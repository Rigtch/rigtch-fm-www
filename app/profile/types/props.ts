import { USER_ID } from '@app/constants'
import { PageProps } from '@app/types'

export interface ProfilePageProps extends PageProps {
  params: {
    [USER_ID]?: string
  }
}
