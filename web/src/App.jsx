import { hot } from 'react-hot-loader'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Header from '@/components/Header'
import Interceptor from '@/components/Interceptor'

const { Content, Footer } = Layout

const Client = () => (
  <Layout>
    <Header />
    <Content style={{ padding: '0 50px' }}>
      <div
        style={{
          background: '#fff',
          margin: '16px 0',
          padding: 24,
          minHeight: 280,
        }}
      >
        Content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Flea ©2018 Created by Aries Tam</Footer>
  </Layout>
)

const Admin = () => null

const App = () => (
  <Router>
    <Interceptor />
    <Route exact path="/" component={Client} />
    <Route path="/admin" component={Admin} />
  </Router>
)

export default (process.env.NODE_ENV === 'development' ? hot(module)(App) : App)
