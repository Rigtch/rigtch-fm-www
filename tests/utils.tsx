import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement } from 'react'

export const queryClientWrapper = ({
  children,
}: {
  children: ReactElement
}) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
