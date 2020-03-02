import axios from 'axios'
import { useState, useEffect } from 'react'

const client = axios.create({
  baseURL: 'http://localhost:8000/api'
})

const storedToken = window.localStorage.getItem('token')

export default () => {
  const [token, setToken] = useState(storedToken)

  useEffect(() => {
    console.log('setting token')
    console.log(token)
    if (token) {
      client.defaults.headers.authorization = `Bearer ${token}`
    } else {
      client.defaults.headers.authorization = undefined
    }
  }, [token])

  return {
    api: {
      get: client.get,
      post: client.post,
      put: client.put,
      delete: client.delete,
      head: client.head,
      options: client.options,
      token,
      setToken
    }
  }
}
