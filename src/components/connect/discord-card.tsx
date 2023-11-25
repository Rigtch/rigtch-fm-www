'use client'

import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Button } from '@components/ui/button'

export function DiscordCard() {
  return (
    <Card className="bg-neutral-800 w-full md:w-[400px]">
      <div className="w-full h-2 bg-neutral-700 rounded-t-xl" />

      <CardHeader>
        <CardTitle className="text-3xl">Join our community!</CardTitle>

        <CardDescription className="text-xl">
          Be up to date with all the latest news, updates and spend some time
          with our community
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 justify-center items-center pb-4">
        <Image
          src="/discord-icon.svg"
          alt={'discord logo'}
          width={200}
          height={200}
        />

        <Button
          className="bg-sky-600 text-white"
          onClick={() => window.open('https://discord.gg/ft9RUtyfZg')}
        >
          Join
        </Button>
      </CardContent>
    </Card>
  )
}
