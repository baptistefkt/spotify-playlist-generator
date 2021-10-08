import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { useCreatePlaylist } from '../api'

export const CreatePlaylist = ({ token, userId, topArtists }) => {
  const [result, setResult] = useState([])
  const [input, setInput] = useState('')
  const [selectedArtists, setSelectedArtists] = useState([])
  const topArtistsUserIds = topArtists?.map((i) => i.id).slice(0, 10)
  console.log(topArtistsUserIds)
  let history = useHistory()

  const { createPlaylist, response, loading, error } = useCreatePlaylist(
    token,
    userId,
    topArtistsUserIds
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      search: '',
    },
  })

  if (!token) {
    history.push('/login')
  }

  if (loading) {
    return <div>creating your playlist...</div>
  }

  if (error) {
    return <div>Oops, something went wrong...</div>
  }

  const onSubmit = (data) => console.log(data)

  const myHeader = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const searchSpotify = (e) => {
    setInput(e.currentTarget.value)
    if (e.currentTarget.value !== '') {
      axios({
        url: `https://api.spotify.com/v1/search?q=${encodeURI(
          e.currentTarget.value
        )}&type=artist&limit=5`,
        method: 'GET',
        headers: myHeader,
      }).then((res) => {
        setResult(res.data.artists.items)
      })
    } else {
      setResult([])
    }
  }

  const handleSelectArtistClick = (i) => {
    setSelectedArtists((old) => [...old, i])
    setResult([])
    reset({ search: '' })
  }
  const handleUnselectArtistClick = (i) => {
    setSelectedArtists((old) => old.filter((el) => el.id !== i.id))
  }

  return (
    <>
      {response ? (
        history.push(`/playlist/${response.id}`)
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name">PLAYLIST</label>
              <input
                type="text"
                {...register('name', {
                  required: 'Please provide a name for your playlist',
                })}
              />
            </div>
            {errors?.name && <div>{errors?.name.message}</div>}
            <div>
              <label htmlFor="description">DESCRIPTION</label>
              <input type="text" {...register('description')} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search for artists"
                {...register('search', { onChange: searchSpotify, input })}
              />
            </div>
            {result.map((i) => {
              return (
                <div onClick={() => handleSelectArtistClick(i)} key={i.id}>
                  {i.name}
                </div>
              )
            })}
            <button type="submit">submit</button>
          </form>
          <h3>Selected:</h3>
          {selectedArtists.map((i) => (
            <div key={`selected-${i.id}`}>
              {i.name}{' '}
              <span onClick={() => handleUnselectArtistClick(i)}> X </span>
            </div>
          ))}
          <button onClick={() => createPlaylist()}>Create</button>
        </>
      )}
    </>
  )
}
