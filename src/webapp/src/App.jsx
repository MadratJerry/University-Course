import React from 'react'
import { Layout, Button } from 'antd'
import './App.css'

const { Header, Content, Footer } = Layout

const App = () => (
  <Layout>
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: '#ffffff',
      }}
    >
      <div style={{ color: '#25b864', fontSize: 36, fontWeight: 'bold' }}>
        Flea
      </div>
      <Button.Group>
        <Button>登录</Button>
        <Button>注册</Button>
      </Button.Group>
    </Header>
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
