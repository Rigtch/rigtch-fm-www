import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Menu } from 'primereact/menu'
import { useRef } from 'react'
import { MenuItem } from 'primereact/menuitem'

import { Profile } from '~/graphql'

export interface ProfileInfoProps
  extends Pick<Profile, 'displayName' | 'href'> {
  disconnect: () => void
  image: string
}

export function ProfileInfo({
  displayName,
  href,
  disconnect,
  image,
}: ProfileInfoProps) {
  const menu = useRef<Menu>(null)
  const toast = useRef<Toast>(null)

  const menuItems: MenuItem[] = [
    {
      label: 'Disconnect',
      icon: 'pi pi-sign-out',
      command: disconnect,
    },
    {
      label: 'Open in Spotify',
      icon: 'pi pi-external-link',
      command: () => window.open(href, '_blank'),
    },
  ]

  return (
    <div>
      <Toast ref={toast} />
      <Menu model={menuItems} popup ref={menu} />

      <Button
        text
        severity="help"
        className="gap-2"
        onClick={event => menu?.current?.toggle(event)}
      >
        <p className="m-0 text-xl font-medium text-white">{displayName}</p>

        <Avatar image={image} shape="circle" size="large" />
      </Button>
    </div>
  )
}
