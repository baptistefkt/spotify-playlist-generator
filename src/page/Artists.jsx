import { useHistory } from 'react-router'

export const Artists = ({ token }) => {
  let history = useHistory()
  if (!token) {
    history.push('/login')
  }
  return <h1>Artists</h1>
}
