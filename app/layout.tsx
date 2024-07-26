import './styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'

import { USER_ACCEPT_COOKIES, USER_ID } from './constants'
import { auth } from './auth'
import { CookiesDialog } from './components/cookies-dialog'
import { Footer } from './components/footer'
import { NavigationBar } from './components/navigation'
import { Toaster } from './components/ui/toaster'
import { RootProviders } from './providers'
import type { LayoutProps } from './types'

export const viewport: Viewport = {
  themeColor: '#0e1315',
}

export const metadata: Metadata = {
  title: {
    default: 'rigtch.fm',
    template: '%s | rigtch.fm',
  },
  description:
    'Real time spotify statistics calculation based on your listening history.',
  applicationName: 'rigtch.fm',
  authors: [
    {
      name: 'Rigtch',
      url: 'https://github.com/Rigtch',
    },
  ],
  creator: 'Rigtch',
  keywords: ['spotify', 'stats', 'statistics', 'analytics', 'music'],
  icons: [
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
      color: '#9400d5',
    },
  ],
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rigtch-fm.vercel.app',
    siteName: 'rigtch.fm',
    title: 'rigtch.fm',
    images: [
      {
        url: '/rigtch-icon.png',
        width: 1523,
        height: 1576,
        alt: 'rigtch.fm',
      },
    ],
  },
}

export default async function RootLayout({ children }: LayoutProps) {
  const isAccepted = cookies().has(USER_ACCEPT_COOKIES)
  const userId = cookies().get(USER_ID)?.value

  const session = await auth()

  return (
    <html lang="en">
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
