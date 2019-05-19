import { hot } from 'react-hot-loader'
import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import Interceptor from '@/components/Interceptor'
import Client from '@/components/client'
import User, { UserConext, reducer } from '@/models/User'

const App = () => {
  const [user, dispatch] = useReducer(reducer, new User())

  return (
    <LocaleProvider locale={zh_CN}>
      <Router>
        <UserConext.Provider value={[user, dispatch]}>
          <Interceptor />
          <Route path="/*" component={Client} />
        </UserConext.Provider>
      </Router>
    </LocaleProvider>
  )
}

export default (process.env.NODE_ENV === 'development' ? hot(module)(App) : App)
