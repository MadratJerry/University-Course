import React from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import Header from '@/components/client/Header'
import GoodList from '@/components/client/GoodList'
import Home from '@/components/client/Home'

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
        <Route exact path="/" component={Home} />
        <Route exact path="/goods" component={GoodList} />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Flea ©2018 Created by Aries Tam</Footer>
  </Layout>
)

export default Client
