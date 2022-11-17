import { useState, useEffect } from 'react'
import shuffle from 'shuffle-array'
import {
  fetchPlaylists,
  fetchUserInfo,
  fetchTopArtists,
  fetchAllTracks,
  fetchTracksFromAlbum,
  fetchArtistTopTracks,
  createEmptyPlaylist,
  addTracksToPlaylist,
} from './fetcher'

export const useGetUserInfo = (accessToken, setError) => {
  const [userInfo, setUserInfo] = useState({})
  const [topArtists, setTopArtists] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastFetchedAt, setLastFetchedAt] = useState(Date.now())

  useEffect(() => {
    if (!accessToken) return

    setLoading(true)

    const allUserInfos = [
      fetchUserInfo(accessToken),
      fetchPlaylists(accessToken),
      fetchTopArtists(accessToken),
    ]

    Promise.all(allUserInfos)
      .then((res) => {
        setUserInfo(res[0])
        setPlaylists(res[1])
        setTopArtists(res[2])
      })
      .catch((err) => setError(err))
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
      const calls = artistIds.map((id) => fetchAllTracks(id, accessToken))

      const data = await Promise.all(calls).catch((err) => {
        setLoading(false)
        setError(err)
      })

      const albumsIds = data
        .map((d) => d.items)
        .map((a) => {
          return a.map((i) => i.id)
        })

      // get tracks from albums (make sure they are playable and remove duplicates)
      const tracksCalls = albumsIds.map((arr) =>
        arr.map((id) => fetchTracksFromAlbum(id, userCountry, accessToken))
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
              setError(err)
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
      const calls = artistIds.map((id) =>
        fetchArtistTopTracks(id, userCountry, accessToken)
      )

      const tracksIds = await Promise.all(calls)
        .then((data) => {
          return data.flatMap((i) => i.tracks).map((i) => i.uri)
        })
        .catch((err) => {
          setLoading(false)
          setError(err)
        })

      return tracksIds
    }

    // create a empty playlist
    const playlist = await createEmptyPlaylist(
      userId,
      name,
      description,
      accessToken
    )
      .then((res) => {
        setResponse(res.data)
        return res.data
      })
      .catch((err) => {
        setLoading(false)
        setError(err)
      })

    // add tracks to playlist
    const getUris = async () =>
      tracksType === 'top' ? await getTopTracks() : await getAlltracks()

    addTracksToPlaylist(playlist.id, await getUris(), accessToken).catch(
      (err) => {
        setLoading(false)
        setError(err)
      }
    )

    setLastFetchedAt(Date.now())
    setLoading(false)
  }

  return { createPlaylist, response, loading }
}
