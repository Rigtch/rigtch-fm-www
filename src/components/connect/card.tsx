import Image from 'next/image'

import { ConnectButton } from './button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'

export function ConnectCard() {
  return (
    <Card className="bg-neutral-800 w-full md:w-[400px]">
      <div className="w-full h-2 bg-neutral-700 rounded-t-xl" />

      <CardHeader>
        <CardTitle className="text-3xl">Connect to spotify</CardTitle>

        <CardDescription className="text-xl">
          With just one press of a button you&apos;ll see your top artists,
          favorite songs and so on
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 justify-center items-center pb-4">
        <Image
          src="/spotify-icon-green.png"
          alt={'spotify logo'}
          width={200}
          height={200}
        />

        <ConnectButton />
      </CardContent>
    </Card>
  )
}
