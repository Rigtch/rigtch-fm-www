import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { SlideMenu } from 'primereact/slidemenu'
import { useRef } from 'react'
// eslint-disable-next-line import/no-unresolved
import { MenuItem } from 'primereact/menuitem'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'

import { ConnectButton } from '../connect'

import { useProfileQuery } from '@api/hooks'
import { getImage } from '@utils/get-image'
import { useAuthCookies } from '@hooks/use-auth-cookies'
import { AvatarComponent } from '@components/common/avatar'

export function ProfileInfo() {
  const { data } = useProfileQuery()
  const queryClient = useQueryClient()
  const { removeAuthCookies } = useAuthCookies()
  const router = useRouter()
  const menu = useRef<SlideMenu>(null)
  const toast = useRef<Toast>(null)

  if (!data)
    return (
      <div className="px-3">
        <ConnectButton />
      </div>
    )

  const { displayName, href, images } = data

  const image = getImage(images)

  async function disconnect() {
    removeAuthCookies()

    queryClient.clear()

    router.push('/')
  }

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
    {
      separator: true,
    },
    {
      template: () => (
        <div className="align-items-center flex gap-2 px-4 py-1">
          <AvatarComponent image={image} label={displayName.slice(0, 1)} />

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
      <SlideMenu
        viewportHeight={138}
        model={menuItems}
        popup
        ref={menu}
        pt={{
          content: {
            style: {
              overflowY: 'hidden',
            },
          },
        }}
      />

      <Button
        text
        severity="help"
        className="gap-2"
        onClick={event => menu.current?.toggle(event)}
      >
        <p className="m-0 hidden text-xl font-medium text-white md:block">
          {displayName}
        </p>

        <AvatarComponent
          image={image}
          size="large"
          label={displayName.slice(0, 1)}
        />
      </Button>
    </div>
  )
}
