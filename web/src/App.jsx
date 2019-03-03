import React from 'react'
import { Layout } from 'antd'
import './App.css'
import Header from './components/Header'

const { Content, Footer } = Layout

const App = () => (
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
    <Footer style={{ textAlign: 'center' }}>
      Flea ©2018 Created by Aries Tam
    </Footer>
  </Layout>
)

export default App
