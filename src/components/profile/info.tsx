import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import { Avatar, Button, Typography } from '@material-tailwind/react'

import { ConnectButton } from '../connect'

import { useProfileQuery } from '@hooks/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'
import { getImage } from '@utils/get-image'

export function ProfileInfo() {
  // const { data } = useProfileQuery()
  // const queryClient = useQueryClient()
  // const [, , removeCookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN])
  // const router = useRouter()

  return <ConnectButton />

  // const { displayName, href, images } = data

  // const image = getImage(images)

  // async function disconnect() {
  //   removeCookies(ACCESS_TOKEN)
  //   removeCookies(REFRESH_TOKEN)

  //   queryClient.clear()

  //   router.push('/')
  // }

  // const menuItems = [
  //   {
  //     label: 'Profile',
  //     icon: 'pi pi-user',
  //     items: [
  //       {
  //         label: 'Profile',
  //         icon: 'pi pi-user',
  //         command: () => router.push('/profile'),
  //       },
  //       {
  //         separator: true,
  //       },
  //       {
  //         label: 'Top Artists',
  //         icon: 'pi pi-star',
  //         command: () => router.push('/profile/top-artists'),
  //       },
  //       {
  //         label: 'Top Tracks',
  //         icon: 'pi pi-star',
  //         command: () => router.push('/profile/top-tracks'),
  //       },
  //       {
  //         label: 'Last Tracks',
  //         icon: 'pi pi-clock',
  //         command: () => router.push('/profile/last-tracks'),
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Disconnect',
  //     icon: 'pi pi-sign-out',
  //     command: disconnect,
  //   },
  //   {
  //     label: 'Open in Spotify',
  //     icon: 'pi pi-external-link',
  //     command: () => window.open(href, '_blank'),
  //   },
  //   {
  //     separator: true,
  //   },
  //   {
  //     template: () => (
  //       <div className="align-items-center flex gap-2 px-4 py-1">
  //         {/* <Avatar
  //           image={image}
  //           shape="circle"
  //           label={displayName.slice(0, 1)}
  //           className="border-circle"
  //         /> */}

  //         <p className="m-0 text-xl font-medium text-white md:block">
  //           {displayName}
  //         </p>
  //       </div>
  //     ),
  //   },
  // ]

  return (
    <div>
      {/* <Toast ref={toast} />
      <SlideMenu
        viewportHeight={230}
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
      </Button> */}
      <Button variant="text" color="blue">
        <Typography>{displayName}</Typography>

        <Avatar src={image} />
      </Button>
    </div>
  )
}
