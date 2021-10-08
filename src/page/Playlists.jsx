import { useHistory } from 'react-router'

export const Playlists = ({ token }) => {
  let history = useHistory()
  if (!token) {
    history.push('/login')
  }
  return <h1>Playlists</h1>
}
