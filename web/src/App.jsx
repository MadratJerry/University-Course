import { hot } from 'react-hot-loader'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Interceptor from '@/components/Interceptor'
import Admin from '@/components/admin'
import Client from '@/components/client'

const App = () => (
  <Router>
    <Interceptor />
    <Route exact path="/" component={Client} />
    <Route path="/admin" component={Admin} />
  </Router>
)

export default (process.env.NODE_ENV === 'development' ? hot(module)(App) : App)
