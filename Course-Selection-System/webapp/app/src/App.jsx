import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Interceptor from './components/Interceptor'
import Dashboard from './components/Dashboard'
import './App.css'

class App extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Interceptor />
        <Switch>
          <Route path="/login" component={Login} />} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    )
  }
}

export default App
