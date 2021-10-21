import { useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router'
import styled, { css } from 'styled-components'
import { Home } from './page/Home'
import { Authorized } from './page/Authorized'
import { Login } from './page/Login'
import { Playlists } from './page/Playlists'
import { Playlist } from './page/Playlist'
import { Artists } from './page/Artists'
import { NotFound } from './page/NotFound'
import { CreatePlaylist } from './page/CreatePlaylist'
import { useGetUserInfo } from './api'
import { Nav } from './components/Nav'
import { theme, media } from './styles'

const offsetNav = css`
  padding-left: ${theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 100px;
  `};
`
const SiteWrapper = styled.div`
  ${({ show }) => show && offsetNav}
`

export const App = () => {
  const [token, setToken] = useState('')
  let location = useLocation()
  const isLoginPage = location.pathname === '/login'

  const { userInfo, playlists, topArtists, loading, error, setLastFetchedAt } =
    useGetUserInfo(token)

  return (
    <>
      {!isLoginPage && <Nav />}
      <SiteWrapper show={!isLoginPage}>
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
          <Route exact={true} path="/login">
            <Login />
          </Route>
          <Route exact={true} path="/authorized">
            <Authorized setToken={setToken} />
          </Route>
          <Route exact={true} path="/create-playlist">
            {token ? (
              <CreatePlaylist
                token={token}
                setToken={setToken}
                userInfo={userInfo}
                topArtists={topArtists}
                pageLoading={loading}
                pageError={error}
                setLastFetchedAt={setLastFetchedAt}
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
