import { hot } from 'react-hot-loader'
import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import Interceptor from '@/components/Interceptor'
import Client from '@/components/client'
import User, { UserContext, reducer } from '@/models/User'

const App = () => {
  // 【值，分配动作】 = （分配函数，初始值）
  const [user, dispatch] = useReducer(reducer, new User())

  return (
    // 选择中文语言包
    // context上下文（为了全局使用这个对象）
    <LocaleProvider locale={zh_CN}>
      <Router>
        <UserContext.Provider value={[user, dispatch]}>
          <Interceptor />
          <Route path="/*" component={Client} />
        </UserContext.Provider>
      </Router>
    </LocaleProvider>
  )
}

export default (process.env.NODE_ENV === 'development' ? hot(module)(App) : App)
