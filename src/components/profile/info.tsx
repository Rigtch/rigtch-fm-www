import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Menu } from 'primereact/menu'
import { useRef } from 'react'
// eslint-disable-next-line import/no-unresolved
import { MenuItem } from 'primereact/menuitem'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'

import { ConnectButton } from '../connect'

import { useProfileQuery } from '@hooks/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'
import { getImage } from '@utils/get-image'

export function ProfileInfo() {
  const { data } = useProfileQuery()
  const queryClient = useQueryClient()
  const [, , removeCookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN])
  const router = useRouter()
  const menu = useRef<Menu>(null)
  const toast = useRef<Toast>(null)

  if (!data) return <ConnectButton />

  const { displayName, href, images } = data

  const image = getImage(images)

  async function disconnect() {
    removeCookies(ACCESS_TOKEN)
    removeCookies(REFRESH_TOKEN)

    queryClient.clear()

    router.push('/')
  }

  const menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => router.push('/profile'),
    },
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
    {
      separator: true,
    },
    {
      template: () => (
        <div className="align-items-center flex gap-2 px-4 py-1">
          <Avatar
            image={image}
            shape="circle"
            label={displayName.slice(0, 1)}
            className="border-circle"
          />

          <p className="m-0 text-xl font-medium text-white md:block">
            {displayName}
          </p>
        </div>
      ),
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
        <p className="m-0 hidden text-xl font-medium text-white md:block">
          {displayName}
        </p>

        <Avatar
          image={image}
          shape="circle"
          size="large"
          label={displayName.slice(0, 1)}
          className="border-circle"
        />
      </Button>
    </div>
  )
}
