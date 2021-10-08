import { useHistory, useParams } from 'react-router'

export const Playlist = ({ token }) => {
  let history = useHistory()
  let { id } = useParams()
  if (!token) {
    history.push('/login')
  }
  return <h1>Playlist n° {id}</h1>
}
