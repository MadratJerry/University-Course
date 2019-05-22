import React from 'react'
import { Layout } from 'antd'
import { Route, Switch } from 'react-router-dom'
import Admin from '@/components/admin'
import Header from '@/components/client/Header'
import GoodList from '@/components/client/GoodList'
import Home from '@/components/client/Home'
import Good from '@/components/client/GoodDetail'
import Profile from '@/components/client/Profile'
import TopUp from '@/components/client/TopUp'

const { Content, Footer } = Layout

const Client = () => {
  return (
    <Layout>
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
          <Switch>
            <Route path="/admin/:tab" component={Admin} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/" component={Home} />
            <Route exact path="/profile/:tab" component={Profile} />
            <Route exact path="/goods" component={GoodList} />
            <Route exact path="/goods/:id" component={Good} />
            <Route exact path="/topUp/:id" component={TopUp} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Flea ©2019 Created by Aries Tam</Footer>
    </Layout>
  )
}

export default Client
