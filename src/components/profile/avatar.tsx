import { Avatar, AvatarProps } from 'primereact/avatar'

export function ProfileAvatar({ ...props }: AvatarProps) {
  return <Avatar shape="circle" className="border-circle" {...props} />
}
