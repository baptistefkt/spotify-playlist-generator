import { useEffect } from 'react'
import { getTokenFromLocationHash } from '../helpers'
import { useHistory } from 'react-router-dom'

export const Authorized = ({ setToken }) => {
  let history = useHistory()
  useEffect(() => {
    const accessToken = getTokenFromLocationHash()
    setToken(accessToken)
    history.push('/')
  }, [])
  return <div>...Authorization...</div>
}
