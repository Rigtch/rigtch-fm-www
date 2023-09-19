import { Avatar, AvatarPassThroughOptions } from 'primereact/avatar'
import { CSSProperties } from 'react'

export interface AvatarComponentProps {
  image?: string
  size?: 'normal' | 'large' | 'xlarge'
  label?: string
  style?: CSSProperties
  pt?: AvatarPassThroughOptions
}

export function AvatarComponent({ ...props }: AvatarComponentProps) {
  return <Avatar shape="circle" className="border-circle" {...props} />
}
