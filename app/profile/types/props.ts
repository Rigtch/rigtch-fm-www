import { USER_ID } from '@app/constants'
import { LayoutProps, PageProps } from '@app/types'

export interface ProfilePageProps extends PageProps {
  params: {
    [USER_ID]?: string
  }
}

export interface ProfileLayoutBaseProps extends LayoutProps {
  params: {
    [USER_ID]?: string
  }
}
