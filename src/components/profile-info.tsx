import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Menu } from 'primereact/menu'
import { useRef } from 'react'
import { MenuItem } from 'primereact/menuitem'

import { DisconnectButton } from './buttons'

import { useAuth } from '~/hooks/auth'

export function ProfileInfo() {
  const { profile, getProfileImage } = useAuth()

  const menu = useRef<Menu>(null)
  const toast = useRef<Toast>(null)

  const menuItems: MenuItem[] = [
    {
      template: () => (
        <DisconnectButton className="w-full justify-content-center" />
      ),
    },
    { separator: true },
    {
      template: () => (
        <Button
          className="w-full justify-content-center gap-2"
          severity="success"
          icon="pi pi-arrow-up-right"
          iconPos="right"
          onClick={() => window.open(profile?.href, '_blank')}
        >
          Spotify
        </Button>
      ),
    },
  ]

  return (
    <div>
      <Toast ref={toast} />
      <Menu model={menuItems} popup ref={menu} />

      <Button
        text
        severity="info"
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
