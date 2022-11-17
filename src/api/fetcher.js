import axios from 'axios'
import { getHeaders } from '../helpers'

export const fetchUserInfo = (token) =>
  axios({
    url: 'https://api.spotify.com/v1/me',
    method: 'GET',
    headers: getHeaders(token),
  }).then((res) => res.data)

export const fetchPlaylists = (token) =>
  axios({
    url: `https://api.spotify.com/v1/me/playlists`,
    method: 'GET',
    headers: getHeaders(token),
  }).then((res) => res.data.items)

export const fetchTopArtists = (token) =>
  axios({
    url: `https://api.spotify.com/v1/me/top/artists?time_range=long_term`,
    method: 'GET',
    headers: getHeaders(token),
  }).then((res) => res.data.items)

export const fetchAllTracks = (artistId, token) =>
  axios
    .get(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`,
      {
        headers: getHeaders(token),
      }
    )
    .then((res) => res.data)

export const fetchTracksFromAlbum = (albumId, userCountry, token) =>
  axios
    .get(
      `https://api.spotify.com/v1/albums/${albumId}/tracks?market=${userCountry}`,
      {
        headers: getHeaders(token),
      }
    )
    .then((res) => res.data.items)

export const fetchArtistTopTracks = (artistId, userCountry, token) =>
  axios
    .get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${userCountry}`,
      {
        headers: getHeaders(token),
      }
    )
    .then((res) => res.data)

export const createEmptyPlaylist = (userId, name, description, token) =>
  axios({
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    method: 'POST',
    headers: getHeaders(token),
    data: { name, description },
  })

export const addTracksToPlaylist = (playlistId, uris, token) =>
  axios({
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    method: 'POST',
    headers: getHeaders(token),
    data: { uris },
  })
