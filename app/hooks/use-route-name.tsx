import { usePathname } from 'next/navigation'

export function useRouteName() {
  const pathname = usePathname()
  const paths = pathname.split('/')

  if (paths.length > 3) return `-${paths[4]}`
  return ''
}
