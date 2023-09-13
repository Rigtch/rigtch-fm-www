import Image from 'next/image'
import { Button } from 'primereact/button'
// eslint-disable-next-line import/no-unresolved
import { MenuItem } from 'primereact/menuitem'
import { Menubar } from 'primereact/menubar'
import { useRouter } from 'next/router'

import { ProfileInfo } from './profile'

import { rigtchLogo } from '@assets/images'

export function NavigationBar() {
  const router = useRouter()

  const menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: () => router.push('/profile'),
        },
        {
          separator: true,
        },
        {
          label: 'Top Artists',
          icon: 'pi pi-star',
          command: () => router.push('/profile/top-artists'),
        },
        {
          label: 'Top Tracks',
          icon: 'pi pi-star',
          command: () => router.push('/profile/top-tracks'),
        },
        {
          label: 'Last Tracks',
          icon: 'pi pi-clock',
          command: () => router.push('/profile/last-tracks'),
        },
      ],
    },
  ]

  return (
    <header className="surface-ground border-round-sm justify-content-between z-5 sticky top-0 flex p-1">
      <Menubar
        className="w-full"
        model={menuItems}
        pt={{
          end: {
            style: {
              marginLeft: '8px',
            },
          },
          menu: {
            style: {
              marginLeft: 'auto',
            },
          },
        }}
        start={
          <Button
            text
            severity="help"
            onClick={() => router.push('/')}
            className="align-items-center flex gap-4"
          >
            <Image
              src={rigtchLogo}
              alt="Rigtch"
              width={42}
              className="border-round-sm"
            />

            <p className="!m-0 text-xl font-normal text-white">Rigtch Music</p>
          </Button>
        }
        end={<ProfileInfo />}
      />
    </header>
  )
}
