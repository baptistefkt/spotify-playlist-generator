import { useState, useEffect } from 'react'
import axios from 'axios'
import shuffle from 'shuffle-array'
import { getHeaders } from '../helpers'

export const useGetUserInfo = (accessToken, setError) => {
  const [userInfo, setUserInfo] = useState({})
  const [topArtists, setTopArtists] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastFetchedAt, setLastFetchedAt] = useState(Date.now())

  useEffect(() => {
    if (!accessToken) return
    setLoading(true)

    axios({
      url: 'https://api.spotify.com/v1/me',
      method: 'GET',
      headers: getHeaders(accessToken),
    })
      .then((res) => {
        setUserInfo(res.data)
      })
      .then(() => {
        axios({
          url: `https://api.spotify.com/v1/me/playlists`,
          method: 'GET',
          headers: getHeaders(accessToken),
        })
          .then((res) => {
            setPlaylists(res.data.items)
          })
          .catch((err) => setError(err.response.data.error))
      })
      .then(() => {
        axios({
          url: `https://api.spotify.com/v1/me/top/artists?time_range=long_term`,
          method: 'GET',
          headers: getHeaders(accessToken),
        })
          .then((res) => {
            setTopArtists(res.data.items)
          })
          .catch((err) => setError(err.response.data.error))
      })
      .catch((err) => setError(err.response.data.error))
      .finally(() => setLoading(false))
  }, [accessToken, lastFetchedAt])
  return { userInfo, playlists, topArtists, loading, setLastFetchedAt }
}

export const useCreatePlaylist = (
  accessToken,
  userId,
  userCountry,
  setError,
  setLastFetchedAt
) => {
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)

  const createPlaylist = async (name, description, artistIds, tracksType) => {
    setLoading(true)

    const getAlltracks = async () => {
      // get albums from artists
      const calls = await artistIds.map((id) =>
        axios.get(
          `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single`,
          {
            headers: getHeaders(accessToken),
          }
        )
      )

      const data = await Promise.all(calls).catch((err) => {
        setLoading(false)
        setError(err.response.data.error)
      })

      const albumsIds = data
        .map((d) => d.data.items)
        .map((a) => {
          return a.map((i) => i.id)
        })

      // get tracks from albums (make sure they are playable and remove duplicates)
      const tracksCalls = albumsIds.map((arr) =>
        arr.map((id) =>
          axios
            .get(
              `https://api.spotify.com/v1/albums/${id}/tracks?market=${userCountry}`,
              {
                headers: getHeaders(accessToken),
              }
            )
            .then((res) => res.data.items)
        )
      )

      let allTracksIds = []
      for (let tracksCall of tracksCalls) {
        allTracksIds.push(
          await Promise.all(tracksCall)
            .then((responses) => {
              return responses.map((res) =>
                res.filter((r) => r.is_playable === true).map((r) => r.uri)
              )
            })
            .catch((err) => {
              setLoading(false)
              setError(err.response.data.error)
            })
        )
      }

      const sortedTracksIds = allTracksIds.flatMap((i) =>
        shuffle([...new Set(i.flat())]).slice(0, 10)
      )

      return sortedTracksIds
    }

    const getTopTracks = async () => {
      // get top tracks ids from artists
      const calls = await artistIds.map((id) =>
        axios.get(
          `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${userCountry}`,
          {
            headers: getHeaders(accessToken),
          }
        )
      )

      const tracksIds = await Promise.all(calls)
        .then((data) => {
          return data.flatMap((i) => i.data.tracks).map((i) => i.uri)
        })
        .catch((err) => {
          setLoading(false)
          setError(err.response.data.error)
        })

      return tracksIds
    }

    // create a empty playlist
    const playlist = await axios({
      url: `https://api.spotify.com/v1/users/${userId}/playlists`,
      method: 'POST',
      headers: getHeaders(accessToken),
      data: { name, description },
    })
      .then((res) => {
        setResponse(res.data)
        return res.data
      })
      .catch((err) => {
        setLoading(false)
        setError(err.response.data.error)
      })

    // add tracks to playlist
    await axios({
      url: `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
      method: 'POST',
      headers: getHeaders(accessToken),
      data: {
        uris:
          tracksType === 'top' ? await getTopTracks() : await getAlltracks(),
      },
    }).catch((err) => {
      setLoading(false)
      setError(err.response.data.error)
    })
    setLastFetchedAt(Date.now())
    setLoading(false)
  }

  return { createPlaylist, response, loading }
}
