import { LayoutProps, PageProps } from '@app/types'

export interface ProfileTopSectionProps
  extends PageProps,
    Partial<LayoutProps> {
  limit?: number
}
