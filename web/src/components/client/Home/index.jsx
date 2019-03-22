import React from 'react'
import Category from '@/components/client/Home/Category'
import TopCarousel from '@/components/client/Home/TopCarousel'
import SellGroup from '@/components/client/Home/SellGroup'
import './index.css'

const Home = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-around' }} className="top">
      <Category style={{ width: '40%' }} />
      <TopCarousel />
    </div>
    <SellGroup />
  </>
)

export default Home
