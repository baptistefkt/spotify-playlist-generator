import { Redirect, Route, Switch } from 'react-router'
import styled from 'styled-components'
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
import { useGetUserInfo } from './api'
import { Nav } from './components/Nav'
import { theme, media } from './styles'

export const App = () => {
  const [token, setToken] = useCookieState('access-token', {
    expires: ONE_HOUR,
    defaultValue: '',
  })

  const { userInfo, playlists, topArtists, loading, error } =
    useGetUserInfo(token)

  const SiteWrapper = styled.div`
    padding-left: ${theme.navWidth};
    ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
  `

  return (
    <>
      <Nav />
      <SiteWrapper>
        <Switch>
          <Route exact={true} path="/">
            {token ? (
              <Home
                setToken={setToken}
                userInfo={userInfo}
                playlists={playlists}
                topArtists={topArtists}
                pageLoading={loading}
                pageError={error}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/authorized">
            <Authorized setToken={setToken} />
          </Route>
          <Route path="/create-playlist">
            {token ? (
              <CreatePlaylist
                token={token}
                setToken={setToken}
                userInfo={userInfo}
                topArtists={topArtists}
                pageLoading={loading}
                pageError={error}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact={true} path="/playlist">
            {token ? <Playlists /> : <Redirect to="/login" />}
          </Route>
          <Route path="/playlist/:id">
            {token ? <Playlist /> : <Redirect to="/login" />}
          </Route>
          <Route path="/artists">
            <Artists token={token} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </SiteWrapper>
    </>
  )
}
