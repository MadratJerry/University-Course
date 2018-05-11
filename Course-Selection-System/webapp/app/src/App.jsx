import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Interceptor from './components/Interceptor'
import Dashboard from './components/Dashboard'
import { GlobalContext } from './Context'
import './App.css'

class App extends Component {
  state = {
    user: {},
  }
  setUser = user => {
    user.name = user.studentName || user.teacherName || user.administratorId
    this.setState({ user })
  }
  render() {
    return (
      <GlobalContext.Provider value={{ user: this.state.user }}>
        <div style={{ height: '100%' }}>
          <Interceptor />
          <Switch>
            <Route path="/login" render={props => <Login setUser={this.setUser} {...props} />} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </GlobalContext.Provider>
    )
  }
}

export default App
