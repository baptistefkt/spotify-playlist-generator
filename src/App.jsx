import { useState } from 'react'
import { Route, Switch } from 'react-router'
import { useCookieState } from 'ahooks'
import { Home } from './page/Home'
import { Authorized } from './page/Authorized'
import { Login } from './page/Login'
import { Playlists } from './page/Playlists'
import { Playlist } from './page/Playlist'
import { Artists } from './page/Artists'
import { NotFound } from './page/NotFound'
import { CreatePlaylist } from './page/CreatePlaylist'
import { ONE_HOUR } from './constants'

export const App = () => {
  const [token, setToken] = useCookieState('access-token', {
    expires: ONE_HOUR,
    defaultValue: '',
  })
  const [userInfo, setUserInfo] = useState({})
  const [playlists, setPlaylists] = useState([])
  const [topArtists, setTopArtists] = useState([])

  return (
    <Switch>
      <Route exact={true} path="/">
        <Home
          token={token}
          setToken={setToken}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          playlists={playlists}
          setPlaylists={setPlaylists}
          topArtists={topArtists}
          setTopArtists={setTopArtists}
        />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/authorized">
        <Authorized setToken={setToken} />
      </Route>
      <Route path="/create-playlist">
        <CreatePlaylist
          token={token}
          userId={userInfo?.id || ''}
          topArtists={topArtists}
        />
      </Route>
      <Route exact={true} path="/playlist">
        <Playlists token={token} />
      </Route>
      <Route path="/playlist/:id">
        <Playlist token={token} />
      </Route>
      <Route path="/artists">
        <Artists token={token} />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  )
}
