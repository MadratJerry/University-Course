import { hot } from 'react-hot-loader'
import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Interceptor from '@/components/Interceptor'
import Admin from '@/components/admin'
import Client from '@/components/client'
import User, { UserConext, reducer } from '@/models/User'

const App = () => {
  const [user, dispatch] = useReducer(reducer, new User())

  return (
    <Router>
      <UserConext.Provider value={[user, dispatch]}>
        <Interceptor />
        <Route exact path="/*" component={Client} />
        <Route exact path="/admin/*" component={Admin} />
      </UserConext.Provider>
    </Router>
  )
}

export default (process.env.NODE_ENV === 'development' ? hot(module)(App) : App)
