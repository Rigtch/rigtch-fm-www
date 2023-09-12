import Image from 'next/image'
import { Button, Navbar, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/router'

import { ProfileInfo } from './profile'

import { rigtchLogo } from '@assets/images'

export function NavigationBar() {
  const router = useRouter()

  return (
    // <header className="rounded-sm justify-between z-5 sticky top-0 flex px-4 py-2 w-full">
    //   <Button
    //     variant="text"
    //     onClick={() => router.push('/')}
    //     className="items-center flex gap-4"
    //   >
    //     <Image
    //       src={rigtchLogo}
    //       alt="Rigtch"
    //       width={42}
    //       className="border-round-sm"
    //     />

    //     <p className="!m-0 text-xl font-normal text-white">Rigtch Music</p>
    //   </Button>

    //   <nav className="align-items-center flex gap-2">
    //     {/* <ProfileInfo /> */}
    //   </nav>
    // </header>
    <Navbar color="gray" className="bg-gray-800">
      <div className="flex gap-4 items-center">
        <Image
          src={rigtchLogo}
          alt="Rigtch"
          width={42}
          className="rounded-sm"
        />

        <Typography variant="h5">Rigtch Music</Typography>
      </div>

      <ProfileInfo />
    </Navbar>
  )
}
