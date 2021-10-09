import { useState, useEffect } from 'react'
import axios from 'axios'
import { getHeaders } from '../helpers'

export const useGetUserInfo = (accessToken, setUserInfo) => {
  const [userLoading, setUserLoading] = useState(false)
  const [userError, setUserError] = useState(false)

  useEffect(() => {
    if (!accessToken) return
    setUserLoading(true)

    axios({
      url: 'https://api.spotify.com/v1/me',
      method: 'GET',
      headers: getHeaders(accessToken),
    })
      .then((res) => {
        setUserInfo(res.data)
      })
      .catch((err) => {
        console.log(err)
        setUserError(true)
      })
      .finally(() => setUserLoading(false))
  }, [accessToken])
  return { userLoading, userError }
}

export const useGetPlaylists = (accessToken, setPlaylists) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!accessToken) return
    setLoading(true)

    axios({
      url: `https://api.spotify.com/v1/me/playlists`,
      method: 'GET',
      headers: getHeaders(accessToken),
    })
      .then((res) => {
        setPlaylists(res.data.items)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [accessToken])
  return { playlistLoading: loading, playlistError: error }
}

export const useGetTopArtists = (accessToken, setTopArtists) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)

    axios({
      url: `https://api.spotify.com/v1/me/top/artists?time_range=long_term`,
      method: 'GET',
      headers: getHeaders(accessToken),
    })
      .then((res) => {
        setTopArtists(res.data.items)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])
  return { loading, error }
}

export const useCreatePlaylist = (accessToken, userId) => {
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const createPlaylist = async (name, description, artistIds) => {
    setLoading(true)

    const postData = {
      name,
      description,
    }

    // create a empty playlist
    const playlist = await axios({
      url: `https://api.spotify.com/v1/users/${userId}/playlists`,
      method: 'POST',
      headers: getHeaders(accessToken),
      data: postData,
    })
      .then((res) => {
        setResponse(res.data)
        return res.data
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })

    // get top tracks ids from artists
    const calls = await artistIds.map((id) =>
      axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=BE`,
        {
          headers: getHeaders(accessToken),
        }
      )
    )

    const tracks = await Promise.all(calls)
      .then((data) => {
        const tracks = data.flatMap((i) => i.data.tracks)
        const tracksIds = tracks.map((i) => i.uri)
        return tracksIds
      })
      .catch((err) => console.log(err))

    // add tracks to playlist
    await axios({
      url: `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
      method: 'POST',
      headers: getHeaders(accessToken),
      data: {
        uris: tracks,
      },
    }).then((res) => console.log(res.data))

    setLoading(false)
  }

  return { createPlaylist, response, loading, error }
}
