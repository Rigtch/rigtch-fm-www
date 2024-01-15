import { cookies } from 'next/headers'

import './globals.css'

import { RootProviders } from './providers'
import { NavigationBar } from './components/navigation'
import { getUser } from './api/fetchers'
import { ACCESS_TOKEN } from './api/constants'
import { LayoutProps } from './types'
import { Profile } from './api/types'
import { Footer } from './components/footer'
import { USER_ID } from './constants'

export const metadata = {
  title: 'rigtch.fm',
  description:
    'rigtch.fm is focused on displaying your all-time statistics such as favorite artists, most listened songs etc.',
}

export default async function RootLayout({ children }: LayoutProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value
  const userId = cookies().get(USER_ID)?.value

  let profile: Profile | undefined

  try {
    if (userId && accessToken)
      profile = await getUser(accessToken, { userId }).then(
        ({ profile }) => profile
      )
  } catch {
    profile = undefined
  }

  return (
    <html lang="en">
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#0e1315" />

      <link rel="manifest" href="/site.webmanifest" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9400d5" />

      <body className="bg-background text-white">
        <RootProviders>
          <div className="flex flex-col justify-between min-h-screen">
            <NavigationBar profile={profile} />

            <div>{children}</div>

            <Footer />
          </div>
        </RootProviders>
      </body>
    </html>
  )
}
