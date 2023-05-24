import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Menu } from 'primereact/menu'
import { useRef } from 'react'
import { MenuItem } from 'primereact/menuitem'

import { useAuth } from '~/hooks/auth'

export function ProfileInfo() {
  const { profile, getProfileImage, disconnect } = useAuth()

  const menu = useRef<Menu>(null)
  const toast = useRef<Toast>(null)

  const menuItems: MenuItem[] = [
    {
      label: 'Disconnect',
      icon: 'pi pi-sign-out',
      command: disconnect,
    },
    {
      label: 'Spotify',
      icon: 'pi pi-external-link',
      command: () => window.open(profile?.href, '_blank'),
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
        <p className="text-xl font-medium text-white m-0">
          {profile?.displayName}
        </p>

        <Avatar image={getProfileImage()} shape="circle" size="large" />
      </Button>
    </div>
  )
}
