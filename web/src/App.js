import React from 'react'
import './tailwind.css'
import RootRouter from './RootRouter'
import AuthenticationWrapper from './components/Authentication/AuthenticationWrapper'

function App () {
  return (
    <AuthenticationWrapper>
      <RootRouter />
    </AuthenticationWrapper>
  )
}

export default App
