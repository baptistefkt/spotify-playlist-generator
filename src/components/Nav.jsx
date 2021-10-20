import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AddOutline, Home } from '@styled-icons/zondicons'

import styled, { css } from 'styled-components/macro'
import { theme, mixins, media } from '../styles'
import spotifyLogo from '../assets/spotifyGreen.png'
import { GithubIcon } from './GithubIcon'

const { colors } = theme

const Container = styled.nav`
  ${mixins.coverShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: ${theme.navWidth};
  background-color: ${colors.navBlack};
  text-align: center;
  z-index: 99;
  ${media.tablet`
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: ${theme.navHeight};
    height: ${theme.navHeight};
    flex-direction: row;
  `};
  & > * {
    width: 100%;
    ${media.tablet`
      height: 100%;
    `};
  }
`

const Logo = styled.div`
  color: ${colors.green};
  margin-top: 30px;
  width: 50px;
  height: 50px;
  transition: ${theme.transition};
  ${media.tablet`
    display: none;
  `};
  &:hover,
  &:focus {
    opacity: 0.9;
  }
`

const Github = styled.div`
  width: 45px;
  height: 45px;
  margin-bottom: 30px;
  ${media.tablet`
    display: none;
  `};
  a {
    &:hover,
    &:focus {
      color: ${colors.blue};
      svg {
        fill: ${colors.lightestGrey};
      }
    }
    svg {
      width: 30px;
      fill: ${colors.lightGrey};
    }
  }
`

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  ${media.tablet`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  `};
`

const activeStyle = css`
  color: ${colors.white};
  background-color: ${colors.black};
  border-left: 5px solid ${colors.offGreen};
  ${media.tablet`
    border-left: 0;
    border-top: 3px solid ${colors.offGreen};
  `};
`

const MenuItem = styled.li`
  color: ${colors.lightGrey};
  font-size: 11px;
  ${media.tablet`
    flex-grow: 1;
    flex-basis: 100%;
    height: 100%;
  `};
  a {
    display: block;
    padding: 15px 0;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;
    ${media.tablet`
      ${mixins.flexCenter};
      flex-direction: column;
      padding: 0;
      border-left: 0;
      border-top: 3px solid transparent;
    `};
    &:hover,
    &:focus {
      ${activeStyle}
    }
    ${({ selected }) => selected && activeStyle}
  }
  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 7px;
  }
`

export const Nav = () => {
  const [isActive, setIsActive] = useState(0)
  let location = useLocation()

  useEffect(() => {
    setIsActive(location.pathname)
  }, [location])

  return (
    <Container>
      <Logo>
        <Link to="/" className={''}>
          <img src={spotifyLogo} alt="spotify logo" />
        </Link>
      </Logo>
      <Menu>
        <MenuItem selected={isActive === '/'}>
          <Link to="/">
            <Home />
            <div>Home</div>
          </Link>
        </MenuItem>
        <MenuItem selected={isActive === '/create-playlist'}>
          <Link to="/create-playlist">
            <AddOutline />
            <div>New Playlist</div>
          </Link>
        </MenuItem>
        {/* <MenuItem selected={isActive === '/playlist'}>
          <Link to="/playlist">
            <MusicPlaylist />
            <div>Playlists</div>
          </Link>
        </MenuItem> */}
      </Menu>
      <Github>
        <a
          href="https://github.com/baptistefkt/spotify-playlist-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </Github>
    </Container>
  )
}
