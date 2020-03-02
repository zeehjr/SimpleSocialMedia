import React, { lazy, Suspense, useContext } from 'react'
import Loading from './pages/Loading'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Feed from './pages/Feed'
import AuthenticationContext from './components/Authentication/AuthenticationContext'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

const AuthenticatedRoute = ({ path, children }) => {
  const { token } = useContext(AuthenticationContext)

  return (
    <Route path={path}>{token ? children : <Redirect to='/login' />}</Route>
  )
}

const RootRouter = () => (
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/feed' />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <AuthenticatedRoute path='/feed'>
          <Feed />
        </AuthenticatedRoute>
      </Switch>
    </BrowserRouter>
  </Suspense>
)

export default RootRouter
