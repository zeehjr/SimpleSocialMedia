import React, { useState, useEffect } from 'react'
import AuthenticationContext from './AuthenticationContext'
// import { useHistory } from 'react-router'

const storedToken = window.localStorage.getItem('token')

const AuthenticationWrapper = ({ children }) => {
  const [token, setToken] = useState(storedToken)

  useEffect(() => {
    window.localStorage.setItem('token', token)
  }, [token])

  const authenticate = ({ username, password }) => {
    setToken('someToken')
    return true
  }

  const register = ({ username, email, password, passwordConfirmation }) => {
    setToken('someToken')

    return true
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <AuthenticationContext.Provider
      value={{ authenticate, register, logout, token }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationWrapper
