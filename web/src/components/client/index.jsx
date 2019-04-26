import React, { useReducer } from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import Header from '@/components/client/Header'
import GoodList from '@/components/client/GoodList'
import Home from '@/components/client/Home'
import Good from '@/components/client/GoodDetail'
import User, { UserConext, reducer } from '@/models/User'

const { Content, Footer } = Layout

const Client = () => {
  const [user, dispatch] = useReducer(reducer, new User())

  return (
    <Layout>
      <UserConext.Provider value={[user, dispatch]}>
        <Header />
        <Content style={{ padding: '0 3%' }}>
          <div
            style={{
              background: '#fff',
              margin: '3% 0',
              padding: '3%',
              minHeight: 280,
            }}
          >
            <Route exact path="/" component={Home} />
            <Route exact path="/goods" component={GoodList} />
            <Route exact path="/good/:id" component={Good} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Flea ©2018 Created by Aries Tam</Footer>
      </UserConext.Provider>
    </Layout>
  )
}

export default Client
