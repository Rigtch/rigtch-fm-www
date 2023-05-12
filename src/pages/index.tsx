import { gql, useQuery } from '@apollo/client'
import { useCookies } from 'react-cookie'

import { API_URL } from '~/config'

const QUERY = gql`
  query profile {
    profile {
      displayName
      images {
        url
      }
      href
    }
  }
`

export default function Home() {
  const [cookie] = useCookies(['access-token', 'refresh-token'])
  const { data, loading, error } = useQuery(QUERY, {
    context: {
      headers: {
        Cookie: `access-token=${cookie['access-token']}; refresh-token=${cookie['refresh-token']}`,
      },
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) console.error(error)

  return (
    <main>
      <a href={`${API_URL}/auth/login`}>connect</a>
      {data && (
        <>
          <h1>{data.profile.displayName}</h1>
          <p>{data.profile.href}</p>
        </>
      )}
    </main>
  )
}
