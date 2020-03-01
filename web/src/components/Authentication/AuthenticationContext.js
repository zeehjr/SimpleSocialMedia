import { createContext } from 'react'

const DEFAULT_VALUE = {
  token: '',
  authenticate: ({ username, password }) => false,
  register: ({ username, email, password, passwordConfirmation }) => false,
  logout: () => null
}

export default createContext(DEFAULT_VALUE)
