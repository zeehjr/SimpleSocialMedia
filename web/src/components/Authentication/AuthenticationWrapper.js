import React, { useState, useEffect } from 'react'
import AuthenticationContext from './AuthenticationContext'
import useApi from '../../hooks/useApi'
// import { useHistory } from 'react-router'

const storedToken = window.localStorage.getItem('token')

const AuthenticationWrapper = ({ children }) => {
  const { api } = useApi()
  const [token, setToken] = useState(storedToken)

  useEffect(() => {
    window.localStorage.setItem('token', token)
    api.setToken(token)
  }, [token, api])

  const authenticate = async ({ username, password }) => {
    const res = await api.post('/auth/token/', { username, password })

    if (res.status === 200 && res.data.token) {
      setToken(res.data.token)
      console.log(res.data.token)
      console.log(res)
      return true
    }

    console.log('Errored viado')

    setToken(null)
    return false
  }

  const register = async ({
    username,
    email,
    password,
    passwordConfirmation
  }) => {
    const res = await api.post('/auth/register/', { username, email, password })

    if (res.status === 201 && res.data.created_id) {
      await authenticate({ username, password })
      return true
    }

    return false
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <AuthenticationContext.Provider
      value={{ authenticate, register, logout, token: api.token }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationWrapper
