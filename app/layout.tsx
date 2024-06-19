import { cookies } from 'next/headers'

import './styles/globals.css'

import { RootProviders } from './providers'
import { NavigationBar } from './components/navigation'
import { USER_ACCEPT_COOKIES } from './api/constants'
import type { LayoutProps } from './types'
import { Footer } from './components/footer'
import { CookiesDialog } from './components/cookies-dialog'
import { Toaster } from './components/ui/toaster'
import { auth } from './auth'
import { USER_ID } from './constants'

export const metadata = {
  title: 'rigtch.fm',
  description:
    'rigtch.fm is focused on displaying your all-time statistics such as favorite artists, most listened songs etc.',
}

export default async function RootLayout({ children }: LayoutProps) {
  const isAccepted = cookies().has(USER_ACCEPT_COOKIES)
  const userId = cookies().get(USER_ID)?.value

  const session = await auth()

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
        <RootProviders session={session!}>
          <div className="flex flex-col justify-between min-h-screen">
            <div>
              <NavigationBar user={session?.user} userId={userId} />

              <CookiesDialog isAccepted={isAccepted} />

              <div>{children}</div>
            </div>

            <Footer />

            <Toaster />
          </div>
        </RootProviders>
      </body>
    </html>
  )
}
