import React from 'react'
import { Layout } from 'antd'
import Header from '@/components/client/Header'
import Category from '@/components/client/Category'
import TopCarousel from '@/components/client/TopCarousel'
import SellGroup from '@/components/client/SellGroup'
import './index.css'

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
        <div style={{ display: 'flex', justifyContent: 'space-around' }} className="top">
          <Category style={{ width: '40%' }} />
          <TopCarousel />
        </div>
        <SellGroup />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Flea ©2018 Created by Aries Tam</Footer>
  </Layout>
)

export default Client
