import { useParams } from 'react-router'

export const Playlist = () => {
  let { id } = useParams()
  return <h1>Playlist n° {id}</h1>
}
