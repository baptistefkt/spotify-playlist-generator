import { Link, useHistory } from 'react-router-dom'
import { useGetPlaylists, useGetTopArtists, useGetUserInfo } from '../api'

export const Home = ({
  token,
  setToken,
  userInfo,
  setUserInfo,
  playlists,
  setPlaylists,
  topArtists,
  setTopArtists,
}) => {
  const { userLoading, userError } = useGetUserInfo(token, setUserInfo)
  const { playlistLoading, playlistError } = useGetPlaylists(
    token,
    setPlaylists
  )

  const { loading: topArtistsLoading, error: topArtistsError } =
    useGetTopArtists(token, setTopArtists)

  let history = useHistory()

  const loading = userLoading || playlistLoading || topArtistsLoading
  const error = userError || playlistError || topArtistsError

  if (!token) {
    history.push('/login')
  }

  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div>Oops, something went wrong...</div>}
      {!loading && !error && (
        <>
          <button onClick={() => setToken(null)}>LOGOUT</button>
          <div>{userInfo?.display_name}</div>
          <Link to="/create-playlist">Create New Playlist</Link>
        </>
      )}
      {playlists && (
        <>
          <div>Playlists:</div>
          <ul>
            {playlists?.map((i) => {
              return <li key={i.id}>{i.name}</li>
            })}
          </ul>
        </>
      )}
      {topArtists && (
        <>
          <div>Top Artists:</div>
          <ul>
            {topArtists?.map((i) => {
              return <li key={i.id}>{i.name}</li>
            })}
          </ul>
        </>
      )}
    </>
  )
}
